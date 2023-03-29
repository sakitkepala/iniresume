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
  position: 'absolute',
  top: 'auto',
  margin: -1,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  width: 1,
  height: 1,
  whiteSpace: 'nowrap',
});

export const label = style({
  cursor: 'pointer',
  fontWeight: 700,
});
