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

export const resumeHoverable = style({
  position: 'relative',
  transition: 'color 0.2s ease-out',
  ':hover': {
    color: '#ffffff',
  },
  selectors: {
    '&::before': {
      content: 'attr(data-hoverable)',
      position: 'absolute',
      zIndex: -1,
      opacity: 0,
      color: '#762bd9',
      transition: 'all 0.15s',
    },
    '&:hover::before': {
      opacity: 1,
      transform: 'translate(5px, 4px)',
    },
    '&::after': {
      content: ' ',
      position: 'absolute',
      zIndex: -10,
      left: -4,
      right: -20,
      top: 16,
      bottom: 0,
      backgroundColor: '#FF7698',
      borderRadius: 3,
      transform: 'scaleY(15%)',
      transformOrigin: 'bottom',
      transition: 'transform 0.1s ease-out, color 0.35s ease-out',
    },
    '&:hover::after': {
      transform: 'scaleY(100%)',
    },
  },
});

export const sparklingEmoji = style({
  position: 'relative',
  display: 'inline-block',
  transition: 'all 0.3s 0.05s',
  '::after': {
    content: ' ',
    position: 'absolute',
    zIndex: -1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%)',
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: 'yellow',
    opacity: 0,
    transition: 'all 0.3s 0.05s',
  },
  selectors: {
    [`${resumeHoverable}:hover + &`]: {
      transform: 'translate(18px, -4px) scale(125%) rotate(15deg)',
      transformOrigin: 'center',
    },
    [`${resumeHoverable}:hover + &::after`]: {
      opacity: 1,
      boxShadow: '0 0 30px 10px yellow',
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

export const existingResumeMessage = style({
  marginTop: '1.5rem',
  marginBottom: '0.5rem',
});

export const linkEditExisting = style({
  position: 'relative',
  textDecoration: 'none',
  transition: 'box-shadow 0.15s ease',
  boxShadow: 'inset 0 -3px rgba(97, 82, 185, 0.75)',
  color: 'inherit',
  ':active': {
    color: 'inherit',
  },
  ':visited': {
    color: 'inherit',
  },
  ':hover': {
    boxShadow: 'inset 0 -1.5em rgba(97, 82, 185, 0.25)',
  },
});

export const promptOverlay = style({
  backgroundColor: 'rgba(97, 82, 185, 0.5)',
  position: 'fixed',
  inset: 0,
});

export const promptContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  width: '90vw',
  maxWidth: 500,
  maxHeight: '85vh',
  padding: 25,
  borderRadius: 4,
  boxShadow: '0 2px 4px rgb(0, 0, 0, 0.25)',
  backgroundColor: '#ffffff',
});

export const promptActions = style({
  marginTop: '1rem',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end',
});

export const promptActionPressable = style({
  position: 'relative',
  display: 'inline-block',
  '::after': {
    content: ' ',
    position: 'absolute',
    zIndex: -10,
    inset: 0,
    backgroundColor: '#000000',
    borderRadius: 4,
  },
});

export const promptActionButton = style({
  display: 'inline-flex',
  gap: '0.75rem',
  transition: 'transform 0.075s',
  ':hover': {
    transform: 'translate(-2px, -3px)',
  },
  ':active': {
    transform: 'translate(-1px, -1px)',
  },
});
