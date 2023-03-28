import { style } from '@vanilla-extract/css';

export { scrollableRoot, scrollableViewport } from '../screens/welcome.css';

export const layout = style({
  overflow: 'hidden',
  height: '100%',
  width: '100%',
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

export const aside = style({
  flexShrink: 0,
});
