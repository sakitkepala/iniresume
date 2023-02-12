import * as React from 'react';
import {
  StyleSheet,
  Font,
  Document,
  Page,
  View,
  Text,
  Link,
} from '@react-pdf/renderer';

import { parseISO, format } from 'date-fns';
import id from 'date-fns/locale/id';

import dmSansReg from '../../assets/DMSans-Regular.ttf';
import dmSansBold from '../../assets/DMSans-Bold.ttf';

import { type ResumeData } from '../data/resume';

Font.register({
  family: 'DM Sans',
  fonts: [
    {
      src: dmSansReg,
    },
    {
      fontWeight: 'bold',
      src: dmSansBold,
    },
  ],
});

const pdfStyles = StyleSheet.create({
  page: {
    paddingVertical: '1.25cm',
    paddingHorizontal: '1.125cm',
    fontFamily: 'DM Sans',
    fontSize: 9,
  },

  header: {
    marginBottom: '0.875cm',
  },
  inlineContact: {
    marginTop: 10,
    paddingTop: 2,
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },

  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
  },

  contentBlock: {
    marginBottom: 8,
  },

  columns: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5cm',
  },
  colLeft: { flex: 1 },
  colRight: { width: '37.5%' },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },

  sectionHeading: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textHeading: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  textSubheading: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  textDaterange: {
    fontSize: 8,
  },
  textLinebreak: {
    color: '#79cc50',
  },

  experienceContainer: {
    marginBottom: 4,
  },

  projectContainer: {
    marginTop: 4,
    marginLeft: 8,
  },
  projectName: {
    fontWeight: 'bold',
  },
  projectLink: {
    fontSize: 8,
  },

  textSchoolHeading: {
    fontSize: 11,
  },

  tagList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  tagItem: {
    padding: '1px 5px',
    borderRadius: 2,
    backgroundColor: '#eef3f8',
  },
});

export type ResumePDFProps = {
  data: ResumeData;
};

function ResumePDF({ data }: ResumePDFProps) {
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

          <ContactInfoBar>
            {typeof data.website !== 'undefined' && (
              <Link src={data.website.url}>{data.website.text}</Link>
            )}
            {data.phone &&
              (data.phone.wa ? (
                <Link src={`https://wa.me/62${data.phone.number}`}>
                  {'+62' + data.phone.number}
                </Link>
              ) : (
                <Text>{'+62' + data.phone.number}</Text>
              ))}
            <Link src={`mailto:${data.email}`}>{data.email}</Link>
          </ContactInfoBar>
        </View>

        <View style={pdfStyles.columns}>
          <View style={pdfStyles.colLeft}>
            <View style={pdfStyles.contentBlock}>
              <View style={pdfStyles.list}>
                <Text style={pdfStyles.sectionHeading}>Pengalaman</Text>

                {data.experiences.map((edu) => (
                  <View
                    key={edu.employer}
                    style={pdfStyles.experienceContainer}
                  >
                    <Text style={pdfStyles.textHeading}>{edu.title}</Text>
                    <Text style={pdfStyles.textSubheading}>{edu.employer}</Text>

                    <Text style={pdfStyles.textDaterange}>
                      {_getMonthRangeText(edu.from, edu.to)}
                    </Text>
                    <Text>{edu.description}</Text>

                    {typeof edu.projects !== 'undefined' &&
                      edu.projects.length > 0 && (
                        <View>
                          {edu.projects.map((project) => (
                            <View
                              key={project.name}
                              style={pdfStyles.projectContainer}
                            >
                              <Text style={pdfStyles.projectName}>
                                {project.name}
                              </Text>
                              <Text>{project.description}</Text>
                              {typeof project.url !== 'undefined' && (
                                <Link
                                  style={pdfStyles.projectLink}
                                  src={project.url}
                                >
                                  Link projek &#187;
                                </Link>
                              )}
                            </View>
                          ))}
                        </View>
                      )}
                  </View>
                ))}
              </View>
            </View>

            <View style={pdfStyles.contentBlock}>
              <View style={pdfStyles.list}>
                <Text style={pdfStyles.sectionHeading}>Projek Lain</Text>
                <Text>...konten list projek</Text>
              </View>
            </View>
          </View>

          <View style={pdfStyles.colRight}>
            <View style={pdfStyles.contentBlock}>
              <View style={pdfStyles.list}>
                <Text style={pdfStyles.sectionHeading}>Pendidikan</Text>

                {data.education?.map((edu) => (
                  <View key={edu.school}>
                    <Text style={pdfStyles.textSchoolHeading}>
                      {edu.school}
                    </Text>
                    <Text style={pdfStyles.textSchoolHeading}>{edu.major}</Text>
                    <Text style={pdfStyles.textDaterange}>
                      {edu.from}-{edu.to}
                    </Text>
                    <Text>{edu.description}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={pdfStyles.contentBlock}>
              <View style={pdfStyles.list}>
                <Text style={pdfStyles.sectionHeading}>Skill Teknis</Text>
                <TagList items={data.skills} />
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function ContactInfoBar({ children = null }: React.PropsWithChildren) {
  if (!children) return null;
  const childrenlist = React.Children.toArray(children);
  const separatedChildren: typeof childrenlist = [];
  childrenlist.forEach((element, index) => {
    if (index > 0) {
      separatedChildren.push(<Text key={index}>&#47;</Text>);
    }
    separatedChildren.push(element);
  });
  return <View style={pdfStyles.inlineContact}>{separatedChildren}</View>;
}

function TagList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <View style={pdfStyles.tagList}>
      {items.map((item) => (
        <Text key={item} style={pdfStyles.tagItem}>
          {item}
        </Text>
      ))}
    </View>
  );
}

function _getMonthRangeText(from: string, to: string) {
  const _formatMonth = (dateString: string) =>
    format(parseISO(dateString), 'MMMM yyyy', { locale: id });
  return `${_formatMonth(from)} - ${_formatMonth(to)}`;
}

export { ResumePDF };
