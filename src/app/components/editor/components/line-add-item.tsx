import * as React from 'react';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useLineContents } from '../contexts/line-contents';
import { useActiveLine } from '../contexts/active-line';

import * as fieldStyles from './fields.css';
import * as styles from './line-add-item.css';

function LineAddExperience() {
  const { resume } = useResumeEditor();
  const { openExperience } = useLineContents();
  const { isActive } = useActiveLine();

  React.useEffect(() => {
    isActive && openExperience();
  }, [isActive, openExperience]);

  return (
    <div
      className={styles.wrapper}
      onClick={(ev) => {
        ev.stopPropagation();
        openExperience();
      }}
    >
      <span className={fieldStyles.fieldEmptyLabel}>
        {'//'} {resume.experiences.length > 0 ? 'Tambah' : 'Isi'} pengalaman
      </span>
    </div>
  );
}

function LineAddEducation() {
  const { resume } = useResumeEditor();
  const { openEducation } = useLineContents();
  const { isActive } = useActiveLine();

  React.useEffect(() => {
    isActive && openEducation();
  }, [isActive, openEducation]);

  return (
    <div
      className={styles.wrapper}
      onClick={(ev) => {
        ev.stopPropagation();
        openEducation();
      }}
    >
      <span className={fieldStyles.fieldEmptyLabel}>
        {'//'} {resume.education.length > 0 ? 'Tambah' : 'Isi'} pendidikan
      </span>
    </div>
  );
}

function LineAddOtherProject({ nextLine }: { nextLine?: boolean }) {
  const { resume } = useResumeEditor();
  const { openOtherProject } = useLineContents();
  const { isActive } = useActiveLine();

  React.useEffect(() => {
    isActive && openOtherProject();
  }, [isActive, openOtherProject]);

  return (
    <div
      className={styles.wrapper}
      onClick={(ev) => {
        ev.stopPropagation();
        openOtherProject();
      }}
    >
      {!nextLine ? (
        <span className={fieldStyles.fieldEmptyLabel}>
          {'//'} {resume.otherProjects.length > 0 ? 'Tambah' : 'Masukkan'}{' '}
          beberapa projek lain (projek personal, dsb.)
        </span>
      ) : (
        <span className={fieldStyles.fieldEmptyLabel}>
          {'//'} yang kamu banggakan
        </span>
      )}
    </div>
  );
}

export { LineAddExperience, LineAddEducation, LineAddOtherProject };
