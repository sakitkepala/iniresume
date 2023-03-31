import { style } from '@vanilla-extract/css';

export const lineList = style({
  fontSize: 13,
  fontFamily: "'Fira Code', monospace",
  cursor: 'text',
});

export const line = style({
  position: 'relative',
  zIndex: 0,
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

export const promptFocus = style({
  selectors: {
    [`${lineActive} &`]: {
      position: 'absolute',
      zIndex: 1,
      insetBlock: 0,
      insetInline: 3,
      pointerEvents: 'none',
      borderRadius: 2,
      outline: '3px solid #6152b9',
      transition: 'outline-color 0.5s',
    },
  },
});

export const promptMessage = style({
  maxWidth: 300,
  padding: '1rem',
  backgroundColor: '#6152b9',
  borderRadius: 4,
  boxShadow: '0 2px 4px rgb(0, 0, 0, 0.25)',
  color: '#f9fff6',
  ':focus': {
    outline: 'none',
  },
});

export const promptMessageKb = style({
  paddingInline: 6,
  borderRadius: 3,
  backgroundColor: 'rgb(255, 255, 255, 0.8)',
  boxShadow:
    '1px 1px 1px rgb(0, 0, 0, 0.1)' +
    ', inset 1px 1px rgb(255, 255, 255, 0.8)' +
    ', inset -1px -1px rgb(0, 0, 0, 0.25)',
  color: '#6152b9',
  whiteSpace: 'nowrap',
});

export const promptMessageArrow = style({
  fill: '#6152b9',
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
