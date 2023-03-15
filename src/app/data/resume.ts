import { v4 } from 'uuid';

export type ResumeData = {
  fullName: string;
  title: string;
  about: string;
  gender: string;
  birthdate: string;
  city: string;
  province: string;

  email: string;
  phone: PhoneNumber;
  website: Website;

  accounts: Account[];
  experiences: Experience[];
  education: Education[];
  skills: string[];

  otherProjects: Project[];
};

export type Website = {
  url: string;
  text: string;
};

export type PhoneNumber = {
  number: string;
  wa: boolean;
};

export type Account = {
  id: string;
  account: string;
  url: string;
  text?: string;
};

export type Experience = {
  id: string;
  employer: string;
  title: string;
  from: string;
  to: string;
  ongoing: boolean;
  description: string;
  projects: Project[];
};

export type Project = {
  id: string;
  name: string;
  from?: string;
  to?: string;
  description?: string;
  url?: string;
};

export type Education = {
  id: string;
  school: string;
  major: string;
  from: string | number;
  to?: string | number;
  ongoing: boolean;
  userange: boolean;
  description?: string;
};

const LOCAL_DATA_KEY = 'iniresume';

function loadSaveData() {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const savedResume = window.localStorage.getItem(LOCAL_DATA_KEY);
    if (savedResume) {
      const saved: { data: ResumeData } = JSON.parse(savedResume);
      return saved.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function saveData(resume: ResumeData) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      LOCAL_DATA_KEY,
      JSON.stringify({ data: resume })
    );
  } catch (error) {
    console.error(error);
  }
}

function clearSaveData() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(LOCAL_DATA_KEY);
  } catch (error) {
    console.error(error);
  }
}

function getInitialData(): ResumeData {
  // get local storage (sync):
  const save = loadSaveData();
  if (save) {
    return save;
  }
  // Empty initial data
  return {
    fullName: '',
    title: '',
    about: '',
    gender: '',
    birthdate: '',
    city: '',
    province: '',

    email: '',
    phone: {
      number: '',
      wa: false,
    },
    website: {
      url: '',
      text: '',
    },

    accounts: [
      {
        id: v4(),
        account: 'github',
        url: '',
        text: '',
      },
      {
        id: v4(),
        account: 'linkedin',
        url: '',
        text: '',
      },
    ],
    experiences: [],
    education: [],
    skills: [],

    otherProjects: [],
  };
}

export {
  LOCAL_DATA_KEY,
  loadSaveData,
  saveData,
  clearSaveData,
  getInitialData,
};
