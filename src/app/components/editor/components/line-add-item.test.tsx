/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent, renderLineContentWithData } from '../test-utils';

import {
  LineAddExperience,
  LineAddEducation,
  LineAddOtherProject,
} from './line-add-item';
import { saveData, getInitialData } from 'src/app/data/resume';
import { GroupTypeNames } from '../types';

describe('LineAddExperience', () => {
  test('render label default', () => {
    renderLineContent({
      id: 'add-experience',
      activateable: true,
      content: <LineAddExperience />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1// Isi pengalaman"`);
  });

  test('render label tambah pengalaman', () => {
    saveData({
      ...getInitialData(),
      experiences: [
        {
          id: 'experience-id',
          title: 'job title',
          employer: 'employer',
          from: '1991-10',
          to: '',
          ongoing: true,
          description: '',
          projects: [],
        },
      ],
    });

    renderLineContent({
      id: 'add-experience',
      activateable: true,
      content: <LineAddExperience />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1// Tambah pengalaman"`);
  });

  test('buka line-line field experience', async () => {
    renderLineContentWithData((_, state) => {
      return [
        {
          id: 'experience-field-open',
          activateable: true,
          show: state.activeGroup?.type === GroupTypeNames.EXPERIENCE,
          content: 'Experience field is open',
        },
        {
          id: 'add-experience',
          activateable: true,
          content: <LineAddExperience />,
        },
      ];
    });

    expect(
      screen.queryByText(/experience field is open/i)
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(/pengalaman/i));

    expect(screen.getByText(/experience field is open/i)).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(
      screen.queryByText(/experience field is open/i)
    ).not.toBeInTheDocument();

    await userEvent.keyboard('{Down}{Down}');

    expect(screen.getByText(/experience field is open/i)).toBeInTheDocument();
  });
});

describe('LineAddEducation', () => {
  test('render label default', () => {
    renderLineContent({
      id: 'add-education',
      activateable: true,
      content: <LineAddEducation />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1// Isi pendidikan"`);
  });

  test('render label tambah pendidikan', () => {
    saveData({
      ...getInitialData(),
      education: [
        {
          id: 'education-id',
          school: 'school',
          major: 'major',
          from: '1991',
          to: '',
          ongoing: true,
          description: '',
          userange: true,
        },
      ],
    });

    renderLineContent({
      id: 'add-education',
      activateable: true,
      content: <LineAddEducation />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1// Tambah pendidikan"`);
  });

  test('buka line-line field education', async () => {
    renderLineContentWithData((_, state) => {
      return [
        {
          id: 'education-field-open',
          activateable: true,
          show: state.activeGroup?.type === GroupTypeNames.EDUCATION,
          content: 'education field is open',
        },
        {
          id: 'add-education',
          activateable: true,
          content: <LineAddEducation />,
        },
      ];
    });

    expect(
      screen.queryByText(/education field is open/i)
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(/pendidikan/i));

    expect(screen.getByText(/education field is open/i)).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(
      screen.queryByText(/education field is open/i)
    ).not.toBeInTheDocument();

    await userEvent.keyboard('{Down}{Down}');

    expect(screen.getByText(/education field is open/i)).toBeInTheDocument();
  });
});

describe('LineAddOtherProject', () => {
  test('render label default', () => {
    renderLineContent({
      id: 'add-other-projects',
      activateable: true,
      content: <LineAddOtherProject />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(
      `"1// Masukkan beberapa projek lain (projek personal, dsb.)"`
    );
  });

  test('render label tambah projek', () => {
    saveData({
      ...getInitialData(),
      otherProjects: [
        {
          id: 'education-id',
          name: '',
          description: '',
        },
      ],
    });

    renderLineContent({
      id: 'add-other-projects',
      activateable: true,
      content: <LineAddOtherProject />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(
      `"1// Tambah beberapa projek lain (projek personal, dsb.)"`
    );
  });

  test('render sebagai line kedua', () => {
    renderLineContent({
      id: 'add-other-projects',
      activateable: true,
      content: <LineAddOtherProject nextLine />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1// yang ingin ditonjolkan"`);
  });

  test('buka line-line field other projects', async () => {
    renderLineContentWithData((_, state) => {
      return [
        {
          id: 'other-projects-field-open',
          activateable: true,
          show: state.activeGroup?.type === GroupTypeNames.OTHER_PROJECTS,
          content: 'other projects field is open',
        },
        {
          id: 'add-other-projects',
          activateable: true,
          content: <LineAddOtherProject />,
        },
      ];
    });

    expect(
      screen.queryByText(/other projects field is open/i)
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(/projek/i));

    expect(
      screen.getByText(/other projects field is open/i)
    ).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(
      screen.queryByText(/other projects field is open/i)
    ).not.toBeInTheDocument();

    await userEvent.keyboard('{Down}{Down}');

    expect(
      screen.getByText(/other projects field is open/i)
    ).toBeInTheDocument();
  });
});
