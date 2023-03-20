import * as React from 'react';
import ContentLoader from 'react-content-loader';
import { PreviewContent } from './preview-content';
import * as styles from './preview-paper.css';

export type PreviewPaperProps = {
  children: React.ReactElement;
  filename?: string;
  onUrlChange: (url: string) => void;
};

// Implementasi viewer custom pakai react-pdf dari sini:
// https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js
// ...sama di sini, tapi ini lebih rumit, cek aja:
// https://github.com/jeetiss/react-pdf-repl/blob/main/components/viewer.js
function PreviewPaper({ children, filename, onUrlChange }: PreviewPaperProps) {
  const [isLoading, setLoading] = React.useState(true);
  return (
    <div
      className={styles.paper}
      title={
        isLoading
          ? undefined
          : filename
          ? `Preview resume ${filename}`
          : 'Preview resume'
      }
    >
      <PreviewContent
        doc={children}
        onRendering={() => {
          setLoading(true);
          onUrlChange('');
        }}
        onSuccess={(url) => {
          setLoading(false);
          onUrlChange(url);
        }}
      />
      {isLoading && <RenderingLoader />}
    </div>
  );
}

function RenderingLoader() {
  return (
    <div className={styles.rendering}>
      <ContentLoader
        speed={2}
        width={595}
        height={842}
        viewBox="0 0 595 842"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        title="Merender preview..."
      >
        {/* Heading */}
        <rect x="30" y="40" rx="2" ry="2" width="232" height="22" />
        <rect x="30" y="71" rx="2" ry="2" width="180" height="14" />
        <rect x="30" y="112" rx="2" ry="2" width="121" height="9" />
        <rect x="161" y="112" rx="2" ry="2" width="121" height="9" />

        {/* Column left */}
        {/* Pengalaman */}
        <rect x="30" y="160" rx="2" ry="2" width="180" height="14" />

        <rect x="30" y="190" rx="2" ry="2" width="240" height="11" />
        <rect x="30" y="210" rx="2" ry="2" width="300" height="9" />
        <rect x="30" y="225" rx="2" ry="2" width="300" height="9" />
        <rect x="30" y="240" rx="2" ry="2" width="280" height="9" />

        <rect x="30" y="380" rx="2" ry="2" width="240" height="11" />
        <rect x="30" y="400" rx="2" ry="2" width="300" height="9" />
        <rect x="30" y="415" rx="2" ry="2" width="300" height="9" />
        <rect x="30" y="430" rx="2" ry="2" width="280" height="9" />

        {/* Projek Lain */}
        <rect x="30" y="662" rx="2" ry="2" width="180" height="14" />

        {/* Column right */}
        <rect x="400" y="160" rx="2" ry="2" width="160" height="9" />
        <rect x="400" y="175" rx="2" ry="2" width="160" height="9" />
        <rect x="400" y="190" rx="2" ry="2" width="160" height="9" />

        <rect x="400" y="210" rx="2" ry="2" width="120" height="9" />
        <rect x="400" y="225" rx="2" ry="2" width="100" height="9" />

        {/* Pendidikan */}
        <rect x="400" y="260" rx="2" ry="2" width="160" height="14" />

        {/* Skill kunci */}
        <rect x="400" y="460" rx="2" ry="2" width="160" height="14" />
        <rect x="400" y="485" rx="2" ry="2" width="35" height="16" />
        <rect x="440" y="485" rx="2" ry="2" width="45" height="16" />
        <rect x="490" y="485" rx="2" ry="2" width="35" height="16" />
        <rect x="400" y="505" rx="2" ry="2" width="55" height="16" />
        <rect x="460" y="505" rx="2" ry="2" width="35" height="16" />
        <rect x="400" y="525" rx="2" ry="2" width="40" height="16" />
      </ContentLoader>
    </div>
  );
}

export { PreviewPaper };
