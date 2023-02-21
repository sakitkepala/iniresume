import * as React from 'react';
import { useOnClickOutside } from '../../hooks/click-outside';
import { type ResumeData, useResumeEditor } from '../../contexts/resume-editor';
import {
  EditableLinesManager,
  useEditableLinesManager,
} from './contexts/editable-lines-manager';

import { EditorLine, LineBreak } from './components/line';
import { TriggerText } from './fields/trigger-text';
import { LineSectionHeading } from './components/line-section-heading';
import { LineListItemText } from './fields/li-text';
import { LineListItemGender } from './fields/li-gender';
import { LineListItemDateOfBirth } from './fields/li-date-of-birth';
import { LineListItemPhone } from './fields/li-phone';
import { LineHeadingField } from './fields/heading';
import {
  ExperienceEditorManager,
  LineAddExperience,
  LineExperienceTitle,
  LineExperienceEmployer,
  LineExperienceDescription,
} from './fields/line-experiences';
import {
  EducationEditorManager,
  LineAddEducation,
} from './fields/line-educations';
// import { LineListItemSkill } from './fields/li-skill';

import { type LineContent } from './types';

import { v4 } from 'uuid';

import * as styles from '../editor.css';

function EditorLines() {
  return (
    <EditableLinesManager>
      <LinesList />
    </EditableLinesManager>
  );
}

function LinesList() {
  const {
    contents,
    createId,
    openExperience,
    closeExperience,
    openEducation,
    closeEducation,
  } = useEditorContents();
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
        <ExperienceEditorManager
          createId={createId}
          openExperience={openExperience}
          closeExperience={closeExperience}
        >
          <EducationEditorManager
            openEducation={openEducation}
            closeEducation={closeEducation}
          >
            {contents.map(({ id, content }, index) => (
              <EditorLine key={id} id={id} line={index + 1}>
                {content}
              </EditorLine>
            ))}
          </EducationEditorManager>
        </ExperienceEditorManager>
      </div>
    </div>
  );
}

function useEditorContents() {
  const { resume } = useResumeEditor();
  const [experienceIsOpen, setExperienceOpen] = React.useState(false);
  const [educationIsOpen, setEducationOpen] = React.useState(false);

  return React.useMemo(() => {
    const createId = experienceIsOpen || educationIsOpen ? v4() : null;
    return {
      contents: _buildContents(resume, {
        createId,
        experienceIsOpen,
        educationIsOpen,
      }),
      createId,
      openExperience: () => setExperienceOpen(true),
      closeExperience: () => setExperienceOpen(false),
      openEducation: () => setEducationOpen(true),
      closeEducation: () => setEducationOpen(false),
    };
  }, [resume, experienceIsOpen, educationIsOpen]);
}

function _buildContents(
  resume: ResumeData,
  {
    createId,
    experienceIsOpen,
    educationIsOpen,
  }: {
    createId: string | null;
    experienceIsOpen: boolean;
    educationIsOpen: boolean;
  }
): LineContent[] {
  const contentsTemplate: LineContent[] = [
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
          id: experience.id + '-experience-title',
          content: (
            <LineExperienceTitle
              label="Titel Pekerjaan"
              experienceId={experience.id}
            >
              {experience.title}
            </LineExperienceTitle>
          ),
        },
        { id: experience.id + '-experience-title-trail' },

        {
          id: experience.id + '-experience-employer',
          content: (
            <LineExperienceEmployer
              label="Nama Perusahaan"
              experienceId={experience.id}
            >
              {experience.employer}
            </LineExperienceEmployer>
          ),
        },
        { id: experience.id + '-experience-employer-trail' },

        {
          id: experience.id + '-experience-description',
          content: (
            <LineExperienceDescription
              label="Deskripsikan pekerjaannya"
              experienceId={experience.id}
            >
              {experience.description}
            </LineExperienceDescription>
          ),
        },
        { id: experience.id + '-experience-description-trail' },
      ],
      []
    ),

    ...(experienceIsOpen
      ? [
          {
            id: createId + '-experience-title',
            content: (
              <LineExperienceTitle
                defaultOpen
                label="Titel Pekerjaan"
                experienceId={createId || ''}
              />
            ),
          },
          { id: createId + '-experience-title-trail' },

          {
            id: createId + '-experience-employer',
            content: (
              <LineExperienceEmployer
                label="Nama Perusahaan"
                experienceId={createId || ''}
              />
            ),
          },
          { id: createId + '-experience-employer-trail' },

          {
            id: createId + '-experience-description',
            content: (
              <LineExperienceDescription
                label="Deskripsikan pekerjaannya"
                experienceId={createId || ''}
              />
            ),
          },
          { id: createId + '-experience-description-trail' },
        ]
      : []),

    ...(!experienceIsOpen
      ? [
          { id: 'experience-add', content: <LineAddExperience /> },
          { id: 'experience-add-trail' },
        ]
      : []),

    { id: 'section-experiences-br', content: <LineBreak /> },
    { id: 'section-experiences-br-trail' },

    {
      id: 'section-educations',
      content: <LineSectionHeading>Pendidikan</LineSectionHeading>,
    },
    { id: 'section-educations-trail' },

    ...resume.education.reduce<LineContent[]>(
      (contents, education) => [
        ...contents,
        {
          id: education.id + '-school',
          content: (
            <LineHeadingField level={2}>{education.school}</LineHeadingField>
          ),
        },
        { id: education.id + '-school-trail' },

        {
          id: education.id + '-major',
          content: (
            <LineHeadingField level={3}>{education.major}</LineHeadingField>
          ),
        },
        { id: education.id + '-major-trail' },

        {
          id: education.id + '-description',
          content: education.description || 'Isi deskripsi',
        },
        { id: education.id + '-description-trail' },
      ],
      []
    ),

    ...(educationIsOpen
      ? [
          {
            id: 'education-add-school',
            content: (
              <LineExperienceTitle
                label="Universitas atau Sekolah"
                experienceId={''}
              />
            ),
          },
          { id: 'education-add-school-trail' },

          {
            id: 'education-add-major',
            content: (
              <LineExperienceEmployer label="Jurusan" experienceId={''} />
            ),
          },
          { id: 'education-add-major-trail' },

          { id: 'education-add-description', content: 'Deskripsi' },
          { id: 'education-add-description-trail' },
        ]
      : []),

    ...(!educationIsOpen
      ? [
          { id: 'education-add', content: <LineAddEducation /> },
          { id: 'education-add-trail' },
        ]
      : []),

    { id: 'section-educations-br', content: <LineBreak /> },
    { id: 'section-educations-br-trail' },

    {
      id: 'section-skills',
      content: <LineSectionHeading>Skill</LineSectionHeading>,
    },
    { id: 'section-skills-trail' },

    ...resume.skills.map((skill) => ({
      id: skill,
      content: (
        <span>
          <span>-</span>
          <span>&nbsp;</span>
          <span>{skill}</span>
        </span>
      ),
    })),
    ...(resume.skills.length ? [{ id: 'section-skills-list-trail' }] : []),
  ];

  return contentsTemplate;
}

export { EditorLines };
