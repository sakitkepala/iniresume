import * as React from 'react';
import { useResumeEditor } from '../../contexts/resume-editor';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { PreviewPaper } from '../preview-paper';
import { Checkbox } from '../checkbox';

import * as appStyles from '../../app.css';
import * as styles from './preview-panel.css';

// TODO: hilangkan kalau udah implemen viewer modal
const hasFeatureFullscreen = false;

function PreviewPanel() {
  const { resume } = useResumeEditor();
  const [config, dispatchConfig] = React.useReducer(
    configReducer,
    initialConfig
  );
  const [isPreviewOpen, setPreviewOpen] = React.useState(false);
  const [downloadUrl, setDownloadUrl] = React.useState<string | undefined>();
  const hasNameAndTitle = Boolean(resume?.fullName && resume?.title);

  if (!isPreviewOpen || !hasNameAndTitle) {
    return (
      <div className={styles.previewContainer}>
        <SetupPanel
          configValue={config}
          onConfigChange={dispatchConfig}
          previewDisabled={!hasNameAndTitle}
          onClickPreview={() => setPreviewOpen(true)}
        />
      </div>
    );
  }

  const resetKey = JSON.stringify(resume);
  return (
    <div className={styles.previewContainer}>
      <div className={styles.fileViewer}>
        <ScrollArea.Root className={styles.viewerScrollableRoot}>
          <ScrollArea.Viewport className={styles.viewerScrollableViewport}>
            <PreviewPaper
              key={resetKey}
              config={config}
              onFileUrlChange={(url) => url && setDownloadUrl(url)}
            />
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        <div className={styles.viewerFooter}>
          <button
            className={appStyles.actionButton}
            disabled={!downloadUrl}
            onClick={() => window.open(downloadUrl)}
          >
            <span>
              <Download />
            </span>{' '}
            Unduh PDF
          </button>

          <div className={styles.buttonGroup}>
            <button
              className={styles.textButton}
              onClick={() => setPreviewOpen(false)}
            >
              <span>
                <Setting />
              </span>{' '}
              Atur Ulang
            </button>

            {hasFeatureFullscreen && (
              <button className={styles.textButton} disabled={!downloadUrl}>
                <span>
                  <Expand />
                </span>{' '}
                Tampil penuh
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SetupPanel({
  configValue,
  onConfigChange,
  previewDisabled,
  onClickPreview,
}: {
  configValue: { useEnglish: boolean };
  onConfigChange: React.Dispatch<ConfigAction>;
  previewDisabled: boolean;
  onClickPreview: () => void;
}) {
  return (
    <div className={styles.setupPanel}>
      <div className={styles.setupPanelSection}>
        <h2>Generate PDF &amp; Lihat Preview</h2>

        <p>
          Minimal isi data <em>Nama Lengkap</em> dan <em>Titel Profesi</em>{' '}
          supaya bisa cek preview.
        </p>

        <Checkbox
          id="language"
          name="language"
          label="Pakai template bahasa inggris"
          checked={configValue.useEnglish}
          onChange={(checked) => {
            onConfigChange({ type: 'USE_ENGLISH_CHECKED', payload: checked });
          }}
        />
      </div>

      <div className={styles.setupPanelFooter}>
        <button
          className={appStyles.actionButton}
          disabled={previewDisabled}
          onClick={onClickPreview}
        >
          <span role="img">👁</span> Lihat Preview
        </button>
      </div>
    </div>
  );
}

function Download() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
      ></path>
    </svg>
  );
}

function Setting() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"
      ></path>
    </svg>
  );
}

function Expand() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.00045 8.17501C8.70045 7.87501 8.28795 7.83751 8.06295 8.02501C7.83795 8.21251 7.91295 8.66251 8.21295 8.96251L10.538 11.2875C10.838 11.5875 11.2505 11.625 11.4755 11.4375C11.7005 11.25 11.6255 10.8 11.3255 10.5L9.00045 8.17501Z"
        fill="currentColor"
      ></path>
      <path
        d="M3.93795 3.93747C4.16295 3.71247 4.08795 3.29997 3.78795 2.99997L1.50045 0.712466C1.20045 0.412466 0.787954 0.337466 0.562954 0.562466C0.337954 0.787466 0.412954 1.19997 0.712954 1.49997L3.00045 3.82497C3.30045 4.08747 3.71295 4.16247 3.93795 3.93747Z"
        fill="currentColor"
      ></path>
      <path
        d="M3.93785 8.06247C3.71285 7.83747 3.30035 7.91247 3.00035 8.21247L0.712849 10.5C0.412849 10.8 0.375349 11.2125 0.562849 11.4375C0.750349 11.6625 1.20035 11.5875 1.50035 11.2875L3.82535 8.96247C4.08785 8.69997 4.16285 8.28747 3.93785 8.06247Z"
        fill="currentColor"
      ></path>
      <path
        d="M8.06291 3.93747C8.28791 4.16247 8.70041 4.08747 9.00041 3.78747L11.2879 1.49997C11.5879 1.19997 11.6254 0.787466 11.4379 0.562466C11.2504 0.337466 10.8004 0.412466 10.5004 0.712466L8.17541 2.99997C7.91291 3.29997 7.83791 3.71247 8.06291 3.93747Z"
        fill="currentColor"
      ></path>
      <path
        d="M4.68799 11.4375C4.68799 11.1375 4.35049 10.875 3.93799 10.875H1.87549C1.46299 10.875 1.12549 10.5375 1.12549 10.125V8.13745C1.12549 7.72495 0.862988 7.38745 0.562988 7.38745C0.262988 7.38745 0.000488281 7.72495 0.000488281 8.13745V11.25C0.000488281 11.6625 0.337988 12 0.750488 12H3.93799C4.35049 12 4.68799 11.7375 4.68799 11.4375Z"
        fill="currentColor"
      ></path>
      <path
        d="M11.438 7.38745C11.138 7.38745 10.8755 7.72495 10.8755 8.13745V10.125C10.8755 10.5375 10.538 10.875 10.1255 10.875H8.06299C7.65049 10.875 7.31299 11.1375 7.31299 11.4375C7.31299 11.7375 7.65049 12 8.06299 12H11.2505C11.663 12 12.0005 11.6625 12.0005 11.25V8.13745C12.0005 7.72495 11.738 7.38745 11.438 7.38745Z"
        fill="currentColor"
      ></path>
      <path
        d="M8.06299 0C7.65049 0 7.31299 0.2625 7.31299 0.5625C7.31299 0.8625 7.65049 1.125 8.06299 1.125H10.1255C10.538 1.125 10.8755 1.4625 10.8755 1.875V4.0125C10.8755 4.425 11.138 4.7625 11.438 4.7625C11.738 4.7625 12.0005 4.425 12.0005 4.0125V0.75C12.0005 0.3375 11.663 0 11.2505 0H8.06299Z"
        fill="currentColor"
      ></path>
      <path
        d="M4.68799 0.5625C4.68799 0.2625 4.35049 0 3.93799 0H0.750488C0.337988 0 0.000488281 0.3375 0.000488281 0.75V4.0125C0.000488281 4.425 0.262988 4.7625 0.562988 4.7625C0.862988 4.7625 1.12549 4.425 1.12549 4.0125V1.875C1.12549 1.4625 1.46299 1.125 1.87549 1.125H3.93799C4.35049 1.125 4.68799 0.8625 4.68799 0.5625Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

type ConfigAction = {
  type: 'USE_ENGLISH_CHECKED';
  payload: boolean;
};

const initialConfig = {
  useEnglish: false,
};

const configReducer: React.Reducer<typeof initialConfig, ConfigAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'USE_ENGLISH_CHECKED': {
      return { ...state, useEnglish: !state.useEnglish };
    }
    default: {
      return state;
    }
  }
};

export { PreviewPanel };
