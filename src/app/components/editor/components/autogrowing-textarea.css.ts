import { style } from '@vanilla-extract/css';

export const autogrowingWrapper = style({
  width: '100%',
  display: 'inline-grid',
});

export const autogrowingBase = style({
  visibility: 'hidden',
  whiteSpace: 'pre-wrap',
});

export const textarea = style({
  gridArea: '1 / 1 / 2 / 2',
  display: 'inline-block',
  width: '100%',
  minHeight: '100%',
  margin: 0,
  padding: 0,
  border: 'none',
  resize: 'none',
  overflow: 'hidden',
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
