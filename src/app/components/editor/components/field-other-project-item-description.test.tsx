/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import { FieldOtherProjectItemDescription } from './field-other-project-item-description';

describe('FieldOtherProjectItemDescription', () => {
  test('render label ketika gak punya value', async () => {
    renderLineContent({
      id: 'other-projects-item-description',
      activateable: true,
      content: <FieldOtherProjectItemDescription projectId="fake-project-id" />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(
      `"1// Deskripsikan projek bila perlu *bisa dikosongi"`
    );
  });

  test('render konten teks sesuai value', async () => {
    const value = 'Ini deskripsi';
    renderLineContent({
      id: 'other-projects-item-description',
      activateable: true,
      content: (
        <FieldOtherProjectItemDescription
          projectId="fake-project-id"
          value={value}
        />
      ),
    });

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('otomatis pindah ke line field URL projek yang bersangkutan setelah simpan', async () => {
    const projectId = 'fake-project-id';
    renderLineContent([
      {
        id: `${projectId}-other-projects-item-description`,
        activateable: true,
        content: <FieldOtherProjectItemDescription projectId={projectId} />,
      },
      {
        id: 'activateable-in-between',
        activateable: true,
      },
      {
        id: `${projectId}-other-projects-item-url`,
        activateable: true,
        content: `Target line with ID: ${projectId}-other-projects-item-url`,
      },
    ]);

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
