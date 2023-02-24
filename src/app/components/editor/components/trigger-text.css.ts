import { style } from '@vanilla-extract/css';

export const triggerText = style({
  userSelect: 'none',
  display: 'inline-block',
  margin: 0,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  color: '#79cc50',
  fontSize: 11,
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  letterSpacing: -0.75,
  whiteSpace: 'nowrap',
  ':hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});
