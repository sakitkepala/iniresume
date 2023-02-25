import * as React from 'react';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { buildContents } from '../build-contents';

import { type LineId } from '../types';

import { v4 } from 'uuid';

export enum GroupTypes {
  EXPERIENCE = 'EXPERIENCE',
  EDUCATION = 'EDUCATION',
}

export enum ActionTypes {
  LINE_ACTIVATED = 'LINE_ACTIVATED',
  LINE_ACTIVATED_AFTER_RESET = 'LINE_ACTIVATED_AFTER_RESET',
  LINE_CONTENTS_RESET = 'LINE_CONTENTS_RESET',
  LINES_GROUP_OPEN = 'LINES_GROUP_OPEN',
  LINES_GROUP_RESET = 'LINES_GROUP_RESET',
  TOP_INSERT_SKILL_TOGGLE = 'TOP_INSERT_SKILL_TOGGLE',
  INSERT_SKILL_BELOW_OPEN = 'INSERT_SKILL_BELOW_OPEN',
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
      group: GroupTypes;
      payload?: LineId;
    }
  | {
      type: ActionTypes.LINES_GROUP_RESET;
    }
  | {
      type: ActionTypes.TOP_INSERT_SKILL_TOGGLE;
      payload?: boolean;
    }
  | {
      type: ActionTypes.INSERT_SKILL_BELOW_OPEN;
      payload: string;
    };

const initialState: {
  activeLine: LineId | null;
  activeGroup: GroupTypes | null;
  nextCreateId: string;
  insertSkillTop: boolean;
  insertSkillBelow: string | null;
} = {
  activeLine: null,
  activeGroup: null,
  nextCreateId: v4(),
  insertSkillTop: false,
  insertSkillBelow: null,
};

const initialInsertState = {
  insertSkillTop: false,
  insertSkillBelow: null,
};

function configReducer(
  state: typeof initialState,
  action: Actions
): typeof initialState {
  switch (action.type) {
    case ActionTypes.LINE_ACTIVATED: {
      // hard coded nih
      const groupLineIds = new Set([
        state.nextCreateId + '-experience-title',
        state.nextCreateId + '-experience-employer',
        state.nextCreateId + '-experience-dates',
        state.nextCreateId + '-experience-description',
        state.nextCreateId + '-education-school',
        state.nextCreateId + '-education-major',
        state.nextCreateId + '-education-dates',
        state.nextCreateId + '-education-description',
      ]);
      const lineBelongsToActiveGroup = groupLineIds.has(action.payload);

      if (!state.activeGroup || lineBelongsToActiveGroup) {
        return {
          ...state,
          ...initialInsertState,
          activeLine: action.payload,
        };
      }

      return {
        ...state,
        ...initialInsertState,
        activeLine: action.payload,
        activeGroup: null,
        nextCreateId: v4(),
      };
    }

    case ActionTypes.LINE_ACTIVATED_AFTER_RESET: {
      return {
        ...state,
        ...initialInsertState,
        activeLine: action.payload,
        activeGroup: null,
        nextCreateId: v4(),
      };
    }

    case ActionTypes.LINE_CONTENTS_RESET: {
      return {
        ...initialState,
        nextCreateId: v4(),
      };
    }

    case ActionTypes.LINES_GROUP_OPEN: {
      const activeLine = {
        [GroupTypes.EXPERIENCE]: state.nextCreateId + '-experience-title',
        [GroupTypes.EDUCATION]: state.nextCreateId + '-education-school',
      };
      return {
        ...state,
        ...initialInsertState,
        activeGroup: action.group,
        activeLine: action.payload || activeLine[action.group],
      };
    }

    case ActionTypes.LINES_GROUP_RESET: {
      return {
        ...state,
        ...initialInsertState,
        activeGroup: null,
        nextCreateId: v4(),
      };
    }

    case ActionTypes.TOP_INSERT_SKILL_TOGGLE: {
      if (typeof action.payload === 'undefined') {
        return {
          ...state,
          insertSkillBelow: null,
          insertSkillTop: !state.insertSkillTop,
        };
      }

      return {
        ...state,
        insertSkillBelow: null,
        insertSkillTop: action.payload,
        activeLine: action.payload ? 'skills-insert-top' : null,
      };
    }

    case ActionTypes.INSERT_SKILL_BELOW_OPEN: {
      return {
        ...state,
        insertSkillTop: false,
        insertSkillBelow: action.payload,
        activeLine: 'skills-insert-under-' + action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

function useEditorLineContents() {
  const { resume } = useResumeEditor();
  const [config, dispatch] = React.useReducer(configReducer, initialState);
  const {
    activeLine,
    activeGroup,
    nextCreateId,
    insertSkillTop,
    insertSkillBelow,
  } = config;

  const independentDispatches = React.useMemo(() => {
    const resetLineContents = () => {
      dispatch({ type: ActionTypes.LINE_CONTENTS_RESET });
    };

    const activateLine = (lineId: LineId) => {
      dispatch({ type: ActionTypes.LINE_ACTIVATED, payload: lineId });
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
        group: GroupTypes.EXPERIENCE,
      });
    };

    const closeExperience = () => {
      dispatch({ type: ActionTypes.LINES_GROUP_RESET });
    };

    const openEducation = () => {
      dispatch({
        type: ActionTypes.LINES_GROUP_OPEN,
        group: GroupTypes.EDUCATION,
      });
    };

    const closeEducation = () => {
      dispatch({ type: ActionTypes.LINES_GROUP_RESET });
    };

    const insertSkillOnTop = (shouldOpen?: boolean) => {
      dispatch({
        type: ActionTypes.TOP_INSERT_SKILL_TOGGLE,
        payload: shouldOpen,
      });
    };

    const insertSkillBelow = (insertBelow: string) => {
      dispatch({
        type: ActionTypes.INSERT_SKILL_BELOW_OPEN,
        payload: insertBelow,
      });
    };

    return {
      resetLineContents,
      activateLine,
      activateAfterReset,
      openExperience,
      closeExperience,
      openEducation,
      closeEducation,
      insertSkillOnTop,
      insertSkillBelow,
    };
  }, []);

  const editorLineContents = React.useMemo(() => {
    const { resetLineContents, activateLine } = independentDispatches;

    const contents = buildContents(resume, {
      createId: nextCreateId,
      experienceIsOpen: activeGroup === GroupTypes.EXPERIENCE,
      educationIsOpen: activeGroup === GroupTypes.EDUCATION,
      skillInsertTop: insertSkillTop,
      skillInsertBelow: insertSkillBelow,
    });

    const activateableLines = contents
      .filter((content) => content.activateable)
      .map((content) => content.id);

    const activateNext = () => {
      if (!activeLine) {
        activateLine(activateableLines[0]);
        return;
      }
      const index = activateableLines.indexOf(activeLine);
      const nextIndex = index + 1;
      const nextLineId = activateableLines[nextIndex];
      nextLineId ? activateLine(nextLineId) : resetLineContents();
    };

    const activatePrevious = () => {
      if (!activeLine) {
        activateLine(activateableLines[activateableLines.length - 1]);
        return;
      }
      const index = activateableLines.indexOf(activeLine);
      const prevIndex = index - 1;
      const prevLineId = activateableLines[prevIndex];
      prevLineId ? activateLine(prevLineId) : resetLineContents();
    };

    return {
      ...independentDispatches,
      activeLine,
      activeGroup,
      nextCreateId,
      contents,
      activateNext,
      activatePrevious,
    };
  }, [
    independentDispatches,
    resume,
    nextCreateId,
    activeGroup,
    insertSkillTop,
    insertSkillBelow,
    activeLine,
  ]);

  return editorLineContents;
}

export { useEditorLineContents };
