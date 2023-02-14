import * as React from 'react';
import { type LineUI } from '../types';

export type TemporaryInsertLine = {
  index: number;
  line: LineUI;
};

export type TemporaryInsertLineContextValue = {
  tmpInsertLine: TemporaryInsertLine | null;
  insertLine: (insert: TemporaryInsertLine) => void;
  discardLine: () => void;
};

const TemporaryInsertLineContext =
  React.createContext<TemporaryInsertLineContextValue | null>(null);

function TemporaryInsertLineProvider({
  value,
  children,
}: React.PropsWithChildren<{ value: TemporaryInsertLineContextValue }>) {
  if (!children) {
    throw new Error(
      '`TmpInsertLineProvider` harus dirender sebagai elemen container untuk consumer `TmpInsertLineContext`.'
    );
  }
  return (
    <TemporaryInsertLineContext.Provider value={value}>
      {children}
    </TemporaryInsertLineContext.Provider>
  );
}

function useTemporaryInsertLine() {
  const value = React.useContext(TemporaryInsertLineContext);
  if (!value) {
    throw new Error(
      'Hook `useTmpInsertLine` harus dipakai di child `TmpInsertLineContext.Provider`.'
    );
  }
  return value;
}

export { TemporaryInsertLineProvider, useTemporaryInsertLine };
