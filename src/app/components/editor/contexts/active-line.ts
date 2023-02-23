import { makeContext } from 'src/app/contexts/makeContext';
import { type LineId } from '../types';

const [ActiveLineContext, useActiveLine] = makeContext<{
  isActive: boolean;
  activate: (lineId?: LineId) => void;
  activateAfterReset: (lineId: LineId) => void;
  next: () => void; // ini kenapa perlu di register list id-nya...
  previous: () => void; // ...supaya bisa diurutkan & di-switch ke next/prev
}>('`useActiveLine` ini harus dipakai pada provider `ActiveLineContext`.');

export { ActiveLineContext, useActiveLine };
