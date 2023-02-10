import * as React from 'react';
import { usePDF } from '@react-pdf/renderer';
import { Document as ViewerDocument, Page as ViewerPage } from 'react-pdf';
import { ResumePDF } from '../components/resume-pdf';
import { type ResumeData } from '../data/resume';
import * as styles from './preview-paper.css';

export type PreviewPaperProps = {
  data: ResumeData;
  file?: Blob | null;
};

// Implementasi viewer custom pakai react-pdf dari sini:
// https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js
// ...sama di sini, tapi ini lebih rumit, cek aja:
// https://github.com/jeetiss/react-pdf-repl/blob/main/components/viewer.js
function PreviewPaper({ data }: PreviewPaperProps) {
  const [instance] = usePDF({ document: <ResumePDF data={data} /> });
  const [isRendering, setRendering] = React.useState<boolean>(true);
  if (!instance.blob || instance.loading) {
    return <div className={styles.paper}>sek tunggu...</div>;
  }
  return (
    <div className={styles.paper}>
      <ViewerDocument file={instance.blob} loading="">
        <ViewerPage
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onRenderSuccess={() => setRendering(false)}
        />
      </ViewerDocument>
      {isRendering && (
        <div className={styles.rendering}>Merender preview...</div>
      )}
    </div>
  );
}

export { PreviewPaper };
