import { sectionInfos } from './contents/section-infos';
import { sectionExperiences } from './contents/section-experiences';
import { sectionEducation } from './contents/section-education';
import { sectionSkills } from './contents/section-skills';
import { sectionOtherProjects } from './contents/section-other-projects';

import { LineBreak } from './components/line-break';

import { type ResumeData } from 'src/app/data/resume';
import {
  type LineContent,
  GroupTypeNames,
  type BuildConfigState,
} from './types';

function buildContents(
  resume: ResumeData,
  configState: BuildConfigState
): LineContent[] {
  const {
    nextCreateId: createId,
    activeGroup,
    insertSkillTop: skillInsertTop,
    insertSkillBelow: skillInsertBelow,
  } = configState;

  const experienceIsOpen = activeGroup?.type === GroupTypeNames.EXPERIENCE;
  const educationIsOpen = activeGroup?.type === GroupTypeNames.EDUCATION;
  const experienceIdToAddProject =
    activeGroup?.type === GroupTypeNames.PROJECT && activeGroup.id
      ? activeGroup.id
      : null;

  const contentsTemplate: LineContent[] = [
    ...sectionInfos(resume),
    { id: 'section-infos-br', content: <LineBreak /> },
    { id: 'section-infos-br-trail' },

    ...sectionExperiences(resume, {
      createId,
      experienceIsOpen,
      experienceIdToAddProject,
    }),
    { id: 'section-experiences-br', content: <LineBreak /> },
    { id: 'section-experiences-br-trail' },

    ...sectionEducation(resume, { createId, educationIsOpen }),
    { id: 'section-educations-br', content: <LineBreak /> },
    { id: 'section-educations-br-trail' },

    ...sectionSkills(resume, { skillInsertTop, skillInsertBelow }),
    { id: 'section-skills-br', content: <LineBreak /> },
    { id: 'section-skills-br-trail' },

    ...sectionOtherProjects(resume, configState),
  ];

  return contentsTemplate.filter(
    (content) => typeof content.show === 'undefined' || content.show
  );
}

export { buildContents };
