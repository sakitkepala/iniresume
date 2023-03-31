import { style } from '@vanilla-extract/css';

export const scrollAreaScrollbar = style({
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: 2,
  backgroundColor: 'hsl(0 0% 0% / 0.114)',
  transition: 'background-color 160ms ease-out',

  ':hover': {
    backgroundColor: 'hsl(0 0% 0% / 0.220)',
  },

  selectors: {
    [`&[data-orientation='vertical']`]: {
      width: 10,
    },
    [`&[data-orientation='horizontal']`]: {
      flexDirection: 'column',
      height: 10,
    },
  },
});

export const scrollAreaThumb = style({
  position: 'relative',
  flex: 1,
  borderRadius: 10,
  backgroundColor: 'hsl(253 3.5% 53.5%)',
});
