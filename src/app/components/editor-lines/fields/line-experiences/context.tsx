import * as React from 'react';
import { useEditableLinesManager } from '../../contexts/editable-lines-manager';
import { makeContext } from 'src/app/contexts/makeContext';

export type ExperienceEditorContextValue = {
  openExperience: () => void;
  closeExperience: () => void;
};

const [ExperienceEditor, useExperienceEditor] =
  makeContext<ExperienceEditorContextValue>(
    '`useExperienceEditor` harus dipakai pada child komponen `ExperienceEditor`.'
  );

function ExperienceEditorManager({
  children,
  createId,
  openExperience,
  closeExperience,
}: React.PropsWithChildren<{
  createId: string | null;
  openExperience: () => void;
  closeExperience: () => void;
}>) {
  const { activeLine, shouldActivateLine, resetActiveLine } =
    useEditableLinesManager();

  React.useEffect(() => {
    if (!createId || !activeLine) {
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
      openExperience,
      closeExperience: () => {
        closeExperience();
        resetActiveLine();
      },
    }),
    [openExperience, closeExperience, resetActiveLine]
  );

  return (
    <ExperienceEditor.Provider value={experienceField}>
      {children}
    </ExperienceEditor.Provider>
  );
}

export { ExperienceEditorManager, useExperienceEditor };
