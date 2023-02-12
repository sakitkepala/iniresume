import * as React from 'react';
import { usePDF } from '@react-pdf/renderer';
import { useResumeEditor } from '../contexts/resume-editor';
import { ResumePDF } from './resume-pdf';
import { Document as ViewerDocument, Page as ViewerPage } from 'react-pdf';

import * as styles from './preview-paper.css';

// Implementasi viewer custom pakai react-pdf dari sini:
// https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js
// ...sama di sini, tapi ini lebih rumit, cek aja:
// https://github.com/jeetiss/react-pdf-repl/blob/main/components/viewer.js
function PreviewPaper({
  onFileUrlChange,
}: {
  onFileUrlChange?: (url: string) => void;
}) {
  const { resume } = useResumeEditor();
  const [instance] = usePDF({
    document: resume ? <ResumePDF data={resume} /> : <div />,
  });
  const [isRenderingPreview, setRenderingPreview] =
    React.useState<boolean>(true);

  React.useEffect(() => {
    instance.url && onFileUrlChange?.(instance.url);
  }, [onFileUrlChange, instance.url]);

  if (!instance.url || instance.loading) {
    return <div className={styles.paper}>Meng-generate PDF...</div>;
  }

  return (
    <div className={styles.paper}>
      <ViewerDocument key={instance.url} file={instance.url} loading="">
        <ViewerPage
          key={instance.url + 1}
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onRenderSuccess={() => setRenderingPreview(false)}
        />
      </ViewerDocument>
      {isRenderingPreview && (
        <div className={styles.rendering}>Menyiapkan preview...</div>
      )}
    </div>
  );
}

export { PreviewPaper };
