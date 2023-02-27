import * as React from 'react';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { buildContents, GroupTypeNames } from '../build-contents';

import { type LineId } from '../types';
import { type BuildConfigState, type OpenGroup } from '../build-contents';

import { v4 } from 'uuid';

export enum ActionTypes {
  LINE_ACTIVATED = 'LINE_ACTIVATED',
  LINE_ACTIVATED_AFTER_RESET = 'LINE_ACTIVATED_AFTER_RESET',
  LINE_CONTENTS_RESET = 'LINE_CONTENTS_RESET',
  LINES_GROUP_OPEN = 'LINES_GROUP_OPEN',
  LINES_GROUP_RESET = 'LINES_GROUP_RESET',
  INSERT_SKILL_TOP_TOGGLE = 'INSERT_SKILL_TOP_TOGGLE',
  INSERT_SKILL_BELOW_OPEN = 'INSERT_SKILL_BELOW_OPEN',
  HOTKEY_PREVENTED = 'HOTKEY_PREVENTED',
}

export type Actions =
  | {
      type: ActionTypes.LINE_ACTIVATED;
      payload: LineId;
    }
  | {
      type: ActionTypes.LINE_ACTIVATED_AFTER_RESET;
      payload: LineId;
    }
  | {
      type: ActionTypes.LINE_CONTENTS_RESET;
    }
  | {
      type: ActionTypes.LINES_GROUP_OPEN;
      group: OpenGroup;
      payload?: LineId;
    }
  | {
      type: ActionTypes.LINES_GROUP_RESET;
    }
  | {
      type: ActionTypes.INSERT_SKILL_TOP_TOGGLE;
      payload?: boolean;
    }
  | {
      type: ActionTypes.INSERT_SKILL_BELOW_OPEN;
      payload: string;
    }
  | {
      type: ActionTypes.HOTKEY_PREVENTED;
    };

const initialState: BuildConfigState = {
  activeLine: null,
  activeGroup: null,
  nextCreateId: v4(),
  insertSkillTop: false,
  insertSkillBelow: null,
  hotkeyPrevented: false,
};

const initialInsertState = {
  insertSkillTop: false,
  insertSkillBelow: null,
};

function useEditorLineContents() {
  const { resume } = useResumeEditor();
  const lastActiveLine = React.useRef<string | null>(null);

  const [config, dispatch] = React.useReducer(
    (state: BuildConfigState, action: Actions): BuildConfigState => {
      switch (action.type) {
        case ActionTypes.HOTKEY_PREVENTED: {
          return { ...state, hotkeyPrevented: true };
        }

        case ActionTypes.LINE_ACTIVATED: {
          // hard coded nih
          const groupLineIds = new Set([
            state.nextCreateId + '-experience-title',
            state.nextCreateId + '-experience-employer',
            state.nextCreateId + '-experience-dates',
            state.nextCreateId + '-experience-description',
            state.nextCreateId + '-project-item-headline',
            state.nextCreateId + '-project-item-description',
            state.nextCreateId + '-project-item-url',
            state.nextCreateId + '-education-school',
            state.nextCreateId + '-education-major',
            state.nextCreateId + '-education-dates',
            state.nextCreateId + '-education-description',
          ]);

          const activeLine = action.payload;
          lastActiveLine.current = activeLine;

          const lineBelongsToActiveGroup = groupLineIds.has(action.payload);

          if (!state.activeGroup || lineBelongsToActiveGroup) {
            return {
              ...state,
              ...initialInsertState,
              activeLine,
              hotkeyPrevented: false,
            };
          }

          return {
            ...state,
            ...initialInsertState,
            activeLine,
            activeGroup: null,
            nextCreateId: v4(),
            hotkeyPrevented: false,
          };
        }

        case ActionTypes.LINE_ACTIVATED_AFTER_RESET: {
          const activeLine = action.payload;
          lastActiveLine.current = activeLine;

          return {
            ...state,
            ...initialInsertState,
            activeLine,
            activeGroup: null,
            nextCreateId: v4(),
            hotkeyPrevented: false,
          };
        }

        case ActionTypes.LINE_CONTENTS_RESET: {
          return {
            ...initialState,
            nextCreateId: v4(),
          };
        }

        case ActionTypes.LINES_GROUP_OPEN: {
          // Line yang langsung aktif ketika group di-open
          const autoActiveLine = {
            [GroupTypeNames.EXPERIENCE]:
              state.nextCreateId + '-experience-title',
            [GroupTypeNames.EDUCATION]:
              state.nextCreateId + '-education-school',
            [GroupTypeNames.PROJECT]:
              state.nextCreateId + '-project-item-headline',
          };

          const activeLine =
            action.payload || autoActiveLine[action.group.type];
          lastActiveLine.current = activeLine;

          return {
            ...state,
            ...initialInsertState,
            activeGroup: action.group,
            activeLine,
            hotkeyPrevented: false,
          };
        }

        case ActionTypes.LINES_GROUP_RESET: {
          return {
            ...state,
            ...initialInsertState,
            activeGroup: null,
            nextCreateId: v4(),
            hotkeyPrevented: false,
          };
        }

        case ActionTypes.INSERT_SKILL_TOP_TOGGLE: {
          if (typeof action.payload === 'undefined') {
            return {
              ...state,
              insertSkillBelow: null,
              insertSkillTop: !state.insertSkillTop,
              hotkeyPrevented: false,
            };
          }

          return {
            ...state,
            insertSkillBelow: null,
            insertSkillTop: action.payload,
            activeLine: action.payload ? 'skills-insert-top' : null,
            hotkeyPrevented: false,
          };
        }

        case ActionTypes.INSERT_SKILL_BELOW_OPEN: {
          return {
            ...state,
            insertSkillTop: false,
            insertSkillBelow: action.payload,
            activeLine: 'skills-insert-under-' + action.payload,
            hotkeyPrevented: false,
          };
        }

        default: {
          return state;
        }
      }
    },
    initialState
  );

  const {
    activeLine,
    activeGroup,
    nextCreateId,
    hotkeyPrevented,
    insertSkillTop,
    insertSkillBelow,
  } = config;

  const dispatches = React.useMemo(() => {
    const activateLine = (lineId: LineId) => {
      dispatch({ type: ActionTypes.LINE_ACTIVATED, payload: lineId });
    };

    const resetLineContents = () => {
      dispatch({ type: ActionTypes.LINE_CONTENTS_RESET });
    };

    const activateAfterReset = (lineId: LineId) => {
      dispatch({
        type: ActionTypes.LINE_ACTIVATED_AFTER_RESET,
        payload: lineId,
      });
    };

    const openExperience = () => {
      dispatch({
        type: ActionTypes.LINES_GROUP_OPEN,
        group: { type: GroupTypeNames.EXPERIENCE },
      });
    };

    const openProject = (experienceId: string) => {
      dispatch({
        type: ActionTypes.LINES_GROUP_OPEN,
        group: { type: GroupTypeNames.PROJECT, id: experienceId },
      });
    };

    const closeExperience = () => {
      dispatch({ type: ActionTypes.LINES_GROUP_RESET });
    };

    const openEducation = () => {
      dispatch({
        type: ActionTypes.LINES_GROUP_OPEN,
        group: { type: GroupTypeNames.EDUCATION },
      });
    };

    const closeEducation = () => {
      dispatch({ type: ActionTypes.LINES_GROUP_RESET });
    };

    const insertSkillOnTop = (shouldOpen?: boolean) => {
      dispatch({
        type: ActionTypes.INSERT_SKILL_TOP_TOGGLE,
        payload: shouldOpen,
      });
    };

    const insertSkillBelow = (insertBelow: string) => {
      dispatch({
        type: ActionTypes.INSERT_SKILL_BELOW_OPEN,
        payload: insertBelow,
      });
    };

    const preventHotkey = () => {
      dispatch({ type: ActionTypes.HOTKEY_PREVENTED });
    };

    return {
      activateLine,
      resetLineContents,
      activateAfterReset,
      openExperience,
      openProject,
      closeExperience,
      openEducation,
      closeEducation,
      insertSkillOnTop,
      insertSkillBelow,
      preventHotkey,
    };
  }, []);

  const editorLineContents = React.useMemo(() => {
    const { activateLine } = dispatches;
    const config: BuildConfigState = {
      activeLine,
      activeGroup,
      nextCreateId,
      hotkeyPrevented,
      insertSkillTop,
      insertSkillBelow,
    };

    const contents = buildContents(resume, config);

    const activateableLines = contents
      .filter((content) => content.activateable)
      .map((content) => content.id);

    const activateNext = () => {
      if (!activeLine) {
        activateLine(lastActiveLine.current || activateableLines[0]);
        return;
      }

      const index = activateableLines.indexOf(activeLine);
      const nextIndex = index + 1;
      const nextLineId = activateableLines[nextIndex];
      nextLineId && activateLine(nextLineId);
    };

    const activatePrevious = () => {
      if (!activeLine) {
        const previousLine =
          lastActiveLine.current ||
          activateableLines[activateableLines.length - 1];
        activateLine(previousLine);
        return;
      }

      const index = activateableLines.indexOf(activeLine);
      const prevIndex = index - 1;
      const prevLineId = activateableLines[prevIndex];
      prevLineId && activateLine(prevLineId);
    };

    return {
      ...dispatches,
      contents,
      activeLine,
      activeGroup,
      nextCreateId,
      hotkeyPrevented,
      activateLine,
      activateNext,
      activatePrevious,
    };
  }, [
    resume,
    dispatches,
    activeLine,
    activeGroup,
    nextCreateId,
    hotkeyPrevented,
    insertSkillTop,
    insertSkillBelow,
  ]);

  return editorLineContents;
}

export { useEditorLineContents };
