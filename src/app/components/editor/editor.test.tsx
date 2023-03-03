import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResumeEditorProvider } from 'src/app/contexts/resume-editor';
import { Editor } from './editor';

// TODO: Pindah ke file setup sendiri?
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

const _getActiveLine = () => screen.queryByRole('listitem', { current: true });

describe('Editor', () => {
  test('Render line-line editor berdasarkan kontennya', () => {
    const ui = render(
      <ResumeEditorProvider>
        <Editor />
      </ResumeEditorProvider>
    );
    expect(ui.baseElement).toBeTruthy();

    const lines = within(ui.baseElement).getAllByRole('listitem');
    expect(lines.length).toBeGreaterThan(0);
  });

  test('Aktifkan line ketika diklik', async () => {
    render(
      <ResumeEditorProvider>
        <Editor />
      </ResumeEditorProvider>
    );

    await userEvent.click(screen.getByText(/nama lengkap/i));
    expect(_getActiveLine()).toHaveTextContent('5');
  });

  test('Pindah-pindah line aktif dengan keyboard "naik-turun"', async () => {
    render(
      <ResumeEditorProvider>
        <Editor />
      </ResumeEditorProvider>
    );

    await userEvent.keyboard('{ArrowDown}');
    expect(_getActiveLine()).toHaveTextContent('5'); // line pertama yang aktif itu "Nama Lengkap", di line 5

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    expect(_getActiveLine()).toHaveTextContent('8');

    await userEvent.keyboard('{ArrowUp}');
    expect(_getActiveLine()).toHaveTextContent('7');

    // Non-aktifkan line yang aktif
    await userEvent.keyboard('{Escape}');
    expect(_getActiveLine()).not.toBeInTheDocument();

    // Aktifkan ulang ke line sebelum dinon-aktifkan
    await userEvent.keyboard('{ArrowDown}');
    expect(_getActiveLine()).toHaveTextContent('7');
  });

  test('Non-aktifkan semua line yang aktif kalau klik di luar editor', async () => {
    const ui = render(
      <ResumeEditorProvider>
        <Editor />
      </ResumeEditorProvider>
    );

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.click(ui.container);
    expect(_getActiveLine()).not.toBeInTheDocument();
  });
});
