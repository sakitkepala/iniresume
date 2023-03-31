import { makeContext } from 'src/app/contexts/make-context';
import { type LineId } from '../types';

const [ActiveLineContext, useActiveLine] = makeContext<{
  lineId: string;
  lineNumber: number;
  isActive: boolean;
  activate: (lineId?: LineId) => void;
  reset: () => void;
  activateAfterReset: (lineId: LineId) => void;
  next: () => void;
  previous: () => void;
  shouldPromptDirty: (should?: boolean) => void;
}>({
  hookName: 'useActiveLine',
  hookUsageErrorMessage:
    'Hook `useActiveLine` ini harus dipakai pada provider `ActiveLineContext`' +
    ' dan pada line content dengan `activateable=true`.',
});

export { ActiveLineContext, useActiveLine };
