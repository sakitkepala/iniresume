import { StyleSheet, View, Text, Link } from '@react-pdf/renderer';

import { type Experience } from '../../../data/resume';

import { parseISO, format } from 'date-fns';
import id from 'date-fns/locale/id';
import en from 'date-fns/locale/en-GB';

import { pdfStyles } from '../styles';

const styles = StyleSheet.create({
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
});

function SectionExperiences({
  en,
  experiences,
}: {
  en?: boolean;
  experiences: Experience[];
}) {
  if (!experiences?.length) {
    return null;
  }
  return (
    <View style={pdfStyles.contentBlock}>
      <View style={pdfStyles.list}>
        <Text style={pdfStyles.sectionHeading}>
          {!en ? <>Pengalaman</> : <>Experiences</>}
        </Text>

        {experiences.map((edu) => (
          <View key={edu.employer} style={styles.experienceContainer}>
            <Text style={pdfStyles.textHeading}>{edu.title}</Text>
            <Text style={pdfStyles.textSubheading}>{edu.employer}</Text>

            <Text style={pdfStyles.textDaterange}>
              {_getMonthRangeText(edu.from, edu.to, en)}
            </Text>
            <Text>{edu.description}</Text>

            {!edu.projects?.length ? null : (
              <View>
                {edu.projects.map((project) => (
                  <View key={project.name} style={styles.projectContainer}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <Text>{project.description}</Text>
                    {!project.url ? null : (
                      <Link style={styles.projectLink} src={project.url}>
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
  );
}

function _getMonthRangeText(from: string, to: string, useEnglish?: boolean) {
  if (!from || !to) {
    return 'Isi periode bekerjanya dulu...';
  }
  const _formatMonth = (dateString: string) =>
    format(parseISO(dateString), 'MMMM yyyy', { locale: useEnglish ? en : id });
  return `${_formatMonth(from)} - ${_formatMonth(to)}`;
}

export { SectionExperiences };
