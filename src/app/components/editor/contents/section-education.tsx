import { LineSectionHeading } from '../components/section-heading';
import {
  FieldEducationSchool,
  FieldEducationMajor,
} from '../components/field-heading';
import { FieldEducationDates } from '../components/field-date-range';
import { FieldEducationDescription } from '../components/field-paragraph';
import { LineAddEducation } from '../components/line-add-item';

import { type ResumeData } from 'src/app/data/resume';
import { type LineContent } from '../types';

function sectionEducation(
  resume: ResumeData,
  {
    createId,
    educationIsOpen,
  }: {
    createId: string | null;
    educationIsOpen: boolean;
  }
): LineContent[] {
  return [
    {
      id: 'section-educations',
      content: <LineSectionHeading>Pendidikan</LineSectionHeading>,
    },
    { id: 'section-educations-trail' },

    ...educationList(resume),

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
      id: createId + '-education-dates',
      activateable: true,
      show: educationIsOpen,
      content: <FieldEducationDates educationId={createId || ''} />,
    },
    {
      id: createId + '-education-dates-trail',
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
  ];
}

function educationList(resume: ResumeData) {
  return resume.education.reduce<LineContent[]>(
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
        id: education.id + '-education-dates',
        activateable: true,
        content: (
          <FieldEducationDates
            educationId={education.id}
            from={education.from.toString()}
            to={education.to?.toString() || ''}
          />
        ),
      },
      { id: education.id + '-education-dates-trail' },

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
  );
}

export { sectionEducation };
