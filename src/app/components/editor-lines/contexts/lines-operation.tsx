import * as React from 'react';
import { makeContext } from 'src/app/contexts/makeContext';
import { type LineContent } from '../types';

export type LinesOperationDispatcher = (
  callback: (lines: LineContent[]) => LineContent[]
) => void;

export type LinesOperationContextValue = {
  operation: LinesOperationDispatcher;
};

const [LinesOperationContext, useLinesOperation] =
  makeContext<LinesOperationContextValue>(
    'Hook `useLinesOperation` harus dipakai pada child `LinesOperationProvider`.'
  );

function LinesOperationProvider({
  operations: { operation: dispatch },
  children,
}: React.PropsWithChildren<{
  operations: {
    operation: React.Dispatch<React.SetStateAction<LineContent[]>>;
  };
}>) {
  const operation = React.useCallback<LinesOperationDispatcher>(
    (operationCallback) => {
      dispatch((state) => operationCallback([...state]));
    },
    [dispatch]
  );
  const value = { operation };
  return (
    <LinesOperationContext.Provider value={value}>
      {children}
    </LinesOperationContext.Provider>
  );
}

export { LinesOperationProvider, useLinesOperation };
