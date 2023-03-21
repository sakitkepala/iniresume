import * as React from 'react';
import { useResumeEditor } from '../resume-editor';
import { type Education, type Project } from '../resume-editor';

function TestItem({
  testId,
  value,
  onSave,
}: {
  testId: string;
  value: string;
  onSave: () => void;
}) {
  return (
    <div data-testid={testId}>
      <span data-testid="value">{value}</span>
      <Save onSave={onSave} />
    </div>
  );
}

function Save({ onSave }: { onSave: () => void }) {
  return <button onClick={() => onSave()}>save</button>;
}

function TestUpdateTextField({ value }: { value: string }) {
  const {
    resume: { fullName },
    updateTextField,
  } = useResumeEditor();

  return (
    <TestItem
      testId="update-text-field"
      value={fullName}
      onSave={() => updateTextField('fullName', value)}
    />
  );
}

function TestUpdatePhone({ value }: { value: string }) {
  const {
    resume: { phone },
    updatePhone,
  } = useResumeEditor();

  return (
    <div>
      <TestItem
        testId="update-phone-number"
        value={phone.number}
        onSave={() => updatePhone({ ...phone, number: value })}
      />
      <TestItem
        testId="update-phone-wa"
        value={phone.wa ? 'on' : 'off'}
        onSave={() => updatePhone({ ...phone, wa: !phone.wa })}
      />
    </div>
  );
}

function TestUpdateWebsite({ text, url }: { text: string; url: string }) {
  const {
    resume: { website },
    updateWebsite,
  } = useResumeEditor();

  return (
    <div>
      <div data-testid="value">{website.text + website.url}</div>
      <div>
        <span data-testid="update-website-complete">
          <Save onSave={() => updateWebsite({ text, url })} />
        </span>
        <span data-testid="update-website-url-only">
          <Save onSave={() => updateWebsite({ text: '', url: url })} />
        </span>
        <span data-testid="update-website-text-only">
          <Save onSave={() => updateWebsite({ text: text, url: '' })} />
        </span>
      </div>
    </div>
  );
}

function TestUpdateAccount() {
  const {
    resume: { accounts },
    updateAccount,
  } = useResumeEditor();

  const newProfile = {
    id: 'new-profile',
    account: 'Instagram',
    url: 'https://instagram.com/profile',
    text: 'Profile Text',
  };

  const profile = accounts.find((ac) => ac.id === newProfile.id) || newProfile;

  return (
    <div>
      <ul data-testid="account-list">
        {accounts.map((ac) => (
          <li key={ac.id} data-testid={'account-item-' + ac.id}>
            <span data-testid="id">{ac.id}</span>
            <span data-testid="account">{ac.account}</span>
            <span data-testid="text">{ac.text}</span>
            <span data-testid="url">{ac.url}</span>
          </li>
        ))}
      </ul>

      <div>
        <span data-testid="update-account-add-new">
          <Save onSave={() => updateAccount(newProfile)} />
        </span>

        <span data-testid="update-account-update-fields">
          <Save
            onSave={() =>
              updateAccount({
                id: profile.id,
                account: 'Gitlab',
                url: 'https://gitlab.com/profile',
                text: '',
              })
            }
          />
        </span>

        <span data-testid="update-account-delete-by-account">
          <Save onSave={() => updateAccount({ ...profile, account: '' })} />
        </span>

        <span data-testid="update-account-delete-by-url">
          <Save onSave={() => updateAccount({ ...profile, url: '' })} />
        </span>

        <span data-testid="update-account-clear-github">
          <Save onSave={() => updateAccount({ ...accounts[0], url: '' })} />
        </span>

        <span data-testid="update-account-clear-linkedin">
          <Save onSave={() => updateAccount({ ...accounts[1], url: '' })} />
        </span>
      </div>
    </div>
  );
}

function TestUpdateSkills() {
  const {
    resume: { skills },
    addSkill,
    editSkill,
    insertSkill,
    insertSkillTop,
  } = useResumeEditor();

  return (
    <div>
      <ul data-testid="skill-list">
        {skills.map((skill) => (
          <li key={skill} data-testid={'skill-item-' + skill}>
            <span data-testid="skill">{skill}</span>
          </li>
        ))}
      </ul>

      <div>
        <span data-testid="add-skill">
          <Save onSave={() => addSkill('react')} />
        </span>

        <span data-testid="add-another-skill">
          <Save onSave={() => addSkill('javascript')} />
        </span>

        <span data-testid="edit-skill">
          <Save onSave={() => editSkill('typescript', 'javascript')} />
        </span>

        <span data-testid="edit-skill-noop">
          <Save onSave={() => editSkill('react', 'typescript')} />
        </span>

        <span data-testid="remove-skill">
          <Save onSave={() => editSkill('', 'typescript')} />
        </span>

        <span data-testid="insert-skill-below">
          <Save onSave={() => insertSkill('react', 'next')} />
        </span>

        <span data-testid="insert-target-not-found">
          <Save onSave={() => insertSkill('figma', 'unit testing')} />
        </span>

        <span data-testid="insert-skill-on-top">
          <Save onSave={() => insertSkillTop('figma')} />
        </span>
      </div>
    </div>
  );
}

function TestUpdateEducation({ item }: { item: Education }) {
  const {
    resume: { education },
    updateEducation,
    updateEducationDates,
  } = useResumeEditor();

  return (
    <div>
      <ul data-testid="education-list">
        {education.map((e) => (
          <li key={e.id} data-testid={'education-item-' + e.id}>
            <span data-testid="id">{e.id}</span>
            <span data-testid="school">{e.school}</span>
            <span data-testid="major">{e.major}</span>
            <span data-testid="from">{e.from}</span>
            <span data-testid="to">{e.to}</span>
            <span data-testid="ongoing">{e.ongoing}</span>
            <span data-testid="description">{e.description}</span>
          </li>
        ))}
      </ul>

      <div>
        <span data-testid="create-item">
          <Save
            onSave={() => updateEducation(item.id, 'school', item.school)}
          />
        </span>

        <span data-testid="update-item-field">
          <Save onSave={() => updateEducation(item.id, 'major', item.major)} />
        </span>

        <span data-testid="update-item-date-range">
          <Save
            onSave={() =>
              updateEducationDates(item.id, {
                from: item.from,
                to: item.to || '',
              })
            }
          />
        </span>

        <span data-testid="update-item-date-range-from-only">
          <Save
            onSave={() =>
              updateEducationDates(item.id, {
                from: item.from,
                to: '',
              })
            }
          />
        </span>

        <span data-testid="clear-item-date-range">
          <Save
            onSave={() =>
              updateEducationDates(item.id, {
                from: '',
                to: '',
              })
            }
          />
        </span>

        <span data-testid="remove-item">
          <Save onSave={() => updateEducation(item.id, 'school', '')} />
        </span>

        <span data-testid="create-item-by-date-range">
          <Save
            onSave={() =>
              updateEducationDates(item.id, {
                from: item.from,
                to: item.to || '',
              })
            }
          />
        </span>
      </div>
    </div>
  );
}

function TestUpdateOtherProject({ project }: { project: Project }) {
  const {
    resume: { otherProjects },
    updateOtherProjects,
  } = useResumeEditor();

  return (
    <div>
      <ul data-testid="other-project-list">
        {otherProjects.map((p) => (
          <li key={p.id} data-testid={'other-project-item-' + p.id}>
            <span data-testid="id">{p.id}</span>
            <span data-testid="name">{p.name}</span>
            <span data-testid="description">{p.description}</span>
            <span data-testid="url">{p.url}</span>
          </li>
        ))}
      </ul>

      <div>
        <span data-testid="create-project">
          <Save
            onSave={() => updateOtherProjects(project.id, 'name', project.name)}
          />
        </span>

        <span data-testid="edit-project-field">
          <Save
            onSave={() =>
              updateOtherProjects(
                project.id,
                'description',
                project.description || ''
              )
            }
          />
        </span>

        <span data-testid="remove-project">
          <Save onSave={() => updateOtherProjects(project.id, 'name', '')} />
        </span>
      </div>
    </div>
  );
}

function TestUpdateExperiences({
  experience,
}: {
  experience: {
    id: string;
    title: string;
    employer: string;
    from: string;
    to: string;
  };
}) {
  const {
    resume: { experiences },
    updateExperience,
    updateExperienceDates,
  } = useResumeEditor();

  return (
    <div>
      <ul data-testid="experiences-list">
        {experiences.map((xp) => (
          <li key={xp.id} data-testid={'experience-item-' + xp.id}>
            <span data-testid="id">{xp.id}</span>
            <span data-testid="title">{xp.title}</span>
            <span data-testid="employer">{xp.employer}</span>
            <span data-testid="from">{xp.from}</span>
            <span data-testid="to">{xp.to}</span>
          </li>
        ))}
      </ul>

      <div>
        <span data-testid="create-experience">
          <Save
            onSave={() =>
              updateExperience(experience.id, 'title', experience.title)
            }
          />
        </span>

        <span data-testid="edit-experience-field">
          <Save
            onSave={() =>
              updateExperience(experience.id, 'employer', experience.employer)
            }
          />
        </span>

        <span data-testid="edit-experience-date-range">
          <Save
            onSave={() =>
              updateExperienceDates(experience.id, {
                from: experience.from,
                to: experience.to,
                ongoing: experiences[0]?.ongoing,
              })
            }
          />
        </span>

        <span data-testid="remove-experience">
          <Save onSave={() => updateExperience(experience.id, 'title', '')} />
        </span>

        <span data-testid="create-experience-by-date-range">
          <Save
            onSave={() =>
              updateExperienceDates(experience.id, {
                from: experience.from,
                to: experience.to,
                ongoing: experiences[0]?.ongoing,
              })
            }
          />
        </span>
      </div>
    </div>
  );
}

function TestUpdateExperienceProject({
  project,
}: {
  project: {
    id: string;
    name: string;
    description: string;
  };
}) {
  const {
    resume: { experiences },
    updateExperience,
    updateProject,
  } = useResumeEditor();

  React.useEffect(() => {
    updateExperience('test-experience', 'title', 'title');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!experiences[0]) {
    return <div>loading</div>;
  }

  return (
    <div>
      <ul data-testid="project-list">
        {experiences[0].projects.map((xp) => (
          <li key={xp.id} data-testid={'project-item-' + xp.id}>
            <span data-testid="id">{xp.id}</span>
            <span data-testid="name">{xp.name}</span>
            <span data-testid="description">{xp.description}</span>
            <span data-testid="url">{xp.url}</span>
          </li>
        ))}
      </ul>

      <div>
        <span data-testid="create-project">
          <Save
            onSave={() =>
              updateProject('test-experience', project.id, 'name', project.name)
            }
          />
        </span>

        <span data-testid="edit-project-field">
          <Save
            onSave={() =>
              updateProject(
                'test-experience',
                project.id,
                'description',
                project.description
              )
            }
          />
        </span>

        <span data-testid="remove-project">
          <Save
            onSave={() =>
              updateProject('test-experience', project.id, 'name', '')
            }
          />
        </span>
      </div>
    </div>
  );
}

export {
  TestItem,
  Save,
  TestUpdateTextField,
  TestUpdatePhone,
  TestUpdateWebsite,
  TestUpdateAccount,
  TestUpdateSkills,
  TestUpdateEducation,
  TestUpdateOtherProject,
  TestUpdateExperiences,
  TestUpdateExperienceProject,
};
