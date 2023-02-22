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
  LINE_CONTENTS_RESET = 'LINE_CONTENTS_RESET',
  LINES_GROUP_OPEN = 'LINES_GROUP_OPEN',
  LINES_GROUP_RESET = 'LINES_GROUP_RESET',
}

export type Actions =
  | {
      type: ActionTypes.LINE_ACTIVATED;
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
    };

const initialState: {
  activeLine: LineId | null;
  activeGroup: GroupTypes | null;
  nextCreateId: string;
} = {
  activeLine: null,
  activeGroup: null,
  nextCreateId: v4(),
};

function configReducer(state: typeof initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.LINE_ACTIVATED: {
      // hard coded nih
      const groupLineIds = new Set([
        state.nextCreateId + '-experience-title',
        state.nextCreateId + '-experience-employer',
        state.nextCreateId + '-experience-description',
        state.nextCreateId + '-education-school',
        state.nextCreateId + '-education-major',
        state.nextCreateId + '-education-description',
      ]);
      const lineBelongsToActiveGroup = groupLineIds.has(action.payload);

      if (!state.activeGroup || lineBelongsToActiveGroup) {
        return {
          ...state,
          activeLine: action.payload,
        };
      }

      return {
        ...state,
        activeLine: action.payload,
        activeGroup: null,
        nextCreateId: v4(),
      };
    }

    case ActionTypes.LINE_CONTENTS_RESET: {
      return {
        activeLine: null,
        activeGroup: null,
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
        activeGroup: action.group,
        activeLine: action.payload || activeLine[action.group],
      };
    }

    case ActionTypes.LINES_GROUP_RESET: {
      return {
        ...state,
        activeGroup: null,
        nextCreateId: v4(),
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
  const { activeLine, activeGroup, nextCreateId } = config;

  const independentDispatches = React.useMemo(() => {
    const resetLineContents = () => {
      dispatch({ type: ActionTypes.LINE_CONTENTS_RESET });
    };

    const activateLine = (lineId: LineId) => {
      dispatch({ type: ActionTypes.LINE_ACTIVATED, payload: lineId });
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

    return {
      resetLineContents,
      activateLine,
      openExperience,
      closeExperience,
      openEducation,
      closeEducation,
    };
  }, []);

  const editorLineContents = React.useMemo(() => {
    const {
      resetLineContents,
      activateLine,
      openExperience,
      closeExperience,
      openEducation,
      closeEducation,
    } = independentDispatches;

    const contents = buildContents(resume, {
      createId: nextCreateId,
      experienceIsOpen: activeGroup === GroupTypes.EXPERIENCE,
      educationIsOpen: activeGroup === GroupTypes.EDUCATION,
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
      activeLine,
      activeGroup,
      nextCreateId,
      contents,
      resetLineContents,
      activateLine,
      activateNext,
      activatePrevious,
      openExperience,
      closeExperience,
      openEducation,
      closeEducation,
    };
  }, [resume, nextCreateId, activeGroup, activeLine, independentDispatches]);

  return editorLineContents;
}

export { useEditorLineContents };
