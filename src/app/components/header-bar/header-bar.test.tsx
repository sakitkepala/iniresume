import { render, screen } from '@testing-library/react';

import {
  saveData,
  getInitialData,
  ResumeEditorProvider,
} from '../../contexts/resume-editor';
import { HeaderBar, Breadcrumb } from './header-bar';

describe('HeaderBar', () => {
  const filename = {
    fullName: 'Fullname',
    title: 'Job Title',
  };

  test('Render defaultnya statik', () => {
    render(<HeaderBar />);

    expect(screen.getByLabelText(/app logo/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/resume info/i)).not.toBeInTheDocument();
  });

  test('Render dengan breadcrumb', () => {
    saveData({ ...getInitialData(), ...filename });

    render(
      <ResumeEditorProvider>
        <HeaderBar>
          <Breadcrumb />
        </HeaderBar>
      </ResumeEditorProvider>
    );

    expect(screen.getByLabelText(/app logo/i)).toBeInTheDocument();

    const $resumeInfo = screen.getByLabelText(/resume info/i);
    expect($resumeInfo).toBeInTheDocument();
    expect($resumeInfo).toHaveTextContent(filename.fullName);
    expect($resumeInfo).toHaveTextContent(filename.title);
  });

  test('Render breadcrumb dengan nama lengkap saja', () => {
    saveData({ ...getInitialData(), fullName: filename.fullName });

    render(
      <ResumeEditorProvider>
        <HeaderBar>
          <Breadcrumb />
        </HeaderBar>
      </ResumeEditorProvider>
    );

    const $resumeInfo = screen.getByLabelText(/resume info/i);
    expect($resumeInfo).toHaveTextContent(filename.fullName);
    expect($resumeInfo).not.toHaveTextContent(filename.title);
  });

  test('Render breadcrumb dengan job title saja', () => {
    saveData({ ...getInitialData(), title: filename.title });

    render(
      <ResumeEditorProvider>
        <HeaderBar>
          <Breadcrumb />
        </HeaderBar>
      </ResumeEditorProvider>
    );

    const $resumeInfo = screen.getByLabelText(/resume info/i);
    expect($resumeInfo).not.toHaveTextContent(filename.fullName);
    expect($resumeInfo).toHaveTextContent(filename.title);
  });

  test('Render breadcrumb tidak render apapun tanpa ada value fullName & title', () => {
    saveData({ ...getInitialData(), fullName: '', title: '' });

    render(
      <ResumeEditorProvider>
        <HeaderBar>
          <Breadcrumb />
        </HeaderBar>
      </ResumeEditorProvider>
    );

    const $resumeInfo = screen.queryByLabelText(/resume info/i);
    expect($resumeInfo).not.toBeInTheDocument();
  });
});
