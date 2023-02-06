import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { pdfjs } from 'react-pdf';

import App from './app/app';

import './global-styles.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
