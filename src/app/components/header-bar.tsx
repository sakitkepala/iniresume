import * as React from 'react';
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

// Screen yang pakai breadcrumb musti dibungkus pakai Provider Resume Editor
function Breadcrumb() {
  // TODO: hook untuk context resume
  const resume = { fullName: 'Nama Lengkap User', title: 'Titel Profesi User' };
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
