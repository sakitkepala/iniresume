import { style } from '@vanilla-extract/css';

export const autogrowingWrapper = style({
  display: 'inline-grid',
});

export const autogrowingBase = style({
  visibility: 'hidden',
  whiteSpace: 'pre-wrap',
});

export const input = style({
  display: 'inline-block',
  flex: 'unset',
  gridArea: '1 / 1 / 2 / 2',
});
