import { style } from '@vanilla-extract/css';

export const checkboxInput = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  userSelect: 'none',
});

export const checkbox = style({
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 24,
  height: 24,
  border: '2px solid #000000',
  borderRadius: 4,
  backgroundColor: '#ffffff',
});
export const checkboxChecked = style({
  backgroundColor: '#6beacf',
});

export const input = style({
  display: 'none',
});

export const label = style({
  cursor: 'pointer',
  fontWeight: 700,
});
