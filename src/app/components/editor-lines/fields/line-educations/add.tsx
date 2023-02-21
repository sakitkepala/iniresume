import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useEducationEditor } from './context';

import * as fieldStyles from '../common-styles.css';
import * as styles from './education.css';

function LineAddEducation() {
  const { resume } = useResumeEditor();
  const { openEducation } = useEducationEditor();
  return (
    <div className={styles.wrapper} onClick={openEducation}>
      <span className={fieldStyles.fieldEmptyLabel}>
        {resume.education.length > 0 ? 'Tambah' : 'Isi'} pendidikan
      </span>
    </div>
  );
}

export { LineAddEducation };
