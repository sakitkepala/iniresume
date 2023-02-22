import * as React from 'react';
import { useLineContents } from './contexts/line-contents';
import { useActiveLine } from './contexts/active-line';

import { LineBreak } from './components/line-break';

import { type ResumeData } from 'src/app/data/resume';
import { type LineContent } from './types';

function buildContents(
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
      content: 'Informasi',
    },
    { id: 'section-infos-trail' },

    { id: 'infos-general', content: <>Umum:</> },
    { id: 'infos-general-trail' },

    {
      id: 'fullName',
      content: <FieldText value="Nama lengkap" />,
      activateable: true,
    },
    {
      id: 'title',
      content: <FieldText>Titel profesi</FieldText>,
      activateable: true,
    },
    {
      id: 'city',
      content: <FieldText>Kota Domisili</FieldText>,
      activateable: true,
    },
    {
      id: 'province',
      content: <FieldText>Provinsi Domisili</FieldText>,
      activateable: true,
    },
    { id: 'infos-general-list-trail' },

    { id: 'section-infos-br', content: <LineBreak /> },
    { id: 'section-infos-br-trail' },

    {
      id: 'section-experiences',
      content: 'Pengalaman',
    },
    { id: 'section-experiences-trail' },

    ...resume.experiences.reduce<LineContent[]>(
      (contents, experience) => [
        ...contents,
        {
          id: experience.id + '-experience-title',
          content: <GroupMainField value="Titel Pekerjaan" />,
          activateable: true,
        },
        { id: experience.id + '-experience-title-trail' },

        {
          id: experience.id + '-experience-employer',
          content: <FieldText>Nama Perusahaan</FieldText>,
          activateable: true,
        },
        { id: experience.id + '-experience-employer-trail' },

        {
          id: experience.id + '-experience-description',
          content: <FieldText>Deskripsikan pekerjaannya</FieldText>,
          activateable: true,
        },
        { id: experience.id + '-experience-description-trail' },
      ],
      []
    ),

    {
      id: createId + '-experience-title',
      content: <GroupMainField value="Titel Pekerjaan" />,
      activateable: true,
      show: experienceIsOpen,
    },
    {
      id: createId + '-experience-title-trail',
      show: experienceIsOpen,
    },

    {
      id: createId + '-experience-employer',
      content: <FieldText>Nama Perusahaan</FieldText>,
      activateable: true,
      show: experienceIsOpen,
    },
    {
      id: createId + '-experience-employer-trail',
      show: experienceIsOpen,
    },

    {
      id: createId + '-experience-description',
      content: <FieldText>Deskripsikan pekerjaannya</FieldText>,
      activateable: true,
      show: experienceIsOpen,
    },
    {
      id: createId + '-experience-description-trail',
      show: experienceIsOpen,
    },

    {
      id: 'experience-add',
      content: <LineAddExperience />,
      activateable: true,
      show: !experienceIsOpen,
    },
    {
      id: 'experience-add-trail',
      show: !experienceIsOpen,
    },

    { id: 'section-experiences-br', content: <LineBreak /> },
    { id: 'section-experiences-br-trail' },

    {
      id: 'section-educations',
      content: 'Pendidikan',
    },
    { id: 'section-educations-trail' },

    ...resume.education.reduce<LineContent[]>(
      (contents, education) => [
        ...contents,
        {
          id: education.id + '-education-school',
          content: <GroupMainField value="Universitas atau Sekolah" />,
          activateable: true,
        },
        { id: education.id + '-education-school-trail' },

        {
          id: education.id + '-education-major',
          content: <FieldText>Jurusan</FieldText>,
          activateable: true,
        },
        { id: education.id + '-education-major-trail' },

        {
          id: education.id + '-education-description',
          content: <FieldText>Deskripsi</FieldText>,
          activateable: true,
        },
        { id: education.id + '-education-description-trail' },
      ],
      []
    ),

    {
      id: createId + '-education-school',
      content: <GroupMainField value="Universitas atau Sekolah" />,
      activateable: true,
      show: educationIsOpen,
    },
    {
      id: createId + '-education-school-trail',
      show: educationIsOpen,
    },

    {
      id: createId + '-education-major',
      content: <FieldText>Jurusan</FieldText>,
      activateable: true,
      show: educationIsOpen,
    },
    {
      id: createId + '-education-major-trail',
      show: educationIsOpen,
    },

    {
      id: createId + '-education-description',
      content: <FieldText>Deskripsi</FieldText>,
      activateable: true,
      show: educationIsOpen,
    },
    {
      id: createId + '-education-description-trail',
      show: educationIsOpen,
    },

    {
      id: 'education-add',
      content: <LineAddEducation />,
      activateable: true,
      show: !educationIsOpen,
    },
    {
      id: 'education-add-trail',
      show: !educationIsOpen,
    },

    { id: 'section-educations-br', content: <LineBreak /> },
    { id: 'section-educations-br-trail' },
  ];

  return contentsTemplate.filter(
    (content) => typeof content.show === 'undefined' || content.show
  );
}

function FieldText({
  children = null,
  value = '',
}: React.PropsWithChildren<{
  value?: string;
}>) {
  const { isActive, activate } = useActiveLine();
  return (
    <span onClick={activate}>
      {value || children}
      {isActive ? ' (buka)' : null}
    </span>
  );
}

function GroupMainField({ value = '' }: { value: string }) {
  const { activate } = useActiveLine();
  return <span onClick={activate}>{value}</span>;
}

function LineAddExperience() {
  const { isActive } = useActiveLine();
  const { openExperience } = useLineContents();

  React.useEffect(() => {
    isActive && openExperience();
  }, [isActive, openExperience]);

  return (
    <button
      onClick={(ev) => {
        ev.stopPropagation();
        openExperience();
      }}
    >
      Isi pengalaman
    </button>
  );
}

function LineAddEducation() {
  const { isActive } = useActiveLine();
  const { openEducation } = useLineContents();

  React.useEffect(() => {
    isActive && openEducation();
  }, [isActive, openEducation]);

  return <button onClick={openEducation}>Isi pendidikan</button>;
}

export { buildContents };
