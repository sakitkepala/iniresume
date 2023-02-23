import { style } from '@vanilla-extract/css';

export const phoneEditorWrapper = style({
  position: 'relative',
  flex: 1,
  display: 'flex',
});

export const phoneInput = style({
  flex: 0,
  width: 96,
  padding: 0,
  margin: 0,
});

export const waField = style({
  marginInline: '2rem',
  display: 'flex',
  gap: 4,
});

export const waFieldLabel = style({
  alignSelf: 'flex-end',
  userSelect: 'none',
});

export const inlineMessage = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  userSelect: 'none',
});
