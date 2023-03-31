export type LineId = string;

export type LineContent = {
  id: LineId;
  content?: React.ReactNode;
  show?: boolean;
  activateable?: boolean;
};

export enum GroupTypeNames {
  EXPERIENCE = 'EXPERIENCE',
  EDUCATION = 'EDUCATION',
  PROJECT = 'PROJECT',
  OTHER_PROJECTS = 'OTHER_PROJECTS',
}

export type OpenGroup = {
  type: GroupTypeNames;
  id?: string;
};

export type BuildConfigState = {
  activeLine: LineId | null;
  activeGroup: OpenGroup | null;
  nextCreateId: string;
  insertSkillTop: boolean;
  insertSkillBelow: string | null;
  hotkeyPrevented: boolean;
};
