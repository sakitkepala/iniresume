import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { type Education } from 'src/app/data/resume';
import { pdfStyles } from '../styles';

const styles = StyleSheet.create({
  textSchoolHeading: {
    fontSize: 11,
  },
});

function SectionEducation({
  en,
  education,
}: {
  en?: boolean;
  education: Education[];
}) {
  if (!education?.length) {
    return null;
  }
  return (
    <View style={pdfStyles.contentBlock}>
      <View style={pdfStyles.list}>
        <Text style={pdfStyles.sectionHeading}>
          {!en ? <>Pendidikan</> : <>Education</>}
        </Text>

        {education?.map((edu) => (
          <View key={edu.school}>
            <Text style={styles.textSchoolHeading}>{edu.school}</Text>
            <Text style={styles.textSchoolHeading}>{edu.major}</Text>
            {!edu.from && !edu.to ? null : (
              <Text style={pdfStyles.textDaterange}>
                {_getYearRange(edu.from, edu.to)}
              </Text>
            )}
            <Text>{edu.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function _getYearRange(from: number | string, to?: number | string) {
  const start = !from || isNaN(Number(from)) ? undefined : Number(from);
  const end = !to || isNaN(Number(to)) ? undefined : Number(to);
  return [start, end].filter((year) => typeof year !== 'undefined').join('-');
}

export { SectionEducation };
