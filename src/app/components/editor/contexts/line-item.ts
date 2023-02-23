import { makeContext } from 'src/app/contexts/makeContext';
import { type LineId } from '../types';

const [LineItemContext, useLineItem] = makeContext<{
  lineId: LineId;
  lineNumber: number;
  isActive: boolean;
}>('`useLineItem` ini harus dipakai pada provider `LineItemContext`.');

export { LineItemContext, useLineItem };
