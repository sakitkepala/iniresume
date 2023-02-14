import { style } from '@vanilla-extract/css';

export const line = style({
  paddingBlock: 2,
  display: 'flex',
  ':hover': {
    borderRadius: 2,
    backgroundColor: '#e8ffdd',
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
