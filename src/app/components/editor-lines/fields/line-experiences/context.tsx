import * as React from 'react';
import { useEditableLinesManager } from '../../contexts/editable-lines-manager';
import { makeContext } from 'src/app/contexts/makeContext';

export type ExperienceEditorContextValue = {
  createId: string | null;
  openExperience: () => void;
  closeExperience: () => void;
};

const [ExperienceEditor, useExperienceEditor] =
  makeContext<ExperienceEditorContextValue>(
    '`useExperienceEditor` harus dipakai pada child komponen `ExperienceEditor`.'
  );

function ExperienceEditorManager({
  children,
  openExperience,
  closeExperience,
  createId,
}: React.PropsWithChildren<{
  createId: string | null;
  openExperience: () => void;
  closeExperience: () => void;
}>) {
  const { activeLine, resetActiveLine, shouldActivateLine } =
    useEditableLinesManager();

  React.useEffect(() => {
    if (!activeLine) {
      return;
    }
    const experienceEditorIds = new Set([
      createId + '-experience-title',
      createId + '-experience-employer',
      createId + '-experience-description',
    ]);
    !experienceEditorIds.has(activeLine) && closeExperience();
  }, [createId, activeLine, shouldActivateLine, closeExperience]);

  const experienceField = React.useMemo<ExperienceEditorContextValue>(
    () => ({
      createId,
      openExperience,
      closeExperience: () => {
        closeExperience();
        resetActiveLine();
      },
    }),
    [createId, openExperience, closeExperience, resetActiveLine]
  );

  return (
    <ExperienceEditor.Provider value={experienceField}>
      {children}
    </ExperienceEditor.Provider>
  );
}

export { ExperienceEditorManager, useExperienceEditor };
