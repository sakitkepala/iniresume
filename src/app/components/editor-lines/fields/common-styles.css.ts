import { style } from '@vanilla-extract/css';

export const listItemWrapper = style({
  display: 'flex',
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

export const triggerText = style({
  display: 'inline-block',
  margin: 0,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  color: '#79cc50',
  fontSize: 11,
  ':hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
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

export const textDaterange = style({
  color: '#9445B0',
});

export const listItemSkillWrapper = style({});

export const skillInsertBelowWrapper = style({
  display: 'none',
  marginInline: '3rem',
  selectors: {
    [`${listItemSkillWrapper}:hover &`]: {
      display: 'inline-block',
    },
  },
});
