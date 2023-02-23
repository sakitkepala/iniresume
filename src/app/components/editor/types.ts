export type LineId = string;

export type LineContent = {
  id: LineId;
  content?: React.ReactNode;
  show?: boolean;
  activateable?: true;
};
