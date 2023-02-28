import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderBar } from '../components/header-bar';

import { loadSaveData, clearSaveData } from '../data/resume';

import * as appStyles from '../app.css';
import * as styles from './welcome.css';

export function ScreenWelcome() {
  const navigate = useNavigate();
  const [resume] = React.useState(() => loadSaveData());
  const hasSavedResume = Boolean(resume);

  return (
    <>
      <HeaderBar />
      <main className={styles.welcome}>
        <h1>Welcome Screen</h1>

        {hasSavedResume ? (
          <div>
            <div>
              Punya simpanan nih wkwk. <Link to="/editor">Klik untuk edit</Link>
            </div>

            <div>
              <button
                className={appStyles.actionButton}
                onClick={() => {
                  clearSaveData();
                  navigate('/editor');
                }}
              >
                Buat Baru
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Link className={appStyles.actionButton} to="/editor">
              Buat Resume
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

export default ScreenWelcome;
