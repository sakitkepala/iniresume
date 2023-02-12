import { useResumeEditor } from '../contexts/resume-editor';

import * as appStyles from '../app.css';
import * as styles from './header-bar.css';

function HeaderBar({ downloadUrl }: { downloadUrl?: string }) {
  const { resume } = useResumeEditor();
  const hasTitle = resume?.fullName && resume.title;
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

      <div className={styles.headerAction}>
        {Boolean(downloadUrl) && (
          <button
            className={appStyles.actionButton}
            onClick={() => window.open(downloadUrl)}
          >
            Unduh
          </button>
        )}
      </div>
    </header>
  );
}

export { HeaderBar };
