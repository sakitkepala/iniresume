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
  marginBlock: '1rem 2rem',
  marginInline: 'auto',
  width: '100%',

  '@media': {
    'screen and (min-width: 1224px)': {
      marginBlock: '3rem 25rem',
    },
  },
});
