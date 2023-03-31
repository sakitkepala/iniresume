import { pdf } from '@react-pdf/renderer';
import { ResumePDF } from './resume-pdf';
import resumeData from './tests/resume';

// Referensi testing hasil "render" pdf dengan snapshot & function untuk env node:
// https://github.com/diegomura/react-pdf/issues/750#issuecomment-607361102
describe('ResumePDF', () => {
  test('Tree generate pdf', async () => {
    const document = await pdf(
      <ResumePDF data={resumeData} config={{ useEnglish: false }} />
    ).container;
    expect(document).toMatchSnapshot();
  });

  test('Tree generate pdf dengan template bahasa inggris', async () => {
    const document = await pdf(
      <ResumePDF data={resumeData} config={{ useEnglish: true }} />
    ).container;
    expect(document).toMatchSnapshot();
  });
});
