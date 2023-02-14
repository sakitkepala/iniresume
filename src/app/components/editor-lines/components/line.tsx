import * as styles from './line.css';

export type LineComponentProps = { number?: number | string };

function LineWrapper({
  line,
  children,
}: React.PropsWithChildren<{ line?: number | string }>) {
  return (
    <div className={styles.line}>
      <div className={styles.lineNumber}>
        {typeof line === 'undefined' ? null : line}
      </div>
      <div className={styles.lineContent}>{children}</div>
    </div>
  );
}

export { LineWrapper };
