import { LineSectionHeading } from '../components/section-heading';
import { LineAddOtherProject } from '../components/line-add-item';
import { FieldOtherProjectItemName } from '../components/field-other-project-item-name';
import { FieldOtherProjectItemDescription } from '../components/field-other-project-item-description';
import { FieldOtherProjectItemURL } from '../components/field-other-project-item-url';
import { type ResumeData } from 'src/app/data/resume';
import {
  type LineContent,
  type BuildConfigState,
  GroupTypeNames,
} from '../types';

function sectionOtherProjects(
  resume: ResumeData,
  state: BuildConfigState
): LineContent[] {
  const otherProjectsIsOpen =
    state.activeGroup?.type === GroupTypeNames.OTHER_PROJECTS;

  return [
    {
      id: 'section-other-projects',
      content: <LineSectionHeading>Projek Lain</LineSectionHeading>,
    },
    { id: 'section-other-projects-trail' },

    ...resume.otherProjects.reduce<LineContent[]>((contents, project) => {
      return [
        ...contents,

        {
          id: project.id + '-other-projects-item-headline',
          activateable: true,
          content: (
            <FieldOtherProjectItemName
              projectId={project.id}
              value={project.name}
            />
          ),
        },
        { id: project.id + '-other-projects-item-headline-trail' },

        {
          id: project.id + '-other-projects-item-description',
          activateable: true,
          content: (
            <FieldOtherProjectItemDescription
              projectId={project.id}
              value={project.description}
            />
          ),
        },
        { id: project.id + '-other-projects-item-description-trail' },

        {
          id: project.id + '-other-projects-item-url',
          activateable: true,
          content: (
            <FieldOtherProjectItemURL
              projectId={project.id}
              value={project.url}
            />
          ),
        },
        { id: project.id + '-other-projects-item-trail' },
      ];
    }, []),

    {
      id: state.nextCreateId + '-other-projects-item-headline',
      activateable: true,
      show: otherProjectsIsOpen,
      content: <FieldOtherProjectItemName projectId={state.nextCreateId} />,
    },
    {
      id: state.nextCreateId + '-other-projects-item-headline-trail',
      show: otherProjectsIsOpen,
    },

    {
      id: state.nextCreateId + '-other-projects-item-description',
      activateable: true,
      show: otherProjectsIsOpen,
      content: (
        <FieldOtherProjectItemDescription projectId={state.nextCreateId} />
      ),
    },
    {
      id: state.nextCreateId + '-other-projects-item-description-trail',
      show: otherProjectsIsOpen,
    },

    {
      id: state.nextCreateId + '-other-projects-item-url',
      activateable: true,
      show: otherProjectsIsOpen,
      content: <FieldOtherProjectItemURL projectId={state.nextCreateId} />,
    },
    {
      id: state.nextCreateId + '-other-projects-item-url-trail',
      show: otherProjectsIsOpen,
    },

    {
      id: 'section-other-projects-add',
      activateable: true,
      show: !otherProjectsIsOpen,
      content: <LineAddOtherProject />,
    },
    {
      id: 'section-other-projects-add-1',
      activateable: true,
      show: !otherProjectsIsOpen,
      content: <LineAddOtherProject nextLine />,
    },
    {
      id: 'section-other-projects-add-trail',
      show: !otherProjectsIsOpen,
    },
  ];
}

export { sectionOtherProjects };
