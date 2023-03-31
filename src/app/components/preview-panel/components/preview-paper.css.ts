import { style } from '@vanilla-extract/css';

export const paper = style({
  position: 'relative',
  overflow: 'hidden',
  marginInline: 'auto',
  border: '1px solid #bdbdbd',
  borderRadius: 3,
  width: 595, // lebar A4
  height: 842, // panjang A4
  backgroundColor: '#ffffff',
});

export const rendering = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: '#ffffff',
});
