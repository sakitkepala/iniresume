import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { type ResumeData, loadSaveData, clearSaveData } from '../data/resume';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
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
  const [saveData, setSaveData] = React.useState<ResumeData | null>(null);
  const hasSaveData = Boolean(saveData);

  React.useEffect(() => {
    // delay baca data lokal setelah render pertama/mounted
    const saveData = loadSaveData();
    saveData && setSaveData(saveData);
  }, []);

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

              <ExistingResumeMessage saveData={saveData} />

              <ButtonCreateResume hasSaveData={hasSaveData} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

const styleCreateButton = clsx(appStyles.actionButton, styles.createButton);

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

function PromptActionButton({
  children = null,
  emoji,
  onClick,
}: React.PropsWithChildren<{ emoji: string; onClick: () => void }>) {
  return (
    <span className={styles.promptActionPressable}>
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
}

function ButtonCreateResume({ hasSaveData }: { hasSaveData: boolean }) {
  const navigate = useNavigate();

  if (!hasSaveData) {
    return (
      <span className={styles.pressable}>
        <Link role="button" className={styleCreateButton} to="/editor">
          <SparklingEmojiContent>Buat Resume</SparklingEmojiContent>
        </Link>
      </span>
    );
  }

  return (
    <PromptRemoveSaveData
      onCreate={() => {
        clearSaveData();
        navigate('/editor');
      }}
      onEdit={() => navigate('/editor')}
    />
  );
}

function ExistingResumeMessage({ saveData }: { saveData: ResumeData | null }) {
  const hasSaveData = Boolean(saveData);

  if (!hasSaveData) {
    return null;
  }

  const filename =
    saveData?.fullName || saveData?.title ? _getFilenameText(saveData) : '';

  return (
    <div className={styles.existingResumeMessage}>
      <span role="img" aria-label="Emoji waving hand">
        👋
      </span>{' '}
      Tampaknya kamu masih punya resume sebelumnya nih
      {filename ? ':' : '.'}{' '}
      <Link role="button" to="/editor" className={styles.linkEditExisting}>
        {filename ? (
          <>
            <em>{filename}</em>.{' '}
          </>
        ) : (
          ''
        )}
        Edit aja?
      </Link>
    </div>
  );
}

function PromptRemoveSaveData({
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
          <button className={styleCreateButton}>
            <SparklingEmojiContent>Buat Resume Baru Aja</SparklingEmojiContent>
          </button>
        </span>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.promptOverlay} />
        <AlertDialog.Content className={styles.promptContent}>
          <AlertDialog.Title>Hapus resume yang sebelumnya?</AlertDialog.Title>

          <AlertDialog.Description>
            Bila buat resume baru, data sebelumnya akan dihapus, digantikan
            dengan data baru.
          </AlertDialog.Description>

          <div className={styles.promptActions}>
            <AlertDialog.Cancel asChild>
              <PromptActionButton emoji="✋" onClick={onEdit}>
                Edit aja
              </PromptActionButton>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <PromptActionButton emoji="👌" onClick={onCreate}>
                OK, hapus aja
              </PromptActionButton>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function _getFilenameText(resume: ResumeData) {
  const MARK = ', ';
  return [resume.fullName, resume.title].filter((v) => Boolean(v)).join(MARK);
}

export default ScreenWelcome;
