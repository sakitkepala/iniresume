import { LineWrapper, LineComponentProps } from './line';
import * as styles from './line.css';

function LineSectionHeading({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  return (
    <LineWrapper line={number}>
      <span className={styles.sectionHeading}>
        <span>#</span>
        <span>&nbsp;</span>
        <span>{children}</span>
      </span>
    </LineWrapper>
  );
}

export { LineSectionHeading };
