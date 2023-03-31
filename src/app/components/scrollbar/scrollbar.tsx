import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as styles from './scrollbar.css';

function Scrollbar({
  orientation = 'vertical',
}: {
  orientation?: 'vertical' | 'horizontal';
}) {
  return (
    <ScrollArea.Scrollbar
      orientation={orientation}
      className={styles.scrollAreaScrollbar}
    >
      <ScrollArea.Thumb className={styles.scrollAreaThumb} />
    </ScrollArea.Scrollbar>
  );
}

export { Scrollbar };
