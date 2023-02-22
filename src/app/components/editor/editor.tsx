import * as ScrollArea from '@radix-ui/react-scroll-area';
import { EditorLineList } from './lines-contents';
import * as styles from './editor.css';

function Editor() {
  return (
    <ScrollArea.Root className={styles.editorScrollableRoot}>
      <ScrollArea.Viewport className={styles.editorScrollableViewport}>
        <EditorLineList />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export { Editor };
