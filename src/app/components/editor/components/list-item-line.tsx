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
    <span className={clsx(styles.listItemWrapper, containerClassName)}>
      <span className={clsx(muted ? styles.staticDisplay : undefined)}>-</span>
      <span>&nbsp;</span>
      {children}
    </span>
  );
}

export { ListItemLine };
