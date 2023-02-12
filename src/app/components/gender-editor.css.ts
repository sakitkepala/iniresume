import { style } from '@vanilla-extract/css';

export const openEditorWrapper = style({
  flex: 1,
  display: 'flex',
  gap: 8,
});

export const genderSelector = style({
  cursor: 'pointer',
  color: '#79cc50',
  textDecoration: 'underline',
  fontStyle: 'italic',
  ':hover': {
    color: 'inherit',
  },
});
