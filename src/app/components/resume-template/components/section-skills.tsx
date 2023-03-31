import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles';

const styles = StyleSheet.create({
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

function SectionKeySkills({ en, items }: { en?: boolean; items?: string[] }) {
  if (!items?.length) {
    return null;
  }
  return (
    <View style={pdfStyles.contentBlock}>
      <View style={pdfStyles.list}>
        <Text style={pdfStyles.sectionHeading}>
          {!en ? <>Skill Kunci</> : <>Key Skills</>}
        </Text>

        <View style={styles.tagList}>
          {items.map((item) => (
            <Text key={item} style={styles.tagItem}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

export { SectionKeySkills };
