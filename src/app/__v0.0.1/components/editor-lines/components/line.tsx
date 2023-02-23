import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useEditableLinesManager } from '../contexts/editable-lines-manager';

import { clsx } from 'clsx';
import { makeContext } from 'src/app/contexts/makeContext';

import * as styles from './line.css';

type LineDisclosureContextValue = {
  register: () => void;
  lineNumber?: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const [LineDisclosureContext, useLineDisclosureContext] =
  makeContext<LineDisclosureContextValue>(
    '`useLineDisclosure` harus dipakai pada child provider `LineDisclosureContext`.'
  );

const [LineIdContext, useLineId] = makeContext<string>(
  '`useLineId` harus dipakai pada child provider `LineIdContext`.'
);

function useLineDisclosure() {
  const disclosure = useLineDisclosureContext();
  const { register } = disclosure;

  React.useEffect(() => {
    register();
  }, []);

  return disclosure;
}

function EditorLine({
  line,
  id = '',
  children,
}: React.PropsWithChildren<{ line: number; id?: string }>) {
  const {
    registerEditable,
    activateLine,
    shouldActivateLine,
    resetActiveLine,
  } = useEditableLinesManager();

  const disclosure = React.useMemo<LineDisclosureContextValue>(
    () => ({
      register: () => {
        if (typeof id === 'undefined') {
          return;
        }
        registerEditable(id);
      },
      lineNumber: line,
      isOpen: id ? shouldActivateLine(id) : false,
      open: () => id && activateLine(id),
      close: resetActiveLine,
    }),
    [
      id,
      line,
      registerEditable,
      shouldActivateLine,
      activateLine,
      resetActiveLine,
    ]
  );

  useHotkeys('esc', resetActiveLine, {
    enabled: disclosure.isOpen,
    enableOnFormTags: true,
  });

  return (
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
          activateLine(id);
        }}
      >
        <LineIdContext.Provider value={id}>
          <LineDisclosureContext.Provider value={disclosure}>
            {children}
          </LineDisclosureContext.Provider>
        </LineIdContext.Provider>
      </div>
    </div>
  );
}

function LineBreak() {
  return <span className={styles.textLinebreak}>---</span>;
}

export { EditorLine, useLineDisclosure, useLineId, LineBreak };
