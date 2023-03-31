import * as React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent, renderLineContentWithData } from '../test-utils';

import { useLineContents } from './line-contents';
import { type LineContent, GroupTypeNames } from '../types';

function TestWithLineContentsHook() {
  const {
    activeLine,
    nextCreateId,
    activeGroup,
    openExperience,
    openEducation,
    openProject,
    openOtherProject,
    preventHotkey,
  } = useLineContents();

  return (
    <div>
      <ul data-testid="active-line">
        <li>
          <button>activate line</button>
        </li>

        {activeLine && <li data-testid="activeLineId">{activeLine}</li>}
        {activeGroup && <li data-testid="activeGroup">{activeGroup}</li>}

        <li>
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              openExperience();
            }}
          >
            open experience
          </button>
        </li>

        <li>
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              openEducation();
            }}
          >
            open education
          </button>
        </li>

        <li>
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              openProject(nextCreateId);
            }}
          >
            open project
          </button>
        </li>

        <li>
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              openOtherProject();
            }}
          >
            open other projects
          </button>
        </li>

        <li>
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              preventHotkey();
            }}
          >
            prevent hotkey
          </button>
        </li>
      </ul>
    </div>
  );
}

describe('useLineContents', () => {
  test('pemakaian value context', async () => {
    let contents: LineContent[] = [];
    const firstCreateId: string[] = [];

    renderLineContentWithData((_, state) => {
      firstCreateId.push(state.nextCreateId);
      contents = [
        {
          id: 'active-line',
          activateable: true,
          content: <TestWithLineContentsHook />,
        },
        {
          id: 'line-experience',
          activateable: true,
          show: state.activeGroup?.type === GroupTypeNames.EXPERIENCE,
          content: <div data-testid="line-experience">experience</div>,
        },
        {
          id: 'line-education',
          activateable: true,
          show: state.activeGroup?.type === GroupTypeNames.EDUCATION,
          content: <div data-testid="line-education">education</div>,
        },
        {
          id: 'line-project',
          activateable: true,
          show: state.activeGroup?.type === GroupTypeNames.PROJECT,
          content: <div data-testid="line-project">project</div>,
        },
        {
          id: 'line-other-projects',
          activateable: true,
          show: state.activeGroup?.type === GroupTypeNames.OTHER_PROJECTS,
          content: <div data-testid="line-other-projects">other projects</div>,
        },
      ];
      return contents;
    });

    const $activeLine = within(screen.getByTestId('active-line'));

    expect($activeLine.queryByTestId('activeLineId')).not.toBeInTheDocument();

    await userEvent.click(
      $activeLine.getByRole('button', { name: /activate line/i })
    );

    expect($activeLine.getByTestId('activeLineId')).toBeInTheDocument();
    expect($activeLine.getByTestId('activeLineId')).toHaveTextContent(
      contents[0].id
    );

    expect($activeLine.queryByTestId('activeGroup')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-experience')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-education')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-project')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-other-projects')).not.toBeInTheDocument();

    await userEvent.click(
      $activeLine.getByRole('button', { name: /open experience/i })
    );

    expect($activeLine.queryByTestId('activeGroup')).toBeInTheDocument();
    expect($activeLine.queryByTestId('activeGroup')).toHaveTextContent(
      GroupTypeNames.EXPERIENCE
    );
    expect(screen.queryByTestId('line-experience')).toBeInTheDocument();
    expect(screen.queryByTestId('line-education')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-project')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-other-projects')).not.toBeInTheDocument();

    await userEvent.click(
      $activeLine.getByRole('button', { name: /open education/i })
    );

    expect($activeLine.queryByTestId('activeGroup')).toBeInTheDocument();
    expect($activeLine.queryByTestId('activeGroup')).toHaveTextContent(
      GroupTypeNames.EDUCATION
    );
    expect(screen.queryByTestId('line-experience')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-education')).toBeInTheDocument();
    expect(screen.queryByTestId('line-project')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-other-projects')).not.toBeInTheDocument();

    await userEvent.click(
      $activeLine.getByRole('button', { name: /open project/i })
    );

    expect($activeLine.queryByTestId('activeGroup')).toBeInTheDocument();
    expect($activeLine.queryByTestId('activeGroup')).toHaveTextContent(
      GroupTypeNames.PROJECT
    );
    expect(screen.queryByTestId('line-experience')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-education')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-project')).toBeInTheDocument();
    expect(screen.queryByTestId('line-other-projects')).not.toBeInTheDocument();

    await userEvent.click(
      $activeLine.getByRole('button', { name: /open other projects/i })
    );

    expect($activeLine.queryByTestId('activeGroup')).toBeInTheDocument();
    expect($activeLine.queryByTestId('activeGroup')).toHaveTextContent(
      GroupTypeNames.OTHER_PROJECTS
    );
    expect(screen.queryByTestId('line-experience')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-education')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-project')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-other-projects')).toBeInTheDocument();

    expect(firstCreateId.length).toBeGreaterThan(0);
  });

  test('prevent hotkey', async () => {
    renderLineContent([
      {
        id: 'prevent-hotkey',
        content: <TestWithLineContentsHook />,
      },
      {
        id: 'activateable-1',
        activateable: true,
        content: 'activateable 1',
      },
      {
        id: 'activateable-2',
        activateable: true,
        content: 'activateable 2',
      },
      {
        id: 'activateable-3',
        activateable: true,
        content: 'activateable 3',
      },
    ]);

    await userEvent.keyboard('{Down}{Down}{Down}{Up}');

    expect(screen.getByRole('listitem', { current: true })).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);

    await userEvent.click(
      screen.getByRole('button', { name: /prevent hotkey/i })
    );

    await userEvent.keyboard('{Down}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);

    await userEvent.keyboard('{Up}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);

    await userEvent.click(screen.getByText('activateable 3'));
    await userEvent.keyboard('{Up}{Up}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 2/i);
  });
});
