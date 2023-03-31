import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Scrollbar } from '../scrollbar';
import { LineList } from './line-list';
import * as styles from './editor.css';

function Editor() {
  return (
    <ScrollArea.Root className={styles.editorScrollableRoot}>
      <ScrollArea.Viewport className={styles.editorScrollableViewport}>
        <div className={styles.lineListContainer}>
          <LineList autofocus />
        </div>
      </ScrollArea.Viewport>
      <Scrollbar />
    </ScrollArea.Root>
  );
}

export { Editor };
