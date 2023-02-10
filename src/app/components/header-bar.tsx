import * as appStyles from '../app.css';
import * as styles from './header-bar.css';

export type HeaderBarProps = {
  user?: {
    fullName?: string;
    title?: string;
  };
  downloadUrl?: string;
};

function HeaderBar({ user, downloadUrl }: HeaderBarProps) {
  const hasTitle = user?.fullName && user.title;
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <div className={styles.logoType}>iniresume.</div>
        {hasTitle && (
          <>
            <div>&#47;</div>
            <div>
              {user.fullName}, {user.title}
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
