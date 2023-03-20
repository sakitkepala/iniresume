import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// `pdfjs` dari `react-pdf` & `@react-pdf/renderer` perlu di-mock:
// https://github.com/wojtekmaj/react-pdf/issues/564
jest.mock('react-pdf', () => ({
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: 'https://fake.url',
    },
  },
}));

beforeEach(() => {
  localStorage.clear();
});
