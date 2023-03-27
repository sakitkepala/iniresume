import { style } from '@vanilla-extract/css';

export const previewContainer = style({
  marginInline: 'auto',
  padding: '4rem 1rem 2rem',
  minWidth: 595,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const setupPanel = style({
  width: '37.5rem',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #c3c3c3',
  borderRadius: 5,
  boxShadow: '1px 1px 1px rgb(0, 0, 0, 0.25)',
  backgroundColor: '#F2F2F2',
});

export const setupPanelSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem 1.5rem',
});

export const setupPanelFooter = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '1rem 1.5rem',
  backgroundColor: '#ffffff',
});

export const fileViewer = style({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',

  height: '100%',
  border: '1px solid #c3c3c3',
  borderRadius: 5,
  boxShadow: '1px 1px 1px rgb(0, 0, 0, 0.25)',
  backgroundColor: '#F2F2F2',
});

export const viewerScrollableRoot = style({
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  backgroundColor: '#F2F2F2',
  border: '1px solid #F2F2F2',
});

export const viewerScrollableViewport = style({
  padding: '2rem 2rem 1rem',
  width: '100%',
  height: '100%',
});

export const viewerFooter = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '1rem 1.5rem',
  backgroundColor: '#ffffff',
});

export const buttonGroup = style({
  display: 'flex',
  gap: '0.5rem',
});

export const textButton = style({
  userSelect: 'none',
  minWidth: '6rem',
  padding: '0.375rem 0.875rem',
  border: '2px solid #ffffff',
  borderRadius: 4,
  backgroundColor: '#ffffff',
  color: '#000000',
  fontSize: 13,
  fontFamily: "'Fira Code', monospace",
  textDecoration: 'none',
  cursor: 'pointer',

  ':disabled': {
    color: '#d9d9d9',
    cursor: 'default',
  },
});
