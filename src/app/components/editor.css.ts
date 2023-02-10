import { style } from '@vanilla-extract/css';

export const editorContainer = style({
  position: 'relative',
  zIndex: 1,
});

export const editorScrollableRoot = style({
  overflow: 'hidden',
  width: '100%',
  height: '100%',
});

export const editorScrollableViewport = style({
  width: '100%',
  height: '100%',
});

export const codeLinesContainer = style({
  marginBlock: '4rem 5rem',
  marginInline: 'auto',
  width: 600,
});

export const codeLinesOutsideAreaClickTrigger = style({
  position: 'fixed',
  inset: 0,
});

export const codeLinesArea = style({
  position: 'relative',
  fontSize: 13,
  fontFamily: "'Fira Code', monospace",
  cursor: 'text',
});

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

export const textHeading = style({
  color: '#0820B2',
  fontWeight: 700,
});

export const textSubheading = style({
  color: '#117A80',
  fontWeight: 700,
});

export const textDaterange = style({
  color: '#9445B0',
});

export const textLinebreak = style({
  color: '#79cc50',
});
