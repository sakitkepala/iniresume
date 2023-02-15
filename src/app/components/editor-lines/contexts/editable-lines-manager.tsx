import * as React from 'react';

export type EditableLinesManagerContextValue = {
  registerEditable: (line: number) => void;
  activateLine: (line: number) => void;
  shouldActivateLine: (line: number) => boolean;
  hasActiveLine: boolean;
  focusNext: () => void;
  resetActiveLine: () => void;
};

const EditableLinesManager =
  React.createContext<EditableLinesManagerContextValue | null>(null);

function EditableLinesManagerProvider({ children }: React.PropsWithChildren) {
  const [activeLine, setActiveLine] = React.useState<number | null>(null);
  const $registeredLineDOMs = React.useRef<Set<number>>(new Set());

  const value = React.useMemo(
    () => ({
      registerEditable(line: number) {
        const $lines = $registeredLineDOMs.current;
        !$lines.has(line) && $lines.add(line);
      },

      hasActiveLine: Boolean(activeLine),

      activateLine(line: number) {
        const isRegistered = $registeredLineDOMs.current.has(line);
        setActiveLine(isRegistered ? line : null);
      },

      shouldActivateLine(line: number) {
        return activeLine === line;
      },

      focusNext() {
        if (!activeLine) {
          return;
        }
        const $doms = [...$registeredLineDOMs.current.entries()];
        const currentIndex = $doms.findIndex((dom) => dom[0] === activeLine);
        const nextIndex = currentIndex + 1;
        if (nextIndex === $doms.length) {
          setActiveLine(null);
          return;
        }
        setActiveLine($doms[nextIndex]?.[0]);
      },

      resetActiveLine() {
        setActiveLine(null);
      },
    }),
    [activeLine]
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
    throw new Error(
      'Hook `useEditableLinesManager` harus dipakai pada child `EditableLinesManagerProvider`.'
    );
  }
  return value;
}

export { EditableLinesManagerProvider, useEditableLinesManager };
