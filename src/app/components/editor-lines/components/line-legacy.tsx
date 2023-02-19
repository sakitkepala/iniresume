import * as React from 'react';
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

function LineEmpty({ number }: LineComponentProps) {
  return <LineWrapper line={number} />;
}

function LineBreak({ number }: LineComponentProps) {
  return (
    <LineWrapper line={number}>
      <span className={styles.textLinebreak}>---</span>
    </LineWrapper>
  );
}

function LineHeading({
  children,
  number,
  level,
}: React.PropsWithChildren<LineComponentProps & { level: string | number }>) {
  const marks: {
    [level: string]: string;
  } = {
    1: '#',
    2: '##',
    3: '###',
  };
  return (
    <LineWrapper line={number}>
      <span className={styles.textHeading}>
        <span>{marks[level.toString()]}</span>
        <span>&nbsp;</span>
        <span>{children}</span>
      </span>
    </LineWrapper>
  );
}

function LineParagraph({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  return <LineWrapper line={number}>{children}</LineWrapper>;
}

export { LineWrapper, LineEmpty, LineBreak, LineHeading, LineParagraph };
