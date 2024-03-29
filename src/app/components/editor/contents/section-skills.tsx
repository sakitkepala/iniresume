import { LineSectionHeading } from '../components/section-heading';
import {
  FieldListItemAddSkill,
  FieldListItemSkill,
} from '../components/field-list-item-skill';

import { type ResumeData } from 'src/app/data/resume';
import { type LineContent, type BuildConfigState } from '../types';

function sectionSkills(
  resume: ResumeData,
  state: BuildConfigState
): LineContent[] {
  const { insertSkillTop } = state;
  return [
    {
      id: 'section-skills',
      content: <LineSectionHeading>Skill</LineSectionHeading>,
    },
    { id: 'section-skills-trail' },

    {
      id: 'skills-insert-top',
      activateable: true,
      show: insertSkillTop,
      content: <FieldListItemAddSkill asInsertTop />,
    },

    ..._makeSkillsList(resume, state),

    {
      id: 'skills-add',
      activateable: true,
      content: <FieldListItemAddSkill />,
    },
    { id: 'skills-add-trail' },
  ];
}

function _makeSkillsList(
  resume: ResumeData,
  state: BuildConfigState
): LineContent[] {
  const skillInsertBelow = state.insertSkillBelow || '';

  return resume.skills.reduce<LineContent[]>((skillItems, skill, index) => {
    const isLast = index === resume.skills.length - 1;

    const skills: LineContent[] = [
      ...skillItems,

      {
        id: 'skills-' + skill,
        activateable: true,
        content: (
          <FieldListItemSkill value={skill} first={index === 0} last={isLast} />
        ),
      },
    ];

    if (!isLast && skillInsertBelow === skill) {
      skills.push({
        id: 'skills-insert-under-' + skill,
        activateable: true,
        content: <FieldListItemAddSkill asInsert insertBelow={skill} />,
      });
    }

    return skills;
  }, []);
}

export { sectionSkills };
