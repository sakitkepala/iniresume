import * as React from 'react';
import { pdfjs } from 'react-pdf';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Checkbox } from './components/checkbox';
import { ResumePDF } from '../resume-template';
import { PreviewPaper } from './components/preview-paper';

import IconDownload from './icons/download';
import IconSetting from './icons/setting';

import * as appStyles from 'src/app/app.css';
import * as styles from './preview-panel.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type PDFRenderingConfig = {
  useEnglish: boolean;
};

const initialConfig: PDFRenderingConfig = {
  useEnglish: false,
};

function PreviewPanel() {
  const { resume, filename } = useResumeEditor();
  const [config, setConfig] = React.useState<PDFRenderingConfig>(initialConfig);
  const [isPreviewOpen, setPreviewOpen] = React.useState(false);
  const [downloadUrl, setDownloadUrl] = React.useState('');

  if (!isPreviewOpen) {
    return (
      <div className={styles.previewContainer}>
        <ConfigPanel
          initialConfig={config}
          onPreview={(config) => {
            setConfig(config);
            setPreviewOpen(true);
            setDownloadUrl('');
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.previewContainer}>
      <div className={styles.fileViewer}>
        <ScrollArea.Root className={styles.viewerScrollableRoot}>
          <ScrollArea.Viewport className={styles.viewerScrollableViewport}>
            <PreviewPaper
              key={JSON.stringify(resume)}
              onUrlChange={setDownloadUrl}
              filename={filename}
            >
              <ResumePDF config={config} data={resume} />
            </PreviewPaper>
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

function ConfigPanel({
  initialConfig,
  previewDisabled,
  onPreview,
}: {
  initialConfig: PDFRenderingConfig;
  previewDisabled?: boolean;
  onPreview: (config: PDFRenderingConfig) => void;
}) {
  const [config, setConfig] = React.useState(initialConfig);
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
          checked={config.useEnglish}
          onChange={(checked) => setConfig({ useEnglish: checked })}
        />
      </div>

      <div className={styles.setupPanelFooter}>
        <button
          className={appStyles.actionButton}
          disabled={previewDisabled}
          onClick={() => onPreview(config)}
        >
          <span role="img">👁</span> Lihat Preview
        </button>
      </div>
    </div>
  );
}

export { PreviewPanel, ConfigPanel };
