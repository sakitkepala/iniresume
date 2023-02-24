import * as React from 'react';
import { makeContext } from './makeContext';
import { getInitialData } from '../data/resume';
import {
  type ResumeData,
  type PhoneNumber,
  type Account,
  type Website,
  type Experience,
  type Education,
} from '../data/resume';

type ResumeEditorContextValue = {
  resume: ResumeData;
  updateField: (field: keyof ResumeData, value: ResumeFieldPayload) => void;
  updateTextField: (field: keyof ResumeData, value: string) => void;
  updateWebsite: (value: Website) => void;
  updateAccount: (account: Account) => void;
  updateExperience: (
    id: string,
    field: keyof Experience,
    value: string
  ) => void;
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  addSkill: (value: string) => void;
  editSkill: (value: string, originalValue: string) => void;
  insertSkill: (insertAfterSkill: string, value: string) => void;
  insertSkillTop: (skill: string) => void;
};

const [ResumeEditorContext, useResumeEditor] =
  makeContext<ResumeEditorContextValue>(
    'Hook `useResumeEditor` harus dipakai di child `ResumeEditorProvider`.'
  );

function ResumeEditorProvider({ children }: React.PropsWithChildren) {
  const value = useEditor();
  return (
    <ResumeEditorContext.Provider value={value}>
      {children}
    </ResumeEditorContext.Provider>
  );
}

type ResumeFieldPayload = string | PhoneNumber;

type ResumeEditorActionsType =
  | {
      type: 'UPDATE_GENERIC_FIELD';
      field: keyof ResumeData;
      payload: ResumeData[keyof ResumeData];
    }
  | {
      type: 'UPDATE_STRING_FIELD';
      field: keyof ResumeData;
      payload: string;
    }
  | {
      type: 'UPDATE_WEBSITE';
      payload: Website;
    }
  | {
      type: 'UPDATE_ACCOUNT';
      payload: Account;
    }
  | {
      type: 'UPDATE_EXPERIENCE';
      field: keyof Experience;
      id: string;
      payload: string;
    }
  | {
      type: 'UPDATE_EDUCATION';
      field: keyof Education;
      id: string;
      payload: string;
    }
  | {
      type: 'ADD_SKILL';
      payload: string;
    }
  | {
      type: 'EDIT_SKILL';
      payload: {
        value: string;
        original: string;
      };
    }
  | {
      type: 'INSERT_SKILL';
      payload: {
        insertAfterSkill: string;
        value: string;
      };
    }
  | {
      type: 'INSERT_SKILL_TOP';
      payload: string;
    };

function reducer(state: ResumeData, action: ResumeEditorActionsType) {
  switch (action.type) {
    case 'UPDATE_STRING_FIELD': {
      return { ...state, [action.field]: action.payload };
    }

    case 'UPDATE_GENERIC_FIELD': {
      const currentData = state[action.field];
      const dataObject = typeof currentData === 'string' ? {} : currentData;
      return {
        ...state,
        [action.field]: {
          ...dataObject,
          ...(typeof action.payload !== 'string' ? action.payload : {}),
        },
      };
    }

    case 'UPDATE_WEBSITE': {
      // Reset data website ketika dikosongi URL-nya
      if (!action.payload.url) {
        return {
          ...state,
          website: { url: '', text: '' },
        };
      }

      return { ...state, website: action.payload };
    }

    case 'UPDATE_ACCOUNT': {
      const accounts = new Map(state.accounts.map((acc) => [acc.id, acc]));
      const target = accounts.get(action.payload.id);

      if (!target && !action.payload.url) {
        return state;
      }

      if (!target) {
        return {
          ...state,
          accounts: [...state.accounts, action.payload],
        };
      }

      if (
        !action.payload.url &&
        new Set(['github', 'linkedin']).has(
          action.payload.account.toLowerCase()
        )
      ) {
        accounts.set(action.payload.id, { ...action.payload, text: '' });
        return {
          ...state,
          accounts: [...accounts.values()],
        };
      }

      if (!action.payload.url) {
        accounts.delete(action.payload.id);
        return {
          ...state,
          accounts: [...accounts.values()],
        };
      }

      accounts.set(action.payload.id, action.payload);
      return {
        ...state,
        accounts: [...accounts.values()],
      };
    }

    case 'ADD_SKILL': {
      // skip kalau udah ada
      if (state.skills.indexOf(action.payload) >= 0) {
        return state;
      }

      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
    }

    case 'UPDATE_EXPERIENCE': {
      const experienceIds = new Set(state.experiences.map((xp) => xp.id));

      // Harus disediakan ID
      if (!action.id) {
        return state;
      }

      // Create data baru
      if (!experienceIds.has(action.id)) {
        const newXP: Experience = {
          id: '',
          title: '',
          employer: '',
          from: '',
          to: '',
          ongoing: false,
          description: '',
          projects: [],
        };

        // Waktu create data, harus disesiakan nama field & payloadnya
        if (!action.field || !action.payload) {
          return state;
        }

        return {
          ...state,
          experiences: [
            ...state.experiences,
            { ...newXP, id: action.id, [action.field]: action.payload },
          ],
        };
      }

      const experiences = new Map(state.experiences.map((xp) => [xp.id, xp]));
      const edit = experiences.get(action.id);

      if (!edit) {
        return state;
      }

      // Khusus field `title` kalau dikasih nilai kosong jadi menghapus data
      if (action.field === 'title' && !action.payload) {
        experiences.delete(action.id);
        return { ...state, experiences: [...experiences.values()] };
      }

      // Edit data yang ada
      experiences.set(action.id, {
        ...edit,
        [action.field]: action.payload,
      });

      return { ...state, experiences: [...experiences.values()] };
    }

    case 'UPDATE_EDUCATION': {
      const educationIds = new Set(state.education.map((xp) => xp.id));

      // Harus disediakan ID
      if (!action.id) {
        return state;
      }

      // Create data baru
      if (!educationIds.has(action.id)) {
        const newXP: Education = {
          id: '',
          school: '',
          major: '',
          from: '',
          to: '',
          userange: true,
          ongoing: false,
          description: '',
        };

        // Waktu create data, harus disesiakan nama field & payloadnya
        if (!action.field || !action.payload) {
          return state;
        }

        return {
          ...state,
          education: [
            ...state.education,
            { ...newXP, id: action.id, [action.field]: action.payload },
          ],
        };
      }

      const education = new Map(state.education.map((xp) => [xp.id, xp]));
      const edit = education.get(action.id);

      if (!edit) {
        return state;
      }

      // Khusus field `title` kalau dikasih nilai kosong jadi menghapus data
      if (action.field === 'school' && !action.payload) {
        education.delete(action.id);
        return { ...state, education: [...education.values()] };
      }

      // Edit data yang ada
      education.set(action.id, {
        ...edit,
        [action.field]: action.payload,
      });

      return { ...state, education: [...education.values()] };
    }

    case 'INSERT_SKILL': {
      // skip kalau udah ada
      if (
        state.skills.indexOf(action.payload.value) >= 0 ||
        !action.payload.insertAfterSkill
      ) {
        return state;
      }

      const indexAtPrevious = state.skills.indexOf(
        action.payload.insertAfterSkill
      );

      if (indexAtPrevious < 0) {
        return state;
      }

      const skillsAfterInsert = [...state.skills];
      skillsAfterInsert.splice(indexAtPrevious + 1, 0, action.payload.value);

      return {
        ...state,
        skills: skillsAfterInsert,
      };
    }

    case 'INSERT_SKILL_TOP': {
      return { ...state, skills: [action.payload, ...state.skills] };
    }

    case 'EDIT_SKILL': {
      // Nge-hapus skill
      if (!action.payload.value && action.payload.original) {
        return {
          ...state,
          skills: state.skills.filter(
            (skill) => skill !== action.payload.original
          ),
        };
      }

      // skip kalau udah ada
      if (
        !action.payload.value ||
        new Set(state.skills).has(action.payload.value)
      ) {
        return state;
      }

      return {
        ...state,
        skills: state.skills.map((skill) =>
          skill === action.payload.original ? action.payload.value : skill
        ),
      };
    }

    default: {
      return state;
    }
  }
}

function useEditor() {
  const [resume, dispatch] = React.useReducer(reducer, getInitialData());

  return React.useMemo<ResumeEditorContextValue>(
    () => ({
      resume,

      updateField: (field, value) => {
        dispatch({ type: 'UPDATE_GENERIC_FIELD', field, payload: value });
      },

      updateTextField: (field, value) => {
        dispatch({ type: 'UPDATE_STRING_FIELD', field, payload: value });
      },

      updateWebsite: (value: Website) => {
        dispatch({ type: 'UPDATE_WEBSITE', payload: value });
      },

      updateAccount: (account: Account) => {
        dispatch({ type: 'UPDATE_ACCOUNT', payload: account });
      },

      updateExperience: (id, field, value) => {
        dispatch({ type: 'UPDATE_EXPERIENCE', id, field, payload: value });
      },

      updateEducation: (id, field, value) => {
        dispatch({ type: 'UPDATE_EDUCATION', id, field, payload: value });
      },

      addSkill: (value) => {
        dispatch({ type: 'ADD_SKILL', payload: value });
      },

      editSkill: (value, originalValue) => {
        dispatch({
          type: 'EDIT_SKILL',
          payload: {
            value,
            original: originalValue,
          },
        });
      },

      insertSkill: (insertAfterSkill, value) => {
        dispatch({
          type: 'INSERT_SKILL',
          payload: {
            insertAfterSkill,
            value,
          },
        });
      },

      insertSkillTop: (skill: string) => {
        dispatch({
          type: 'INSERT_SKILL_TOP',
          payload: skill,
        });
      },
    }),

    [resume]
  );
}

export * from '../data/resume';
export { ResumeEditorProvider, useResumeEditor };
