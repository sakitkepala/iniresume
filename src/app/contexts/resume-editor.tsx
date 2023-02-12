import * as React from 'react';

import { type ResumeData, getInitialData } from '../data/resume';

type ResumeEditorActionType = {
  type: 'UPDATE_FIELD';
  field: string;
  payload: string;
};

function useEditor() {
  const [resume, dispatch] = React.useReducer(
    (state: ResumeData, action: ResumeEditorActionType) => {
      if (action.type === 'UPDATE_FIELD') {
        return { ...state, [action.field]: action.payload };
      }
      return state;
    },
    getInitialData()
  );

  const updateTextField = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, payload: value });
  };

  return { resume, updateTextField };
}

const ResumeEditorContext = React.createContext<{
  resume?: ResumeData;
  updateTextField?: (field: string, value: string) => void;
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
