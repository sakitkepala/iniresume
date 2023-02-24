import { LineBreak } from './components/line-break';
import { ListItemLine } from './components/list-item-line';
import { FieldParagraph } from './components/field-paragraph';
import { LineSectionHeading } from './components/section-heading';
import { FieldListItemText } from './components/field-list-item-text';
import { FieldGender } from './components/field-gender';
import { FieldDateOfBirth } from './components/field-date-of-birth';
import { FieldListItemPhone } from './components/field-list-item-phone';
import { FieldWebsite } from './components/field-website';
import { FieldProfileAccount } from './components/field-profile-account';
import { FieldListItemAddProfile } from './components/field-list-item-add-profile';
import {
  FieldExperienceTitle,
  FieldExperienceEmployer,
  FieldEducationSchool,
  FieldEducationMajor,
} from './components/field-heading';
import {
  FieldExperienceDescription,
  FieldEducationDescription,
} from './components/field-paragraph';
import {
  LineAddExperience,
  LineAddEducation,
} from './components/line-add-item';

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
      content: <LineSectionHeading>Informasi</LineSectionHeading>,
    },
    { id: 'section-infos-trail' },

    { id: 'infos-general', content: <>Umum:</> },
    { id: 'infos-general-trail' },

    {
      id: 'fullName',
      activateable: true,
      content: (
        <FieldListItemText
          field="fullName"
          label="Nama lengkap"
          value={resume.fullName}
        />
      ),
    },
    {
      id: 'title',
      activateable: true,
      content: (
        <FieldListItemText
          field="title"
          label="Titel profesi"
          value={resume.title}
        />
      ),
    },
    {
      id: 'gender',
      activateable: true,
      content: <FieldGender value={resume.gender} />,
    },
    {
      id: 'birthdate',
      activateable: true,
      content: <FieldDateOfBirth value={resume.birthdate} />,
    },
    {
      id: 'city',
      activateable: true,
      content: (
        <FieldListItemText
          field="city"
          label="Kota domisili"
          value={resume.city}
        />
      ),
    },
    {
      id: 'province',
      activateable: true,
      content: (
        <FieldListItemText
          field="province"
          label="Provinsi domisili"
          value={resume.province}
        />
      ),
    },
    { id: 'infos-general-list-trail' },

    { id: 'infos-contact', content: <>Kontak:</> },
    { id: 'infos-contact-trail' },

    {
      id: 'email',
      activateable: true,
      content: (
        <FieldListItemText field="email" label="Email" value={resume.email} />
      ),
    },
    {
      id: 'phone',
      activateable: true,
      content: (
        <FieldListItemPhone
          value={resume.phone.number}
          hasWA={resume.phone.wa}
        />
      ),
    },
    { id: 'infos-contact-list-trail' },

    { id: 'infos-profile', content: <>Profil:</> },
    { id: 'infos-profile-trail' },

    {
      id: 'website',
      activateable: true,
      content: <FieldWebsite />,
    },
    ...resume.accounts.reduce<LineContent[]>(
      (contents, account) => [
        ...contents,
        {
          id: account.id,
          activateable: true,
          content: <FieldProfileAccount account={account} />,
        },
      ],
      []
    ),
    {
      id: 'profile-add',
      activateable: true,
      content: <FieldListItemAddProfile />,
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
          activateable: true,
          content: (
            <FieldExperienceTitle
              label="Titel Pekerjaan"
              experienceId={experience.id}
              value={experience.title}
            />
          ),
        },
        { id: experience.id + '-experience-title-trail' },

        {
          id: experience.id + '-experience-employer',
          activateable: true,
          content: (
            <FieldExperienceEmployer
              label="Nama Perusahaan"
              experienceId={experience.id}
              value={experience.employer}
            />
          ),
        },
        { id: experience.id + '-experience-employer-trail' },

        {
          id: experience.id + '-experience-description',
          activateable: true,
          content: (
            <FieldExperienceDescription
              experienceId={experience.id}
              value={experience.description}
            />
          ),
        },
        { id: experience.id + '-experience-description-trail' },
      ],
      []
    ),

    {
      id: createId + '-experience-title',
      activateable: true,
      show: experienceIsOpen,
      content: (
        <FieldExperienceTitle
          label="Titel Pekerjaan"
          experienceId={createId || ''}
        />
      ),
    },
    {
      id: createId + '-experience-title-trail',
      show: experienceIsOpen,
    },

    {
      id: createId + '-experience-employer',
      activateable: true,
      show: experienceIsOpen,
      content: (
        <FieldExperienceEmployer
          label="Nama Perusahaan"
          experienceId={createId || ''}
        />
      ),
    },
    {
      id: createId + '-experience-employer-trail',
      show: experienceIsOpen,
    },

    {
      id: createId + '-experience-range',
      activateable: true,
      show: experienceIsOpen,
      content: (
        <FieldParagraph
          label="TODO: range waktu kerja"
          onSave={() => console.log(createId + '-experience-range')}
        />
      ),
    },
    {
      id: createId + '-experience-range-trail',
      show: experienceIsOpen,
    },

    {
      id: createId + '-experience-description',
      activateable: true,
      show: experienceIsOpen,
      content: <FieldExperienceDescription experienceId={createId || ''} />,
    },
    {
      id: createId + '-experience-description-trail',
      show: experienceIsOpen,
    },

    {
      id: 'experience-add',
      activateable: true,
      show: !experienceIsOpen,
      content: <LineAddExperience />,
    },
    {
      id: 'experience-add-trail',
      show: !experienceIsOpen,
    },

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
          id: education.id + '-education-school',
          activateable: true,
          content: (
            <FieldEducationSchool
              label="Universitas atau Sekolah"
              educationId={education.id || ''}
              value={education.school}
            />
          ),
        },
        { id: education.id + '-education-school-trail' },

        {
          id: education.id + '-education-major',
          activateable: true,
          content: (
            <FieldEducationMajor
              label="Jurusan"
              educationId={education.id || ''}
              value={education.major}
            />
          ),
        },
        { id: education.id + '-education-major-trail' },

        {
          id: education.id + '-education-description',
          activateable: true,
          content: (
            <FieldEducationDescription
              educationId={education.id}
              value={education.description}
            />
          ),
        },
        { id: education.id + '-education-description-trail' },
      ],
      []
    ),

    {
      id: createId + '-education-school',
      activateable: true,
      show: educationIsOpen,
      content: (
        <FieldEducationSchool
          label="Universitas atau Sekolah"
          educationId={createId || ''}
        />
      ),
    },
    {
      id: createId + '-education-school-trail',
      show: educationIsOpen,
    },

    {
      id: createId + '-education-major',
      activateable: true,
      show: educationIsOpen,
      content: (
        <FieldEducationMajor label="Jurusan" educationId={createId || ''} />
      ),
    },
    {
      id: createId + '-education-major-trail',
      show: educationIsOpen,
    },

    {
      id: createId + '-education-range',
      activateable: true,
      show: educationIsOpen,
      content: (
        <FieldParagraph
          label="TODO: range waktu studi"
          onSave={() => console.log(createId + '-education-range')}
        />
      ),
    },
    {
      id: createId + '-education-range-trail',
      show: educationIsOpen,
    },

    {
      id: createId + '-education-description',
      activateable: true,
      show: educationIsOpen,
      content: <FieldEducationDescription educationId={createId || ''} />,
    },
    {
      id: createId + '-education-description-trail',
      show: educationIsOpen,
    },

    {
      id: 'education-add',
      activateable: true,
      show: !educationIsOpen,
      content: <LineAddEducation />,
    },
    {
      id: 'education-add-trail',
      show: !educationIsOpen,
    },

    { id: 'section-educations-br', content: <LineBreak /> },
    { id: 'section-educations-br-trail' },

    {
      id: 'section-skills',
      content: <LineSectionHeading>Skill</LineSectionHeading>,
    },
    { id: 'section-skills-trail' },

    {
      id: 'skills-item-id',
      activateable: true,
      content: <ListItemLine>Item skill pak</ListItemLine>,
    },
    { id: 'skills-item-id-trail' },
  ];

  return contentsTemplate.filter(
    (content) => typeof content.show === 'undefined' || content.show
  );
}

export { buildContents };
