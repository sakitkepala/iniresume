import { style } from '@vanilla-extract/css';

export const lineList = style({
  width: 600,
  fontSize: 13,
  fontFamily: "'Fira Code', monospace",
  cursor: 'text',
});

export const line = style({
  paddingBlock: 2,
  borderRadius: 2,
  display: 'flex',
  ':hover': {
    backgroundColor: '#e8ffdd',
  },
});

export const lineActive = style({
  backgroundColor: '#d7ffc3',
  ':hover': {
    backgroundColor: '#d7ffc3',
  },
});

export const lineNumber = style({
  userSelect: 'none',
  flexShrink: 0,
  paddingRight: '1rem',
  width: '3rem',
  textAlign: 'right',
  color: '#79cc50',
  cursor: 'default',
});

export const lineContent = style({
  flexGrow: 1,
  userSelect: 'text',
});
