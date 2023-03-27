import * as React from 'react';
import { useMatch, Outlet } from 'react-router-dom';

import { ResumeEditorProvider } from '../contexts/resume-editor';
import { HeaderBar, Breadcrumb } from '../components/header-bar';

function ScreenLayout() {
  const match = useMatch('/');
  const isHome = Boolean(match);

  if (isHome) {
    return (
      <React.Fragment>
        <HeaderBar />
        <Outlet />
      </React.Fragment>
    );
  }

  return (
    <ResumeEditorProvider>
      <HeaderBar>
        <Breadcrumb />
      </HeaderBar>
      <Outlet />
    </ResumeEditorProvider>
  );
}

export default ScreenLayout;
