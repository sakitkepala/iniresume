import { StyleSheet, View, Text, Link } from '@react-pdf/renderer';
import { type Project } from 'src/app/data/resume';
import { pdfStyles } from '../styles';

const styles = StyleSheet.create({
  projectName: {
    fontWeight: 'bold',
  },
  projectLink: {
    fontSize: 8,
  },
});

function SectionOtherProjects({
  en,
  projects,
}: {
  en?: boolean;
  projects: Project[];
}) {
  if (!projects?.length) {
    return null;
  }
  return (
    <View style={pdfStyles.contentBlock}>
      <View style={pdfStyles.list}>
        <Text style={pdfStyles.sectionHeading}>
          {en ? 'Other Projects' : 'Projek Lain'}
        </Text>

        {projects.map((project) => (
          <View key={project.name}>
            <Text style={styles.projectName}>{project.name}</Text>
            <Text>{project.description}</Text>
            {!project.url ? null : (
              <Text>
                {en ? 'Project link' : 'Link projek'}:{' '}
                <Link style={styles.projectLink} src={project.url}>
                  {project.url} &#187;
                </Link>
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

export { SectionOtherProjects };
