import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  page: {
    paddingVertical: '1.25cm',
    paddingHorizontal: '1.125cm',
    fontFamily: 'DM Sans',
    fontSize: 9,
  },

  header: {
    marginBottom: '0.875cm',
  },

  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
  },

  contentBlock: {
    marginBottom: 8,
  },

  columns: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5cm',
  },
  colLeft: { flex: 1 },
  colRight: { width: '37.5%' },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },

  sectionHeading: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textHeading: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  textSubheading: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  textDaterange: {
    fontSize: 8,
  },
  textLinebreak: {
    color: '#79cc50',
  },
});
