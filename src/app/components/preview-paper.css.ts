import { style } from '@vanilla-extract/css';

export const paper = style({
  overflow: 'hidden',
  border: '1px solid #bdbdbd',
  borderRadius: 3,
  width: 595, // lebar A4
  height: 842, // panjang A4
  backgroundColor: '#ffffff',
});
