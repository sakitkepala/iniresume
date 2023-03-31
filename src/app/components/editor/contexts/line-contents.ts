import { makeContext } from 'src/app/contexts/make-context';
import { type LineId } from '../types';

const [LineContentsContext, useLineContents] = makeContext<{
  activeLine: LineId | null;
  activeGroup: string | null;
  nextCreateId: string;
  openExperience: () => void;
  openProject: (experienceId: string) => void;
  openEducation: () => void;
  openOtherProject: () => void;
  insertSkillOnTop: (shouldOpen?: boolean) => void;
  insertSkillBelow: (insertBelow: string) => void;
  preventHotkey: () => void;
}>({
  hookName: 'useLineContents',
  hookUsageErrorMessage:
    'Hook `useLineContents` harus dipakai pada Provider `LineContentsContext`.',
});

export { LineContentsContext, useLineContents };
