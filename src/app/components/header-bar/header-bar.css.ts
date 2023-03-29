import { style } from '@vanilla-extract/css';

export { scrollableRoot, scrollableViewport } from '../../screens/welcome.css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #c3c3c3',
  backgroundColor: '#ffffff',
});

export const breadcrumb = style({
  userSelect: 'none',
  display: 'flex',
  alignItems: 'baseline',
  gap: '1rem',
  padding: '1rem 2rem',
});

export const breadcrumbFilenameItem = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '1rem',
  color: '#d9d9d9',
  fontWeight: 700,
});

export const logoLink = style({
  textDecoration: 'none',
  color: 'inherit',
  ':hover': { color: 'inherit' },
  ':visited': { color: 'inherit' },
});

export const headerAction = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  paddingInline: '2rem',
});

export const iconLink = style({
  textDecoration: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',

  display: 'inline-block',
  width: '1em',
  height: '1em',
  overflow: 'hidden',
  color: '#BDBDBD',
  fontSize: '1.75rem',

  transition: 'color 0.1s ease-in',

  ':hover': {
    color: '#BDBDBD',
  },
  ':visited': {
    color: '#BDBDBD',
  },
});

export const colorInfo = style({
  selectors: {
    '&:not(:disabled):hover': {
      color: '#6beacf',
    },
  },
});

export const colorGithub = style({
  ':hover': {
    color: '#000000',
  },
});

export const dialogOverlay = style({
  position: 'fixed',
  backgroundColor: 'rgba(97, 82, 185, 0.5)',
  inset: 0,
});

export const dialogContentContainer = style({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const dialogContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  width: 720,
  maxWidth: '90vw',
  height: '100%',
  maxHeight: '85vh',
  borderRadius: 4,
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgb(0, 0, 0, 0.25)',

  '@media': {
    'screen and (min-width: 720px)': {
      height: 'auto',
      maxHeight: '95vh',
    },
  },
});

export const dialogContentLayout = style({
  padding: 25,
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '1.5rem',

  '@media': {
    'screen and (min-width: 720px)': {
      flexDirection: 'row',
    },
  },
});

export const peep = style({
  alignSelf: 'center',
  '@media': {
    'screen and (min-width: 720px)': {
      alignSelf: 'flex-end',
    },
  },
});

export const peepIllustration = style({
  maxWidth: 240,
});

export const dialogContentCopywriting = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const ul = style({
  paddingLeft: '1.25rem',
});

export const dialogActions = style({
  padding: 25,
  // marginTop: '1rem',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
});

export const dialogActionPressable = style({
  position: 'relative',
  zIndex: 0,
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

export const dialogActionButton = style({
  display: 'inline-flex',
  gap: '0.75rem',
  transition: 'transform 0.075s',
  selectors: {
    '&:not(:disabled):hover': {
      transform: 'translate(-2px, -3px)',
    },
    '&:not(:disabled):active': {
      transform: 'translate(-1px, -1px)',
    },
  },
});
