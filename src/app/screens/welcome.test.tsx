import { render, screen } from '@testing-library/react';

import { HashRouter as Router } from 'react-router-dom';
import ScreenWelcome from './welcome';
import { saveData, getInitialData, clearSaveData } from '../data/resume';

describe('ScreenWelcome', () => {
  test('Screen default untuk memulai buat resume dari awal', () => {
    clearSaveData();

    render(
      <Router>
        <ScreenWelcome />
      </Router>
    );

    expect(
      screen.getByRole('button', { name: /buat resume/i })
    ).toBeInTheDocument();
  });

  test('Screen dengan menampilkan opsi edit untuk resume yang pernah tersimpan', () => {
    saveData({
      ...getInitialData(),
      fullName: 'Full name of a user',
      title: 'Job title of a user',
    });

    render(
      <Router>
        <ScreenWelcome />
      </Router>
    );

    expect(
      screen.queryByRole('button', { name: /buat resume/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /buat baru/i })
    ).toBeInTheDocument();
  });
});
