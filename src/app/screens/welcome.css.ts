import { style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '5rem',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  width: 900,
});

export const main = style({
  overflow: 'hidden',
  height: '100%',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '1rem',
  fontSize: '1rem',
});

export const illustrationImage = style({
  minWidth: 300,
});

export const headline = style({
  maxWidth: 900,
  fontSize: '3.5rem',
  color: '#762bd9',
  fontWeight: 400,
  fontFamily: "'Dela Gothic One', cursive",
  lineHeight: '1.375',
});

export const hoverable = style({
  position: 'relative',
  cursor: 'default',
  selectors: {
    '&::after': {
      content: ' ',
      position: 'absolute',
      zIndex: -1,
      insetInline: 10,
      top: 16,
      bottom: -2,
      backgroundColor: '#FF7698',
      borderRadius: 2,
      transform: 'scaleY(15%)',
      transformOrigin: 'bottom',
      transition: 'transform 0.1s ease-out',
    },
    '&:hover::after': {
      transform: 'scaleY(100%)',
    },
  },
});

export const content = style({
  marginTop: '4rem',
  maxWidth: '35ch',
});

export const contentHeading = style({
  letterSpacing: -0.75,
});

export const pressable = style({
  marginTop: '1.5rem',
  position: 'relative',
  display: 'inline-block',
  transition: 'box-shadow 0.3s',
  ':hover': {
    boxShadow: '0 0 30px #ffcc4d',
  },
  '::after': {
    content: ' ',
    position: 'absolute',
    zIndex: -10,
    inset: 0,
    backgroundColor: '#000000',
    borderRadius: 4,
  },
});

export const createButton = style({
  display: 'inline-flex',
  gap: '0.75rem',
  padding: '0.5rem 1rem',
  fontSize: 14,
  transition: 'transform 0.075s',
  ':hover': {
    transform: 'translate(-2px, -3px)',
  },
  ':active': {
    transform: 'translate(-1px, -1px)',
  },
});
