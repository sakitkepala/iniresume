import { render, screen } from '@testing-library/react';

import { ResumeEditorProvider } from '../contexts/resume-editor';
import ScreenEditor from './editor';

describe('ScreenEditor', () => {
  test('render Editor screen default', () => {
    render(
      <ResumeEditorProvider>
        <ScreenEditor />
      </ResumeEditorProvider>
    );

    expect(
      screen.getAllByRole('listitem', { name: /line/i }).length
    ).toBeGreaterThan(0);

    expect(screen.getByText(/informasi/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /generate/i })
    ).toBeInTheDocument();
  });
});
