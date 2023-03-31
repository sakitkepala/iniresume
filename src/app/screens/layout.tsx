import * as React from 'react';
import { useMatch, useLocation, Outlet } from 'react-router-dom';

import { ResumeEditorProvider } from '../contexts/resume-editor';
import { HeaderBar, Breadcrumb } from '../components/header-bar';

function ScreenLayout() {
  const location = useLocation();
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
      <HeaderBar currentPath={location.pathname}>
        <Breadcrumb />
      </HeaderBar>
      <Outlet />
    </ResumeEditorProvider>
  );
}

export default ScreenLayout;
