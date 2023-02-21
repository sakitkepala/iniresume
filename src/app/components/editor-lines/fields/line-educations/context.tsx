import * as React from 'react';
import { useEditableLinesManager } from '../../contexts/editable-lines-manager';
import { makeContext } from 'src/app/contexts/makeContext';

export type EducationEditorContextValue = {
  openEducation: () => void;
  closeEducation: () => void;
};

const [EducationEditor, useEducationEditor] =
  makeContext<EducationEditorContextValue>(
    '`useEducationField` harus dipakai pada child Provider `EducationField`.'
  );

function EducationEditorManager({
  children,
  openEducation,
  closeEducation,
}: React.PropsWithChildren<{
  openEducation: () => void;
  closeEducation: () => void;
}>) {
  const { activeLine, activateLine, resetActiveLine, shouldActivateLine } =
    useEditableLinesManager();

  React.useEffect(() => {
    if (!activeLine) {
      return;
    }
    const shouldCloseEducation =
      [
        'education-add-school',
        'education-add-major',
        'education-add-description',
      ].indexOf(activeLine) < 0;

    shouldCloseEducation && closeEducation();
  }, [activeLine, shouldActivateLine, closeEducation]);

  const educationEditor: EducationEditorContextValue = {
    openEducation: () => {
      openEducation();
      setTimeout(() => activateLine('education-add-school'));
    },
    closeEducation: () => {
      closeEducation();
      resetActiveLine();
    },
  };

  return (
    <EducationEditor.Provider value={educationEditor}>
      {children}
    </EducationEditor.Provider>
  );
}

export { EducationEditorManager, useEducationEditor };
