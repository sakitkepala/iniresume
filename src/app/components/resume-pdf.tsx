import {
  StyleSheet,
  Font,
  Document,
  Page,
  View,
  Text,
} from '@react-pdf/renderer';

import dmSansReg from '../../assets/DMSans-Regular.ttf';
import dmSansBold from '../../assets/DMSans-Bold.ttf';

import { resumeData } from '../screens/editor';

Font.register({
  family: 'DM Sans',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: dmSansReg,
    },
    {
      fontStyle: 'bold',
      fontWeight: 700,
      src: dmSansBold,
    },
  ],
});

const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: 'DM Sans',
  },
});

function ResumePDF({ data }: { data: typeof resumeData }) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View>
          <Text>
            {data.fullName}, {data.title}
          </Text>
        </View>

        <View>
          <Text>Pendidikan</Text>
          {data.education.map((ed) => (
            <View key={ed.school}>
              <Text>{ed.school}</Text>
              <Text style={{ fontSize: 13 }}>{ed.major}</Text>
              <Text style={{ fontSize: 13 }}>
                {ed.from}-{ed.to}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export { ResumePDF };
