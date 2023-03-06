import { HeaderBar } from '../components/header-bar';

import * as styles from './editor.css';

export function ScreenEditor() {
  return (
    <>
      <HeaderBar rich />
      <div className={styles.mainContainer}>
        <main>Informasi</main>
        <aside className={styles.asideContainer}>
          <h2>generate</h2>
        </aside>
      </div>
    </>
  );
}

export default ScreenEditor;
