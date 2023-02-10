import * as React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import {
  EditableLinesManagerProvider,
  useEditableLinesManager,
} from './line-editors';
import { ListItemLineEditor } from './line-editors';
import { PlainTextLineEditor } from './line-editors';

import { clsx } from 'clsx';
import { parseISO, format } from 'date-fns';
import id from 'date-fns/locale/id';

import * as styles from './editor.css';

import { type ResumeData } from '../data/resume';

export type EditorProps = {
  data: ResumeData;
};

function Editor({ data }: EditorProps) {
  const codeLinesUI = React.useMemo(() => _buildCodeLinesUI(data), [data]);
  return (
    <div className={styles.editorContainer}>
      <EditorScrollable>
        <EditableLinesManagerProvider>
          <CodeLinesContainer>{codeLinesUI}</CodeLinesContainer>
        </EditableLinesManagerProvider>
      </EditorScrollable>
    </div>
  );
}

function CodeLinesContainer({ children }: React.PropsWithChildren) {
  const { hasActiveLine, resetActiveLine } = useEditableLinesManager();
  return (
    <div className={styles.codeLinesContainer}>
      {hasActiveLine && (
        <div
          className={styles.codeLinesOutsideAreaClickTrigger}
          onClick={resetActiveLine}
        />
      )}
      <div className={styles.codeLinesArea} onClick={resetActiveLine}>
        {children}
      </div>
    </div>
  );
}

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

export type CodeLineProps = { line?: number };

function CodeLineWrapper({
  line,
  children,
}: React.PropsWithChildren<CodeLineProps>) {
  return (
    <div className={styles.line}>
      <div className={styles.lineNumber}>
        {typeof line === 'undefined' ? '#' : line}
      </div>
      {children || <div className={styles.lineContent}>{'TODO:'}</div>}
    </div>
  );
}

function EmptyLine({ line }: CodeLineProps) {
  return (
    <CodeLineWrapper line={line}>
      <div className={styles.lineContent} />
    </CodeLineWrapper>
  );
}

function BreakLine({ line }: CodeLineProps) {
  return (
    <CodeLineWrapper line={line}>
      <div className={styles.textLinebreak}>{'---'}</div>
    </CodeLineWrapper>
  );
}

function HeadingLine({
  line,
  level = 1,
  children,
}: React.PropsWithChildren<CodeLineProps & { level?: number | string }>) {
  const headingStyles: {
    [level: string | number]: string;
  } = {
    1: styles.textHeading,
    2: styles.textSubheading,
    3: styles.textSubheading,
  };
  const marks: {
    [level: string | number]: string;
  } = {
    1: '#',
    2: '##',
    3: '###',
  };
  return (
    <CodeLineWrapper line={line}>
      <div className={clsx(styles.lineContent, headingStyles[level])}>
        {marks[level]} {children}
      </div>
    </CodeLineWrapper>
  );
}

function _buildCodeLinesUI(resume: ResumeData) {
  const codeLines: { content: React.ReactNode }[] = [];
  let nextLineNumber = 1;

  const _appendOneLine = (element: React.ReactNode) => {
    codeLines.push({ content: element });
    nextLineNumber++;
  };

  const _appendTextLine = (content: string) => {
    _appendOneLine(
      <CodeLineWrapper key={nextLineNumber} line={nextLineNumber}>
        <div className={styles.lineContent}>{content}</div>
      </CodeLineWrapper>
    );
    _appendEmptyLine();
  };

  const _appendEmptyLine = () => {
    _appendOneLine(<EmptyLine key={nextLineNumber} line={nextLineNumber} />);
  };

  const _appendHeadingLine = (text: string, level: number | string = 1) => {
    _appendOneLine(
      <HeadingLine key={nextLineNumber} level={level} line={nextLineNumber}>
        {text}
      </HeadingLine>
    );
    _appendEmptyLine();
  };

  const _appendBreakLine = () => {
    _appendOneLine(<BreakLine key={nextLineNumber} line={nextLineNumber} />);
    _appendEmptyLine();
  };

  const _buildUnorderedList = (items: React.ReactNode[]) => {
    items.forEach((item) => {
      _appendOneLine(
        <ListItemLineEditor key={nextLineNumber} line={nextLineNumber}>
          {item}
        </ListItemLineEditor>
      );
    });
    _appendEmptyLine();
  };

  const _buildBlockLines = ({
    heading,
    subheading,
    daterange,
    description,
  }: {
    heading: string;
    subheading: string;
    daterange: React.ReactNode;
    description: React.ReactNode;
  }) => {
    _appendHeadingLine(heading, 2);
    _appendHeadingLine(subheading, 3);

    _appendOneLine(
      <CodeLineWrapper key={nextLineNumber} line={nextLineNumber}>
        <div className={styles.lineContent}>{daterange}</div>
      </CodeLineWrapper>
    );
    _appendEmptyLine();

    _appendOneLine(
      <CodeLineWrapper key={nextLineNumber} line={nextLineNumber}>
        <div className={styles.lineContent}>{description}</div>
      </CodeLineWrapper>
    );
    _appendEmptyLine();
  };

  _appendHeadingLine('Informasi');
  _appendTextLine('Umum:');

  _buildUnorderedList([
    <PlainTextLineEditor
      key={resume.fullName}
      fieldName="fullName"
      label={'...isi nama lengkap'}
    />,
    <PlainTextLineEditor
      key={resume.title}
      fieldName="title"
      label={'...isi title'}
    />,
    <PlainTextLineEditor
      key={resume.gender}
      fieldName="gender"
      label={'...isi gender'}
    />,
    <PlainTextLineEditor
      key={resume.birthdate}
      fieldName="birthdate"
      label={'...isi tanggal lahir'}
    />,
    <PlainTextLineEditor
      key={resume.city}
      fieldName="city"
      label={'...isi kota domisili'}
    />,
    <PlainTextLineEditor
      key={resume.province}
      fieldName="province"
      label={'...isi provinsi domisili'}
    />,
  ]);

  _appendTextLine('Kontak:');
  _buildUnorderedList([
    <PlainTextLineEditor
      key={resume.email}
      fieldName="email"
      label={'...isi alamat email'}
    />,
    `+62${resume.phone?.number}`,
  ]);

  _appendTextLine('Profil:');
  _buildUnorderedList(
    [resume.website?.text, ...resume.accounts.map((acc) => acc.account)].filter(
      (item) => Boolean(item)
    )
  );

  _appendBreakLine();

  _appendHeadingLine('Pengalaman');
  resume.experiences.forEach((experience) => {
    _buildBlockLines({
      heading: experience.title,
      subheading: experience.employer,
      daterange: (
        <span className={styles.textDaterange}>
          {_getMonthRangeText(experience.from, experience.to)}
        </span>
      ),
      description: experience.description || (
        <button>...kasih deskripsi</button>
      ),
    });
  });
  _appendBreakLine();

  _appendHeadingLine('Pendidikan');
  resume.education.forEach((experience) => {
    _buildBlockLines({
      heading: experience.school,
      subheading: experience.major,
      daterange: (
        <span className={styles.textDaterange}>
          {experience.from}-{experience.to}
        </span>
      ),
      description: experience.description || (
        <button>...kasih deskripsi</button>
      ),
    });
  });
  _appendBreakLine();

  _appendHeadingLine('Skill');
  _appendTextLine('...');

  // wtf is this dude wkwk
  return codeLines.map((line) => {
    return line.content;
  });
}

function _getMonthRangeText(from: string, to: string) {
  const _formatMonth = (dateString: string) =>
    format(parseISO(dateString), 'MMMM yyyy', { locale: id });
  return `${_formatMonth(from)} - ${_formatMonth(to)}`;
}

export { Editor };
