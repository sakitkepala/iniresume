import * as appStyles from '../app.css';
import * as styles from './header-bar.css';

export type HeaderBarProps = {
  user?: {
    fullName: string;
    title: string;
  };
  downloadUrl?: string;
};

function HeaderBar({ user, downloadUrl }: HeaderBarProps) {
  const hasTitle = user?.fullName && user.title;
  const downloadFilename = getDownloadFilename(user?.fullName, user?.title);
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
        {hasTitle && (
          <a
            className={appStyles.actionButton}
            href={downloadUrl || undefined}
            download={downloadFilename}
          >
            Unduh
          </a>
        )}
      </div>
    </header>
  );
}

function getDownloadFilename(fullname?: string, title?: string) {
  if (!fullname || !title) {
    return 'iniresume-download.pdf';
  }
  const snakeCaseFullname = fullname.replace(' ', '_');
  const snakeCaseTitle = title.replace(' ', '_');
  // TODO: dikasih last edit beneran. Sementara masih tanggal render.
  const lastEditedYear = new Date().getFullYear();
  const fullFilename = `${snakeCaseFullname}-${snakeCaseTitle}_(${lastEditedYear})`;
  return encodeURIComponent(fullFilename) + '.pdf';
}

export { HeaderBar };
