import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import { FieldExperienceDescription } from './field-paragraph';
import { FieldEducationDescription } from './field-paragraph';

describe('FieldExperienceDescription', () => {
  test('render label ketika gak punya value', () => {
    renderLineContent({
      id: 'experience-description',
      activateable: true,
      content: <FieldExperienceDescription experienceId="fake-experience-id" />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1// Deskripsikan pekerjaannya"`);
  });

  test('render konten teks sesuai value', () => {
    const value = 'Ini deskripsi pengalaman';
    renderLineContent({
      id: 'experience-description',
      activateable: true,
      content: (
        <FieldExperienceDescription
          experienceId="fake-experience-id"
          value={value}
        />
      ),
    });

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('pindah line selanjutnya setelah simpan', async () => {
    renderLineContent({
      id: 'experience-description',
      activateable: true,
      content: <FieldExperienceDescription experienceId="fake-experience-id" />,
    });

    await userEvent.click(screen.getByText(/deskripsikan/i));

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 1/i);

    await userEvent.type(screen.getByDisplayValue(''), 'type something{Enter}');

    expect(
      screen.queryByRole('listitem', { current: true })
    ).not.toHaveAccessibleName(/line 1/i);
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 2/i);
  });
});

describe('FieldEducationDescription', () => {
  test('render label ketika gak punya value', () => {
    renderLineContent({
      id: 'education-description',
      activateable: true,
      content: <FieldEducationDescription educationId="fake-education-id" />,
    });

    expect(screen.getByRole('listitem', { name: /line 1/i }))
      .toMatchInlineSnapshot(`
      <div
        aria-label="Line 1"
        class=""
        role="listitem"
      >
        <div>
          1
        </div>
        <div>
          <span>
            // Tuliskan deskripsi studi bila perlu *bisa dikosongi
          </span>
        </div>
      </div>
    `);
  });

  test('render konten teks sesuai value', () => {
    const value = 'Ini deskripsi pendidikan';
    renderLineContent({
      id: 'education-description',
      activateable: true,
      content: (
        <FieldEducationDescription
          educationId="fake-education-id"
          value={value}
        />
      ),
    });

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('pindah line selanjutnya setelah simpan', async () => {
    renderLineContent({
      id: 'education-description',
      activateable: true,
      content: <FieldEducationDescription educationId="fake-education-id" />,
    });

    await userEvent.click(screen.getByText(/deskripsi/i));

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 1/i);

    await userEvent.type(screen.getByDisplayValue(''), 'type something{Enter}');

    expect(
      screen.queryByRole('listitem', { current: true })
    ).not.toHaveAccessibleName(/line 1/i);
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 2/i);
  });
});
