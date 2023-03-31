import { style } from '@vanilla-extract/css';

export { triggerText } from './trigger-text.css';

export const phoneEditor = style({
  position: 'relative',
  flex: 1,
  display: 'flex',
});

export const phoneInputLabel = style({
  visibility: 'hidden',
  opacity: 0,
  position: 'absolute',
  top: -9999,
  left: -9999,
});

export const phoneInput = style({
  flex: 0,
  width: 96,
  padding: 0,
  margin: 0,
});

export const fieldWA = style({
  marginInline: '2rem',
  display: 'flex',
  gap: 4,
});

export const fieldWALabel = style({
  alignSelf: 'flex-end',
  userSelect: 'none',
});

export const inlineMessage = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  userSelect: 'none',
});
