import * as React from 'react';
import { useOnClickOutside } from '../../hooks/click-outside';
import { type ResumeData, useResumeEditor } from '../../contexts/resume-editor';
import {
  EditableLinesManager,
  useEditableLinesManager,
} from './contexts/editable-lines-manager';
import { LinesOperationProvider } from './contexts/lines-operation';

import { EditorLine, LineBreak } from './components/line';
import { LineSectionHeading } from './components/line-section-heading';
import { LineListItemText } from './fields/li-text';
import { LineListItemGender } from './fields/li-gender';
import { LineListItemDateOfBirth } from './fields/li-date-of-birth';
import { LineListItemPhone } from './fields/li-phone';
import { LineAddExperience } from './fields/experiences';
import { LineHeadingField } from './fields/heading';
import { ExperienceFieldProvider } from './fields/experiences/context';
import { TriggerText } from './fields/trigger-text';

import { LineContent } from './types';

import * as styles from '../editor.css';

function EditorLines() {
  const { resume } = useResumeEditor();
  const { contents, operation } = useEditorContents(resume);
  return (
    <LinesOperationProvider operations={{ operation }}>
      <EditableLinesManager>
        <ExperienceFieldProvider>
          <LinesList contents={contents} />
        </ExperienceFieldProvider>
      </EditableLinesManager>
    </LinesOperationProvider>
  );
}

function LinesList({ contents = [] }: { contents: LineContent[] }) {
  const { resetActiveLine } = useEditableLinesManager();
  const $container = React.useRef<HTMLDivElement>(null);
  useOnClickOutside($container, resetActiveLine);
  return (
    <div className={styles.codeLinesContainer}>
      <div
        ref={$container}
        className={styles.codeLinesArea}
        onClick={resetActiveLine}
      >
        {contents.map(({ id, content }, index) => (
          <EditorLine key={id} id={id} line={index + 1}>
            {content}
          </EditorLine>
        ))}
      </div>
    </div>
  );
}

function useEditorContents(resume: ResumeData): {
  contents: LineContent[];
  operation: React.Dispatch<React.SetStateAction<LineContent[]>>;
} {
  const cleanContents = React.useMemo(() => buildContents(resume), [resume]);
  const [contents, operation] = React.useState(cleanContents);
  React.useEffect(() => {
    operation(cleanContents);
  }, [cleanContents]);

  return { contents, operation };
}

function buildContents(resume: ResumeData): LineContent[] {
  return [
    {
      id: 'section-infos',
      content: <LineSectionHeading>Informasi</LineSectionHeading>,
    },
    { id: 'section-infos-trail' },

    { id: 'infos-general', content: <>Umum:</> },
    { id: 'infos-general-trail' },

    {
      id: 'fullName',
      content: (
        <LineListItemText field="fullName" label="Nama lengkap">
          {resume.fullName}
        </LineListItemText>
      ),
    },
    {
      id: 'title',
      content: (
        <LineListItemText field="title" label="Titel profesi">
          {resume.title}
        </LineListItemText>
      ),
    },
    {
      id: 'gender',
      content: <LineListItemGender>{resume.gender}</LineListItemGender>,
    },
    {
      id: 'birthdate',
      content: (
        <LineListItemDateOfBirth>{resume.birthdate}</LineListItemDateOfBirth>
      ),
    },
    {
      id: 'city',
      content: (
        <LineListItemText field="city" label="Kota Domisili">
          {resume.city}
        </LineListItemText>
      ),
    },
    {
      id: 'province',
      content: (
        <LineListItemText field="province" label="Provinsi Domisili">
          {resume.province}
        </LineListItemText>
      ),
    },
    { id: 'infos-general-list-trail' },

    { id: 'infos-contact', content: <>Kontak:</> },
    { id: 'infos-contact-trail' },

    {
      id: 'email',
      content: (
        <LineListItemText field="email" label="Email">
          {resume.email}
        </LineListItemText>
      ),
    },
    {
      id: 'phone',
      content: (
        <LineListItemPhone hasWA={resume.phone.wa}>
          {resume.phone.number}
        </LineListItemPhone>
      ),
    },
    { id: 'infos-contact-list-trail' },

    { id: 'infos-profile', content: <>Profil:</> },
    { id: 'infos-profile-trail' },

    {
      id: 'website',
      content: (
        <LineListItemText field="website" label="Website personal">
          {resume.website?.url || ''}
        </LineListItemText>
      ),
    },
    {
      id: 'profile-add',
      content: (
        <span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <TriggerText>Tambah profil lainnya</TriggerText>
        </span>
      ),
    },
    { id: 'infos-profile-list-trail' },

    { id: 'section-infos-br', content: <LineBreak /> },
    { id: 'section-infos-br-trail' },

    {
      id: 'section-experiences',
      content: <LineSectionHeading>Pengalaman</LineSectionHeading>,
    },
    { id: 'section-experiences-trail' },

    ...resume.experiences.reduce<LineContent[]>(
      (contents, experience) => [
        ...contents,
        {
          id: experience.id + '-title',
          content: (
            <LineHeadingField level={2}>{experience.title}</LineHeadingField>
          ),
        },
        { id: experience.id + '-title-trail' },

        {
          id: experience.id + '-employer',
          content: (
            <LineHeadingField level={3}>{experience.employer}</LineHeadingField>
          ),
        },
        { id: experience.id + '-employer-trail' },

        {
          id: experience.id + '-description',
          content: experience.description,
        },
        { id: experience.id + '-description-trail' },
      ],
      []
    ),

    { id: 'experience-add', content: <LineAddExperience /> },
    { id: 'experience-add-trail' },

    { id: 'section-experiences-br', content: <LineBreak /> },
    { id: 'section-experiences-br-trail' },

    {
      id: 'section-educations',
      content: <LineSectionHeading>Pendidikan</LineSectionHeading>,
    },
    { id: 'section-educations-trail' },

    {
      id: 'education-add',
      content: <LineAddExperience />,
    },
    { id: 'education-add-trail' },

    { id: 'section-educations-br', content: <LineBreak /> },
    { id: 'section-educations-br-trail' },

    {
      id: 'section-skills',
      content: <LineSectionHeading>Skill</LineSectionHeading>,
    },
    { id: 'section-skills-trail' },
  ];
}

export { EditorLines };
