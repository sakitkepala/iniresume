import { StyleSheet, View, Text, Link } from '@react-pdf/renderer';
import { type Experience } from 'src/app/data/resume';

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

        {experiences.map((experience) => (
          <View key={experience.employer} style={styles.experienceContainer}>
            <Text style={pdfStyles.textHeading}>{experience.title}</Text>
            <Text style={pdfStyles.textSubheading}>{experience.employer}</Text>

            <Text style={pdfStyles.textDaterange}>
              {_getMonthRangeText(experience, en)}
            </Text>
            <Text>{experience.description}</Text>

            {!experience.projects?.length ? null : (
              <View>
                {experience.projects.map((project) => (
                  <View key={project.name} style={styles.projectContainer}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <Text>{project.description}</Text>
                    {!project.url ? null : (
                      <Link style={styles.projectLink} src={project.url}>
                        {en ? 'Project link' : 'Link projek'} &#187;
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

function _getMonthRangeText(experience: Experience, useEnglish?: boolean) {
  const _formatMonth = (dateString: string) =>
    format(parseISO(dateString), 'MMMM yyyy', {
      locale: useEnglish ? en : id,
    });
  if (experience.from && experience.to) {
    return `${_formatMonth(experience.from)} - ${_formatMonth(experience.to)}`;
  }
  if (experience.ongoing && experience.from && !experience.to) {
    return `${_formatMonth(experience.from)} - ${
      useEnglish ? 'Present' : 'Sekarang'
    }`;
  }
  return 'Isi periode bekerjanya dulu...';
}

export { SectionExperiences };
