import * as React from 'react';
import { useResumeEditor } from '../../contexts/resume-editor';

import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { type Variants, motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from '../external-link';
import { IniResumeLogo } from '../iniresume-logo';

import { clsx } from 'clsx';

import { Github } from './icons/github';
import { Info } from './icons/info';

import * as appStyles from '../../app.css';
import * as styles from './header-bar.css';

import peep from 'src/assets/coffee.png';

const HOME_PATH = '/';
const SOURCE_REPO_URL = 'https://github.com/sakitkepala/iniresume';

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
        <div aria-label="App Logo">
          {isHome ? (
            <IniResumeLogo />
          ) : (
            <Link to={HOME_PATH} className={styles.logoLink}>
              <IniResumeLogo />
            </Link>
          )}
        </div>
        {breadcrumb}
      </div>

      <div className={styles.headerAction}>
        <SiteInfo />

        <ExternalLink
          className={clsx(styles.iconLink, styles.colorGithub)}
          href={SOURCE_REPO_URL}
          title="Kunjungi repositori kode sumbernya di Github"
        >
          <Github />
        </ExternalLink>
      </div>
    </header>
  );
}

function SiteInfo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className={clsx(styles.iconLink, styles.colorInfo)}
          title="Sedikit tentang website ini"
        >
          <Info />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContentContainer}>
          <motion.div
            className={styles.dialogContent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
            transition={{ opacity: { duration: 0.1 } }}
          >
            <div className={styles.dialogContentLayout}>
              <div>
                <img
                  src={peep}
                  alt="Peep coffee"
                  className={styles.peepIllustration}
                />
              </div>

              <div className={styles.dialogContentCopywriting}>
                <Dialog.Title>
                  Hai{' '}
                  <span role="img" aria-label="Emoji hai">
                    👋
                  </span>
                </Dialog.Title>

                <Dialog.Description>
                  Terima kasih, yah, sudah berkunjung.
                </Dialog.Description>

                <Dialog.Description>
                  Website ini adalah projek sampingan yang dengan rendah hati
                  dipersembahkan oleh pembuatnya{' '}
                  <ExternalLink href="https://sakitkepala.dev/dika">
                    sakitkepala.dev
                  </ExternalLink>
                  .
                </Dialog.Description>

                <Dialog.Description>
                  Beberapa projek open-source dan layanan gratis ikut membantu
                  dalam membangun website ini, di antaranya:
                </Dialog.Description>

                <ul className={styles.ul}>
                  <li>
                    <ExternalLink href="https://react.dev/">React</ExternalLink>
                    , dengan standalone project dari{' '}
                    <ExternalLink href="https://nx.dev/getting-started/react-standalone-tutorial">
                      Nx Workspace
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href="https://vanilla-extract.style">
                      Vanilla Extract CSS
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href="https://www.radix-ui.com">
                      Radix UI
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href="https://www.framer.com/motion/">
                      Framer Motion
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href="https://github.com/diegomura/react-pdf">
                      React PDF renderer
                    </ExternalLink>{' '}
                    &amp;{' '}
                    <ExternalLink href="https://github.com/wojtekmaj/react-pdf">
                      React PDF (viewer)
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href="https://reactrouter.com">
                      React Router
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href="https://blush.design">
                      blush.design
                    </ExternalLink>{' '}
                    untuk ilustrasinya
                  </li>
                  <li>
                    <ExternalLink href="https://fonts.google.com/">
                      Google Fonts
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href="https://github.com/sakitkepala">
                      Github
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href="https://www.netlify.com">
                      Netlify
                    </ExternalLink>
                  </li>
                  <li>
                    juga{' '}
                    <ExternalLink href="https://glitch.com">
                      Glitch
                    </ExternalLink>{' '}
                    yang jadi inspirasi untuk desain tampilan visual UI-nya{' '}
                    <span role="img" aria-label="Emoji grin">
                      😁
                    </span>
                  </li>
                </ul>

                <Dialog.Description>
                  ...terima kasih sekali sudah bermurah hati menyediakan
                  tool-tool yang bermanfaat untuk komunitas. Warbyasah{' '}
                  <span role="img" aria-label="Emoji clapping hands">
                    👏
                  </span>
                </Dialog.Description>

                <Dialog.Description>
                  Daftar package lengkap dan kode sumbernya tersedia di{' '}
                  <ExternalLink href={SOURCE_REPO_URL}>
                    repositori Github
                  </ExternalLink>
                  , tentu saja. Sangat dipersilakan kontribusinya, baik itu
                  untuk report issue/bug, masukan fitur, atau masukan apapun
                  yang bisa jadi menarik.
                </Dialog.Description>

                <Dialog.Description>
                  Jika website ini ternyata bermanfaat buatmu, boleh juga loh
                  kasih tahu saya.
                </Dialog.Description>

                <Dialog.Description>Senang bila bermanfaat.</Dialog.Description>
              </div>
            </div>

            <div className={styles.dialogActions}>
              <Dialog.Close asChild>
                <span className={styles.dialogActionPressable}>
                  <button
                    className={clsx(
                      appStyles.actionButton,
                      styles.dialogActionButton
                    )}
                  >
                    Nice info{' '}
                    <span role="img" aria-label="Emoji Ok">
                      👌
                    </span>
                  </button>
                </span>
              </Dialog.Close>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
  const isLargerScreen = useMediaQuery('(min-width: 720px)');

  return (
    <AnimatePresence>
      {isLargerScreen && Boolean(filename) && (
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

function useMediaQuery(query: string) {
  const getMatches = (query: string) => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = React.useState(() => getMatches(query));

  React.useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query));
    }

    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export { HeaderBar, Breadcrumb };
