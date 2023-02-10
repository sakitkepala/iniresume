import * as React from 'react';
import { pdfjs } from 'react-pdf';

import { HeaderBar } from '../components/header-bar';
import { Editor } from '../components/editor';
import { PreviewPaper } from '../components/preview-paper';

import * as styles from './editor.css';

import { type ResumeData, getInitialData } from '../data/resume';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function ScreenEditor() {
  const { resume } = useResumeEditor();
  const [downloadURL /* setDownloadURL */] = React.useState<string>();
  const [isPreviewOpen, setPreviewOpen] = React.useState<boolean>(false);
  const hasNameAndTitle = resume.fullName && resume.title;
  return (
    <>
      <HeaderBar
        user={
          hasNameAndTitle
            ? undefined
            : { fullName: resume.fullName, title: resume.title }
        }
        downloadUrl={downloadURL}
      />
      <div className={styles.mainContainer}>
        <main>
          <Editor data={resume} />
        </main>

        <aside className={styles.previewPanel}>
          <div className={styles.previewWrapper}>
            {hasNameAndTitle && isPreviewOpen ? (
              <PreviewPaper data={resume} />
            ) : (
              <div>
                <label htmlFor="language">
                  <input type="checkbox" id="language" name="language" /> dalam
                  bahasa Inggris
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
                    lihat preview
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

type ResumeEditorActionType = {
  type: 'UPDATE_FIELD';
  field: string;
  payload: string;
};

function useResumeEditor() {
  const [resume, dispatch] = React.useReducer(
    (state: ResumeData, action: ResumeEditorActionType) => {
      if (action.type === 'UPDATE_FIELD') {
        return { ...state, [action.field]: action.payload };
      }
      return state;
    },
    getInitialData()
  );

  const updateField = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, payload: value });
  };

  return {
    resume,
    updateField,
  };
}

export default ScreenEditor;
