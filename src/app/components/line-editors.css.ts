import { style } from '@vanilla-extract/css';

export const plainTextInput = style({
  margin: 0,
  padding: 0,
  border: 'none',
  fontFamily: 'inherit',

  ':focus': {
    outline: 'none',
  },
});

export const editorLabel = style({
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline',
  },
});
