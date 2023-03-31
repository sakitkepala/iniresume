import * as React from 'react';
import { useLineContents } from '../contexts/line-contents';
import { useActiveLine } from '../contexts/active-line';
import { ListItemLine } from './list-item-line';

import * as fieldStyles from './fields.css';

function ListItemProjectAdd({
  hasProject,
  experienceId,
}: {
  hasProject?: boolean;
  experienceId: string;
}) {
  const { openProject } = useLineContents();
  const { isActive } = useActiveLine();

  React.useEffect(() => {
    isActive && openProject(experienceId);
  }, [isActive, openProject, experienceId]);

  return (
    <div
      onClick={(ev) => {
        ev.stopPropagation();
        openProject(experienceId);
      }}
    >
      {!hasProject ? (
        <span className={fieldStyles.fieldEmptyLabel}>
          {'//'} Cantumkan projek
        </span>
      ) : (
        <ListItemLine muted>
          <span className={fieldStyles.fieldEmptyLabel}>
            {'//'} Tambah projek lagi
          </span>
        </ListItemLine>
      )}
    </div>
  );
}

export { ListItemProjectAdd };
