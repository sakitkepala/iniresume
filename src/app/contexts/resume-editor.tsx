import * as React from 'react';

import { getInitialData } from '../data/resume';
import { type ResumeData, type PhoneNumber } from '../data/resume';

type ResumeEditorContextValue = {
  resume: ResumeData;
  updateField: (field: keyof ResumeData, value: ResumeFieldPayload) => void;
  updateTextField: (field: keyof ResumeData, value: string) => void;
  addSkill: (value: string) => void;
  editSkill: (value: string, originalValue: string) => void;
  insertSkill: (insertAfterSkill: string, value: string) => void;
};

const ResumeEditorContext =
  React.createContext<ResumeEditorContextValue | null>(null);

function useResumeEditor() {
  const value = React.useContext(ResumeEditorContext);
  if (!value) {
    throw new Error(
      'Hook `useResumeEditor` harus dipakai di child `ResumeEditorProvider`.'
    );
  }
  return value;
}

function ResumeEditorProvider({ children }: React.PropsWithChildren) {
  const value = useEditor();
  return (
    <ResumeEditorContext.Provider value={value}>
      {children}
    </ResumeEditorContext.Provider>
  );
}

type ResumeFieldPayload = string | PhoneNumber;

type ResumeEditorActionsType =
  | {
      type: 'UPDATE_GENERIC_FIELD';
      field: keyof ResumeData;
      payload: ResumeFieldPayload;
    }
  | {
      type: 'UPDATE_STRING_FIELD';
      field: keyof ResumeData;
      payload: string;
    }
  | {
      type: 'ADD_SKILL';
      payload: string;
    }
  | {
      type: 'EDIT_SKILL';
      payload: {
        value: string;
        original: string;
      };
    }
  | {
      type: 'INSERT_SKILL';
      payload: {
        insertAfterSkill: string;
        value: string;
      };
    };

function useEditor() {
  const [resume, dispatch] = React.useReducer(
    (state: ResumeData, action: ResumeEditorActionsType) => {
      switch (action.type) {
        case 'UPDATE_STRING_FIELD': {
          return { ...state, [action.field]: action.payload };
        }

        case 'UPDATE_GENERIC_FIELD': {
          const currentData = state[action.field];
          const dataObject = typeof currentData === 'string' ? {} : currentData;
          return {
            ...state,
            [action.field]: {
              ...dataObject,
              ...(typeof action.payload !== 'string' ? action.payload : {}),
            },
          };
        }

        case 'ADD_SKILL': {
          // skip kalau udah ada
          if (state.skills.indexOf(action.payload) >= 0) {
            return state;
          }

          return {
            ...state,
            skills: [...state.skills, action.payload],
          };
        }

        case 'INSERT_SKILL': {
          // skip kalau udah ada
          if (
            state.skills.indexOf(action.payload.value) >= 0 ||
            !action.payload.insertAfterSkill
          ) {
            return state;
          }

          const indexAtPrevious = state.skills.indexOf(
            action.payload.insertAfterSkill
          );

          if (indexAtPrevious < 0) {
            return state;
          }

          const skillsAfterInsert = [...state.skills];
          skillsAfterInsert.splice(
            indexAtPrevious + 1,
            0,
            action.payload.value
          );

          return {
            ...state,
            skills: skillsAfterInsert,
          };
        }

        case 'EDIT_SKILL': {
          // Nge-hapus skill
          if (!action.payload.value && action.payload.original) {
            return {
              ...state,
              skills: state.skills.filter(
                (skill) => skill !== action.payload.original
              ),
            };
          }

          // skip kalau udah ada
          if (
            !action.payload.value ||
            state.skills.indexOf(action.payload.value) >= 0
          ) {
            return state;
          }

          return {
            ...state,
            skills: state.skills.map((skill) =>
              skill === action.payload.original ? action.payload.value : skill
            ),
          };
        }

        default: {
          return state;
        }
      }
    },
    getInitialData()
  );

  return React.useMemo<ResumeEditorContextValue>(
    () => ({
      resume,

      updateField: (field, value) => {
        dispatch({ type: 'UPDATE_GENERIC_FIELD', field, payload: value });
      },

      updateTextField: (field, value) => {
        dispatch({ type: 'UPDATE_STRING_FIELD', field, payload: value });
      },

      addSkill: (value) => {
        dispatch({ type: 'ADD_SKILL', payload: value });
      },

      editSkill: (value, originalValue) => {
        dispatch({
          type: 'EDIT_SKILL',
          payload: {
            value,
            original: originalValue,
          },
        });
      },

      insertSkill: (insertAfterSkill, value) => {
        dispatch({
          type: 'INSERT_SKILL',
          payload: {
            insertAfterSkill,
            value,
          },
        });
      },
    }),

    [resume]
  );
}

export * from '../data/resume';
export { ResumeEditorProvider, useResumeEditor };
