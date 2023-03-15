/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent, renderLineContentWithData } from '../test-utils';

import { ListItemProjectAdd } from './field-list-item-project-add';
import { GroupTypeNames } from '../types';

describe('ListItemProjectAdd', () => {
  test('render label default', async () => {
    renderLineContent({
      id: 'add-project',
      activateable: true,
      content: <ListItemProjectAdd experienceId="fake-id" hasProject={false} />,
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
            <span>
              //
               Cantumkan projek
            </span>
          </div>
        </div>
      </div>
    `);
  });

  test('render label sebagai list item ketika sudah punya data projek', async () => {
    renderLineContent({
      id: 'add-project',
      activateable: true,
      content: <ListItemProjectAdd experienceId="fake-id" hasProject />,
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
            <div
              class=""
            >
              <div>
                -
              </div>
              <div>
                 
              </div>
              <div>
                <span>
                  //
                   Tambah projek lagi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  test('"open" field project di line lain dari trigger', async () => {
    renderLineContentWithData((_, state) => {
      const projectIsOpen = state.activeGroup?.type === GroupTypeNames.PROJECT;
      return [
        {
          id: 'project-is-open',
          activateable: true,
          show: projectIsOpen,
          content: 'project is open',
        },
        {
          id: 'add-project',
          activateable: true,
          content: <ListItemProjectAdd experienceId="fake-id" />,
        },
      ];
    });

    expect(screen.queryByText(/project is open/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(/cantumkan/i));

    expect(screen.getByText(/project is open/i)).toBeInTheDocument();
  });

  test('"open" field project di line lain ketika diaktifkan pakai keyboard', async () => {
    renderLineContentWithData((_, state) => {
      const projectIsOpen = state.activeGroup?.type === GroupTypeNames.PROJECT;
      return [
        {
          id: 'empty-activateable',
          activateable: true,
          content: 'starting line',
        },
        {
          id: 'project-is-open',
          activateable: true,
          show: projectIsOpen,
          content: 'project is open',
        },
        {
          id: 'add-project',
          activateable: true,
          content: <ListItemProjectAdd experienceId="fake-id" />,
        },
      ];
    });

    expect(screen.queryByText(/project is open/i)).not.toBeInTheDocument();

    await userEvent.keyboard('{Down}{Down}');

    expect(screen.getByText(/project is open/i)).toBeInTheDocument();
  });
});
