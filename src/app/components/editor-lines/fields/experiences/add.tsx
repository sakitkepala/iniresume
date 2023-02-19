import * as React from 'react';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useLinesOperation } from '../../contexts/lines-operation';
import { useLineId } from '../../components/line';
import { LineExperienceHeading } from './line-experience-heading';

import { v4 } from 'uuid';

import * as fieldStyles from '../common-styles.css';
import * as styles from './add.css';

function LineAddExperience() {
  const lineId = useLineId();
  const { resume } = useResumeEditor();
  const { operation } = useLinesOperation();

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        operation((lines) => {
          const experienceId = v4();
          const currentIndex = lines.findIndex((line) => line.id === lineId);
          const trailingEmptyLineIndex = currentIndex + 1;
          return [
            ...lines.slice(0, currentIndex),

            {
              id: experienceId + '-title',
              content: (
                <LineExperienceHeading
                  level={2}
                  field="title"
                  label="Titel pekerjaan"
                />
              ),
            },
            { id: experienceId + '-title-trail' },

            {
              id: experienceId + '-employer',
              content: (
                <LineExperienceHeading
                  level={3}
                  field="employer"
                  label="Nama perusahaan"
                />
              ),
            },
            { id: experienceId + '-employer-trail' },

            {
              id: experienceId + '-description',
              content: 'Deskripsi',
            },
            { id: experienceId + '-description-trail' },

            ...lines.slice(trailingEmptyLineIndex + 1),
          ];
        });
      }}
    >
      <span className={fieldStyles.fieldEmptyLabel}>
        {resume.experiences.length > 0 ? 'Tambah' : 'Isi'} pengalaman
      </span>
    </div>
  );
}

export { LineAddExperience };
