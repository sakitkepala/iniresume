import { globalStyle, style } from '@vanilla-extract/css';

globalStyle(':root', {
  boxSizing: 'border-box',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'inherit',
  padding: 0,
  margin: 0,
});

globalStyle('html, body, #root', {
  height: '100%',
  minHeight: 0,
});

globalStyle('body', {
  fontFamily: "'DM Sans', sans-serif",
  backgroundColor: '#f9fff6',
  fontSize: 14,
});

globalStyle('#root', {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'auto minmax(0, 1fr)',
});

export const actionButton = style({
  display: 'inline-block',
  userSelect: 'none',
  minWidth: '6rem',
  padding: '0.375rem 0.875rem',
  border: '2px solid #000000',
  borderRadius: 4,
  backgroundColor: '#ffffff',
  color: '#000000',
  fontSize: 13,
  fontFamily: "'Fira Code', monospace",
  textDecoration: 'none',
  cursor: 'pointer',

  ':disabled': {
    borderColor: '#d9d9d9',
    color: '#d9d9d9',
    cursor: 'default',
  },
});

export const linkUnderline = style({
  textDecoration: 'none',
  boxShadow: 'inset 0 -3px rgba(97, 82, 185, 0.75)',
  transition: 'box-shadow 0.15s ease',
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
