import { style } from '@vanilla-extract/css';

export const editorScrollableRoot = style({
  overflow: 'hidden',
  width: '100%',
  height: '100%',
});

export const editorScrollableViewport = style({
  width: '100%',
  height: '100%',
});

export const lineListContainer = style({
  marginBlock: '4rem 25rem',
  marginInline: 'auto',
  width: 600,
});
