import * as styles from './section-heading.css';

function LineSectionHeading({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.text}>
      <span>#</span>
      <span>&nbsp;</span>
      <span>{children}</span>
    </span>
  );
}

export { LineSectionHeading };
