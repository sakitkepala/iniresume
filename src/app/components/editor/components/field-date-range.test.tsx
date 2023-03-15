import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContentWithData } from '../test-utils';

import { FieldExperienceDates, FieldEducationDates } from './field-date-range';

describe('FieldExperienceDates', () => {
  test('render teks range masa bekerja sesuai value input', async () => {
    renderLineContentWithData((resume, state) => {
      const createId = resume.experiences[0]?.id || state.nextCreateId;
      return [
        {
          id: createId + '-experience-dates',
          activateable: true,
          content: (
            <FieldExperienceDates
              experienceId={createId}
              from={resume.experiences[0]?.from}
              to={resume.experiences[0]?.to}
              ongoing={resume.experiences[0]?.ongoing}
            />
          ),
        },
        {
          id: createId + '-experience-activateable',
          activateable: true,
          content: 'fake activateable',
        },
        {
          id: createId + '-experience-description',
          activateable: true,
          content: 'fake description',
        },
      ];
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
            //
             Isi waktu masa bekerja
          </span>
        </div>
      </div>
    `);

    await userEvent.click(screen.getByText(/masa bekerja/i));
    await userEvent.type(screen.getByLabelText(/bulan mulai/i), '10');
    await userEvent.type(screen.getByLabelText(/tahun mulai/i), '2021');
    await userEvent.type(screen.getByLabelText(/bulan selesai/i), '10');
    await userEvent.type(
      screen.getByLabelText(/tahun selesai/i),
      '2022{Enter}'
    );

    expect(
      screen.getByText(/Oktober 2021 - Oktober 2022/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);
  });

  test('render teks masa bekerja yang sedang berlangsung', async () => {
    renderLineContentWithData((resume, state) => {
      const createId = resume.experiences[0]?.id || state.nextCreateId;
      return {
        id: createId + '-experience-dates',
        activateable: true,
        content: (
          <FieldExperienceDates
            experienceId={createId}
            from={resume.experiences[0]?.from}
            to={resume.experiences[0]?.to}
            ongoing={resume.experiences[0]?.ongoing}
          />
        ),
      };
    });

    await userEvent.click(screen.getByText(/masa bekerja/i));
    await userEvent.type(screen.getByLabelText(/bulan mulai/i), '10');
    await userEvent.type(screen.getByLabelText(/tahun mulai/i), '2021');
    await userEvent.click(screen.getByText(/masih berlangsung/i));
    await userEvent.keyboard('{Enter}');

    expect(screen.getByText(/Oktober 2021 - Sekarang/i)).toBeInTheDocument();
  });

  test('render instruksi untuk centang sedang berlangsung bila value tanggal selesai kosong', async () => {
    renderLineContentWithData((resume, state) => {
      const createId = resume.experiences[0]?.id || state.nextCreateId;
      return {
        id: createId + '-experience-dates',
        activateable: true,
        content: (
          <FieldExperienceDates
            experienceId={createId}
            from={resume.experiences[0]?.from}
            to={resume.experiences[0]?.to}
            ongoing={resume.experiences[0]?.ongoing}
          />
        ),
      };
    });

    await userEvent.click(screen.getByText(/masa bekerja/i));
    await userEvent.type(screen.getByLabelText(/bulan mulai/i), '10');
    await userEvent.type(screen.getByLabelText(/tahun mulai/i), '2021');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByText(/belum diisi/i)).toBeInTheDocument();
  });
});

describe('FieldEducationDates', () => {
  test('render teks range masa studi pendidikan sesuai value input', async () => {
    renderLineContentWithData((resume, state) => {
      const createId = resume.education[0]?.id || state.nextCreateId;
      return [
        {
          id: createId + '-education-dates',
          activateable: true,
          content: (
            <FieldEducationDates
              educationId={createId}
              from={resume.education[0]?.from.toString()}
              to={resume.education[0]?.to?.toString()}
            />
          ),
        },
        {
          id: createId + '-education-activateable',
          activateable: true,
          content: 'fake activateable',
        },
        {
          id: createId + '-education-description',
          activateable: true,
          content: 'fake description',
        },
      ];
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
            //
             Isi waktu masa studi
          </span>
        </div>
      </div>
    `);

    await userEvent.click(screen.getByText(/masa studi/i));
    await userEvent.type(screen.getByLabelText(/tahun mulai/i), '2023');
    await userEvent.type(
      screen.getByLabelText(/tahun selesai/i),
      '2024{Enter}'
    );

    expect(screen.getByText(/2023-2024/)).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 3/i);
  });
});
