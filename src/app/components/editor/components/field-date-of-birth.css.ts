import { style } from '@vanilla-extract/css';

export const inputWrapper = style({
  flex: 1,
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

export const label = style({
  visibility: 'hidden',
  opacity: 0,
  position: 'absolute',
  top: -9999,
  left: -9999,
});
