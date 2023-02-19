import * as React from 'react';
import { makeContext } from 'src/app/contexts/makeContext';
import { useEditableLinesManager } from '../../contexts/editable-lines-manager';
import { useRegisterEditable } from '../../components/line';

export type ExperienceFieldContextValue = {
  focusNext: () => void;
};

const [ExperienceField, useExperienceFieldContext] =
  makeContext<ExperienceFieldContextValue>(
    '`useExperienceField` harus dipakai pada child Provider `ExperienceField`.'
  );

function ExperienceFieldProvider({ children }: React.PropsWithChildren) {
  const { hasActiveLine } = useEditableLinesManager();

  const experienceField: ExperienceFieldContextValue = {
    focusNext: () => {
      console.log('next field');
    },
  };

  React.useEffect(() => {
    // TODO: close editor
  }, [hasActiveLine]);

  return (
    <ExperienceField.Provider value={experienceField}>
      {children}
    </ExperienceField.Provider>
  );
}

function useExperienceField() {
  useRegisterEditable();
  return useExperienceFieldContext();
}

export { ExperienceFieldProvider, useExperienceField };
