import { View, Text } from '@react-pdf/renderer';
import { type ResumeData } from 'src/app/data/resume';
import { parseISO, differenceInYears } from 'date-fns';
import { pdfStyles } from '../styles';

function SectionAbout({ en, data }: { en?: boolean; data: ResumeData }) {
  return (
    <View style={pdfStyles.contentBlock}>
      <View style={pdfStyles.list}>
        <Text>{data.about}</Text>
        <View>
          <Text>{_getLineGenderAndAge(data, en)}</Text>
          <Text>{_getLineDomicile(data, en)}</Text>
        </View>
      </View>
    </View>
  );
}

function _getLineGenderAndAge(data: ResumeData, en = false) {
  const gender =
    {
      male: !en ? 'Laki-laki' : 'Male',
      female: !en ? 'Perempuan' : 'Female',
    }[data.gender] ||
    data.gender ||
    undefined;

  const age = data.birthdate
    ? differenceInYears(new Date(), parseISO(data.birthdate)) +
      (en ? ' year old' : ' tahun')
    : undefined;

  const parts = [gender, age].filter((part) => typeof part !== 'undefined');
  if (!parts.length) {
    return '';
  }
  return `${parts.join(', ')}`;
}

function _getLineDomicile(data: ResumeData, en = false) {
  const parts = [data.city || undefined, data.province || undefined].filter(
    (part) => typeof part !== 'undefined'
  );
  if (!parts.length) {
    return '';
  }
  return !en ? `Domisili ${parts.join(', ')}` : `Living in ${parts.join(', ')}`;
}

export { SectionAbout };
