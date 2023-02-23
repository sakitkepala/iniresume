import { style } from '@vanilla-extract/css';

export const dateFieldsWrapper = style({
  display: 'flex',
  gap: 4,
});

export const inputField = style({
  flexShrink: 1,
  padding: 0,
  margin: 0,
  width: 16,
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

  selectors: {
    [`&#year`]: {
      width: 32,
    },
  },
});
