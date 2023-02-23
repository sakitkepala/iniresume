import * as React from 'react';
import { clsx } from 'clsx';
import * as commonStyles from './common-styles.css';

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
