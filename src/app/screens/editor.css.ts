import { style } from '@vanilla-extract/css';

export const mainContainer = style({
  overflow: 'hidden',
  height: '100%',
  marginInline: '2rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
});

export const asideContainer = style({
  flexShrink: 0,
});
