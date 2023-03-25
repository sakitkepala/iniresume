import { Link } from 'react-router-dom';
import { HeaderBar } from '../components/header-bar';

import { clsx } from 'clsx';

import * as appStyles from '../app.css';
import * as styles from './welcome.css';

// Gak bisa import pakai: `import image from './image.png';`.
// Cara import aset image yang dideskripsikan dokumentasinya gak jalan:
// https://nx.dev/recipes/other/adding-assets-react#adding-images,-fonts,-and-files
// Referensi workaround dengan konfig webpack: https://github.com/nrwl/nx/issues/14532
// Dan musti pakai path dari root kayak ini:
import rocket from 'src/assets/launch.png';

export function ScreenWelcome() {
  return (
    <>
      <HeaderBar />
      <div className={styles.layout}>
        <div className={styles.container}>
          <div>
            <h1 className={styles.headline}>
              <span>
                <span
                  className={styles.resumeHoverable}
                  data-hoverable="One-Page Resume"
                >
                  One-Page Resume
                </span>{' '}
                <span
                  className={styles.sparklingEmoji}
                  role="img"
                  aria-label="Emoji sparkling resume"
                >
                  ✨
                </span>
              </span>
              <br />
              <span>untuk bantu luncurkan</span>
              <br />
              <span>karir dev barumu.</span>
            </h1>
          </div>

          <main className={styles.main}>
            <div>
              <img
                className={styles.illustrationImage}
                src={rocket}
                alt="Rocket launch illustration"
              />
            </div>

            <div className={styles.content}>
              <h2 className={styles.contentHeading}>Coba Editor Resume!</h2>
              <p>
                Tulis konten resume di editor dengan "markdown", lalu generate
                resume yang bisa di-download dalam bentuk PDF. Gratis!
              </p>

              <span className={styles.pressable}>
                <Link
                  role="button"
                  className={clsx(appStyles.actionButton, styles.createButton)}
                  to="/editor"
                >
                  <span role="img" aria-label="Ikon buat resume">
                    ✨
                  </span>
                  <span>Buat Resume</span>
                </Link>
              </span>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default ScreenWelcome;
