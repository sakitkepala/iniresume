import { type ResumeData } from 'src/app/data/resume';

const data: ResumeData = {
  fullName: 'Full Name',
  title: 'Job Title',
  gender: 'male',
  birthdate: '2000-03-20',
  city: 'City',
  province: 'Province',
  about: 'About description',
  email: 'email@example.com',
  phone: {
    number: '085777777777',
    wa: true,
  },
  website: {
    text: 'Website name',
    url: 'http://example.com',
  },
  accounts: [
    {
      id: 'account-id-1',
      account: 'github',
      url: 'https://github.com/myprofile',
      text: '@myprofile',
    },
    {
      id: 'account-id-2',
      account: 'linkedin',
      url: 'https://linkedin.com/in/myprofile',
      text: 'My Profile Page',
    },
  ],
  experiences: [
    {
      id: 'experience-id',
      title: 'Job Title',
      employer: 'Employer',
      from: '2000-03',
      to: '2000-03',
      ongoing: false,
      description: 'Description',
      projects: [
        {
          id: 'project-1',
          name: 'Project Name',
          description: 'Project description',
        },
        {
          id: 'project-2',
          name: 'Project Name',
          description: '',
          url: 'https://example.com',
        },
      ],
    },
  ],
  education: [
    {
      id: 'education-id',
      school: 'School',
      major: 'Major',
      ongoing: true,
      from: '2000',
      to: '',
      description: '',
      userange: true,
    },
  ],
  otherProjects: [
    {
      id: 'other-project-id',
      name: 'Other Project Name',
      description: 'Other Project Description',
      url: 'https://example.com',
    },
  ],
  skills: ['skill-1', 'skill-2', 'skill-3'],
};

export default data;
