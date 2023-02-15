import * as React from 'react';
import { clsx } from 'clsx';
import * as commonStyles from './common-styles.css';

function ListItemLine({
  children,
  containerClassName,
  muted = false,
}: React.PropsWithChildren<{ containerClassName?: string; muted?: boolean }>) {
  return (
    <span className={clsx(commonStyles.listItemWrapper, containerClassName)}>
      <span className={clsx(muted ? commonStyles.staticDisplay : undefined)}>
        -
      </span>
      <span>&nbsp;</span>
      {children}
    </span>
  );
}

export { ListItemLine };
