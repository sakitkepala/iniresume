/* eslint-disable no-irregular-whitespace */
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent, renderLineContentWithData } from '../test-utils';

import {
  FieldListItemAddSkill,
  FieldListItemSkill,
} from './field-list-item-skill';
import { saveData, getInitialData } from 'src/app/data/resume';
import { type LineContent } from '../types';

describe('FieldListItemAddSkill', () => {
  test('render trigger isi skill default ketika masih kosong', () => {
    renderLineContent({
      id: 'add-skill',
      activateable: true,
      content: <FieldListItemAddSkill />,
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
          <div
            class=""
          >
            <div>
              -
            </div>
            <div>
               
            </div>
            <div>
              <span>
                //
                 Isi skill
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  test('reset inputan field setelah simpan', async () => {
    renderLineContent({
      id: 'add-skill',
      activateable: true,
      content: <FieldListItemAddSkill />,
    });

    await userEvent.click(screen.getByText(/isi/i));
    await userEvent.type(screen.getByDisplayValue(''), 'react{Enter}');

    expect(screen.queryByDisplayValue('react')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  test('render trigger untuk tambah skill di bawah item lain', () => {
    renderLineContent({
      id: 'insert-skill',
      activateable: true,
      content: <FieldListItemAddSkill asInsert />,
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
          <div
            class=""
          >
            <div>
              -
            </div>
            <div>
               
            </div>
            <div>
              <span>
                //
                 Isi skill
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  test('non-aktifkan semua line setelah simpan untuk insert', async () => {
    renderLineContent({
      id: 'insert-skill',
      activateable: true,
      content: <FieldListItemAddSkill asInsert insertBelow="react" />,
    });

    await userEvent.click(screen.getByText(/isi/i));
    await userEvent.type(screen.getByDisplayValue(''), 'typescript{Enter}');

    expect(
      screen.queryByRole('listitem', { current: true })
    ).not.toBeInTheDocument();
  });

  test('render trigger untuk tambah skill di paling atas', () => {
    renderLineContent({
      id: 'insert-skill-top',
      activateable: true,
      content: <FieldListItemAddSkill asInsertTop />,
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
          <div
            class=""
          >
            <div>
              -
            </div>
            <div>
               
            </div>
            <div>
              <span>
                //
                 Isi skill
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  test('non-aktifkan semua line setelah simpan untuk insert di paling atas', async () => {
    saveData({
      ...getInitialData(),
      skills: ['react'],
    });

    renderLineContent({
      id: 'insert-skill-top',
      activateable: true,
      content: <FieldListItemAddSkill asInsertTop />,
    });

    await userEvent.click(screen.getByText(/isi/i));
    await userEvent.type(screen.getByDisplayValue(''), 'typescript{Enter}');

    expect(
      screen.queryByRole('listitem', { current: true })
    ).not.toBeInTheDocument();
  });

  test('render trigger tambah skill lagi', () => {
    saveData({
      ...getInitialData(),
      skills: ['react'],
    });

    renderLineContent({
      id: 'add-skill',
      activateable: true,
      content: <FieldListItemAddSkill />,
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
            <span>
               
            </span>
            <span>
               
            </span>
            <button
              tabindex="-1"
            >
              Tambah skill lagi
            </button>
          </span>
        </div>
      </div>
    `);
  });
});

describe('FieldListItemSkill', () => {
  test('render sebagai trigger ketika di awal masih kosong', () => {
    renderLineContent({
      id: 'item-as-add-skill',
      activateable: true,
      content: <FieldListItemSkill />,
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
          <div
            class=""
          >
            <div>
              -
            </div>
            <div>
               
            </div>
            <div>
              <span>
                //
                 Isi skill
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  test('render sebagai display item skill dari value ketika sudah terisi', () => {
    saveData({
      ...getInitialData(),
      skills: ['react'],
    });

    renderLineContentWithData((resume) => ({
      id: 'item-skill',
      activateable: true,
      content: <FieldListItemSkill value={resume.skills[0]} />,
    }));

    expect(screen.getByText('react')).toBeInTheDocument();
  });

  test('render action untuk insert sesuai posisinya di list', () => {
    const skills = ['react', 'javascript', 'typescript'];
    saveData({
      ...getInitialData(),
      skills,
    });

    renderLineContentWithData((resume) =>
      resume.skills.map((skill, index) => ({
        id: 'skill-item-' + skill,
        activateable: true,
        content: (
          <FieldListItemSkill
            value={skill}
            first={index === 0}
            last={index === resume.skills.length - 1}
          />
        ),
      }))
    );

    const $skillItems = screen.getAllByRole('listitem');

    expect($skillItems).toHaveLength(skills.length);

    const $skill_1 = $skillItems[0];

    expect(
      within($skill_1).getByRole('button', { name: /atasnya/i })
    ).toBeInTheDocument();
    expect(
      within($skill_1).getByRole('button', { name: /bawahnya/i })
    ).toBeInTheDocument();

    const $skill_2 = $skillItems[1];

    expect(
      within($skill_2).queryByRole('button', { name: /atasnya/i })
    ).not.toBeInTheDocument();
    expect(
      within($skill_2).getByRole('button', { name: /bawahnya/i })
    ).toBeInTheDocument();

    const $skill_3 = $skillItems[2];

    expect(
      within($skill_3).queryByRole('button', { name: /atasnya/i })
    ).not.toBeInTheDocument();
    expect(
      within($skill_3).queryByRole('button', { name: /bawahnya/i })
    ).not.toBeInTheDocument();
  });

  test('tambah dan insert sesuai posisi targetnya', async () => {
    saveData({
      ...getInitialData(),
      skills: ['react', 'javascript', 'typescript'],
    });

    let contentInsertBelow = '';

    renderLineContentWithData((resume, state) => [
      {
        id: 'skill-item-top',
        activateable: true,
        show: state.insertSkillTop,
        content: 'input at top opened',
      },

      ...resume.skills.reduce<LineContent[]>((contents, skill, index) => {
        // untuk di-assert habis ini
        contentInsertBelow = state.insertSkillBelow
          ? `input below the item "${state.insertSkillBelow}" opened`
          : '';

        return [
          ...contents,
          {
            id: 'skill-item-' + skill,
            activateable: true,
            content: (
              <FieldListItemSkill
                value={skill}
                first={index === 0}
                last={index === resume.skills.length - 1}
              />
            ),
          },
          {
            id: 'insert-skill-below-item' + skill,
            activateable: true,
            show: state.insertSkillBelow === skill,
            content: contentInsertBelow,
          },
        ];
      }, []),
    ]);

    expect(screen.queryByText(/input at top opened/i)).not.toBeInTheDocument();

    const $buttonAddTop = within(screen.getAllByRole('listitem')[0]).getByRole(
      'button',
      { name: /atasnya/i }
    );

    await userEvent.click($buttonAddTop);

    expect(
      within(screen.getAllByRole('listitem')[0]).getByText(
        /input at top opened/i
      )
    ).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByText(/input below the item/i)).not.toBeInTheDocument();

    const $buttonAddBelowLine1 = within(
      screen.getAllByRole('listitem')[0]
    ).getByRole('button', { name: /bawahnya/i });

    await userEvent.click($buttonAddBelowLine1);

    expect(
      within(screen.getAllByRole('listitem')[1]).getByText(contentInsertBelow)
    ).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByText(/input below the item/i)).not.toBeInTheDocument();

    const $buttonAddBelowLine2 = within(
      screen.getAllByRole('listitem')[1]
    ).getByRole('button', { name: /bawahnya/i });

    await userEvent.click($buttonAddBelowLine2);

    expect(
      within(screen.getAllByRole('listitem')[2]).getByText(contentInsertBelow)
    ).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
  });
});
