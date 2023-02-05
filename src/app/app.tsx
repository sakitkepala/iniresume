import * as React from 'react';
import { clsx } from 'clsx';
import * as styles from './app.css';

const resumeData = {
  fullName: 'Andika Priyotama',
  title: 'Frontend Developer',
};

export function App() {
  const [resume] = React.useState(resumeData);
  const [isOpen, setOpen] = React.useState<boolean>(false);
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
            <button className={styles.actionButton} disabled>
              Unduh
            </button>
          )}
        </div>
      </header>

      <div>
        {isOpen ? (
          <div className={styles.mainContainer}>
            <main className={styles.editorContainer}>
              <div className={styles.editor}>
                {[
                  { type: 'h1', content: '# Informasi' },
                  { content: '' },
                  { content: 'Umum:' },
                  { content: '' },
                  { content: '- ' + resume.fullName },
                  { content: '- ' + resume.title },
                  { content: '- ...' },
                  { content: '' },
                  { type: 'br', content: '---' },
                  { content: '' },
                  { type: 'h1', content: '# Pendidikan' },
                  { content: '' },
                  {
                    type: 'h2',
                    content: '## Universitas Dian Nuswantoro',
                  },
                  { content: '' },
                  { type: 'daterange', content: '2009-2017' },
                  { content: '' },
                  { content: 'D3 Teknik Informatika (Multimedia)' },
                  { content: '' },
                  { content: '...deskripsi' },
                  { content: '' },
                  { type: 'br', content: '---' },
                  { content: '' },
                  { type: 'h1', content: '# Pengalaman' },
                  { content: '' },
                ].map((line, index) => {
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

            <aside className={styles.previewContainer}>
              <div className={styles.paperContainer}>
                <div className={styles.paper}>preview</div>
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

export default App;
