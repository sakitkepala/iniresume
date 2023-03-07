import * as React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Checkbox } from './components/checkbox';
import { PreviewPaper } from '../preview-paper';

import IconDownload from './icons/download';
import IconSetting from './icons/setting';

import * as appStyles from '../../app.css';
import * as styles from './preview-panel.css';

function PreviewPanel() {
  const [config, dispatchConfig] = React.useReducer(
    configReducer,
    initialConfig
  );
  const [isPreviewOpen, setPreviewOpen] = React.useState(false);
  const [downloadUrl] = React.useState<string | undefined>();

  if (!isPreviewOpen) {
    return (
      <div className={styles.previewContainer}>
        <SetupPanel
          configValue={config}
          onConfigChange={dispatchConfig}
          onClickPreview={() => setPreviewOpen(true)}
        />
      </div>
    );
  }

  return (
    <div className={styles.previewContainer}>
      <div className={styles.fileViewer}>
        <ScrollArea.Root className={styles.viewerScrollableRoot}>
          <ScrollArea.Viewport className={styles.viewerScrollableViewport}>
            <PreviewPaper />
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
              <IconDownload />
            </span>{' '}
            Unduh PDF
          </button>

          <div className={styles.buttonGroup}>
            <button
              className={styles.textButton}
              onClick={() => setPreviewOpen(false)}
            >
              <span>
                <IconSetting />
              </span>{' '}
              Atur Ulang
            </button>
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
  previewDisabled?: boolean;
  onClickPreview?: () => void;
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
