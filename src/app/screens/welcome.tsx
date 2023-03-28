import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { type ResumeData, loadSaveData, clearSaveData } from '../data/resume';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';
import { Scrollbar } from '../components/scrollbar';
import { ExternalLink } from '../components/external-link';
import { IniResumeLogo } from '../components/iniresume-logo';

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
  const [saveData, setSaveData] = React.useState<ResumeData | null>(null);
  const hasSaveData = Boolean(saveData);

  React.useEffect(() => {
    // delay baca data lokal setelah render pertama/mounted
    const saveData = loadSaveData();
    saveData && setSaveData(saveData);
  }, []);

  return (
    <ScrollArea.Root className={styles.scrollableRoot}>
      <ScrollArea.Viewport className={styles.scrollableViewport}>
        <motion.div
          className={styles.layout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
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

            <motion.main
              className={styles.main}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.1, duration: 0.1 },
              }}
            >
              <div>
                <img
                  className={styles.illustrationImage}
                  src={rocket}
                  alt="Rocket launch illustration"
                />
              </div>

              <div className={styles.content}>
                <h2
                  className={styles.contentHeading}
                  aria-label="Feature Heading"
                >
                  Coba Editor Resume!
                </h2>
                <p aria-label="Feature Copywriting">
                  Tulis konten resume di editor dengan "markdown", lalu generate
                  resume yang bisa di-download dalam bentuk PDF. Gratis!
                </p>

                <ExistingResumeMessage saveData={saveData} />

                <ButtonCreateResume hasSaveData={hasSaveData} />
              </div>
            </motion.main>
          </div>

          <footer className={styles.footer}>
            <div>
              <IniResumeLogo />
            </div>
            <div>
              &copy; {new Date().getFullYear()}{' '}
              <ExternalLink
                href="https://sakitkepala.dev/dika"
                className={styles.link}
              >
                Andika Priyotama
              </ExternalLink>
            </div>
          </footer>
        </motion.div>
      </ScrollArea.Viewport>
      <Scrollbar />
    </ScrollArea.Root>
  );
}

function ExistingResumeMessage({ saveData }: { saveData: ResumeData | null }) {
  const hasSaveData = Boolean(saveData);
  const filename =
    saveData?.fullName || saveData?.title ? _getFilenameText(saveData) : '';

  if (!hasSaveData) {
    return null;
  }

  return (
    <motion.div
      className={styles.existingResumeMessage}
      aria-label="Existing resume message"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span role="img" aria-label="Emoji waving hand">
        👋
      </span>{' '}
      Tampaknya kamu masih punya resume sebelumnya nih
      {filename ? ':' : '.'}{' '}
      <Link role="button" to="/editor" className={styles.link}>
        {filename ? (
          <>
            <em>{filename}</em>.{' '}
          </>
        ) : (
          ''
        )}
        Edit aja?
      </Link>
    </motion.div>
  );
}

function ButtonCreateResume({ hasSaveData }: { hasSaveData: boolean }) {
  const navigate = useNavigate();

  if (!hasSaveData) {
    return (
      <span className={styles.pressable}>
        <Link
          role="button"
          className={clsx(appStyles.actionButton, styles.createButton)}
          to="/editor"
        >
          <SparklingEmojiContent>Buat Resume</SparklingEmojiContent>
        </Link>
      </span>
    );
  }

  return (
    <AlertRemoveSaveData
      onCreate={() => {
        clearSaveData();
        navigate('/editor');
      }}
      onEdit={() => navigate('/editor')}
    />
  );
}

function SparklingEmojiContent({ children = null }: React.PropsWithChildren) {
  return (
    <>
      <span role="img" aria-label="Emoji sparkling">
        ✨
      </span>
      <span>{children}</span>
    </>
  );
}

function AlertRemoveSaveData({
  onCreate,
  onEdit,
}: {
  onCreate: () => void;
  onEdit: () => void;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <span className={styles.pressable}>
          <button className={clsx(appStyles.actionButton, styles.createButton)}>
            <SparklingEmojiContent>Buat Resume Baru Aja</SparklingEmojiContent>
          </button>
        </span>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.promptOverlay} />
        <AlertDialog.Content className={styles.promptContentContainer}>
          <motion.div
            className={styles.promptContent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
            transition={{ opacity: { duration: 0.1 } }}
          >
            <AlertDialog.Title>Hapus resume yang sebelumnya?</AlertDialog.Title>

            <AlertDialog.Description>
              Bila buat resume baru, data sebelumnya akan dihapus, digantikan
              dengan data baru.
            </AlertDialog.Description>

            <div className={styles.promptActions}>
              <AlertDialog.Cancel asChild>
                <AlertActionButton emoji="✋" onClick={onEdit}>
                  Edit aja
                </AlertActionButton>
              </AlertDialog.Cancel>

              <AlertDialog.Action asChild>
                <AlertActionButton emoji="👌" onClick={onCreate}>
                  OK, hapus aja
                </AlertActionButton>
              </AlertDialog.Action>
            </div>
          </motion.div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

const AlertActionButton = React.forwardRef<
  HTMLElement,
  React.PropsWithChildren<{ emoji: string; onClick: () => void }>
>(({ children = null, emoji, onClick }, $ref) => {
  return (
    <span ref={$ref} className={styles.promptActionPressable}>
      <button
        className={clsx(appStyles.actionButton, styles.promptActionButton)}
        onClick={onClick}
      >
        <span role="img" aria-label="Emoji">
          {emoji}
        </span>
        <span>{children}</span>
      </button>
    </span>
  );
});

function _getFilenameText(resume: ResumeData) {
  const MARK = ', ';
  return [resume.fullName, resume.title].filter((v) => Boolean(v)).join(MARK);
}

export default ScreenWelcome;
