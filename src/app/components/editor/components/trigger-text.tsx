import * as React from 'react';
import * as styles from './trigger-text.css';

const TriggerText = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<{ onClick?: () => void }>
>(({ children, onClick }, $buttonRef) => {
  return (
    <button
      ref={$buttonRef}
      className={styles.triggerText}
      onClick={(ev) => {
        ev.stopPropagation();
        onClick?.();
      }}
    >
      {children}
    </button>
  );
});

export { TriggerText };
