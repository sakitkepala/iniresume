import { style } from '@vanilla-extract/css';

export const wrapper = style({
  flex: 1,
});

export const headingWrapper = style({
  display: 'flex',
});

export const textareaAutogrowingWrapper = style({
  display: 'grid',
});

export const textarea = style({
  gridArea: '1 / 1 / 2 / 2',
  display: 'block',
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

export const textareaAutogrowingBase = style({
  visibility: 'hidden',
  whiteSpace: 'pre-wrap',
});
