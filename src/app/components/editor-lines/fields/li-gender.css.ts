import { style, keyframes } from '@vanilla-extract/css';

export const fieldOpen = style({
  flex: 1,
  display: 'flex',
  gap: 8,
});

export const option = style({
  cursor: 'pointer',
  color: '#79cc50',
  fontStyle: 'italic',
  textDecoration: 'underline',
  ':hover': {
    color: 'inherit',
  },
});

export const optionSelected = style({
  selectors: {
    [`${option}&`]: {
      color: 'inherit',
      fontStyle: 'normal',
      textDecoration: 'none',
    },

    [`${option}&:hover`]: {
      textDecoration: 'underline',
    },
  },
});

const caretBlinking = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 1 },
  '51%': { opacity: 0 },
  '100%': { opacity: 0 },
});

export const fakeCaretEmpty = style({
  position: 'relative',
  '::after': {
    content: "' '",
    position: 'absolute',
    insetBlock: 0,
    left: 0,
    width: 1,
    overflow: 'hidden',
    backgroundColor: '#000000',
    animation: `${caretBlinking} 1.5s infinite linear`,
  },
});

export const fakeCaret = style({
  position: 'relative',
  '::after': {
    content: "' '",
    position: 'absolute',
    insetBlock: 0,
    right: 0,
    width: 1,
    overflow: 'hidden',
    backgroundColor: '#000000',
    animation: `${caretBlinking} 1.5s infinite linear`,
  },
});
