import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import ScreenWelcome from './screens/welcome';
import ScreenTransition from './screens/transition';

import './app.css';

const ScreenEditor = React.lazy(() => import('./screens/editor'));

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ScreenWelcome />} />
        <Route
          path="/editor"
          element={
            <React.Suspense fallback={<ScreenTransition />}>
              <ScreenEditor />
            </React.Suspense>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
