import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as styles from './scrollbar.css';

function Scrollbar() {
  return (
    <ScrollArea.Scrollbar
      orientation="vertical"
      className={styles.scrollAreaScrollbar}
    >
      <ScrollArea.Thumb className={styles.scrollAreaThumb} />
    </ScrollArea.Scrollbar>
  );
}

export { Scrollbar };
