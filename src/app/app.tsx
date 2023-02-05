import * as React from 'react';
import {
  usePDF,
  StyleSheet,
  Font,
  Document,
  Page,
  View,
  Text,
} from '@react-pdf/renderer';
import {
  pdfjs,
  Document as ViewerDocument,
  Page as ViewerPage,
} from 'react-pdf';

import { clsx } from 'clsx';

import * as styles from './app.css';
import dmSansReg from '../assets/DMSans-Regular.ttf';
import dmSansBold from '../assets/DMSans-Bold.ttf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const resumeData = {
  fullName: 'Andika Priyotama',
  title: 'Frontend Developer',
  education: [
    {
      name: 'Universitas Dian Nuswantoro',
      from: 2009,
      to: 2017,
      major: 'D3 Teknik Informatika (Multimedia)',
    },
  ],
};

const codeLines = [
  { type: 'h1', content: '# Informasi' },
  { content: '' },
  { content: 'Umum:' },
  { content: '' },
  { content: '- ' + resumeData.fullName },
  { content: '- ' + resumeData.title },
  { content: '- ...' },
  { content: '' },
  { type: 'br', content: '---' },
  { content: '' },
  { type: 'h1', content: '# Pendidikan' },
  { content: '' },
  {
    type: 'h2',
    content: '## ' + resumeData.education[0].name,
  },
  { content: '' },
  {
    type: 'daterange',
    content: `${resumeData.education[0].from}-${resumeData.education[0].to}`,
  },
  { content: '' },
  { content: resumeData.education[0].major },
  { content: '' },
  { content: '...deskripsi' },
  { content: '' },
  { type: 'br', content: '---' },
  { content: '' },
  { type: 'h1', content: '# Pengalaman' },
  { content: '' },
];

function getDownloadFilename(fullname: string, title: string) {
  if (!fullname || !title) {
    return 'iniresume-download.pdf';
  }
  const snakeCaseFullname = fullname.replace(' ', '_');
  const snakeCaseTitle = title.replace(' ', '_');
  // TODO: dikasih last edit beneran. Sementara masih tanggal render.
  const lastEditedYear = new Date().getFullYear();
  const fullFilename = `${snakeCaseFullname}-${snakeCaseTitle}_(${lastEditedYear})`;
  return encodeURIComponent(fullFilename) + '.pdf';
}

export function App() {
  const [resume] = React.useState(resumeData);
  const [isOpen, setOpen] = React.useState<boolean>(true);
  const [instance] = usePDF({ document: <ResumeAsPDF data={resume} /> });
  const downloadFilename = getDownloadFilename(resume.fullName, resume.title);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <div className={styles.logoType}>iniresume.</div>
          {isOpen && (
            <>
              <div>&#47;</div>
              <div onClick={() => setOpen(false)}>
                {resume.fullName}, {resume.title}
              </div>
            </>
          )}
        </div>

        <div className={styles.headerAction}>
          {isOpen && (
            <a
              className={styles.actionButton}
              href={instance.url || undefined}
              download={downloadFilename}
            >
              Unduh
            </a>
          )}
        </div>
      </header>

      <div>
        {isOpen ? (
          <div className={styles.mainContainer}>
            <main className={styles.editorContainer}>
              <div className={styles.editor}>
                {codeLines.map((line, index) => {
                  const textStyles: { [name: string]: string } = {
                    h1: styles.textHeading,
                    h2: styles.textSubheading,
                    daterange: styles.textDaterange,
                    br: styles.textLinebreak,
                  };

                  const textStyle = line.type
                    ? textStyles[line.type]
                    : undefined;

                  return (
                    <div key={index} className={styles.line}>
                      <div className={styles.lineNumber}>{index + 1}</div>
                      <div className={clsx(styles.lineContent, textStyle)}>
                        {line.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>

            <aside className={styles.previewPanel}>
              <div className={styles.previewWrapper}>
                <PDFPreviewPaper file={instance.blob} />
              </div>
            </aside>
          </div>
        ) : (
          <main className={styles.welcome}>
            <h1>Welcome Screen</h1>
            <button
              className={styles.actionButton}
              onClick={() => setOpen(true)}
            >
              Buat Resume
            </button>
          </main>
        )}
      </div>
    </>
  );
}

Font.register({
  family: 'DM Sans',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: dmSansReg,
    },
    {
      fontStyle: 'bold',
      fontWeight: 700,
      src: dmSansBold,
    },
  ],
});

const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: 'DM Sans',
  },
});

function ResumeAsPDF({ data }: { data: typeof resumeData }) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View>
          <Text>
            {data.fullName}, {data.title}
          </Text>
        </View>

        <View>
          <Text>Pendidikan</Text>
          {data.education.map((ed) => (
            <View key={ed.name}>
              <Text>{ed.name}</Text>
              <Text style={{ fontSize: 13 }}>
                {ed.from}-{ed.to}
              </Text>
              <Text style={{ fontSize: 13 }}>{ed.major}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

// Implementasi viewer custom pakai react-pdf dari sini:
// https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js
function PDFPreviewPaper({ file = null }: { file: Blob | null }) {
  return (
    <div className={styles.paper}>
      <ViewerDocument file={file}>
        <ViewerPage
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </ViewerDocument>
    </div>
  );
}

export default App;
