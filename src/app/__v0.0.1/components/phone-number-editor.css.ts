import { style } from '@vanilla-extract/css';

export const phoneEditorWrapper = style({
  flexGrow: 1,
  display: 'flex',
  gap: 4,
});

export const inputField = style({
  width: 96,
  padding: 0,
  margin: 0,
  border: 'none',
  outline: 'none',
  backgroundColor: 'inherit',
  color: 'inherit',
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
});

export const staticEditorUIText = style({
  color: '#79cc50',
});

export const staticDisplayUIText = style({
  color: '#79cc50',
  fontStyle: 'italic',
});

export const waOptionLabel = style({
  alignSelf: 'flex-end',
  color: '#79cc50',
  fontSize: 11,
  ':hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});
