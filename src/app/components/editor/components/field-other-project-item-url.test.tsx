/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent, renderLineContentWithData } from '../test-utils';

import { FieldOtherProjectItemURL } from './field-other-project-item-url';

describe('FieldOtherProjectItemURL', () => {
  test('render label ketika gak punya value', () => {
    renderLineContent({
      id: 'other-projects-item-url',
      activateable: true,
      content: <FieldOtherProjectItemURL projectId="fake-project-id" />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1// Cantumkan link projek *bila ada"`);
  });

  test('render konten teks sesuai value', () => {
    const value = 'Ini URL projek';
    renderLineContent({
      id: 'other-projects-item-url',
      activateable: true,
      content: (
        <FieldOtherProjectItemURL projectId="fake-project-id" value={value} />
      ),
    });

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('input dengan simpan string url lengkap', async () => {
    const urlValue = 'sakitkepala.dev';

    renderLineContentWithData((resume, state) => {
      const project = resume.otherProjects[0];
      const projectId = project?.id || state.nextCreateId;
      return {
        id: `${projectId}-other-projects-item-url`,
        activateable: true,
        content: (
          <FieldOtherProjectItemURL
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
    renderLineContentWithData((resume, state) => {
      const project = resume.otherProjects[0];
      const projectId = project?.id || state.nextCreateId;
      return {
        id: `${projectId}-other-projects-item-url`,
        activateable: true,
        content: (
          <FieldOtherProjectItemURL
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
