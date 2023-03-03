import { HeaderBar } from '../components/header-bar';
import * as styles from './transition.css';

export function ScreenTransition() {
  return (
    <>
      <HeaderBar />
      <div className={styles.container}>
        <h2>Menyiapkan editor...</h2>
      </div>
    </>
  );
}

export default ScreenTransition;
