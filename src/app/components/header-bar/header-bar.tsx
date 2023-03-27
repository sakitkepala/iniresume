import * as React from 'react';
import { useResumeEditor } from '../../contexts/resume-editor';
import * as styles from './header-bar.css';

function HeaderBar({ children }: React.PropsWithChildren) {
  const breadcrumb: React.ReactNode =
    React.Children.count(children) === 1 &&
    React.isValidElement(children) &&
    children.type === Breadcrumb
      ? children
      : null;
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
  const { filename } = useResumeEditor();
  if (!filename) {
    return null;
  }
  return (
    <>
      <div>&#47;</div>
      <div aria-label="Resume Info">{filename}</div>
    </>
  );
}

export { HeaderBar, Breadcrumb };
