import * as React from 'react';
import { makeContext } from './make-context';
import { getInitialData, saveData, clearSaveData } from '../data/resume';

import {
  type ResumeData,
  type PhoneNumber,
  type Account,
  type Website,
  type Experience,
  type Project,
  type Education,
} from '../data/resume';

type ResumeEditorDispatchFns = {
  updateTextField: (field: keyof ResumeData, value: string) => void;
  updatePhone: (value: PhoneNumber) => void;
  updateWebsite: (value: Website) => void;
  updateAccount: (account: Account) => void;
  updateExperience: (
    id: string,
    field: keyof Experience,
    value: string
  ) => void;
  updateExperienceDates: (
    id: string,
    dates: { from: string; to: string; ongoing: boolean }
  ) => void;
  updateProject: (
    experienceId: string,
    projectId: string,
    field: keyof Project,
    value: string
  ) => void;
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  updateEducationDates: (
    id: string,
    range: { from: number | string; to: number | string }
  ) => void;
  addSkill: (value: string) => void;
  editSkill: (value: string, originalValue: string) => void;
  insertSkill: (insertAfterSkill: string, value: string) => void;
  insertSkillTop: (skill: string) => void;
  updateOtherProjects: (
    projectId: string,
    field: keyof Project,
    value: string
  ) => void;
};

type ResumeEditorContextValue = ResumeEditorDispatchFns & {
  resume: ResumeData;
};

const [ResumeEditorContext, useResumeEditor] =
  makeContext<ResumeEditorContextValue>({
    hookName: 'useResumeEditor',
    hookUsageErrorMessage:
      'Hook `useResumeEditor` harus dipakai pada child `ResumeEditorProvider`.',
  });

function ResumeEditorProvider({ children }: React.PropsWithChildren) {
  const value = useEditor();
  return (
    <ResumeEditorContext.Provider value={value}>
      {children}
    </ResumeEditorContext.Provider>
  );
}

type ResumeEditorActionsType =
  | {
      type: 'UPDATE_STRING_FIELD';
      field: keyof ResumeData;
      payload: string;
    }
  | {
      type: 'UPDATE_PHONE';
      payload: PhoneNumber;
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
      type: 'UPDATE_EXPERIENCE_DATES';
      id: string;
      payload: { from: string; to: string; ongoing: boolean };
    }
  | {
      type: 'UPDATE_PROJECT_ITEM';
      experienceId: string;
      projectId: string;
      field: keyof Project;
      payload: string;
    }
  | {
      type: 'UPDATE_EDUCATION';
      field: keyof Education;
      id: string;
      payload: string;
    }
  | {
      type: 'UPDATE_EDUCATION_DATES';
      id: string;
      payload: { from: number | string; to?: number | string };
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
    }
  | {
      type: 'UPDATE_OTHER_PROJECT_ITEM';
      projectId: string;
      field: keyof Project;
      payload: string;
    };

function reducer(
  state: ResumeData,
  action: ResumeEditorActionsType
): ResumeData {
  switch (action.type) {
    case 'UPDATE_STRING_FIELD': {
      return { ...state, [action.field]: action.payload };
    }

    case 'UPDATE_PHONE': {
      return {
        ...state,
        phone: {
          ...state.phone,
          ...action.payload,
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

      // NO-OPS
      if (!target && (!action.payload.url || !action.payload.account)) {
        return state;
      }

      // TAMBAH
      if (!target) {
        return {
          ...state,
          accounts: [...state.accounts, action.payload],
        };
      }

      // KOSONGKAN NILAI UNTUK GITHUB & LINKEDIN
      // Kedua akun ini template, item gak dihapus tapi dikosongkan aja nilainya
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

      // HAPUS, by account atau by url
      if (!action.payload.account || !action.payload.url) {
        accounts.delete(action.payload.id);
        return {
          ...state,
          accounts: [...accounts.values()],
        };
      }

      // UPDATE
      accounts.set(action.payload.id, action.payload);
      return {
        ...state,
        accounts: [...accounts.values()],
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

    case 'UPDATE_EXPERIENCE_DATES': {
      const experienceIds = new Set(state.experiences.map((xp) => xp.id));

      // Harus disediakan ID & payload lengkap
      if (!action.id || (!action.payload.from && !action.payload.to)) {
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

        if (!action.payload.from) {
          return state;
        }

        return {
          ...state,
          experiences: [
            ...state.experiences,
            {
              ...newXP,
              id: action.id,
              from: action.payload.from,
              to: action.payload.to,
              ongoing: action.payload.ongoing,
            },
          ],
        };
      }

      const experiences = new Map(state.experiences.map((xp) => [xp.id, xp]));
      const edit = experiences.get(action.id);

      if (!edit) {
        return state;
      }

      if (!action.payload.from) {
        experiences.set(action.id, {
          ...edit,
          from: '',
          to: '',
          ongoing: false,
        });
        return { ...state, experiences: [...experiences.values()] };
      }

      // Edit data yang ada
      experiences.set(action.id, {
        ...edit,
        from: action.payload.from,
        to: action.payload.to,
        ongoing: action.payload.ongoing,
      });

      return { ...state, experiences: [...experiences.values()] };
    }

    case 'UPDATE_PROJECT_ITEM': {
      if (!action.experienceId || !action.projectId) {
        return state;
      }

      const experiences = new Map(
        state.experiences.map((exp) => [exp.id, exp])
      );
      const targetExp = experiences.get(action.experienceId);

      if (!targetExp) {
        return state;
      }

      const projects = new Map(
        targetExp.projects.map((project) => [project.id, project])
      );
      const targetProject = projects.get(action.projectId);

      if (!targetProject && !action.payload) {
        return state;
      }

      if (!targetProject) {
        const newProject: Project = {
          id: action.projectId,
          name: '',
          description: '',
          url: '',
          [action.field]: action.payload,
        };

        experiences.set(action.experienceId, {
          ...targetExp,
          projects: [...projects.values(), newProject],
        });

        return {
          ...state,
          experiences: [...experiences.values()],
        };
      }

      if (action.field === 'name' && !action.payload) {
        projects.delete(action.projectId);
        experiences.set(action.experienceId, {
          ...targetExp,
          projects: [...projects.values()],
        });
        return {
          ...state,
          experiences: [...experiences.values()],
        };
      }

      projects.set(action.projectId, {
        ...targetProject,
        [action.field]: action.payload,
      });
      experiences.set(action.experienceId, {
        ...targetExp,
        projects: [...projects.values()],
      });
      return {
        ...state,
        experiences: [...experiences.values()],
      };
    }

    case 'UPDATE_EDUCATION': {
      const educationIds = new Set(state.education.map((xp) => xp.id));

      // Harus disediakan ID
      if (!action.id) {
        return state;
      }

      // Create data baru
      if (!educationIds.has(action.id)) {
        const newEduItem: Education = {
          id: '',
          school: '',
          major: '',
          from: '',
          to: '',
          userange: true,
          ongoing: false,
          description: '',
        };

        // Waktu create data, harus disesuaikan nama field & payloadnya
        if (!action.field || !action.payload) {
          return state;
        }

        return {
          ...state,
          education: [
            ...state.education,
            { ...newEduItem, id: action.id, [action.field]: action.payload },
          ],
        };
      }

      const education = new Map(state.education.map((xp) => [xp.id, xp]));
      const edit = education.get(action.id);

      if (!edit) {
        return state;
      }

      // Khusus field `school` kalau dikasih nilai kosong jadi menghapus data
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

    case 'UPDATE_EDUCATION_DATES': {
      const educationIds = new Set(state.education.map((xp) => xp.id));

      // Harus disediakan ID & payload lengkap
      if (!action.id || (!action.payload.from && !action.payload.to)) {
        return state;
      }

      // Create data baru
      if (!educationIds.has(action.id)) {
        const newEduItem: Education = {
          id: '',
          school: '',
          major: '',
          from: '',
          to: '',
          userange: true,
          ongoing: false,
          description: '',
        };

        if (!action.payload.from) {
          return state;
        }

        return {
          ...state,
          education: [
            ...state.education,
            {
              ...newEduItem,
              id: action.id,
              from: action.payload.from,
              to: action.payload.to,
            },
          ],
        };
      }

      const education = new Map(state.education.map((xp) => [xp.id, xp]));
      const edit = education.get(action.id);

      if (!edit) {
        return state;
      }

      if (!action.payload.from) {
        education.set(action.id, { ...edit, from: '', to: '' });
        return { ...state, education: [...education.values()] };
      }

      // Edit data yang ada
      education.set(action.id, {
        ...edit,
        from: action.payload.from,
        to: action.payload.to,
      });

      return { ...state, education: [...education.values()] };
    }

    case 'ADD_SKILL': {
      // skip kalau udah ada
      if (!action.payload || new Set(state.skills).has(action.payload)) {
        return state;
      }

      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
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

    case 'UPDATE_OTHER_PROJECT_ITEM': {
      if (!action.projectId) {
        return state;
      }

      const projects = new Map(
        state.otherProjects.map((project) => [project.id, project])
      );
      const targetProject = projects.get(action.projectId);

      if (!targetProject && !action.payload) {
        return state;
      }

      if (!targetProject) {
        const newProject: Project = {
          id: action.projectId,
          name: '',
          description: '',
          url: '',
          [action.field]: action.payload,
        };

        return {
          ...state,
          otherProjects: [...projects.values(), newProject],
        };
      }

      if (action.field === 'name' && !action.payload) {
        projects.delete(action.projectId);
        return {
          ...state,
          otherProjects: [...projects.values()],
        };
      }

      projects.set(action.projectId, {
        ...targetProject,
        [action.field]: action.payload,
      });
      return {
        ...state,
        otherProjects: [...projects.values()],
      };
    }

    default: {
      return state;
    }
  }
}

function useEditor() {
  const [resume, dispatch] = React.useReducer(reducer, getInitialData());

  React.useEffect(() => {
    const isEmpty = _checkIsEmpty(resume);
    if (!isEmpty) {
      saveData(resume);
    } else {
      clearSaveData();
    }
  }, [resume]);

  const dispatches = React.useMemo<ResumeEditorDispatchFns>(
    () => ({
      updateTextField: (field, value) => {
        dispatch({ type: 'UPDATE_STRING_FIELD', field, payload: value });
      },

      updatePhone: (value) => {
        dispatch({ type: 'UPDATE_PHONE', payload: value });
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

      updateExperienceDates: (id, dates) => {
        dispatch({
          type: 'UPDATE_EXPERIENCE_DATES',
          id: id,
          payload: dates,
        });
      },

      updateProject: (experienceId, projectId, field, value) => {
        dispatch({
          type: 'UPDATE_PROJECT_ITEM',
          experienceId,
          projectId,
          field,
          payload: value,
        });
      },

      updateEducation: (id, field, value) => {
        dispatch({ type: 'UPDATE_EDUCATION', id, field, payload: value });
      },

      updateEducationDates: (id, range) => {
        dispatch({
          type: 'UPDATE_EDUCATION_DATES',
          id: id,
          payload: range,
        });
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

      updateOtherProjects: (projectId, field, value) => {
        dispatch({
          type: 'UPDATE_OTHER_PROJECT_ITEM',
          projectId,
          field,
          payload: value,
        });
      },
    }),
    []
  );

  return React.useMemo<ResumeEditorContextValue>(
    () => ({ resume, ...dispatches }),
    [resume, dispatches]
  );
}

function _checkIsEmpty(resume: ResumeData): boolean {
  const fields = new Map<string, (val: any) => boolean>();
  fields.set('fullName', (val: string) => val.length > 0);
  fields.set('title', (val: string) => val.length > 0);
  fields.set('about', (val: string) => val.length > 0);
  fields.set('gender', (val: string) => val.length > 0);
  fields.set('birthdate', (val: string) => val.length > 0);
  fields.set('city', (val: string) => val.length > 0);
  fields.set('province', (val: string) => val.length > 0);
  fields.set('email', (val: string) => val.length > 0);
  fields.set('phone', (val: PhoneNumber) => val.number.length > 0);
  fields.set('website', (val: Website) => val.url.length > 0);
  fields.set('accounts', (val: Account[]) => val.length > 0);
  fields.set('experiences', (val: Experience[]) => val.length > 0);
  fields.set('education', (val: Education[]) => val.length > 0);
  fields.set('skills', (val: string[]) => val.length > 0);
  fields.set('otherProjects', (val: Project[]) => val.length > 0);

  const isDirty = Object.keys(resume).some((fieldKey) => {
    const check = fields.get(fieldKey);
    if (!check) {
      return false;
    }
    return check(resume[fieldKey as keyof ResumeData]);
  });

  return !isDirty;
}

export * from '../data/resume';
export { ResumeEditorProvider, useResumeEditor };
