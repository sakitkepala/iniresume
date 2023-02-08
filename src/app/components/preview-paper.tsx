import { Document, Page } from 'react-pdf';
import * as styles from './preview-paper.css';

export type PreviewPaperProps = {
  file?: Blob | null;
};

// Implementasi viewer custom pakai react-pdf dari sini:
// https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js
// ...sama di sini, tapi ini lebih rumit, cek aja:
// https://github.com/jeetiss/react-pdf-repl/blob/main/components/viewer.js
function PreviewPaper({ file = null }: PreviewPaperProps) {
  return (
    <div className={styles.paper}>
      <Document file={file}>
        <Page
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
}

export { PreviewPaper };
