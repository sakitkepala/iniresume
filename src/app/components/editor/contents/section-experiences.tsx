import { LineSectionHeading } from '../components/section-heading';
import {
  FieldExperienceTitle,
  FieldExperienceEmployer,
} from '../components/field-heading';
import { FieldExperienceDates } from '../components/field-date-range';
import { FieldExperienceDescription } from '../components/field-paragraph';
import { LineAddExperience } from '../components/line-add-item';
import { FieldListItemProjectName } from '../components/field-list-item-project-name';
import { FieldListItemProjectDescription } from '../components/field-list-item-project-description';
import { FieldListItemProjectURL } from '../components/field-list-item-project-url';
import { ListItemProjectAdd } from '../components/field-list-item-project-add';

import { type ResumeData, type Experience } from 'src/app/data/resume';
import {
  type LineContent,
  type BuildConfigState,
  GroupTypeNames,
} from '../types';

function sectionExperiences(
  resume: ResumeData,
  state: BuildConfigState
): LineContent[] {
  const { nextCreateId, activeGroup } = state;
  const experienceIsOpen = activeGroup?.type === GroupTypeNames.EXPERIENCE;

  return [
    {
      id: 'section-experiences',
      content: <LineSectionHeading>Pengalaman</LineSectionHeading>,
    },
    { id: 'section-experiences-trail' },

    ...experiencesList(resume, state),

    {
      id: nextCreateId + '-experience-title',
      activateable: true,
      show: experienceIsOpen,
      content: (
        <FieldExperienceTitle
          label="Titel Pekerjaan"
          experienceId={nextCreateId || ''}
        />
      ),
    },
    {
      id: nextCreateId + '-experience-title-trail',
      show: experienceIsOpen,
    },

    {
      id: nextCreateId + '-experience-employer',
      activateable: true,
      show: experienceIsOpen,
      content: (
        <FieldExperienceEmployer
          label="Nama Perusahaan"
          experienceId={nextCreateId || ''}
        />
      ),
    },
    {
      id: nextCreateId + '-experience-employer-trail',
      show: experienceIsOpen,
    },

    {
      id: nextCreateId + '-experience-dates',
      activateable: true,
      show: experienceIsOpen,
      content: <FieldExperienceDates experienceId={nextCreateId || ''} />,
    },
    {
      id: nextCreateId + '-experience-dates-trail',
      show: experienceIsOpen,
    },

    {
      id: nextCreateId + '-experience-description',
      activateable: true,
      show: experienceIsOpen,
      content: <FieldExperienceDescription experienceId={nextCreateId || ''} />,
    },
    {
      id: nextCreateId + '-experience-description-trail',
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
  ];
}

function experiencesList(
  resume: ResumeData,
  state: BuildConfigState
): LineContent[] {
  return resume.experiences.reduce<LineContent[]>((contents, experience) => {
    const { activeGroup, nextCreateId } = state;
    const projectIsOpen = activeGroup?.id === experience.id;

    return [
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
        id: experience.id + '-experience-dates',
        activateable: true,
        content: (
          <FieldExperienceDates
            experienceId={experience.id}
            from={experience.from}
            to={experience.to}
            ongoing={experience.ongoing}
          />
        ),
      },
      { id: experience.id + '-experience-dates-trail' },

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

      {
        id: experience.id + '-experience-project-heading',
        show: Boolean(experience.projects?.length),
        content: (
          <span>
            <strong>Projek:</strong>
          </span>
        ),
      },
      {
        id: experience.id + '-experience-project-heading-trail',
        show: Boolean(experience.projects?.length),
      },

      ...projectsList(experience),

      {
        id: nextCreateId + '-project-item-headline',
        activateable: true,
        show: projectIsOpen,
        content: (
          <FieldListItemProjectName
            experienceId={experience.id}
            projectId={nextCreateId || ''}
          />
        ),
      },
      {
        id: nextCreateId + '-project-item-description',
        activateable: true,
        show: projectIsOpen,
        content: (
          <FieldListItemProjectDescription
            experienceId={experience.id}
            projectId={nextCreateId || ''}
          />
        ),
      },
      {
        id: nextCreateId + '-project-item-url',
        activateable: true,
        show: projectIsOpen,
        content: (
          <FieldListItemProjectURL
            experienceId={experience.id}
            projectId={nextCreateId || ''}
          />
        ),
      },
      {
        id: nextCreateId + '-project-item-headline-trail',
        show: projectIsOpen,
      },

      {
        id: experience.id + '-experience-project-add',
        activateable: true,
        show: !projectIsOpen,
        content: (
          <ListItemProjectAdd
            hasProject={Boolean(experience.projects?.length)}
            experienceId={experience.id}
          />
        ),
      },
      {
        id: experience.id + '-experience-project-add-trail',
        show: !projectIsOpen,
      },
    ];
  }, []);
}

function projectsList(experience: Experience): LineContent[] {
  if (!experience.projects?.length) {
    return [];
  }

  return experience.projects.reduce<LineContent[]>(
    (contents, project) => [
      ...contents,
      {
        id: project.id + '-project-item-headline',
        activateable: true,
        content: (
          <FieldListItemProjectName
            experienceId={experience.id}
            projectId={project.id}
            value={project.name}
          />
        ),
      },
      {
        id: project.id + '-project-item-description',
        activateable: true,
        content: (
          <FieldListItemProjectDescription
            experienceId={experience.id}
            projectId={project.id}
            value={project.description}
          />
        ),
      },
      {
        id: project.id + '-project-item-url',
        activateable: true,
        content: (
          <FieldListItemProjectURL
            experienceId={experience.id}
            projectId={project.id || ''}
            value={project.url}
          />
        ),
      },
      { id: project.id + '-project-item-trail' },
    ],
    []
  );
}

export { sectionExperiences };
