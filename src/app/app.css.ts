import { style } from '@vanilla-extract/css';

export const actionButton = style({
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
