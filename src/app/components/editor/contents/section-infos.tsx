import { LineSectionHeading } from '../components/section-heading';
import { FieldListItemText } from '../components/field-list-item-text';
import { FieldGender } from '../components/field-gender';
import { FieldDateOfBirth } from '../components/field-date-of-birth';
import { FieldAbout } from '../components/field-about';
import { FieldListItemPhone } from '../components/field-list-item-phone';
import { FieldWebsite } from '../components/field-website';
import { FieldProfileAccount } from '../components/field-profile-account';
import { FieldListItemAddProfile } from '../components/field-list-item-add-profile';

import { type ResumeData } from 'src/app/data/resume';
import { type LineContent } from '../types';

function sectionInfos(resume: ResumeData): LineContent[] {
  return [
    {
      id: 'section-infos',
      content: <LineSectionHeading>Informasi</LineSectionHeading>,
    },
    { id: 'section-infos-trail' },

    { id: 'infos-general', content: <>Umum:</> },
    { id: 'infos-general-trail' },

    {
      id: 'fullName',
      activateable: true,
      content: (
        <FieldListItemText
          field="fullName"
          label="Nama lengkap"
          value={resume.fullName}
        />
      ),
    },
    {
      id: 'title',
      activateable: true,
      content: (
        <FieldListItemText
          field="title"
          label="Titel profesi"
          value={resume.title}
        />
      ),
    },
    {
      id: 'gender',
      activateable: true,
      content: <FieldGender value={resume.gender} />,
    },
    {
      id: 'birthdate',
      activateable: true,
      content: <FieldDateOfBirth value={resume.birthdate} />,
    },
    {
      id: 'city',
      activateable: true,
      content: (
        <FieldListItemText
          field="city"
          label="Kota domisili"
          value={resume.city}
        />
      ),
    },
    {
      id: 'province',
      activateable: true,
      content: (
        <FieldListItemText
          field="province"
          label="Provinsi domisili"
          value={resume.province}
        />
      ),
    },
    { id: 'infos-general-list-trail' },

    { id: 'infos-about', content: <>Tentang:</> },
    { id: 'infos-about-trail' },

    {
      id: 'about-description',
      activateable: true,
      content: <FieldAbout value={resume.about} />,
    },
    { id: 'about-description-trail' },

    { id: 'infos-contact', content: <>Kontak:</> },
    { id: 'infos-contact-trail' },

    {
      id: 'email',
      activateable: true,
      content: (
        <FieldListItemText field="email" label="Email" value={resume.email} />
      ),
    },
    {
      id: 'phone',
      activateable: true,
      content: (
        <FieldListItemPhone
          value={resume.phone.number}
          hasWA={resume.phone.wa}
        />
      ),
    },
    { id: 'infos-contact-list-trail' },

    { id: 'infos-profile', content: <>Profil online:</> },
    { id: 'infos-profile-trail' },

    {
      id: 'website',
      activateable: true,
      content: <FieldWebsite />,
    },
    ...resume.accounts.reduce<LineContent[]>(
      (contents, account) => [
        ...contents,
        {
          id: account.id,
          activateable: true,
          content: <FieldProfileAccount account={account} />,
        },
      ],
      []
    ),
    {
      id: 'profile-add',
      activateable: true,
      content: <FieldListItemAddProfile />,
    },
    { id: 'infos-profile-list-trail' },
  ];
}

export { sectionInfos };
