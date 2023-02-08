import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import ScreenWelcome from './screens/welcome';
import ScreenTransition from './screens/transition';

import './global-styles.css';

const ScreenEditor = lazy(() => import('./screens/editor'));

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreenWelcome />} />
        <Route
          path="/editor"
          element={
            <Suspense fallback={<ScreenTransition />}>
              <ScreenEditor />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
