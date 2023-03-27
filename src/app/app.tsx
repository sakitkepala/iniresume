import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import ScreenLayout from './screens/layout';
import ScreenWelcome from './screens/welcome';
import LoadingEditor from './screens/loading-editor';

import './app.css';

const ScreenEditor = React.lazy(() => import('./screens/editor'));

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ScreenLayout />}>
          <Route index element={<ScreenWelcome />} />
          <Route
            path="/editor"
            element={
              <React.Suspense fallback={<LoadingEditor />}>
                <ScreenEditor />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
