/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContentWithData } from '../test-utils';

import {
  FieldExperienceTitle,
  FieldExperienceEmployer,
  FieldEducationSchool,
  FieldEducationMajor,
} from './field-heading';

describe('FieldExperienceTitle', () => {
  test('render sesuai value input', async () => {
    const label = 'Title label';
    const titleValue = 'Title value';

    renderLineContentWithData((resume, state) => {
      const createId = resume.experiences[0]?.id || state.nextCreateId;
      return [
        {
          id: createId + '-experience-title',
          activateable: true,
          content: (
            <FieldExperienceTitle
              label={label}
              experienceId={createId}
              value={resume.experiences[0]?.title}
            />
          ),
        },
        {
          id: createId + '-experience-activateable',
          activateable: true,
          content: 'fake activateable',
        },
        {
          id: createId + '-experience-employer',
          activateable: true,
          content: 'fake employer',
        },
      ];
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1## Title label"`);

    await userEvent.click(screen.getByText(label));
    await userEvent.type(screen.getByDisplayValue(''), `${titleValue}{Enter}`);

    expect(screen.getByText(titleValue)).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);
  });
});

describe('FieldExperienceEmployer', () => {
  test('render sesuai value input', async () => {
    const label = 'Employer label';
    const employerValue = 'Employer value';

    renderLineContentWithData((resume, state) => {
      const createId = resume.experiences[0]?.id || state.nextCreateId;
      return [
        {
          id: createId + '-experience-employer',
          activateable: true,
          content: (
            <FieldExperienceEmployer
              label={label}
              experienceId={createId}
              value={resume.experiences[0]?.employer}
            />
          ),
        },
        {
          id: createId + '-experience-activateable',
          activateable: true,
          content: 'fake activateable',
        },
        {
          id: createId + '-experience-dates',
          activateable: true,
          content: 'fake dates',
        },
      ];
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1### Employer label"`);

    await userEvent.click(screen.getByText(label));
    await userEvent.type(
      screen.getByDisplayValue(''),
      `${employerValue}{Enter}`
    );

    expect(screen.getByText(employerValue)).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);
  });
});

describe('FieldEducationSchool', () => {
  test('render sesuai value input', async () => {
    const label = 'School label';
    const schoolValue = 'School value';

    renderLineContentWithData((resume, state) => {
      const createId = resume.education[0]?.id || state.nextCreateId;
      return [
        {
          id: createId + '-education-school',
          activateable: true,
          content: (
            <FieldEducationSchool
              label={label}
              educationId={createId}
              value={resume.education[0]?.school}
            />
          ),
        },
        {
          id: createId + '-experience-activateable',
          activateable: true,
          content: 'fake activateable',
        },
        {
          id: createId + '-education-major',
          activateable: true,
          content: 'fake major',
        },
      ];
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1## School label"`);

    await userEvent.click(screen.getByText(label));
    await userEvent.type(screen.getByDisplayValue(''), `${schoolValue}{Enter}`);

    expect(screen.getByText(schoolValue)).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);
  });
});

describe('FieldEducationMajor', () => {
  test('render sesuai value input', async () => {
    const label = 'Major label';
    const majorValue = 'Major value';

    renderLineContentWithData((resume, state) => {
      const createId = resume.education[0]?.id || state.nextCreateId;
      return [
        {
          id: createId + '-education-major',
          activateable: true,
          content: (
            <FieldEducationMajor
              label={label}
              educationId={createId}
              value={resume.education[0]?.major}
            />
          ),
        },
        {
          id: createId + '-experience-activateable',
          activateable: true,
          content: 'fake activateable',
        },
        {
          id: createId + '-education-dates',
          activateable: true,
          content: 'fake dates',
        },
      ];
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1### Major label"`);

    await userEvent.click(screen.getByText(label));
    await userEvent.type(screen.getByDisplayValue(''), `${majorValue}{Enter}`);

    expect(screen.getByText(majorValue)).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);
  });
});
