import * as styles from './iniresume-logo.css';

function IniResumeLogo() {
  return (
    <span className={styles.logoType}>
      <span>iniresume</span>
      <span className={styles.pink}>.</span>
    </span>
  );
}

export { IniResumeLogo };
