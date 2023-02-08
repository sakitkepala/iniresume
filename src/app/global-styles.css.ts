import { globalStyle } from '@vanilla-extract/css';

globalStyle(':root', { boxSizing: 'border-box' });

globalStyle('*, *::before, *::after', {
  boxSizing: 'inherit',
  padding: 0,
  margin: 0,
});

globalStyle('html, body, #root', {
  height: '100%',
  minHeight: 0,
});

globalStyle('body', {
  fontFamily: "'DM Sans', sans-serif",
  backgroundColor: '#f9fff6',
  fontSize: 14,
});

globalStyle('#root', {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'auto minmax(0, 1fr)',
});
