import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useExperienceEditor } from './context';

import * as fieldStyles from '../common-styles.css';
import * as styles from './experiences.css';

function LineAddExperience() {
  const { resume } = useResumeEditor();
  const { openExperience } = useExperienceEditor();
  return (
    <div className={styles.wrapper} onClick={openExperience}>
      <span className={fieldStyles.fieldEmptyLabel}>
        {resume.experiences.length > 0 ? 'Tambah' : 'Isi'} pengalaman
      </span>
    </div>
  );
}

export { LineAddExperience };
