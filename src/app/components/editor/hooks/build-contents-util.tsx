import { LineBreak } from '../components/line-break';

import { sectionInfos } from '../contents/section-infos';
import { sectionExperiences } from '../contents/section-experiences';
import { sectionEducation } from '../contents/section-education';
import { sectionSkills } from '../contents/section-skills';
import { sectionOtherProjects } from '../contents/section-other-projects';

import { type ResumeData } from 'src/app/data/resume';
import { type LineContent, type BuildConfigState } from '../types';

function buildContents(
  resume: ResumeData,
  configState: BuildConfigState
): LineContent[] {
  return [
    ...sectionInfos(resume, configState),

    { id: 'section-infos-br', content: <LineBreak /> },
    { id: 'section-infos-br-trail' },

    ...sectionExperiences(resume, configState),

    { id: 'section-experiences-br', content: <LineBreak /> },
    { id: 'section-experiences-br-trail' },

    ...sectionEducation(resume, configState),

    { id: 'section-educations-br', content: <LineBreak /> },
    { id: 'section-educations-br-trail' },

    ...sectionSkills(resume, configState),

    { id: 'section-skills-br', content: <LineBreak /> },
    { id: 'section-skills-br-trail' },

    ...sectionOtherProjects(resume, configState),
  ];
}

export { buildContents };
