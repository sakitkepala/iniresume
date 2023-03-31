import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResumeEditorProvider } from 'src/app/contexts/resume-editor';
import { LineList } from './line-list';
import { saveData, getInitialData } from 'src/app/contexts/resume-editor';
import { type LineContent } from './types';

describe('LineList', () => {
  test('render line-line editor custom', async () => {
    let contents: LineContent[] = [];
    let createId = '';
    const valueName = 'My Name';

    saveData({
      ...getInitialData(),
      fullName: valueName,
    });

    render(
      <ResumeEditorProvider>
        <LineList
          buildContents={(resume, configState) => {
            createId = configState.nextCreateId;
            contents = [
              { id: 'line1', content: resume.fullName },
              { id: 'line2', content: createId },
              { id: 'line3', activateable: true, content: 'activate' },
            ];
            return contents;
          }}
        />
      </ResumeEditorProvider>
    );

    const $listItems = screen.getAllByRole('listitem');

    expect($listItems).toHaveLength(contents.length);
    expect($listItems[0]).toHaveTextContent(valueName);
    expect($listItems[1]).toHaveTextContent(createId);

    expect(
      screen.queryByRole('listitem', { current: true })
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('activate'));

    expect(screen.getByRole('listitem', { current: true })).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName('Line 3');
  });

  test('otomatis aktifkan line pertama yang activateable sesuai prop', async () => {
    render(
      <ResumeEditorProvider>
        <LineList
          autofocus
          buildContents={() => [
            { id: 'line1' },
            { id: 'line2', activateable: true },
            { id: 'line3' },
            { id: 'line4', activateable: true },
            { id: 'line5' },
            { id: 'line6', activateable: true },
            { id: 'line7' },
          ]}
        />
      </ResumeEditorProvider>
    );

    const $defaultActiveLine = await screen.findByRole('listitem', {
      current: true,
    });
    expect($defaultActiveLine).toBeInTheDocument();
    expect($defaultActiveLine).toHaveAccessibleName(/line 2/i);
  });

  test('hotkey pindah-pindah line', async () => {
    render(
      <ResumeEditorProvider>
        <LineList
          buildContents={() => [
            { id: 'line1' },
            { id: 'line2', activateable: true },
            { id: 'line3' },
            { id: 'line4', activateable: true },
            { id: 'line5' },
            { id: 'line6', activateable: true },
            { id: 'line7' },
          ]}
        />
      </ResumeEditorProvider>
    );

    expect(
      screen.queryByRole('listitem', { current: true })
    ).not.toBeInTheDocument();

    await userEvent.keyboard('{Down}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName('Line 2');

    await userEvent.keyboard('{Down}{Down}{Down}{Down}{Down}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName('Line 6');

    await userEvent.keyboard('{Escape}');

    expect(
      screen.queryByRole('listitem', { current: true })
    ).not.toBeInTheDocument();

    await userEvent.keyboard('{Up}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName('Line 6');

    await userEvent.keyboard('{Up}{Up}{Up}{Up}{Up}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName('Line 2');
  });

  test('klik di luar editor menonaktifkan semua line', async () => {
    render(
      <div data-testid="outside-target">
        <ResumeEditorProvider>
          <LineList
            buildContents={() => [
              { id: 'line1', activateable: true, content: 'activate' },
            ]}
          />
        </ResumeEditorProvider>
      </div>
    );

    expect(
      screen.queryByRole('listitem', { current: true })
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('activate'));

    expect(screen.getByRole('listitem', { current: true })).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('outside-target'));

    expect(
      screen.queryByRole('listitem', { current: true })
    ).not.toBeInTheDocument();
  });
});
