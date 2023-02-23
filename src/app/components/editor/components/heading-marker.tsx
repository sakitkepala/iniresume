import * as React from 'react';
import { clsx } from 'clsx';
import * as styles from './heading-marker.css';

function HeadingMarker({
  children = null,
  sub = false,
}: React.PropsWithChildren<{ sub?: boolean }>) {
  return (
    <span className={clsx(styles.wrapper, styles.text)}>
      <span>{sub ? '##' : '###'}</span>
      <span>&nbsp;</span>
      {children}
    </span>
  );
}

export { HeadingMarker };
