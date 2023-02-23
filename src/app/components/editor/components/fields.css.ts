import { style } from '@vanilla-extract/css';

export const staticDisplay = style({
  color: '#79cc50',
});

export const fieldEmptyLabel = style({
  color: '#79cc50',
  fontStyle: 'italic',
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const fieldValueLabel = style({
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