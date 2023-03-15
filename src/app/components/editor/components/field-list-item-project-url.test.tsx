/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent, renderLineContentWithData } from '../test-utils';

import { FieldListItemProjectURL } from './field-list-item-project-url';
import { saveData, getInitialData } from 'src/app/data/resume';

describe('FieldListItemProjectURL', () => {
  test('render label ketika gak punya value', () => {
    renderLineContent({
      id: 'experience-project-url',
      activateable: true,
      content: (
        <FieldListItemProjectURL
          experienceId="fake-experience-id"
          projectId="fake-experience-project-id"
        />
      ),
    });

    expect(screen.getByRole('listitem', { name: /line 1/i }))
      .toMatchInlineSnapshot(`
      <div
        aria-label="Line 1"
        class=""
        role="listitem"
      >
        <div>
          1
        </div>
        <div>
          <div>
            <div>
              <span>
                 
              </span>
              <span>
                 
              </span>
            </div>
            <div>
              <span>
                // Cantumkan link projek *bila ada
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  test('render konten teks sesuai value', () => {
    const value = 'Ini URL projek';
    renderLineContent({
      id: 'experience-project-url',
      activateable: true,
      content: (
        <FieldListItemProjectURL
          experienceId="fake-experience-id"
          projectId="fake-experience-project-id"
          value={value}
        />
      ),
    });

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('input dengan simpan string url lengkap', async () => {
    saveData({
      ...getInitialData(),
      experiences: [
        {
          id: 'experience-id',
          title: 'job-title',
          employer: 'employer',
          from: '1991-03',
          to: '',
          ongoing: true,
          description: '',
          projects: [],
        },
      ],
    });

    const urlValue = 'sakitkepala.dev';

    renderLineContentWithData((resume, state) => {
      const experience = resume.experiences[0];
      const project = experience.projects[0];
      const projectId = project?.id || state.nextCreateId;
      return {
        id: `${projectId}-project-item-url`,
        activateable: true,
        content: (
          <FieldListItemProjectURL
            experienceId={experience.id}
            projectId={projectId}
            value={project?.url}
          />
        ),
      };
    });

    await userEvent.click(screen.getByText(/cantumkan/i));

    expect(screen.getByDisplayValue('https://')).toBeInTheDocument();

    await userEvent.type(
      screen.getByDisplayValue('https://'),
      `${urlValue}{Enter}`
    );

    expect(screen.getByText(/link projek/i)).toBeInTheDocument();
    expect(screen.getByText(`https://${urlValue}`)).toBeInTheDocument();
  });

  test('tidak simpan url ketika cuma diisi protokol httpnya aja', async () => {
    saveData({
      ...getInitialData(),
      experiences: [
        {
          id: 'experience-id',
          title: 'job-title',
          employer: 'employer',
          from: '1991-03',
          to: '',
          ongoing: true,
          description: '',
          projects: [],
        },
      ],
    });

    renderLineContentWithData((resume, state) => {
      const experience = resume.experiences[0];
      const project = experience.projects[0];
      const projectId = project?.id || state.nextCreateId;
      return {
        id: `${projectId}-project-item-url`,
        activateable: true,
        content: (
          <FieldListItemProjectURL
            experienceId={experience.id}
            projectId={projectId}
            value={project?.url}
          />
        ),
      };
    });

    await userEvent.click(screen.getByText(/cantumkan/i));
    await userEvent.keyboard('{Enter}');

    expect(screen.getByText(/cantumkan/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/cantumkan/i));
    const $urlInput = screen.getByDisplayValue('https://');
    await userEvent.clear($urlInput);
    await userEvent.type($urlInput, 'http://{Enter}');

    expect(screen.getByText(/cantumkan/i)).toBeInTheDocument();
  });
});
