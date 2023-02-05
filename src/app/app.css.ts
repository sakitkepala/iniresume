import { style, globalStyle } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #c3c3c3',
  backgroundColor: '#ffffff',
});

export const breadcrumb = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '1rem',
  padding: '1rem 2rem',
  color: '#d9d9d9',
  fontWeight: 700,
});

export const logoType = style({
  fontSize: '1.125rem',
  color: '#6152b9',
});

export const headerAction = style({
  paddingInline: '2rem',
});

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

export const welcome = style({
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const mainContainer = style({
  overflow: 'hidden',
  height: '100%',
  marginInline: '2rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
});

export const editorContainer = style({
  paddingTop: '4rem',
  paddingBottom: '5rem',
});

export const previewPanel = style({
  flexShrink: 0,
});

export const editor = style({
  marginInline: 'auto',
  width: 600,
  fontSize: 13,
  fontFamily: "'Fira Code', monospace",
  cursor: 'text',
});

export const line = style({
  display: 'flex',
});

export const lineNumber = style({
  flexShrink: 0,
  paddingRight: '1rem',
  width: '3rem',
  textAlign: 'right',
  color: '#79cc50',
  cursor: 'default',
});

export const lineContent = style({
  flexGrow: 1,
  userSelect: 'text',
});

globalStyle(`${editor} > * + *`, {
  marginTop: 4,
});

export const textHeading = style({
  color: '#0820B2',
  fontWeight: 700,
});

export const textSubheading = style({
  color: '#117A80',
  fontWeight: 700,
});

export const textDaterange = style({
  color: '#9445B0',
});

export const textLinebreak = style({
  color: '#79cc50',
});

export const previewWrapper = style({
  marginTop: '4rem',
  marginInline: 'auto',
});

export const paper = style({
  overflow: 'hidden',
  border: '1px solid #bdbdbd',
  borderRadius: 3,
  width: 595, // lebar A4
  height: 842, // panjang A4
  backgroundColor: '#ffffff',
});
