import * as React from 'react';
import { pdfjs } from 'react-pdf';
import { ResumeEditorProvider } from '../contexts/resume-editor';

import { HeaderBar } from '../components/header-bar';
import { Editor } from '../components/editor';
import { PreviewPanel } from '../components/preview-panel/preview-panel';

import * as styles from './editor.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function ScreenEditor() {
  return (
    <ResumeEditorProvider>
      <HeaderBar rich />
      <div className={styles.mainContainer}>
        <main>
          <Editor />
        </main>
        <aside className={styles.asideContainer}>
          <PreviewPanel />
        </aside>
      </div>
    </ResumeEditorProvider>
  );
}

export default ScreenEditor;
