import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useEditableLinesManager } from '../contexts/editable-lines-manager';

import { v4 } from 'uuid';
import { clsx } from 'clsx';

import * as styles from './line.css';

const generateDisclosureId = () => v4();

type EditableLineDisclosureContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const EditableLineDisclosureContext =
  React.createContext<EditableLineDisclosureContextValue | null>(null);

const useEditableLineDisclosure = () => {
  const value = React.useContext(EditableLineDisclosureContext);
  if (!value) {
    throw new Error(
      'Hook `useEditableLineDisclosure` harus dipakai pada child provider `EditableLineDisclosureContext`.'
    );
  }
  return value;
};

function EditableLineWrapper({
  line,
  children,
}: React.PropsWithChildren<{ line?: number | string }>) {
  const {
    registerEditable,
    activateLine,
    shouldActivateLine,
    focusNext,
    resetActiveLine,
  } = useEditableLinesManager();
  const [disclosureId, setDisclosureId] = React.useState(generateDisclosureId);

  const disclosure = React.useMemo<EditableLineDisclosureContextValue>(
    () => ({
      isOpen: shouldActivateLine(Number(line)) || false,
      open: () => activateLine(Number(line)),
      close: () => focusNext(),
    }),
    [shouldActivateLine, activateLine, line, focusNext]
  );

  React.useEffect(
    () => registerEditable(Number(line)),
    [registerEditable, line]
  );

  // Tiap close generate key baru untuk remount
  // supaya nge-reset semua state children-nya
  React.useEffect(() => {
    !disclosure.isOpen && setDisclosureId(generateDisclosureId());
  }, [disclosure.isOpen]);

  useHotkeys('esc', () => resetActiveLine(), {
    enabled: disclosure.isOpen,
    enableOnFormTags: true,
  });

  return (
    <EditableLineDisclosureContext.Provider value={disclosure}>
      <div
        className={clsx(
          styles.line,
          disclosure.isOpen ? styles.lineActive : undefined
        )}
      >
        <div className={styles.lineNumber}>
          {typeof line === 'undefined' ? null : line}
        </div>
        <div
          className={styles.lineContent}
          onClick={(ev) => {
            ev.stopPropagation();
            activateLine(Number(line));
          }}
        >
          <React.Fragment key={disclosureId}>{children}</React.Fragment>
        </div>
      </div>
    </EditableLineDisclosureContext.Provider>
  );
}

export { EditableLineWrapper, useEditableLineDisclosure };
