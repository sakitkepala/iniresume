export type ResumeData = {
  fullName?: string;
  title?: string;
  gender?: string;
  birthdate?: string;
  city?: string;
  province?: string;

  email?: string;
  phone?: {
    number: string;
    wa?: boolean;
  };
  website?: {
    url: string;
    text?: string;
  };

  accounts: {
    account: string;
    username: string;
    url: string;
    text?: string;
  }[];

  experiences: {
    employer: string;
    title: string;
    from: string;
    to: string;
    description: string;
    projects?: {
      name: string;
      from?: string;
      to?: string;
      description?: string;
      url?: string;
    }[];
  }[];

  education: {
    school: string;
    major: string;
    from?: string | number;
    to?: string | number;
    description?: string;
  }[];

  skills: string[];
};

export function getInitialData(): ResumeData {
  // TODO: balikin uncomment ini:
  // return {
  //   fullName: '',
  //   title: '',
  //   gender: '',
  //   birthdate: '',
  //   city: '',
  //   province: '',

  //   email: '',
  //   phone: {
  //     number: '',
  //     wa: false,
  //   },
  //   website: {
  //     url: '',
  //     text: '',
  //   },

  //   accounts: [],
  //   experiences: [],
  //   education: [],
  //   skills: [],
  // };
  return exampleData;
}

export const exampleData: ResumeData = {
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
      account: 'github',
      username: 'sakitkepala',
      url: 'https://github.com/sakitkepala',
      text: '',
    },
    {
      account: 'gitlab',
      username: 'andikapriyotamad',
      url: 'https://gitlab.com/andikapriyotamad',
      text: '',
    },
    {
      account: 'linkedin',
      username: 'andikapriyotama',
      url: 'https://linkedin.com/in/andikapriyotama',
      text: '',
    },
  ],

  education: [
    {
      school: 'Universitas Dian Nuswantoro',
      major: 'D3 Teknik Informatika (Multimedia)',
      from: 2009,
      to: 2017,
      description:
        '*)Tertunda menyelesaikan studi untuk cuti kuliah sementara waktu untuk bekerja.',
    },
    {
      school: 'SMA Negeri 3 Semarang',
      major: 'IPA',
      from: 2006,
      to: 2009,
      description: '',
    },
  ],

  experiences: [
    {
      employer: 'PT Reka Cipta Digital',
      title: 'Frontend Developer',
      from: '2021-10-01',
      to: '2022-10-31',
      description:
        'Bersama rekan tim My Archery membangun produk event-organizing olahraga Panahan.',
      projects: [
        {
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
      employer: 'PT Bumi Tekno Indonesia',
      title: 'Frontend Developer',
      from: '2021-06-01',
      to: '2021-08-31',
      description:
        'Mengembangkan produk aplikasi sekolah yang bermodel on-premises.',
      projects: [
        {
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
      employer: 'PT Eka Reka Palakerti Indonesia',
      title: 'Odoo Software Developer',
      from: '2019-07-01',
      to: '2020-11-01',
      description:
        'Bersama rekan tim mengembangkan kustomisasi sistem ERP' +
        ' sesuai requirement klien. Menggunakan stack teknologi pada framework Odoo:' +
        ' Python, PostgreSQL, JavaScript (backbone.js+jQuery+Bootstrap) & RPC API.',
      projects: [
        {
          name: 'Addon Reporting Kawasan Berikat Bea Cukai, PT Boyang Industrial',
          description:
            'Manajemen dokumen-dokumen pelaporan inventory bagi perusahaan kawasan berikat' +
            ' yang patuh terhadap aturan DJBC. Terlibat dalam pengembangan addon dengan' +
            ' skema database custom, pengumpulan data reporting dari berbagai proses manufacturing,' +
            ' serta penambahan widget kontrol reporting custom pada UI bawaan Odoo.',
          url: '',
        },
        {
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

export default exampleData;
