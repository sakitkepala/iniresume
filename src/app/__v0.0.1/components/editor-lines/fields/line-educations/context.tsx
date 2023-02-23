import * as React from 'react';
import { useEditableLinesManager } from '../../contexts/editable-lines-manager';
import { makeContext } from 'src/app/contexts/makeContext';

export type EducationEditorContextValue = {
  openEducation: () => void;
  closeEducation: () => void;
};

const [EducationEditor, useEducationEditor] =
  makeContext<EducationEditorContextValue>(
    '`useEducationEditor` harus dipakai pada child komponen `EducationEditor`.'
  );

function EducationEditorManager({
  children,
  createId,
  openEducation,
  closeEducation,
}: React.PropsWithChildren<{
  createId: string | null;
  openEducation: () => void;
  closeEducation: () => void;
}>) {
  const { activeLine, resetActiveLine, shouldActivateLine } =
    useEditableLinesManager();

  React.useEffect(() => {
    if (!createId || !activeLine) {
      return;
    }
    const educationEditorIds = new Set([
      createId + '-education-school',
      createId + '-education-major',
      createId + '-education-description',
    ]);
    !educationEditorIds.has(activeLine) && closeEducation();
  }, [createId, activeLine, shouldActivateLine, closeEducation]);

  const educationEditor: EducationEditorContextValue = {
    openEducation,
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
