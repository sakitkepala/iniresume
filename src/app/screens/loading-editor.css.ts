import { style } from '@vanilla-extract/css';

export const layout = style({
  overflow: 'hidden',
  height: '100%',
  width: '100%',
  paddingTop: '1rem',
  marginInline: 'auto',

  '@media': {
    'screen and (min-width: 720px)': {
      width: 720,
    },

    'screen and (min-width: 1224px)': {
      paddingTop: '3rem',
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
  display: 'none',

  '@media': {
    'screen and (min-width: 1224px)': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
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

export const peepImg = style({
  maxWidth: '100%',
});
