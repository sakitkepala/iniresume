import * as React from 'react';
import * as editorStyles from './editor.css';
import * as styles from './line-editors.css';

import { useHotkeys } from 'react-hotkeys-hook';

const EditableLinesManager = React.createContext<{
  registerEditable?: (line: number) => void;
  activateLine?: (line: number) => void;
  shouldActivateLine?: (line: number) => boolean;
  hasActiveLine: boolean;
  focusNext?: () => void;
  resetActiveLine?: () => void;
}>({ hasActiveLine: false });

function EditableLinesManagerProvider({ children }: React.PropsWithChildren) {
  const $registeredLineDOMs = React.useRef<Set<number>>(new Set());

  const [activeEditableLine, setActiveEditableLine] = React.useState<
    number | null
  >(null);

  const value = React.useMemo(
    () => ({
      registerEditable(line: number) {
        $registeredLineDOMs.current.add(line);
      },
      activateLine(line: number) {
        const shouldActivate = $registeredLineDOMs.current.has(line);
        setActiveEditableLine(shouldActivate ? line : null);
      },
      shouldActivateLine(line: number) {
        return activeEditableLine === line;
      },
      hasActiveLine: Boolean(activeEditableLine),
      focusNext() {
        if (!activeEditableLine) {
          return;
        }
        const doms = [...$registeredLineDOMs.current.entries()];
        const currentIndex = doms.findIndex(
          (dom) => dom[0] === activeEditableLine
        );
        const nextIndex = currentIndex + 1;
        if (nextIndex === doms.length) {
          setActiveEditableLine(null);
          return;
        }
        setActiveEditableLine(doms[nextIndex]?.[0]);
      },
      resetActiveLine() {
        setActiveEditableLine(null);
      },
    }),
    [activeEditableLine]
  );
  return (
    <EditableLinesManager.Provider value={value}>
      {children}
    </EditableLinesManager.Provider>
  );
}

function useEditableLinesManager() {
  return React.useContext(EditableLinesManager);
}

const ListItemEditorDisclosureContext = React.createContext<{
  isOpen: boolean;
  open?: () => void;
  close?: () => void;
}>({ isOpen: false, open: undefined });

const useListItemEditorDisclosure = () => {
  return React.useContext(ListItemEditorDisclosureContext);
};

export type ListItemLineWrapperProps = { line?: number };

function ListItemLineEditor({
  line,
  children,
}: React.PropsWithChildren<ListItemLineWrapperProps>) {
  const { registerEditable, activateLine, shouldActivateLine, focusNext } =
    useEditableLinesManager();
  const isOpen = shouldActivateLine?.(Number(line)) || false;

  const disclosureContext = React.useMemo(
    () => ({
      isOpen,
      open: () => activateLine?.(Number(line)),
      close: () => focusNext?.(),
    }),
    [isOpen, activateLine, line, focusNext]
  );

  React.useEffect(
    () => registerEditable?.(Number(line)),
    [registerEditable, line]
  );

  return (
    <div
      className={editorStyles.line}
      onClick={(ev) => {
        ev.stopPropagation();
        activateLine?.(Number(line));
      }}
    >
      <div className={editorStyles.lineNumber}>
        {typeof line === 'undefined' ? '#' : line}
      </div>
      <div className={editorStyles.lineContent}>
        <span>-</span>
        <span>&nbsp;</span>
        <span>
          <ListItemEditorDisclosureContext.Provider value={disclosureContext}>
            {children}
          </ListItemEditorDisclosureContext.Provider>
        </span>
      </div>
    </div>
  );
}

export type PlainTextLineEditorProps = {
  label: string;
  fieldName: string;
};

function PlainTextLineEditor({ label, fieldName }: PlainTextLineEditorProps) {
  const { isOpen, open, close } = useListItemEditorDisclosure();
  const $input = React.useRef<HTMLInputElement>(null);

  useHotkeys<HTMLDivElement>('enter, tab', () => close?.(), {
    enabled: isOpen,
    enableOnFormTags: true,
    preventDefault: true,
  });

  // TODO: ambil data & update function dari context data resume
  const fakeData: { [field: string]: string } = {
    fullName: 'Hai',
    title: '',
  };
  const value = fakeData[fieldName];

  React.useEffect(() => {
    isOpen && $input.current?.focus();
  }, [isOpen]);

  if (isOpen) {
    return (
      <input
        ref={$input}
        type="text"
        className={styles.plainTextInput}
        placeholder="coba aja sih..."
        defaultValue={value}
      />
    );
  }

  return (
    <span className={styles.editorLabel} onClick={open}>
      {value || label}
    </span>
  );
}

export {
  EditableLinesManagerProvider,
  useEditableLinesManager,
  ListItemLineEditor,
  PlainTextLineEditor,
};
