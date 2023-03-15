import * as React from 'react';
import { clsx } from 'clsx';
import * as styles from './list-item-line.css';

type ListItemLineProps = React.PropsWithChildren<{
  muted?: boolean;
  containerClassName?: string;
}>;

function ListItemLine({
  children,
  muted = false,
  containerClassName,
}: ListItemLineProps) {
  return (
    <div className={clsx(styles.listItemWrapper, containerClassName)}>
      <div className={muted ? styles.staticDisplay : undefined}>-</div>
      <div>&nbsp;</div>
      <div className={styles.listItemContent}>{children}</div>
    </div>
  );
}

export { ListItemLine };
