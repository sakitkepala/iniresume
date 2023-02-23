import { makeContext } from 'src/app/contexts/makeContext';
import { type LineId } from '../types';

const [LineContentsContext, useLineContents] = makeContext<{
  activeLine: LineId | null;
  activeGroup: string | null;
  nextCreateId: string;
  openExperience: () => void;
  openEducation: () => void;
}>('`useLineContents` ini harus dipakai pada provider `LineContentsContext`.');

export { LineContentsContext, useLineContents };
