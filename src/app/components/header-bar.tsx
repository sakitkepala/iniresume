import * as React from 'react';
import { useResumeEditor } from '../contexts/resume-editor';

import * as styles from './header-bar.css';

function HeaderBar({ rich = false }: { rich?: boolean }) {
  if (!rich) {
    return <StaticHeader />;
  }
  return <StaticHeader breadcrumb={<Breadcrumb />} />;
}

function StaticHeader({ breadcrumb }: { breadcrumb?: React.ReactNode }) {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <div aria-label="App Logo" className={styles.logoType}>
          iniresume.
        </div>
        {breadcrumb}
      </div>

      <div className={styles.headerAction}></div>
    </header>
  );
}

function Breadcrumb() {
  const { resume } = useResumeEditor();
  const hasTitle = resume.fullName && resume.title;

  if (!hasTitle) {
    return null;
  }

  return (
    <>
      <div>&#47;</div>
      <div aria-label="Resume Info">
        {resume.fullName}, {resume.title}
      </div>
    </>
  );
}

export { HeaderBar };
