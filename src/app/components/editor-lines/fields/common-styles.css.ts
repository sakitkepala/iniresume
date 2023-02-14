import { style } from '@vanilla-extract/css';

export const listItemWrapper = style({
  display: 'flex',
});

export const editorPlaceholderLabel = style({
  color: '#79cc50',
  fontStyle: 'italic',
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const editorValueLabel = style({
  cursor: 'pointer',
  ':hover': {
    color: '#79cc50',
    textDecoration: 'underline',
  },
});

export const inputText = style({
  flex: 1,
  margin: 0,
  padding: 0,
  border: 'none',
  backgroundColor: 'inherit',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  fontWeight: 'inherit',

  '::placeholder': {
    fontStyle: 'italic',
    color: '#79cc50',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
  },

  ':focus': {
    outline: 'none',
  },
});

export const textHeading = style({
  color: '#117A80',
  fontWeight: 700,
});

export const textDaterange = style({
  color: '#9445B0',
});

export const textLinebreak = style({
  color: '#79cc50',
});
