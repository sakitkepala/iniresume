import * as React from 'react';
import { useLinesOperation } from '../contexts/lines-operation';
import { createLine } from '../factory';

const linesTemplate = [
  createLine('halo'),
  createLine('dek'),
  createLine('wkwk'),
];

function LineWithOperation({ id }: { id?: string }) {
  const { operation } = useLinesOperation();
  const [insert, setInsert] = React.useState(true);

  const insertLines = () => {
    operation((lines) => {
      // insert di line 6 (index :5)
      const beginPart = lines.slice(0, 5);
      const endPart = lines.slice(5);
      const inserted = [...beginPart, ...linesTemplate, ...endPart];
      const removeIndexTarget = inserted.findIndex((line) => line.id === id);
      inserted.splice(removeIndexTarget, 2);
      return inserted;
    });
  };

  const removeLines = () => {
    // operation((lines) => {
    //   // remove sebaris di line 6
    //   return lines.filter((_, index) => index !== 5);
    // });
  };

  return (
    <div>
      <span>hai</span>
      <button
        onClick={() => {
          insert && insertLines();
          !insert && removeLines();
          setInsert((o) => !o);
        }}
      >
        {insert ? 'Insert' : 'Remove'}
      </button>
    </div>
  );
}

export { LineWithOperation };
