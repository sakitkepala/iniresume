import { Link } from 'react-router-dom';
import { HeaderBar } from '../components/header-bar';

import * as appStyles from '../app.css';
import * as styles from './welcome.css';

export function ScreenWelcome() {
  return (
    <>
      <HeaderBar />
      <main className={styles.welcome}>
        <h1>Welcome Screen</h1>
        <div>
          <Link role="button" className={appStyles.actionButton} to="/editor">
            Buat Resume
          </Link>
        </div>
      </main>
    </>
  );
}

export default ScreenWelcome;
