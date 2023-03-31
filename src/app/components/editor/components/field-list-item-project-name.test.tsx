/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import { FieldListItemProjectName } from './field-list-item-project-name';

describe('FieldListItemProjectName', () => {
  test('render label ketika gak punya value', async () => {
    renderLineContent({
      id: 'experience-project-headline',
      activateable: true,
      content: (
        <FieldListItemProjectName
          experienceId="fake-experience-id"
          projectId="fake-experience-project-id"
        />
      ),
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1- // Nama/judul projek"`);
  });

  test('render konten teks sesuai value', async () => {
    const value = 'Ini headline';
    renderLineContent({
      id: 'experience-project-headline',
      activateable: true,
      content: (
        <FieldListItemProjectName
          experienceId="fake-experience-id"
          projectId="fake-experience-project-id"
          value={value}
        />
      ),
    });

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('otomatis pindah ke line field deskripsi projek yang bersangkutan setelah simpan', async () => {
    const projectId = 'fake-project-id';
    renderLineContent([
      {
        id: `${projectId}-project-item-headline`,
        activateable: true,
        content: (
          <FieldListItemProjectName
            experienceId="fake-experience-id"
            projectId={projectId}
          />
        ),
      },
      {
        id: 'activateable-in-between',
        activateable: true,
      },
      {
        id: `${projectId}-project-item-description`,
        activateable: true,
        content: `Target line with ID: ${projectId}-project-item-description`,
      },
    ]);

    await userEvent.click(screen.getByText(/judul/i));
    await userEvent.type(
      screen.getByDisplayValue(''),
      'input something{Enter}'
    );

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);
  });
});
