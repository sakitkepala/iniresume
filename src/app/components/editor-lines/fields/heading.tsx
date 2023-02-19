import * as styles from '../components/line.css';

function LineHeadingField({
  children,
  level = 1,
}: React.PropsWithChildren<{ level?: string | number }>) {
  const marks: {
    [level: string | number]: string;
  } = {
    1: '#',
    2: '##',
    3: '###',
  };
  return (
    <span className={styles.textHeading}>
      <span>{marks[level]}</span>
      <span>&nbsp;</span>
      <span>{children}</span>
    </span>
  );
}

export { LineHeadingField };
