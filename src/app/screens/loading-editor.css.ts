import { style } from '@vanilla-extract/css';

export const layout = style({
  overflow: 'hidden',
  height: '100%',
  width: '100%',
  padding: '4rem',
  marginInline: 'auto',

  '@media': {
    'screen and (min-width: 720px)': {
      width: 720,
    },

    'screen and (min-width: 1224px)': {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'minmax(0, 1fr)',
    },

    'screen and (min-width: 1440px)': {
      maxWidth: 1440,
    },
  },
});

export const setupContainer = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const setupSkeleton = style({
  width: '37.5rem',
  padding: 1,
});

export const floatingPeep = style({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
