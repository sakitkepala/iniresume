import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

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

    const $appLogo = screen.getByLabelText(/app logo/i);

    expect($appLogo).toBeInTheDocument();
    expect(
      within($appLogo).queryByTitle(/kembali ke halaman depan/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/resume info/i)).not.toBeInTheDocument();
  });

  test('Render dengan link ke home di path yang bukan home', () => {
    render(
      <MemoryRouter>
        <HeaderBar currentPath="/any-path" />
      </MemoryRouter>
    );

    expect(
      within(screen.getByLabelText(/app logo/i)).queryByTitle(
        /kembali ke halaman depan/i
      )
    ).toBeInTheDocument();
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
