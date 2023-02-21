import * as React from 'react';
import { makeContext } from 'src/app/contexts/makeContext';

export type LineId = string;

export type EditableLinesManagerContextValue = {
  activeLine: LineId | null;
  registerEditable: (id: LineId) => void;
  activateLine: (id?: LineId) => void;
  shouldActivateLine: (id: LineId) => boolean;
  hasActiveLine: boolean;
  focusNext: () => void;
  resetActiveLine: () => void;
};

const [EditableLinesManagerContext, useEditableLinesManager] =
  makeContext<EditableLinesManagerContextValue>(
    'Hook `useEditableLinesManager` harus dipakai pada child `EditableLinesManager`.'
  );

function EditableLinesManager({ children }: React.PropsWithChildren) {
  const [activeLine, setActiveLine] = React.useState<LineId | null>(null);
  const registeredLineIds = React.useRef<Set<LineId>>(new Set());

  const value = React.useMemo<EditableLinesManagerContextValue>(
    () => ({
      activeLine,

      registerEditable(id) {
        const $lines = registeredLineIds.current;
        !$lines.has(id) && $lines.add(id);
      },

      hasActiveLine: Boolean(activeLine),

      activateLine(id) {
        if (!id) {
          setActiveLine(null);
          return;
        }
        const isRegistered = registeredLineIds.current.has(id);
        setActiveLine(isRegistered ? id : null);
      },

      shouldActivateLine(id) {
        return activeLine === id;
      },

      focusNext() {
        if (!activeLine) {
          return;
        }
        const lineIds = [...registeredLineIds.current.values()];
        const currentIndex = lineIds.findIndex(
          (lineId) => lineId === activeLine
        );
        const nextIndex = currentIndex + 1;
        if (nextIndex === lineIds.length) {
          setActiveLine(null);
          return;
        }
        setActiveLine(lineIds[nextIndex] || null);
      },

      resetActiveLine() {
        setActiveLine(null);
      },
    }),
    [activeLine]
  );

  return (
    <EditableLinesManagerContext.Provider value={value}>
      {children}
    </EditableLinesManagerContext.Provider>
  );
}

export { EditableLinesManager, useEditableLinesManager };
