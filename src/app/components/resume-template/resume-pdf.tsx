import { Font, Document, Page, View, Text } from '@react-pdf/renderer';
import { ContactInfoBar } from './components/contact-info-bar';
import { SectionExperiences } from './components/section-experiences';
import { SectionAbout } from './components/section-about';
import { SectionEducation } from './components/section-education';
import { SectionKeySkills } from './components/section-skills';
import { SectionProfiles } from './components/section-profiles';

import dmSansReg from 'src/assets/DMSans-Regular.ttf';
import dmSansBold from 'src/assets/DMSans-Bold.ttf';

import { type ResumeData } from '../../data/resume';

import { pdfStyles } from './styles';

Font.register({
  family: 'DM Sans',
  fonts: [
    { src: dmSansReg },
    {
      fontWeight: 'bold',
      src: dmSansBold,
    },
  ],
});

export type ResumePDFProps = {
  data: ResumeData;
  config: { useEnglish: boolean };
};

function ResumePDF({ data, config }: ResumePDFProps) {
  const { useEnglish } = config;
  const labelOtherProjects = useEnglish ? 'Other Projects' : 'Projek Lain';
  return (
    <Document
      author={data.fullName}
      keywords={`CV, resume, ${data.fullName}, ${data.title}`}
      subject={`Resume ${data.fullName}, ${data.title}`}
      title={`Resume ${data.fullName}, ${data.title}`}
    >
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.fullName}>{data.fullName}</Text>
          <Text style={pdfStyles.title}>{data.title}</Text>
          <ContactInfoBar data={data} />
        </View>

        <View style={pdfStyles.columns}>
          <View style={pdfStyles.colLeft}>
            <SectionExperiences
              en={useEnglish}
              experiences={data.experiences}
            />

            <View style={pdfStyles.contentBlock}>
              <View style={pdfStyles.list}>
                <Text style={pdfStyles.sectionHeading}>
                  {labelOtherProjects}
                </Text>
                <Text>...konten list projek</Text>
              </View>
            </View>
          </View>

          <View style={pdfStyles.colRight}>
            <SectionAbout en={useEnglish} data={data} />
            <SectionEducation en={useEnglish} education={data.education} />
            <SectionKeySkills en={useEnglish} items={data.skills} />
            <SectionProfiles en={useEnglish} accounts={data.accounts} />
          </View>
        </View>
      </Page>
    </Document>
  );
}

export { ResumePDF };
