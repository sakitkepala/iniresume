import { style } from '@vanilla-extract/css';

export { triggerText } from './trigger-text.css';

export const wrapper = style({
  display: 'flex',
});

export const text = style({
  color: '#9445B0',
});

export const label = style({
  visibility: 'hidden',
  opacity: 0,
  position: 'absolute',
  top: -9999,
  left: -9999,
});

export const inputYear = style({
  width: '4ch',
  color: '#9445B0',
});

export const inputDate = style({
  width: '2ch',
  color: '#9445B0',
});

export const fieldOngoing = style({
  marginInline: '2rem',
  display: 'flex',
  gap: 4,
});

export const fieldOngoingLabel = style({
  alignSelf: 'flex-end',
  userSelect: 'none',
});
