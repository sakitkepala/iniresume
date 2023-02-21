import * as React from 'react';

function makeContext<T>(
  typeErrorMessage = 'Hook context ini harus dipakai pada child provider.'
): [React.Context<T | null>, () => T] {
  const Context = React.createContext<T | null>(null);
  function useContextHook() {
    const value = React.useContext(Context);
    if (!value) {
      throw new Error(typeErrorMessage);
    }
    return value;
  }
  return [Context, useContextHook];
}

export { makeContext };
