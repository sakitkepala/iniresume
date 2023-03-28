import * as React from 'react';
import { motion } from 'framer-motion';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Editor } from '../components/editor';
import { PreviewPanel } from '../components/preview-panel';
import { Scrollbar } from '../components/scrollbar';

import * as styles from './editor.css';

export function ScreenEditor() {
  const isBigScreen = useMediaQuery('(min-width: 1224px)');

  if (isBigScreen) {
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

  return (
    <ScrollArea.Root className={styles.scrollableRoot}>
      <ScrollArea.Viewport className={styles.scrollableViewport}>
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
      </ScrollArea.Viewport>
      <Scrollbar />
    </ScrollArea.Root>
  );
}

// referensi: https://github.com/jeetiss/react-pdf-repl/blob/main/app/repl.js#L54
function useMediaQuery(query: string) {
  const getMatches = (query: string) => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = React.useState(() => getMatches(query));

  React.useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query));
    }

    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export default ScreenEditor;
