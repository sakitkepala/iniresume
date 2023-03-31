import * as React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent, renderLineContentWithData } from '../test-utils';

import { useActiveLine } from './active-line';
import { useLineContents } from './line-contents';
import { type LineContent } from '../types';

function TestWithActiveLine({ number }: { number?: number }) {
  const { lineId, lineNumber, isActive, activate, next, previous, reset } =
    useActiveLine();

  return (
    <div onClick={(ev) => ev.stopPropagation()}>
      <ul data-testid={lineId}>
        <li data-testid="lineNumber">Line Number: {lineNumber}</li>

        <li>
          <button data-testid="activate" onClick={() => activate()}>
            activate
          </button>
        </li>

        {isActive && <li data-testid="isActive">Line is active</li>}

        <li>
          <button data-testid="next" onClick={next}>
            next
          </button>
        </li>

        <li>
          <button data-testid="previous" onClick={previous}>
            previous
          </button>
        </li>

        <li>
          <button data-testid="reset" onClick={reset}>
            reset
          </button>
        </li>

        {number !== 1 && (
          <li>
            <button
              data-testid="goto-1"
              onClick={() => activate('active-line-1')}
            >
              activate line 1
            </button>
          </li>
        )}

        {number !== 2 && (
          <li>
            <button
              data-testid="goto-2"
              onClick={() => activate('active-line-2')}
            >
              activate line 2
            </button>
          </li>
        )}

        {number !== 3 && (
          <li>
            <button
              data-testid="goto-3"
              onClick={() => activate('active-line-3')}
            >
              activate line 3
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

function TestActivateAfterReset() {
  const { activeGroup, openOtherProject } = useLineContents();
  const { activateAfterReset } = useActiveLine();

  React.useEffect(() => {
    if (activeGroup !== null) {
      return;
    }
    openOtherProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        onClick={(ev) => {
          ev.stopPropagation();
          activateAfterReset('target-line');
        }}
      >
        goto target line
      </button>
    </div>
  );
}

describe('useActiveLine', () => {
  test('pemakaian value context', async () => {
    const contents: LineContent[] = [
      {
        id: 'active-line-1',
        activateable: true,
        content: <TestWithActiveLine number={1} />,
      },
      {
        id: 'active-line-2',
        activateable: true,
        content: <TestWithActiveLine number={2} />,
      },
      {
        id: 'active-line-3',
        activateable: true,
        content: <TestWithActiveLine number={3} />,
      },
    ];

    renderLineContent(contents);

    const $activeLine1 = screen.getByTestId(contents[0].id);
    const $activeLine2 = screen.getByTestId(contents[1].id);
    const $activeLine3 = screen.getByTestId(contents[2].id);

    expect($activeLine1).toBeInTheDocument();
    expect($activeLine2).toBeInTheDocument();
    expect($activeLine3).toBeInTheDocument();

    expect(within($activeLine1).getByTestId('lineNumber')).toHaveTextContent(
      /line number: 1/i
    );
    expect(within($activeLine2).getByTestId('lineNumber')).toHaveTextContent(
      /line number: 2/i
    );
    expect(within($activeLine3).getByTestId('lineNumber')).toHaveTextContent(
      /line number: 3/i
    );

    expect(screen.queryAllByTestId('isActive')).toHaveLength(0);

    await userEvent.click(within($activeLine1).getByTestId('activate'));

    expect(within($activeLine1).queryByTestId('isActive')).toBeInTheDocument();
    expect(
      within($activeLine2).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(
      within($activeLine3).queryByTestId('isActive')
    ).not.toBeInTheDocument();

    await userEvent.click(within($activeLine2).getByTestId('activate'));

    expect(
      within($activeLine1).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(within($activeLine2).queryByTestId('isActive')).toBeInTheDocument();
    expect(
      within($activeLine3).queryByTestId('isActive')
    ).not.toBeInTheDocument();

    await userEvent.click(within($activeLine3).getByTestId('activate'));

    expect(
      within($activeLine1).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(
      within($activeLine2).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(within($activeLine3).queryByTestId('isActive')).toBeInTheDocument();

    await userEvent.click(within($activeLine1).getByTestId('previous'));

    expect(
      within($activeLine1).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(within($activeLine2).queryByTestId('isActive')).toBeInTheDocument();
    expect(
      within($activeLine3).queryByTestId('isActive')
    ).not.toBeInTheDocument();

    await userEvent.click(within($activeLine1).getByTestId('next'));

    expect(
      within($activeLine1).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(
      within($activeLine2).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(within($activeLine3).queryByTestId('isActive')).toBeInTheDocument();

    await userEvent.click(within($activeLine1).getByTestId('reset'));

    expect(
      within($activeLine1).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(
      within($activeLine2).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(
      within($activeLine3).queryByTestId('isActive')
    ).not.toBeInTheDocument();

    await userEvent.click(within($activeLine1).getByTestId('goto-3'));

    expect(
      within($activeLine1).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(
      within($activeLine2).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(within($activeLine3).queryByTestId('isActive')).toBeInTheDocument();

    await userEvent.click(within($activeLine2).getByTestId('goto-1'));

    expect(within($activeLine1).queryByTestId('isActive')).toBeInTheDocument();
    expect(
      within($activeLine2).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(
      within($activeLine3).queryByTestId('isActive')
    ).not.toBeInTheDocument();

    await userEvent.click(within($activeLine3).getByTestId('goto-2'));

    expect(
      within($activeLine1).queryByTestId('isActive')
    ).not.toBeInTheDocument();
    expect(within($activeLine2).queryByTestId('isActive')).toBeInTheDocument();
    expect(
      within($activeLine3).queryByTestId('isActive')
    ).not.toBeInTheDocument();
  });

  test('activate after reset', async () => {
    renderLineContentWithData((_, state) => [
      {
        id: 'open-group',
        activateable: true,
        show: state.activeGroup !== null,
        content: <div data-testid="open-group">test group open</div>,
      },
      {
        id: 'active-line',
        activateable: true,
        content: <TestActivateAfterReset />,
      },
      {
        id: 'target-line',
        activateable: true,
        content: 'target line',
      },
    ]);

    await userEvent.click(
      screen.getByRole('button', { name: /goto target line/i })
    );

    expect(screen.queryByTestId('open-group')).not.toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 2/i);
    expect(screen.getByRole('listitem', { current: true })).toHaveTextContent(
      /target line/i
    );
  });

  test('lempar error bila pada line yang bukan `activateable=true`', () => {
    // Referensi ngetest lempar error:
    // Docs Jest: https://jestjs.io/docs/using-matchers#exceptions
    // https://stackoverflow.com/questions/66328549/testing-an-error-thrown-by-a-react-component-using-testing-library-and-jest
    // https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest
    // React Router: https://github.com/remix-run/react-router/blob/main/packages/react-router/__tests__/Router-test.tsx
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    const renderWithException = () => {
      renderLineContent({
        id: 'not-activateable-line',
        content: <TestWithActiveLine />,
      });
    };

    expect(renderWithException).toThrowErrorMatchingInlineSnapshot(
      `"Hook \`useActiveLine\` ini harus dipakai pada provider \`ActiveLineContext\` dan pada line content dengan \`activateable=true\`."`
    );

    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
