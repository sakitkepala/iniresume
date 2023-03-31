import * as React from 'react';

function makeContext<T>({
  hookName,
  hookUsageErrorMessage,
}: {
  hookName: string;
  hookUsageErrorMessage: string;
}): [React.Context<T | null>, () => T] {
  const Context = React.createContext<T | null>(null);

  // Nama hook dinamis terinspirasi dari sini:
  // https://dev.to/tmikeschu/dynamically-assigning-a-function-name-in-javascript-2d70
  const { [hookName]: useContext } = {
    [hookName]: function () {
      const value = React.useContext(Context);
      if (!value) {
        throw new Error(hookUsageErrorMessage);
      }
      return value;
    },
  };

  return [Context, useContext];
}

export { makeContext };
