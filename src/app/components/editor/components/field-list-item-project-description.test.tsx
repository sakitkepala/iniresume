/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent, renderLineContentWithData } from '../test-utils';

import { FieldListItemProjectDescription } from './field-list-item-project-description';

describe('FieldListItemProjectDescription', () => {
  test('render label ketika gak punya value', async () => {
    renderLineContent({
      id: 'experience-project-description',
      activateable: true,
      content: (
        <FieldListItemProjectDescription
          experienceId="fake-experience-id"
          projectId="fake-experience-project-id"
        />
      ),
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(
      `"1  // Deskripsikan projek bila perlu *bisa dikosongi"`
    );
  });

  test('render konten teks sesuai value', async () => {
    const value = 'Ini deskripsi';
    renderLineContent({
      id: 'experience-project-description',
      activateable: true,
      content: (
        <FieldListItemProjectDescription
          experienceId="fake-experience-id"
          projectId="fake-experience-project-id"
          value={value}
        />
      ),
    });

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('otomatis pindah ke line field URL projek yang bersangkutan setelah simpan', async () => {
    let projectId = '';
    renderLineContentWithData((_, state) => {
      projectId = projectId || state.nextCreateId;
      return [
        {
          id: `${projectId}-project-item-description`,
          activateable: true,
          content: (
            <FieldListItemProjectDescription
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
          id: `${projectId}-project-item-url`,
          activateable: true,
          content: `Target line with ID: ${projectId}-project-item-url`,
        },
      ];
    });

    await userEvent.click(screen.getByText(/deskripsikan/i));
    await userEvent.type(
      screen.getByDisplayValue(''),
      'input something{Enter}'
    );

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);
  });
});
