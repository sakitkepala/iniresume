import { LineSectionHeading } from '../components/section-heading';
import {
  FieldEducationSchool,
  FieldEducationMajor,
} from '../components/field-heading';
import { FieldEducationDates } from '../components/field-date-range';
import { FieldEducationDescription } from '../components/field-paragraph';
import { LineAddEducation } from '../components/line-add-item';

import { type ResumeData } from 'src/app/data/resume';
import {
  type LineContent,
  type BuildConfigState,
  GroupTypeNames,
} from '../types';

function sectionEducation(
  resume: ResumeData,
  state: BuildConfigState
): LineContent[] {
  const { nextCreateId, activeGroup } = state;
  const educationIsOpen = activeGroup?.type === GroupTypeNames.EDUCATION;
  return [
    {
      id: 'section-educations',
      content: <LineSectionHeading>Pendidikan</LineSectionHeading>,
    },
    { id: 'section-educations-trail' },

    ...educationList(resume),

    {
      id: nextCreateId + '-education-school',
      activateable: true,
      show: educationIsOpen,
      content: (
        <FieldEducationSchool
          label="Universitas atau Sekolah"
          educationId={nextCreateId || ''}
        />
      ),
    },
    {
      id: nextCreateId + '-education-school-trail',
      show: educationIsOpen,
    },

    {
      id: nextCreateId + '-education-major',
      activateable: true,
      show: educationIsOpen,
      content: (
        <FieldEducationMajor label="Jurusan" educationId={nextCreateId || ''} />
      ),
    },
    {
      id: nextCreateId + '-education-major-trail',
      show: educationIsOpen,
    },

    {
      id: nextCreateId + '-education-dates',
      activateable: true,
      show: educationIsOpen,
      content: <FieldEducationDates educationId={nextCreateId || ''} />,
    },
    {
      id: nextCreateId + '-education-dates-trail',
      show: educationIsOpen,
    },

    {
      id: nextCreateId + '-education-description',
      activateable: true,
      show: educationIsOpen,
      content: <FieldEducationDescription educationId={nextCreateId || ''} />,
    },
    {
      id: nextCreateId + '-education-description-trail',
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
