import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResumeEditorProvider } from './resume-editor';
import {
  TestUpdateTextField,
  TestUpdatePhone,
  TestUpdateWebsite,
  TestUpdateAccount,
  TestUpdateSkills,
  TestUpdateEducation,
  TestUpdateOtherProject,
  TestUpdateExperiences,
  TestUpdateExperienceProject,
} from './tests/components';

function _getTestElement(
  testId: string
): [HTMLElement, HTMLElement | null, HTMLElement] {
  const $container = screen.getByTestId(testId);
  const $value = within($container).queryByTestId('value');
  const $save = within($container).getByRole('button', { name: /save/i });
  return [$save, $value, $container];
}

describe('useResumeEditor', () => {
  test('update field teks', async () => {
    const value = 'Chuck Norris';
    render(
      <ResumeEditorProvider>
        <TestUpdateTextField value={value} />
      </ResumeEditorProvider>
    );

    const $value = screen.getByTestId('value');
    const $save = screen.getByRole('button', { name: /save/i });

    expect($value).toBeEmptyDOMElement();

    await userEvent.click($save);

    expect($value).toHaveTextContent(value);
  });

  test('update field phone', async () => {
    const value = '85777777777';
    render(
      <ResumeEditorProvider>
        <TestUpdatePhone value={value} />
      </ResumeEditorProvider>
    );

    const [$saveNumber, $number] = _getTestElement('update-phone-number');
    const [$saveWA, $wa] = _getTestElement('update-phone-wa');

    expect($number).toBeEmptyDOMElement();
    expect($wa).toHaveTextContent('off');

    await userEvent.click($saveNumber);
    await userEvent.click($saveWA);

    expect($number).toHaveTextContent(value);
    expect($wa).toHaveTextContent('on');
  });

  test('update field website', async () => {
    const text = 'This is link';
    const url = 'http://localhost:2211';
    render(
      <ResumeEditorProvider>
        <TestUpdateWebsite text={text} url={url} />
      </ResumeEditorProvider>
    );

    const $value = screen.getByTestId('value');
    const [$saveComplete] = _getTestElement('update-website-complete');
    const [$saveUrlOnly] = _getTestElement('update-website-url-only');
    const [$saveTextOnly] = _getTestElement('update-website-text-only');

    expect($value).toBeEmptyDOMElement();

    await userEvent.click($saveComplete);

    expect($value).toHaveTextContent(text + url);

    await userEvent.click($saveUrlOnly);

    expect($value).toHaveTextContent(url);

    await userEvent.click($saveTextOnly);

    expect($value).toBeEmptyDOMElement();
  });

  test('update field account', async () => {
    render(
      <ResumeEditorProvider>
        <TestUpdateAccount />
      </ResumeEditorProvider>
    );

    let $accounts = screen.getAllByTestId(/account-item/i);
    const [$addNew] = _getTestElement('update-account-add-new');
    const [$updateFields] = _getTestElement('update-account-update-fields');
    const [$deleteByAccount] = _getTestElement(
      'update-account-delete-by-account'
    );
    const [$deleteByUrl] = _getTestElement('update-account-delete-by-url');
    const [$clearGithub] = _getTestElement('update-account-clear-github');
    const [$clearLinkedin] = _getTestElement('update-account-clear-linkedin');

    expect($accounts).toHaveLength(2);

    await userEvent.click($addNew);
    $accounts = screen.getAllByTestId(/account-item/i);

    expect($accounts).toHaveLength(3);
    expect(within($accounts[2]).getByTestId('id')).toHaveTextContent(
      'new-profile'
    );
    expect(within($accounts[2]).getByTestId('account')).toHaveTextContent(
      'Instagram'
    );
    expect(within($accounts[2]).getByTestId('url')).toHaveTextContent(
      'https://instagram.com/profile'
    );
    expect(within($accounts[2]).getByTestId('text')).toHaveTextContent(
      'Profile Text'
    );

    await userEvent.click($updateFields);
    $accounts = screen.getAllByTestId(/account-item/i);

    expect(within($accounts[2]).getByTestId('account')).toHaveTextContent(
      'Gitlab'
    );
    expect(within($accounts[2]).getByTestId('url')).toHaveTextContent(
      'https://gitlab.com/profile'
    );
    expect(within($accounts[2]).getByTestId('text')).toBeEmptyDOMElement();

    await userEvent.click($deleteByAccount);
    $accounts = screen.getAllByTestId(/account-item/i);

    expect($accounts).toHaveLength(2);
    expect(
      screen.queryByTestId('account-item-new-profile')
    ).not.toBeInTheDocument();

    await userEvent.click($addNew);
    $accounts = screen.getAllByTestId(/account-item/i);

    expect($accounts).toHaveLength(3);
    expect(screen.getByTestId('account-item-new-profile')).toBeInTheDocument();

    await userEvent.click($deleteByUrl);
    $accounts = screen.getAllByTestId(/account-item/i);

    expect($accounts).toHaveLength(2);
    expect(
      screen.queryByTestId('account-item-new-profile')
    ).not.toBeInTheDocument();

    await userEvent.click($clearGithub);
    $accounts = screen.getAllByTestId(/account-item/i);

    expect($accounts).toHaveLength(2);
    expect($accounts[0]).toBeInTheDocument();
    expect(within($accounts[0]).getByTestId('account')).toHaveTextContent(
      /github/i
    );
    expect(within($accounts[0]).getByTestId('text')).toBeEmptyDOMElement();
    expect(within($accounts[0]).getByTestId('url')).toBeEmptyDOMElement();

    await userEvent.click($clearLinkedin);
    $accounts = screen.getAllByTestId(/account-item/i);

    expect($accounts).toHaveLength(2);
    expect($accounts[1]).toBeInTheDocument();
    expect(within($accounts[1]).getByTestId('account')).toHaveTextContent(
      /linkedin/i
    );
    expect(within($accounts[1]).getByTestId('text')).toBeEmptyDOMElement();
    expect(within($accounts[1]).getByTestId('url')).toBeEmptyDOMElement();
  });

  test('update field skills', async () => {
    render(
      <ResumeEditorProvider>
        <TestUpdateSkills />
      </ResumeEditorProvider>
    );

    const [$addSkill] = _getTestElement('add-skill');
    const [$addAnother] = _getTestElement('add-another-skill');
    const [$editSkill] = _getTestElement('edit-skill');
    const [$editSkillNoop] = _getTestElement('edit-skill-noop');
    const [$removeSkill] = _getTestElement('remove-skill');
    const [$insertSkillBelow] = _getTestElement('insert-skill-below');
    const [$insertTargetNotFound] = _getTestElement('insert-target-not-found');
    const [$insertSkillOnTop] = _getTestElement('insert-skill-on-top');
    let $skills = screen.queryAllByTestId(/skill-item/i);

    expect($skills).toHaveLength(0);

    await userEvent.click($addSkill);
    await userEvent.click($addAnother);
    $skills = screen.queryAllByTestId(/skill-item/i);

    expect($skills).toHaveLength(2);
    expect($skills.map(($el) => $el.textContent)).toEqual([
      'react',
      'javascript',
    ]);

    await userEvent.click($addSkill);
    $skills = screen.queryAllByTestId(/skill-item/i);

    expect($skills).toHaveLength(2);
    expect($skills.map(($el) => $el.textContent)).toEqual([
      'react',
      'javascript',
    ]);

    await userEvent.click($editSkill);
    $skills = screen.queryAllByTestId(/skill-item/i);

    expect($skills).toHaveLength(2);
    expect($skills.map(($el) => $el.textContent)).toEqual([
      'react',
      'typescript',
    ]);

    await userEvent.click($editSkillNoop);
    $skills = screen.queryAllByTestId(/skill-item/i);

    expect($skills).toHaveLength(2);
    expect($skills.map(($el) => $el.textContent)).toEqual([
      'react',
      'typescript',
    ]);

    await userEvent.click($removeSkill);
    $skills = screen.queryAllByTestId(/skill-item/i);

    expect($skills).toHaveLength(1);
    expect($skills.map(($el) => $el.textContent)).toEqual(['react']);

    await userEvent.click($addAnother);
    await userEvent.click($insertSkillBelow);
    $skills = screen.queryAllByTestId(/skill-item/i);

    expect($skills).toHaveLength(3);
    expect($skills.map(($el) => $el.textContent)).toEqual([
      'react',
      'next',
      'javascript',
    ]);

    await userEvent.click($insertTargetNotFound);
    $skills = screen.queryAllByTestId(/skill-item/i);

    expect($skills).toHaveLength(3);
    expect($skills.map(($el) => $el.textContent)).toEqual([
      'react',
      'next',
      'javascript',
    ]);

    await userEvent.click($insertSkillOnTop);
    $skills = screen.queryAllByTestId(/skill-item/i);

    expect($skills).toHaveLength(4);
    expect($skills.map(($el) => $el.textContent)).toEqual([
      'figma',
      'react',
      'next',
      'javascript',
    ]);
  });

  test('update field education', async () => {
    const education = {
      id: 'new-education-item',
      school: 'school',
      major: 'major',
      from: '2009',
      to: '2023',
      ongoing: false,
      description: '',
      userange: true,
    };
    render(
      <ResumeEditorProvider>
        <TestUpdateEducation item={education} />
      </ResumeEditorProvider>
    );

    const [$createItem] = _getTestElement('create-item');
    const [$updateItemField] = _getTestElement('update-item-field');
    const [$updateDateRange] = _getTestElement('update-item-date-range');
    const [$removeItem] = _getTestElement('remove-item');
    const [$createItemByDateRange] = _getTestElement(
      'create-item-by-date-range'
    );
    let $education = screen.queryAllByTestId(/education-item/i);

    expect($education).toHaveLength(0);

    await userEvent.click($createItem);
    $education = screen.queryAllByTestId(/education-item/i);

    expect($education).toHaveLength(1);
    expect(within($education[0]).getByTestId('id')).toHaveTextContent(
      education.id
    );
    expect(within($education[0]).getByTestId('school')).toHaveTextContent(
      education.school
    );

    await userEvent.click($updateItemField);
    $education = screen.queryAllByTestId(/education-item/i);

    expect($education).toHaveLength(1);
    expect(within($education[0]).getByTestId('major')).toHaveTextContent(
      education.major
    );

    await userEvent.click($updateDateRange);
    $education = screen.queryAllByTestId(/education-item/i);

    expect($education).toHaveLength(1);
    expect(within($education[0]).getByTestId('from')).toHaveTextContent(
      education.from
    );
    expect(within($education[0]).getByTestId('to')).toHaveTextContent(
      education.to
    );

    await userEvent.click($removeItem);
    $education = screen.queryAllByTestId(/education-item/i);

    expect($education).toHaveLength(0);

    await userEvent.click($createItemByDateRange);
    $education = screen.queryAllByTestId(/education-item/i);

    expect($education).toHaveLength(1);
    expect(within($education[0]).getByTestId('id')).toHaveTextContent(
      education.id
    );
    expect(within($education[0]).getByTestId('from')).toHaveTextContent(
      education.from
    );
    expect(within($education[0]).getByTestId('to')).toHaveTextContent(
      education.to
    );
  });

  test('update field other projects', async () => {
    const project = {
      id: 'new-project-id',
      name: 'project name',
      description: 'description',
      url: 'https://github.com/sakitkepala/iniresume',
    };
    render(
      <ResumeEditorProvider>
        <TestUpdateOtherProject project={project} />
      </ResumeEditorProvider>
    );

    const [$createProject] = _getTestElement('create-project');
    const [$editProjectField] = _getTestElement('edit-project-field');
    const [$removeProject] = _getTestElement('remove-project');
    let $otherProjects = screen.queryAllByTestId(/other-project-item/i);

    expect($otherProjects).toHaveLength(0);

    await userEvent.click($createProject);
    $otherProjects = screen.queryAllByTestId(/other-project-item/i);

    expect($otherProjects).toHaveLength(1);
    expect(within($otherProjects[0]).getByTestId('id')).toHaveTextContent(
      project.id
    );
    expect(within($otherProjects[0]).getByTestId('name')).toHaveTextContent(
      project.name
    );

    await userEvent.click($editProjectField);
    $otherProjects = screen.queryAllByTestId(/other-project-item/i);

    expect($otherProjects).toHaveLength(1);
    expect(
      within($otherProjects[0]).getByTestId('description')
    ).toHaveTextContent(project.description);

    await userEvent.click($removeProject);
    $otherProjects = screen.queryAllByTestId(/other-project-item/i);

    expect($otherProjects).toHaveLength(0);
  });

  test('update field experiences', async () => {
    const experience = {
      id: 'new-experience-id',
      title: 'job title',
      employer: 'employer',
      from: '2000-03',
      to: '2023-03',
    };
    render(
      <ResumeEditorProvider>
        <TestUpdateExperiences experience={experience} />
      </ResumeEditorProvider>
    );

    const [$createItem] = _getTestElement('create-experience');
    const [$updateItemField] = _getTestElement('edit-experience-field');
    const [$updateDateRange] = _getTestElement('edit-experience-date-range');
    const [$removeItem] = _getTestElement('remove-experience');
    const [$createItemByDateRange] = _getTestElement(
      'create-experience-by-date-range'
    );
    let $experiences = screen.queryAllByTestId(/experience-item/i);

    expect($experiences).toHaveLength(0);

    await userEvent.click($createItem);
    $experiences = screen.queryAllByTestId(/experience-item/i);

    expect($experiences).toHaveLength(1);
    expect(within($experiences[0]).getByTestId('id')).toHaveTextContent(
      experience.id
    );
    expect(within($experiences[0]).getByTestId('title')).toHaveTextContent(
      experience.title
    );

    await userEvent.click($updateItemField);
    $experiences = screen.queryAllByTestId(/experience-item/i);

    expect(within($experiences[0]).getByTestId('employer')).toHaveTextContent(
      experience.employer
    );

    await userEvent.click($updateDateRange);
    $experiences = screen.queryAllByTestId(/experience-item/i);

    expect(within($experiences[0]).getByTestId('from')).toHaveTextContent(
      experience.from
    );
    expect(within($experiences[0]).getByTestId('to')).toHaveTextContent(
      experience.to
    );

    await userEvent.click($removeItem);
    $experiences = screen.queryAllByTestId(/experience-item/i);

    expect($experiences).toHaveLength(0);

    await userEvent.click($createItemByDateRange);
    $experiences = screen.queryAllByTestId(/experience-item/i);

    expect($experiences).toHaveLength(1);
    expect(within($experiences[0]).getByTestId('id')).toHaveTextContent(
      experience.id
    );
    expect(within($experiences[0]).getByTestId('from')).toHaveTextContent(
      experience.from
    );
    expect(within($experiences[0]).getByTestId('to')).toHaveTextContent(
      experience.to
    );
  });

  test('update field projects of experiences', async () => {
    const project = {
      id: 'new-project-id',
      name: 'project name',
      description: 'project description',
    };
    render(
      <ResumeEditorProvider>
        <TestUpdateExperienceProject project={project} />
      </ResumeEditorProvider>
    );

    const [$createProject] = _getTestElement('create-project');
    const [$editProjectField] = _getTestElement('edit-project-field');
    const [$removeProject] = _getTestElement('remove-project');
    let $projects = screen.queryAllByTestId(/project-item/i);

    expect($projects).toHaveLength(0);

    await userEvent.click($createProject);
    $projects = screen.queryAllByTestId(/project-item/i);

    expect($projects).toHaveLength(1);
    expect(within($projects[0]).getByTestId('id')).toHaveTextContent(
      project.id
    );
    expect(within($projects[0]).getByTestId('name')).toHaveTextContent(
      project.name
    );

    await userEvent.click($editProjectField);
    $projects = screen.queryAllByTestId(/project-item/i);

    expect(within($projects[0]).getByTestId('description')).toHaveTextContent(
      project.description
    );

    await userEvent.click($removeProject);
    $projects = screen.queryAllByTestId(/project-item/i);

    expect($projects).toHaveLength(0);
  });
});
