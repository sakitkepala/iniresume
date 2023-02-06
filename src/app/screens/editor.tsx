import * as React from 'react';
import { usePDF } from '@react-pdf/renderer';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { HeaderBar } from '../components/header-bar';
import { ResumePDF } from '../components/resume-pdf';
import { PreviewPaper } from '../components/preview-paper';

import { clsx } from 'clsx';

import * as styles from './editor.css';

function EditorScrollable({ children = null }: React.PropsWithChildren) {
  return (
    <ScrollArea.Root className={styles.editorScrollableRoot}>
      <ScrollArea.Viewport className={styles.editorScrollableViewport}>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export function ScreenEditor() {
  const [resume] = React.useState(resumeData);
  const [instance] = usePDF({ document: <ResumePDF data={resume} /> });
  return (
    <>
      <HeaderBar
        user={{ fullName: resume.fullName, title: resume.title }}
        downloadUrl={instance.url || undefined}
      />
      <div className={styles.mainContainer}>
        <main>
          <EditorScrollable>
            <div className={styles.editor}>
              {codeLines.map((line, index) => {
                const textStyles: { [name: string]: string } = {
                  h1: styles.textHeading,
                  h2: styles.textSubheading,
                  daterange: styles.textDaterange,
                  br: styles.textLinebreak,
                };

                const textStyle = line.type ? textStyles[line.type] : undefined;

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
          </EditorScrollable>
        </main>

        <aside className={styles.previewPanel}>
          <div className={styles.previewWrapper}>
            <PreviewPaper file={instance.blob} />
          </div>
        </aside>
      </div>
    </>
  );
}

export const resumeData = {
  fullName: 'Andika Priyotama',
  title: 'Frontend Developer',
  gender: 'male',
  birthdate: '1991-08-27',
  city: 'Kota Semarang',
  province: 'Jawa Tengah',
  email: 'andikapriyotamad@gmail.com',
  phone: '85700003017',
  website: 'https://andika.dev',
  accounts: [
    {
      account: 'github',
      name: 'sakitkepala',
      url: 'https://github.com/sakitkepala',
    },
    {
      account: 'gitlab',
      name: 'andikapriyotamad',
      url: 'https://gitlab.com/andikapriyotamad',
    },
    {
      account: 'linkedin',
      name: 'andikapriyotama',
      url: 'https://linkedin.com/in/andikapriyotama',
    },
  ],
  education: [
    {
      school: 'Universitas Dian Nuswantoro',
      major: 'D3 Teknik Informatika (Multimedia)',
      from: 2009,
      to: 2017,
      description: '',
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
  { type: 'h1', content: '# Pengalaman' },
  { content: '' },
  { type: 'h2', content: '## PT Reka Cipta Digital' },
  { content: '' },
  { type: 'h2', content: '### Frontend Developer' },
  { content: '' },
  {
    type: 'daterange',
    content: `${'Oktober 2021'} - ${'Oktober 2022'}`,
  },
  { content: '' },
  { content: 'MyArchery.id' },
  { content: '' },
  { type: 'h2', content: '## PT Eka Reka Palakerti Indonesia' },
  { content: '' },
  { type: 'h2', content: '### Odoo Software Developer' },
  { content: '' },
  {
    type: 'daterange',
    content: `${'Juli 2019'} - ${'Oktober 2020'}`,
  },
  { content: '' },
  {
    content:
      'Membantu tim dalam mengerjakan projek bersama beberapa klien, yang berperan dalam mengembangkan, mengintegrasi dan memelihara kode sumber modul-modul addon custom pada software ERP bernama Odoo sesuai dengan requirement custom proses bisnis klien. Bekerja dengan Python dan PostgreSQL untuk back-end, serta JavaScript untuk front-end dalam melakukan development menggunakan framework bawaan Odoo.',
  },
  { content: '' },
  {
    content:
      'Modul-modul addon custom yang dikerjakan banyak berhubungan dengan inventory dan manufacturing (Manufacturing Resource Planning/MRP), tatakelola reporting Bea Cukai untuk perusahaan dalam Kawasan Berikat, penjadwalan kunjungan sales canvas pada customer (CRM), disamping addon-addon standar Odoo lainnya serta custom widget untuk user interface web client.',
  },
  { content: '' },
  { type: 'br', content: '---' },
  { content: '' },
  { type: 'h1', content: '# Pendidikan' },
  { content: '' },
  { type: 'h2', content: '## ' + resumeData.education[0].school },
  { content: '' },
  { type: 'h2', content: '### ' + resumeData.education[0].major },
  { content: '' },
  {
    type: 'daterange',
    content: `${resumeData.education[0].from}-${resumeData.education[0].to}`,
  },
  { content: '' },
  { content: '...deskripsi' },
  { content: '' },
];

export default ScreenEditor;
