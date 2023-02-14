import * as headerStyles from '../components/header-bar.css';
import * as styles from './transition.css';

export function ScreenTransition() {
  return (
    <>
      <header className={headerStyles.header}>
        <div className={headerStyles.breadcrumb}>
          <div className={headerStyles.logoType}>iniresume.</div>
        </div>

        <div className={headerStyles.headerAction}></div>
      </header>
      <div className={styles.container}>
        <h2>Menyiapkan editor...</h2>
      </div>
    </>
  );
}

export default ScreenTransition;
