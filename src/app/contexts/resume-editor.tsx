import * as React from 'react';

import { getInitialData } from '../data/resume';
import { type ResumeData, type PhoneNumber } from '../data/resume';

type ResumeFieldPayload = string | PhoneNumber;

type ResumeEditorActionType =
  | {
      type: 'UPDATE_GENERIC_FIELD';
      field: keyof ResumeData;
      payload: ResumeFieldPayload;
    }
  | {
      type: 'UPDATE_STRING_FIELD';
      field: keyof ResumeData;
      payload: string;
    };

function useEditor() {
  const [resume, dispatch] = React.useReducer(
    (state: ResumeData, action: ResumeEditorActionType) => {
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
        default: {
          return state;
        }
      }
    },
    getInitialData()
  );

  const updateTextField = (field: keyof ResumeData, value: string) => {
    dispatch({ type: 'UPDATE_STRING_FIELD', field, payload: value });
  };

  const updateField = (field: keyof ResumeData, value: ResumeFieldPayload) => {
    dispatch({ type: 'UPDATE_GENERIC_FIELD', field, payload: value });
  };

  return { resume, updateField, updateTextField };
}

const ResumeEditorContext = React.createContext<{
  resume?: ResumeData;
  updateField?: (field: keyof ResumeData, value: ResumeFieldPayload) => void;
  updateTextField?: (field: keyof ResumeData, value: string) => void;
}>({});

function useResumeEditor() {
  return React.useContext(ResumeEditorContext);
}

function ResumeEditorProvider({ children }: React.PropsWithChildren) {
  const value = useEditor();
  return (
    <ResumeEditorContext.Provider value={value}>
      {children}
    </ResumeEditorContext.Provider>
  );
}

export { ResumeEditorProvider, useResumeEditor, ResumeData };
