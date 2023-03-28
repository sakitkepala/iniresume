import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #c3c3c3',
  backgroundColor: '#ffffff',
});

export const breadcrumb = style({
  userSelect: 'none',
  display: 'flex',
  alignItems: 'baseline',
  gap: '1rem',
  padding: '1rem 2rem',
  fontWeight: 700,
});

export const breadcrumbFilenameItem = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '1rem',
  color: '#d9d9d9',
});

export const logoType = style({
  fontSize: '1.125rem',
  color: '#6152b9',
});

export const logoLink = style({
  textDecoration: 'none',
  color: 'inherit',
  ':hover': { color: 'inherit' },
  ':visited': { color: 'inherit' },
});

export const headerAction = style({
  paddingInline: '2rem',
});
