import { HeaderBar } from '../components/header-bar';
import { Editor } from '../components/editor';
import { PreviewPanel } from '../components/preview-panel';

import * as styles from './editor.css';

export function ScreenEditor() {
  return (
    <>
      <HeaderBar rich />
      <div className={styles.layout}>
        <main>
          <Editor />
        </main>
        <aside className={styles.aside}>
          <PreviewPanel />
        </aside>
      </div>
    </>
  );
}

export default ScreenEditor;
