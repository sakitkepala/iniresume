import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResumeEditorProvider } from 'src/app/contexts/resume-editor';
import { PreviewPanel, ConfigPanel } from './preview-panel';

const dummyPdfContent = 'pdf content';

jest.mock('./components/preview-paper', () => ({
  PreviewPaper: ({ onUrlChange }: { onUrlChange: (url: string) => void }) => {
    setTimeout(() => onUrlChange('http://localhost:2211/pdf'), 0);
    return dummyPdfContent;
  },
}));

describe('PreviewPanel', () => {
  test('render card pengaturan generate pdf', async () => {
    render(
      <ResumeEditorProvider>
        <PreviewPanel />
      </ResumeEditorProvider>
    );

    const $checkbox = screen.getByRole('checkbox', { name: /bahasa inggris/i });

    expect(
      screen.getByRole('heading', { name: /generate/i })
    ).toBeInTheDocument();
    expect($checkbox).toBeInTheDocument();
    expect($checkbox).not.toBeChecked();
    expect(
      screen.getByRole('button', { name: /preview/i })
    ).toBeInTheDocument();
  });

  test('render viewer preview pdf dari klik tombol preview', async () => {
    render(
      <ResumeEditorProvider>
        <PreviewPanel />
      </ResumeEditorProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /preview/i }));

    const $buttonDownload = screen.getByRole('button', { name: /unduh/i });
    const $buttonReconfig = screen.getByRole('button', { name: /atur ulang/i });

    expect(screen.getByText(dummyPdfContent)).toBeInTheDocument();
    expect($buttonDownload).toBeInTheDocument();
    expect($buttonDownload).toBeDisabled();
    expect($buttonReconfig).toBeInTheDocument();

    await waitFor(() => expect($buttonDownload).toBeEnabled());
  });

  test('kembali ke card pengaturan generate dengan nilai pengaturan seperti sebelumnya', async () => {
    render(
      <ResumeEditorProvider>
        <PreviewPanel />
      </ResumeEditorProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /preview/i }));
    await userEvent.click(screen.getByRole('button', { name: /atur ulang/i }));

    expect(
      screen.getByRole('heading', { name: /generate/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /bahasa inggris/i })
    ).not.toBeChecked();
  });

  test('selalu disable tombol download setiap generate ulang', async () => {
    render(
      <ResumeEditorProvider>
        <PreviewPanel />
      </ResumeEditorProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /preview/i }));
    const $buttonDownloadRender1 = screen.getByRole('button', {
      name: /unduh/i,
    });

    expect($buttonDownloadRender1).toBeDisabled();
    await waitFor(() => expect($buttonDownloadRender1).toBeEnabled());

    await userEvent.click(screen.getByRole('button', { name: /atur ulang/i }));
    await userEvent.click(screen.getByRole('button', { name: /preview/i }));

    const $buttonDownloadRender2 = screen.getByRole('button', {
      name: /unduh/i,
    });

    expect($buttonDownloadRender2).toBeDisabled();
    await waitFor(() => expect($buttonDownloadRender2).toBeEnabled());
  });
});

describe('ConfigPanel', () => {
  test('initial config tanpa bahasa inggris', async () => {
    const handlePreview = jest.fn();
    render(
      <ConfigPanel
        initialConfig={{ useEnglish: false }}
        onPreview={handlePreview}
      />
    );

    const $checkboxEnglish = screen.getByRole('checkbox', {
      name: /bahasa inggris/i,
    });

    expect($checkboxEnglish).toBeInTheDocument();
    expect($checkboxEnglish).not.toBeChecked();
    expect(screen.getByRole('button', { name: /preview/i })).toBeEnabled();
  });

  test('initial config dengan bahasa inggris', async () => {
    const handlePreview = jest.fn();
    render(
      <ConfigPanel
        initialConfig={{ useEnglish: true }}
        onPreview={handlePreview}
      />
    );

    expect(
      screen.getByRole('checkbox', { name: /bahasa inggris/i })
    ).toBeChecked();
  });

  test('disable preview', async () => {
    const handlePreview = jest.fn();
    render(
      <ConfigPanel
        previewDisabled
        initialConfig={{ useEnglish: false }}
        onPreview={handlePreview}
      />
    );

    expect(screen.getByRole('button', { name: /preview/i })).toBeDisabled();
  });
});
