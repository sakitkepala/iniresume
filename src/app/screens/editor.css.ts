import { style } from '@vanilla-extract/css';

export const mainContainer = style({
  overflow: 'hidden',
  height: '100%',
  marginInline: '2rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
});

export const previewPanel = style({
  flexShrink: 0,
});

export const previewWrapper = style({
  marginTop: '4rem',
  marginInline: 'auto',
  paddingInline: '1rem',
  minWidth: 595,
});
