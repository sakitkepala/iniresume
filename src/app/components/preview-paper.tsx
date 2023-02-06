import { Document, Page } from 'react-pdf';
import * as styles from './preview-paper.css';

export type PreviewPaperProps = {
  file?: Blob | null;
};

// Implementasi viewer custom pakai react-pdf dari sini:
// https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js
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
