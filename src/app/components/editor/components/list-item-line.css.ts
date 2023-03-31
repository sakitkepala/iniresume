import { style } from '@vanilla-extract/css';

export { staticDisplay } from './fields.css';

export const listItemWrapper = style({
  display: 'flex',
});

export const listItemContent = style({
  flexGrow: 1,
});
