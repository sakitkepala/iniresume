import * as React from 'react';
import { Link } from 'react-router-dom';
import { useResumeEditor } from '../../contexts/resume-editor';
import { type Variants, motion, AnimatePresence } from 'framer-motion';
import * as styles from './header-bar.css';

const HOME_PATH = '/';

function HeaderBar({
  children,
  currentPath = HOME_PATH,
}: React.PropsWithChildren<{ currentPath?: string }>) {
  const isHome = currentPath === HOME_PATH;

  const breadcrumb: React.ReactNode =
    React.Children.count(children) === 1 &&
    React.isValidElement(children) &&
    children.type === Breadcrumb
      ? children
      : null;

  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <div aria-label="App Logo" className={styles.logoType}>
          {isHome ? (
            <>iniresume.</>
          ) : (
            <Link to={HOME_PATH} className={styles.logoLink}>
              iniresume.
            </Link>
          )}
        </div>
        {breadcrumb}
      </div>

      <div className={styles.headerAction}></div>
    </header>
  );
}

const animateBreadcrumb: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

// Screen yang pakai breadcrumb musti dibungkus pakai Provider Resume Editor
function Breadcrumb() {
  const { filename } = useResumeEditor();

  return (
    <AnimatePresence>
      {Boolean(filename) && (
        <motion.div
          className={styles.breadcrumbFilenameItem}
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={animateBreadcrumb}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: { opacity: 1, x: 0, transition: { type: 'tween' } },
            }}
          >
            &#47;
          </motion.div>
          <motion.div
            aria-label="Resume Info"
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: { opacity: 1, x: 0, transition: { type: 'tween' } },
            }}
          >
            {filename}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { HeaderBar, Breadcrumb };
