import * as React from 'react';
import { pdfjs } from 'react-pdf';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { motion } from 'framer-motion';
import { Scrollbar } from '../scrollbar';
import { ResumePDF } from '../resume-template';
import { ExternalLink } from '../external-link';
import { IniResumeLogo } from '../iniresume-logo';
import { Checkbox } from './components/checkbox';
import { PreviewPaper } from './components/preview-paper';

import IconDownload from './icons/download';
import IconSetting from './icons/setting';

import { clsx } from 'clsx';

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
        <Copyright />
      </div>
    );
  }

  return (
    <div className={styles.previewContainer}>
      <motion.div
        className={styles.fileViewer}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
      >
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
          <Scrollbar />
          <Scrollbar orientation="horizontal" />
        </ScrollArea.Root>

        <div className={styles.viewerFooter}>
          <ActionButton
            icon={<IconDownload />}
            disabled={!downloadUrl}
            onClick={() => window.open(downloadUrl)}
          >
            Unduh PDF
          </ActionButton>

          <div className={styles.buttonGroup}>
            <button
              className={styles.textButton}
              onClick={() => setPreviewOpen(false)}
            >
              <span className={styles.textButtonIcon}>
                <IconSetting />
              </span>
              <span className={styles.textButtonContent}>Atur Ulang</span>
            </button>
          </div>
        </div>
      </motion.div>
      <Copyright />
    </div>
  );
}

function Copyright() {
  return (
    <div className={styles.copyright}>
      <div>
        <IniResumeLogo />
      </div>
      <div>
        &copy; {new Date().getFullYear()}{' '}
        <ExternalLink
          href="https://sakitkepala.dev/dika"
          className={appStyles.linkUnderline}
        >
          Andika Priyotama
        </ExternalLink>
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
    <motion.div
      className={styles.setupPanel}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className={styles.setupPanelSection}>
        <h2>
          <span className={styles.setupHeadingText}>
            Generate PDF &amp; Lihat Previewnya
          </span>
        </h2>

        <div className={styles.setupCard}>
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
      </div>

      <div className={styles.setupPanelFooter}>
        <ActionButton
          icon={
            <span role="img" aria-label="Emoji preview">
              👀
            </span>
          }
          disabled={previewDisabled}
          onClick={() => onPreview(config)}
        >
          Lihat Preview
        </ActionButton>
      </div>
    </motion.div>
  );
}

function ActionButton({
  icon,
  onClick,
  disabled,
  children,
}: React.PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}>) {
  return (
    <span className={styles.actionPressable}>
      <button
        className={clsx(appStyles.actionButton, styles.actionButton)}
        disabled={disabled}
        onClick={onClick}
      >
        <span>{icon}</span>
        <span>{children}</span>
      </button>
    </span>
  );
}

export { PreviewPanel, ConfigPanel };
