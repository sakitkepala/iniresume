import * as React from 'react';
import { render, screen } from '@testing-library/react';

import {
  ResumeEditorProvider,
  useResumeEditor,
} from '../contexts/resume-editor';
import { clearSaveData } from '../contexts/resume-editor';
import { HeaderBar } from './header-bar';

const data = {
  fullName: 'Name of a user',
  title: 'Job title of a user',
};

function TestInputComponent() {
  const { updateTextField } = useResumeEditor();
  React.useEffect(() => {
    updateTextField('fullName', data.fullName);
    updateTextField('title', data.title);
  }, []);
  return null;
}

beforeEach(() => {
  // Hapus data local storage dari save data resume
  clearSaveData();
});

describe('HeaderBar', () => {
  test('Render defaultnya statik', () => {
    render(<HeaderBar />);
    expect(screen.getByLabelText(/app logo/i)).toBeInTheDocument();
  });

  test('Render dengan tanpa breadcrumb kalau data nama & titel masih kosong', () => {
    render(
      <ResumeEditorProvider>
        <HeaderBar rich />
      </ResumeEditorProvider>
    );

    const breadcrumbInfo = screen.queryByLabelText(/resume info/i);
    expect(breadcrumbInfo).not.toBeInTheDocument();
  });

  test('Render dengan breadcrumb info resume dari data inputannya', () => {
    render(
      <ResumeEditorProvider>
        <HeaderBar rich />
        <TestInputComponent />
      </ResumeEditorProvider>
    );

    const breadcrumbInfo = screen.getByLabelText(/resume info/i);
    expect(breadcrumbInfo).toBeInTheDocument();
    expect(breadcrumbInfo).toHaveTextContent(data.fullName);
    expect(breadcrumbInfo).toHaveTextContent(data.title);
  });
});
