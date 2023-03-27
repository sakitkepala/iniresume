import ContentLoader from 'react-content-loader';
import { motion } from 'framer-motion';

import * as styles from './loading-editor.css';

import peep from 'src/assets/coffee.png';

export function LoadingEditor() {
  return (
    <>
      <div className={styles.layout}>
        <div>
          <LoaderEditor />
        </div>
        <div className={styles.setupContainer}>
          <div className={styles.setupSkeleton}>
            <LoaderConfig />
          </div>
        </div>
      </div>

      <div className={styles.floatingPeep}>
        <motion.img
          src={peep}
          alt="Coffee peep"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'tween' }}
        />
      </div>
    </>
  );
}

function LoaderEditor() {
  return (
    <ContentLoader
      speed={2}
      width={540}
      height={300}
      viewBox="0 0 540 300"
      backgroundColor="#e8ffdd"
      foregroundColor="#cbffb2"
      title="Menyiapkan editor..."
    >
      <rect x="48" y="5" rx="3" ry="3" width="86" height="14" />

      <rect x="48" y="44" rx="3" ry="3" width="40" height="14" />

      <rect x="70" y="86" rx="3" ry="3" width="118" height="14" />

      <rect x="70" y="107" rx="3" ry="3" width="80" height="14" />
      <rect x="158" y="107" rx="3" ry="3" width="109" height="14" />

      <rect x="70" y="128" rx="3" ry="3" width="71" height="14" />

      <rect x="70" y="149" rx="3" ry="3" width="100" height="14" />
      <rect x="178" y="149" rx="3" ry="3" width="192" height="14" />

      <rect x="70" y="170" rx="3" ry="3" width="125" height="14" />

      <rect x="70" y="191" rx="3" ry="3" width="70" height="14" />
      <rect x="148" y="191" rx="3" ry="3" width="79" height="14" />

      <rect x="48" y="233" rx="3" ry="3" width="63" height="14" />

      <rect x="70" y="275" rx="3" ry="3" width="90" height="14" />
      <rect x="168" y="275" rx="3" ry="3" width="80" height="14" />
      <rect x="256" y="275" rx="3" ry="3" width="120" height="14" />
    </ContentLoader>
  );
}

function LoaderConfig() {
  return (
    <ContentLoader
      speed={2}
      width={540}
      height={200}
      viewBox="0 0 540 200"
      backgroundColor="#e8ffdd"
      foregroundColor="#cbffb2"
      title="Menyiapkan editor..."
    >
      <rect x="24" y="16" rx="3" ry="3" width="301" height="21" />
      <rect x="24" y="61" rx="3" ry="3" width="340" height="14" />
      <rect x="340" y="136" rx="3" ry="3" width="154" height="38" />
    </ContentLoader>
  );
}

export default LoadingEditor;
