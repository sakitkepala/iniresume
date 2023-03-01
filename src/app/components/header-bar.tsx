import { useResumeEditor } from '../contexts/resume-editor';

import * as styles from './header-bar.css';

function HeaderBar({ rich = false }: { rich?: boolean }) {
  return rich ? <RichHeader /> : <StaticHeader />;
}

function StaticHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <div className={styles.logoType}>iniresume.</div>
      </div>

      <div className={styles.headerAction}></div>
    </header>
  );
}

function RichHeader() {
  const { resume } = useResumeEditor();
  const hasTitle = resume.fullName && resume.title;
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <div className={styles.logoType}>iniresume.</div>
        {hasTitle && (
          <>
            <div>&#47;</div>
            <div>
              {resume.fullName}, {resume.title}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export { HeaderBar };
