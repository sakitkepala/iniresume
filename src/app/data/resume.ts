import { v4 } from 'uuid';

export type ResumeData = {
  fullName: string;
  title: string;
  gender: string;
  birthdate: string;
  city: string;
  province: string;

  email: string;
  phone: PhoneNumber;
  website?: Website;

  accounts: Account[];
  experiences: Experience[];
  education: Education[];
  skills: string[];
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
  // return exampleDataAndika;
  // Empty initial data
  return {
    fullName: '',
    title: '',
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
  };
}

export const exampleDataAndika: ResumeData = {
  fullName: 'Andika Priyotama Dharminto',
  title: 'Frontend Developer',
  gender: 'male',
  birthdate: '1991-08-27',
  city: 'Kota Semarang',
  province: 'Jawa Tengah',

  email: 'andikapriyotamad@gmail.com',
  phone: {
    number: '85700003017',
    wa: true,
  },
  website: {
    url: 'https://andika.dev',
    text: 'andika.dev',
  },

  accounts: [
    {
      id: v4(),
      account: 'github',
      url: 'https://github.com/sakitkepala',
      text: 'sakitkepala',
    },
    {
      id: v4(),
      account: 'linkedin',
      url: 'https://linkedin.com/in/andikapriyotama',
      text: 'Andika Priyotama Dharminto',
    },
    {
      id: v4(),
      account: 'gitlab',
      url: 'https://gitlab.com/andikapriyotamad',
      text: 'andikapriyotamad',
    },
  ],

  education: [
    {
      id: v4(),
      school: 'Universitas Dian Nuswantoro',
      major: 'D3 Teknik Informatika (Multimedia)',
      from: 2009,
      to: 2017,
      ongoing: false,
      userange: false,
      description:
        '*)Tertunda menyelesaikan studi untuk cuti kuliah sementara waktu untuk bekerja.',
    },
    {
      id: v4(),
      school: 'SMA Negeri 3 Semarang',
      major: 'IPA',
      from: 2006,
      to: 2009,
      ongoing: false,
      userange: false,
      description: '',
    },
  ],

  experiences: [
    {
      id: v4(),
      employer: 'PT Reka Cipta Digital',
      title: 'Frontend Developer',
      from: '2021-10',
      to: '2022-10',
      ongoing: false,
      description:
        'Bersama rekan tim My Archery membangun produk event-organizing olahraga Panahan.',
      projects: [
        {
          id: v4(),
          name: 'My Archery (myarchery.id)',
          from: '',
          to: '',
          description:
            'Berperan dalam pengembangan dan implementasi user-interface pada sebagian besar fiturnya,' +
            ' di antaranya: manajemen event, scoring pertandingan (kualifikasi & eliminasi), live scoreboard,' +
            ' dashboard Director of Scoring (DOS), manajemen pendaftaran event, serta landing page myarchery.id,.' +
            ' dan beberapa lainnya lagi. Stack teknologi menggunakan: frontend React & REST API.',
          url: 'https://myarchery.id',
        },
      ],
    },
    {
      id: v4(),
      employer: 'PT Bumi Tekno Indonesia',
      title: 'Frontend Developer',
      from: '2021-06',
      to: '2021-08',
      ongoing: false,
      description:
        'Mengembangkan produk aplikasi sekolah yang bermodel on-premises.',
      projects: [
        {
          id: v4(),
          name: 'UI Fitur Administrasi SPP, aplikasi "Smart School"',
          description:
            'Berperan dalam pengembangan user-interface beberapa fitur manajemen administrasi SPP sekolah' +
            ' seperti manajemen tagihan siswa dan manajemen akun-akun keuangan. Stack teknologi yang digunakan:' +
            ' frontend Laravel (Blade+Bootstrap+jQuery) & REST API.',
          url: '',
        },
      ],
    },
    {
      id: v4(),
      employer: 'PT Eka Reka Palakerti Indonesia',
      title: 'Odoo Software Developer',
      from: '2019-07',
      to: '2020-11',
      ongoing: false,
      description:
        'Bersama rekan tim mengembangkan kustomisasi sistem ERP' +
        ' sesuai requirement klien. Menggunakan stack teknologi pada framework Odoo:' +
        ' Python, PostgreSQL, JavaScript (backbone.js+jQuery+Bootstrap) & RPC API.',
      projects: [
        {
          id: v4(),
          name: 'Addon Reporting Kawasan Berikat Bea Cukai, PT Boyang Industrial',
          description:
            'Manajemen dokumen-dokumen pelaporan inventory bagi perusahaan kawasan berikat' +
            ' yang patuh terhadap aturan DJBC. Terlibat dalam pengembangan addon dengan' +
            ' skema database custom, pengumpulan data reporting dari berbagai proses manufacturing,' +
            ' serta penambahan widget kontrol reporting custom pada UI bawaan Odoo.',
          url: '',
        },
        {
          id: v4(),
          name: 'Addon Custom untuk Manufacturing & Akuntansi, PT Pandowo Utomo Food',
          description:
            'Terlibat dalam penyesuaian sistem untuk beberapa proses manufacturing,' +
            ' termasuk pada warehousing dan valuasi inventaris pada akuntansi.',
          url: '',
        },
      ],
    },
  ],

  skills: [
    'React',
    'JavaScript',
    'TypeScript',
    'HTML/CSS',
    'SASS',
    'Figma',
    // 'styled component',
    // 'design slicing',
    'responsive web design',
    'REST API (client)',
    'GraphQL (client)',
    'browser debugging',
    'unit testing',
    'technical documentation',
    'React Native (beginner)',
    'Flipper debugging',
    // 'Webpack',
    // 'Nx workspace',
    // 'Redux',
    // 'Node',
    'relational database',
    'SQL',
    'Git',
    'Linux',
    // 'Odoo',
    // 'Unity (game engine)',
  ],
};

export default exampleDataAndika;
export {
  LOCAL_DATA_KEY,
  loadSaveData,
  saveData,
  clearSaveData,
  getInitialData,
};
