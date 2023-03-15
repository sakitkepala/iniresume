/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import { FieldOtherProjectItemName } from './field-other-project-item-name';

describe('FieldOtherProjectItemName', () => {
  test('render label ketika gak punya value', async () => {
    renderLineContent({
      id: 'other-projects-item-headline',
      activateable: true,
      content: <FieldOtherProjectItemName projectId="fake-project-id" />,
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
          <span
            class=""
          >
            <span>
              ##
            </span>
            <span>
               
            </span>
            <span>
              // Nama/judul projek
            </span>
          </span>
        </div>
      </div>
    `);
  });

  test('render konten teks sesuai value', async () => {
    const value = 'Ini headline';
    renderLineContent({
      id: 'other-projects-item-headline',
      activateable: true,
      content: (
        <FieldOtherProjectItemName projectId="fake-project-id" value={value} />
      ),
    });

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('otomatis pindah ke line field deskripsi projek yang bersangkutan setelah simpan', async () => {
    const projectId = 'fake-project-id';
    renderLineContent([
      {
        id: `${projectId}-other-projects-item-headline`,
        activateable: true,
        content: <FieldOtherProjectItemName projectId={projectId} />,
      },
      {
        id: 'activateable-in-between',
        activateable: true,
      },
      {
        id: `${projectId}-other-projects-item-description`,
        activateable: true,
        content: `Target line with ID: ${projectId}-other-projects-item-description`,
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
