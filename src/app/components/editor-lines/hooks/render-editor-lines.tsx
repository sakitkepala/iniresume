import * as React from 'react';

import {
  LineWrapper,
  LineEmpty,
  LineBreak,
  LineHeading,
  LineParagraph,
} from '../components/line';
import { LineSectionHeading } from '../components/line-section-heading';
import { LineListItemText } from '../fields/li-text';
import { LineListItemSkill, LineAddSkill } from '../fields/li-skill';

import { type ResumeData } from 'src/app/data/resume';
import { type TemporaryInsertLine } from '../contexts/temporary-insert-line';
import { type LineComponentProps } from '../components/line';
import { type LineUI } from '../types';

import { v4 } from 'uuid';

import * as fieldStyles from '../fields/common-styles.css';

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
    _createLineListItemText('fullName', data.fullName || '', 'nama lengkap'),
    _createLineListItemText('title', data.title || '', 'titel profesi'),
    _createLineListItemText('gender', data.gender || '', 'gender'),
    _createLineListItemText('birthdate', data.birthdate || '', 'tanggal lahir'),
    _createLineListItemText('city', data.city || '', 'kota domisili'),
    _createLineListItemText('province', data.province || '', 'provinsi'),
    _createLineEmpty(),

    _createLineParagraph('Kontak:'),
    _createLineEmpty(),
    _createLineListItemText('email', data.email || '', 'email'),
    _createLineListItemText(
      'phone',
      '+62' + data.phone?.number || '',
      'nomor telepon'
    ),
    _createLineEmpty(),

    _createLineParagraph('Profil:'),
    _createLineEmpty(),
    _createLineListItemText(
      'website',
      data.website?.url || '',
      '... website pribadi'
    ),
    ..._getLinesProfileList(data.accounts),
    _createLineListItemAddProfile(),
    _createLineEmpty(),

    _createLineBreak(),
    _createLineEmpty(),

    _createLineSectionHeading('Pengalaman'),
    _createLineEmpty(),
    ..._getLinesSectionListExperiences(data.experiences),
    _createLineListItemAddExperience(),
    _createLineEmpty(),

    _createLineBreak(),
    _createLineEmpty(),

    _createLineSectionHeading('Pendidikan'),
    _createLineEmpty(),
    ..._getLinesSectionListEducation(data.education),
    _createLineListItemAddEducation(),
    _createLineEmpty(),

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

function _createLineListItemText(
  field: keyof ResumeData,
  text: string,
  label: string
): LineUI {
  return {
    id: v4(),
    element: (
      <LineListItemText field={field} label={label}>
        {text}
      </LineListItemText>
    ),
  };
}

function _getLinesProfileList(accountsData: ResumeData['accounts']): LineUI[] {
  // TODO: editable list item akun
  return accountsData.map((account) => _createLineParagraph(account.url));
}

function _createLineListItemAddProfile(): LineUI {
  return {
    id: v4(),
    element: <LineAddProfile />,
  };
}

function _createLineListItemAddExperience(): LineUI {
  return {
    id: v4(),
    element: <LineAddExperience />,
  };
}

function _createLineListItemAddEducation(): LineUI {
  return {
    id: v4(),
    element: <LineAddEducation />,
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
    element: <LineListItemSkill>{skill}</LineListItemSkill>,
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

function LineDateRange({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  return (
    <LineWrapper line={number}>
      <span className={fieldStyles.textDaterange}>{children}</span>
    </LineWrapper>
  );
}

function LineAddProfile({ number }: LineComponentProps) {
  return (
    <LineWrapper line={number}>
      <span className={fieldStyles.listItemWrapper}>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>
          <em>
            <u>Tambah profil</u>
          </em>
        </span>
      </span>
    </LineWrapper>
  );
}

function LineAddExperience({ number }: LineComponentProps) {
  return (
    <LineWrapper line={number}>
      <span>
        <em>
          <u>Tambah pengalaman</u>
        </em>
      </span>
    </LineWrapper>
  );
}

function LineAddEducation({ number }: LineComponentProps) {
  return (
    <LineWrapper line={number}>
      <span>
        <em>
          <u>Tambah pendidikan</u>
        </em>
      </span>
    </LineWrapper>
  );
}

export { useRenderEditorLines };
