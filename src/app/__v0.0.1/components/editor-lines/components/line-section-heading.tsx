import * as styles from './line.css';

function LineSectionHeading({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.sectionHeading}>
      <span>#</span>
      <span>&nbsp;</span>
      <span>{children}</span>
    </span>
  );
}

export { LineSectionHeading };
