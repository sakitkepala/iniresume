import * as React from 'react';
import { v4 } from 'uuid';
import { useTemporaryInsertLine } from './temporary-insert-line-context';

import { LineWrapper, type LineUI, type LineComponentProps } from './line';

import { type TemporaryInsertLine } from './temporary-insert-line-context';
import { type ResumeData } from 'src/app/data/resume';

function useRenderEditorLines(
  data: ResumeData,
  tmpInsertLine: TemporaryInsertLine | null
) {
  return React.useMemo(
    () => _buildEditorLinesUI(data, tmpInsertLine),
    [data, tmpInsertLine]
  );
}

function _buildEditorLinesUI(
  data: ResumeData,
  tmpInsertLine: TemporaryInsertLine | null
) {
  const linesBase: LineUI[] = [
    _createLineSectionHeading('Informasi'),
    _createLineEmpty(),
    _createLineParagraph('Umum:'),
    _createLineEmpty(),
    _createLineListItemText(data.fullName || ''),
    _createLineListItemText(data.title || ''),
    _createLineListItemText(data.gender || ''),
    _createLineListItemText(data.birthdate || ''),
    _createLineListItemText(data.city || ''),
    _createLineListItemText(data.province || ''),
    _createLineEmpty(),

    _createLineParagraph('Kontak:'),
    _createLineEmpty(),
    _createLineListItemText(data.email || ''),
    _createLineListItemText('+62' + data.phone?.number || ''),
    _createLineEmpty(),

    _createLineParagraph('Profil:'),
    _createLineEmpty(),
    _createLineListItemText(data.website?.url || ''),
    ..._getLinesProfileList(data.accounts),
    _createLineListItemAddProfile(),
    _createLineEmpty(),
    _createLineBreak(),
    _createLineEmpty(),

    _createLineSectionHeading('Pengalaman'),
    _createLineEmpty(),
    ..._getLinesSectionListExperiences(data.experiences),
    _createLineBreak(),
    _createLineEmpty(),

    _createLineSectionHeading('Pendidikan'),
    _createLineEmpty(),
    ..._getLinesSectionListEducation(data.education),
    _createLineBreak(),
    _createLineEmpty(),

    _createLineSectionHeading('Skill'),
    _createLineEmpty(),
    ..._getLinesSkillList(data.skills),
    _createLineListItemAddSkill(),
    _createLineEmpty(),
  ];

  const lines: LineUI[] = tmpInsertLine?.index
    ? _insertLines(linesBase, tmpInsertLine)
    : linesBase;

  return lines.map((line, index) => {
    const element = line.element;
    const lineNumber = index + 1;
    return React.cloneElement(element, {
      key: line.id,
      number: lineNumber,
    });
  });
}

function _insertLines(linesBase: LineUI[], tmpInsertLine: TemporaryInsertLine) {
  const { index, line } = tmpInsertLine;
  const linesWithInsert = [...linesBase];
  linesWithInsert.splice(index, 0, line);
  return linesWithInsert;
}

function _createLineEmpty(): LineUI {
  return {
    id: v4(),
    element: <LineEmpty />,
  };
}

function _createLineBreak(): LineUI {
  return {
    id: v4(),
    element: <LineBreak />,
  };
}

function _createLineParagraph(text: string): LineUI {
  return {
    id: v4(),
    element: <LineParagraph>{text}</LineParagraph>,
  };
}

function _createLineSectionHeading(text: string): LineUI {
  return {
    id: v4(),
    element: <LineSectionHeading>{text}</LineSectionHeading>,
  };
}

function _createLineHeading(text: string, level: string | number = 1): LineUI {
  return {
    id: v4(),
    element: <LineHeading level={level}>{text}</LineHeading>,
  };
}

function _createLineDateRange(text: string): LineUI {
  return {
    id: v4(),
    element: <LineDateRange>{text}</LineDateRange>,
  };
}

function _createLineListItemText(text: string): LineUI {
  return {
    id: v4(),
    element: <LineLiText>{text}</LineLiText>,
  };
}

function _getLinesProfileList(accountsData: ResumeData['accounts']): LineUI[] {
  return accountsData.map((account) => _createLineListItemText(account.url));
}

function _createLineListItemAddProfile(): LineUI {
  return {
    id: v4(),
    element: <LineAddProfile />,
  };
}

function _getLinesSectionListExperiences(
  experiences: ResumeData['experiences']
): LineUI[] {
  const mergedLines: LineUI[] = [];

  experiences.forEach((experience) => {
    mergedLines.push(_createLineHeading(experience.title, 2));
    mergedLines.push(_createLineEmpty());
    mergedLines.push(_createLineHeading(experience.employer, 3));
    mergedLines.push(_createLineEmpty());
    mergedLines.push(
      _createLineDateRange(`${experience.from} - ${experience.to}`)
    );
    mergedLines.push(_createLineEmpty());
    if (experience.description) {
      mergedLines.push(_createLineParagraph(experience.description));
      mergedLines.push(_createLineEmpty());
    }

    experience.projects?.forEach((project) => {
      mergedLines.push(_createLineParagraph(project.name));
      project.description &&
        mergedLines.push(_createLineParagraph(project.description));
      project.url && mergedLines.push(_createLineParagraph(project.url));
      mergedLines.push(_createLineEmpty());
    });
  });

  return mergedLines;
}

function _getLinesSectionListEducation(
  education: ResumeData['education']
): LineUI[] {
  const mergedLines: LineUI[] = [];

  education.forEach((item) => {
    mergedLines.push(_createLineHeading(item.school, 2));
    mergedLines.push(_createLineEmpty());
    mergedLines.push(_createLineHeading(item.major, 3));
    mergedLines.push(_createLineEmpty());
    mergedLines.push(
      _createLineDateRange(
        item.userange ? `${item.from}-${item.to}` : item.from.toString()
      )
    );
    mergedLines.push(_createLineEmpty());
    if (item.description) {
      mergedLines.push(_createLineParagraph(item.description));
      mergedLines.push(_createLineEmpty());
    }
  });

  return mergedLines;
}

function _getLinesSkillList(skillsData: ResumeData['skills']): LineUI[] {
  return skillsData.map((skill) => ({
    id: v4(),
    element: <LineLiSkill>{skill}</LineLiSkill>,
  }));
}

function _createLineListItemAddSkill(): LineUI {
  return {
    id: v4(),
    element: <LineAddSkill />,
  };
}

/**
 *
 *
 *
 *
 *
 *
 *
 * proto
 *
 *
 *
 *
 *
 *
 *
 *
 */

function LineSectionHeading({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  return (
    <LineWrapper line={number}>
      <span>#</span>
      <span>&nbsp;</span>
      <span>{children}</span>
    </LineWrapper>
  );
}

function LineHeading({
  children,
  number,
  level,
}: React.PropsWithChildren<LineComponentProps & { level: string | number }>) {
  const marks: {
    [level: string]: string;
  } = {
    1: '#',
    2: '##',
    3: '###',
  };
  return (
    <LineWrapper line={number}>
      <span>{marks[level.toString()]}</span>
      <span>&nbsp;</span>
      <span>{children}</span>
    </LineWrapper>
  );
}

function LineDateRange({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  return (
    <LineWrapper line={number}>
      <span>{children} (beda di warna font)</span>
    </LineWrapper>
  );
}

function LineEmpty({ number }: LineComponentProps) {
  return (
    <LineWrapper line={number}>
      <span></span>
    </LineWrapper>
  );
}

function LineBreak({ number }: LineComponentProps) {
  return (
    <LineWrapper line={number}>
      <span>---</span>
    </LineWrapper>
  );
}

function LineParagraph({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  return (
    <LineWrapper line={number}>
      <span>{children}</span>
    </LineWrapper>
  );
}

function LineLiText({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  return (
    <LineWrapper line={number}>
      <span>-</span>
      <span>&nbsp;</span>
      <span>{children}</span>
    </LineWrapper>
  );
}

function LineLiSkill({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  return (
    <LineWrapper line={number}>
      <span>-</span>
      <span>&nbsp;</span>
      <span>{children}</span>
      <span>&nbsp;</span>
      <AddSkillUnder index={number ? Number(number) : undefined} />
    </LineWrapper>
  );
}

function AddSkillUnder({ index }: { index?: number }) {
  const { tmpInsertLine, insertLine, discardLine } = useTemporaryInsertLine();

  if (typeof index === 'undefined' || tmpInsertLine) {
    return null;
  }

  const line: TemporaryInsertLine = {
    index,
    line: {
      id: v4(),
      element: (
        <LineLiText>
          <span onClick={() => discardLine()}>
            ... // TODO: editor field skill
          </span>
        </LineLiText>
      ),
    },
  };

  return (
    <span onClick={() => insertLine(line)}>
      <em>
        <u>Tambah di bawahnya</u>
      </em>
    </span>
  );
}

function LineAddProfile({ number }: LineComponentProps) {
  return (
    <LineWrapper line={number}>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>
        <em>
          <u>Tambah profil</u>
        </em>
      </span>
    </LineWrapper>
  );
}

function LineAddSkill({ number }: LineComponentProps) {
  return (
    <LineWrapper line={number}>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>
        <em>
          <u>Tambah skill</u>
        </em>
      </span>
    </LineWrapper>
  );
}

export { useRenderEditorLines };
