import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ScreenWelcome from './welcome';
import { saveData, getInitialData } from '../data/resume';

describe('ScreenWelcome', () => {
  test('render Welcome screen default', () => {
    render(
      <MemoryRouter>
        <ScreenWelcome />
      </MemoryRouter>
    );

    const $headline = screen.getByRole('heading', { name: /one-page resume/i });
    const $featureHeading = screen.getByLabelText(/feature heading/i);
    const $featureCopy = screen.getByLabelText(/feature copywriting/i);
    const $buttonCreate = screen.getByRole('button', { name: /buat resume/i });

    expect($headline).toBeInTheDocument();
    expect($headline.textContent).toMatchInlineSnapshot(
      `"One-Page Resume ✨untuk bantu luncurkankarir dev barumu."`
    );

    expect(
      screen.getByAltText(/rocket launch illustration/i)
    ).toBeInTheDocument();

    expect($featureHeading).toBeInTheDocument();
    expect($featureHeading.textContent).toMatchInlineSnapshot(
      `"Coba Editor Resume!"`
    );

    expect($featureCopy).toBeInTheDocument();
    expect($featureCopy.textContent).toMatchInlineSnapshot(
      `"Tulis konten resume di editor dengan \\"markdown\\", lalu generate resume yang bisa di-download dalam bentuk PDF. Gratis!"`
    );

    expect($buttonCreate).toBeInTheDocument();
    expect($buttonCreate.textContent).toMatchInlineSnapshot(`"✨Buat Resume"`);

    expect(
      screen.queryByLabelText(/existing resume message/i)
    ).not.toBeInTheDocument();
  });

  test('render message terkait resume yang sudah tersimpan', () => {
    saveData({
      ...getInitialData(),
      fullName: 'Full Name',
      title: 'Job Title',
    });

    render(
      <MemoryRouter>
        <ScreenWelcome />
      </MemoryRouter>
    );

    const $messageExistingResume = screen.getByLabelText(
      /existing resume message/i
    );
    const $buttonEdit = within($messageExistingResume).getByRole('button', {
      name: /edit/i,
    });
    const $buttonCreate = screen.getByRole('button', { name: /buat resume/i });

    expect($messageExistingResume).toBeInTheDocument();
    expect($messageExistingResume.textContent).toMatchInlineSnapshot(
      `"👋 Tampaknya kamu masih punya resume sebelumnya nih: Full Name, Job Title. Edit aja?"`
    );

    expect($buttonEdit).toBeInTheDocument();
    expect($buttonEdit.textContent).toMatchInlineSnapshot(
      `"Full Name, Job Title. Edit aja?"`
    );

    expect($buttonCreate).toBeInTheDocument();
    expect($buttonCreate.textContent).toMatchInlineSnapshot(
      `"✨Buat Resume Baru Aja"`
    );
  });
});
