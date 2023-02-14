import * as React from 'react';
import { pdfjs } from 'react-pdf';
import {
  ResumeEditorProvider,
  useResumeEditor,
} from '../contexts/resume-editor';

import { HeaderBar } from '../components/header-bar';
import { Editor } from '../components/editor';
import {
  PreviewPaper,
  type PreviewPaperProps,
} from '../components/preview-paper';

import * as styles from './editor.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function ScreenEditor() {
  const [fileUrl, setFileUrl] = React.useState<null | string>(null);
  return (
    <ResumeEditorProvider>
      <HeaderBar rich downloadUrl={fileUrl || undefined} />
      <div className={styles.mainContainer}>
        <main>
          <Editor />
        </main>
        <aside className={styles.previewPanel}>
          <PreviewPanel onFileUrlChange={setFileUrl} />
        </aside>
      </div>
    </ResumeEditorProvider>
  );
}

function PreviewPanel({
  onFileUrlChange,
}: {
  onFileUrlChange?: PreviewPaperProps['onFileUrlChange'];
}) {
  const { resume } = useResumeEditor();
  const [isPreviewOpen, setPreviewOpen] = React.useState<boolean>(false);
  const hasNameAndTitle = resume?.fullName && resume?.title;
  return (
    <div className={styles.previewWrapper}>
      {hasNameAndTitle && isPreviewOpen ? (
        <PreviewPaper
          key={JSON.stringify(resume)}
          onFileUrlChange={onFileUrlChange}
        />
      ) : (
        <div>
          <label htmlFor="language">
            <input type="checkbox" id="language" name="language" /> dalam bahasa
            Inggris
          </label>
          <div>
            <button
              disabled={!hasNameAndTitle}
              onClick={() => {
                if (!hasNameAndTitle) {
                  alert('Info resume masih kosong uy');
                  return;
                }
                setPreviewOpen(true);
              }}
            >
              generate PDF & lihat preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScreenEditor;
