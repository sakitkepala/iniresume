import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { ResumeData, useResumeEditor } from '../contexts/resume-editor';
import { clsx } from 'clsx';

import * as editorStyles from './editor.css';
import * as styles from './line-editors.css';

const EditableLinesManager = React.createContext<{
  registerEditable: (line: number) => void;
  activateLine: (line: number) => void;
  shouldActivateLine: (line: number) => boolean;
  hasActiveLine: boolean;
  focusNext: () => void;
  resetActiveLine: () => void;
} | null>(null);

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
  const value = React.useContext(EditableLinesManager);
  if (!value) {
    throw new Error('Nggak child pak');
  }
  return value;
}

const ListItemEditorDisclosureContext = React.createContext<{
  isOpen: boolean;
  open: () => void;
  close: () => void;
} | null>(null);

const useListItemEditorDisclosure = () => {
  const value = React.useContext(ListItemEditorDisclosureContext);
  if (!value) {
    throw new Error('Nggak child pak');
  }
  return value;
};

export type ListItemLineWrapperProps = { line?: number };

function ListItemLineEditor({
  line,
  children,
}: React.PropsWithChildren<ListItemLineWrapperProps>) {
  const { registerEditable, activateLine, shouldActivateLine, focusNext } =
    useEditableLinesManager();
  const isOpen = shouldActivateLine?.(Number(line)) || false;
  const activeStyle = isOpen ? editorStyles.lineActive : undefined;

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

  const [mountSessionKey, setMountSessionKey] = React.useState(() =>
    new Date().getTime()
  );
  React.useEffect(() => {
    !isOpen && setMountSessionKey(new Date().getTime());
  }, [isOpen]);

  return (
    <div
      className={clsx(editorStyles.line, activeStyle)}
      onClick={(ev) => {
        ev.stopPropagation();
        activateLine?.(Number(line));
      }}
    >
      <div className={editorStyles.lineNumber}>
        {typeof line === 'undefined' ? '#' : line}
      </div>
      <div
        className={clsx(editorStyles.lineContent, styles.listItemEditorLine)}
      >
        <span>-</span>
        <span>&nbsp;</span>
        <ListItemEditorDisclosureContext.Provider value={disclosureContext}>
          <React.Fragment key={mountSessionKey}>{children}</React.Fragment>
        </ListItemEditorDisclosureContext.Provider>
      </div>
    </div>
  );
}

export type PlainTextLineEditorProps = {
  label: string;
  fieldName: keyof ResumeData;
};

function PlainTextLineEditor({ label, fieldName }: PlainTextLineEditorProps) {
  const { resume, updateTextField } = useResumeEditor();
  const { resetActiveLine } = useEditableLinesManager();
  const { isOpen, open, close } = useListItemEditorDisclosure();
  const $input = React.useRef<HTMLInputElement>(null);

  const data = resume?.[fieldName];
  const value = typeof data === 'string' ? data : '';

  const handleSave = () => {
    if (updateTextField && $input.current) {
      updateTextField(fieldName, $input.current.value || '');
    }
  };

  useHotkeys(
    'enter, tab',
    () => {
      if (close) {
        handleSave();
        close();
      }
    },
    {
      enabled: isOpen,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  useHotkeys('esc', () => resetActiveLine?.(), {
    enabled: isOpen,
    enableOnFormTags: true,
    preventDefault: true,
  });

  React.useEffect(() => {
    isOpen && $input.current?.focus();
  }, [isOpen]);

  if (isOpen) {
    return (
      <input
        ref={$input}
        type="text"
        className={styles.plainTextInput}
        placeholder={label}
        defaultValue={value}
        // onBlur={handleSave}
      />
    );
  }

  const labelStyle = value
    ? styles.editorValueLabel
    : styles.editorPlaceholderLabel;

  return (
    <span className={labelStyle} onClick={open}>
      {value || label}
    </span>
  );
}

export {
  EditableLinesManagerProvider,
  useEditableLinesManager,
  useListItemEditorDisclosure,
  ListItemLineEditor,
  PlainTextLineEditor,
};
