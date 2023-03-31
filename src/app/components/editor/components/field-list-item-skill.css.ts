import { style } from '@vanilla-extract/css';

export const skillItem = style({});

export const actions = style({
  display: 'none',
  marginLeft: '3rem',
  selectors: {
    [`${skillItem}:hover &`]: {
      display: 'inline-flex',
      gap: '2ch',
    },
  },
});
