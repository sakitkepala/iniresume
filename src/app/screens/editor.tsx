import { motion } from 'framer-motion';
import { Editor } from '../components/editor';
import { PreviewPanel } from '../components/preview-panel';

import * as styles from './editor.css';

export function ScreenEditor() {
  return (
    <motion.div
      className={styles.layout}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <main>
        <Editor />
      </main>
      <aside className={styles.aside}>
        <PreviewPanel />
      </aside>
    </motion.div>
  );
}

export default ScreenEditor;
