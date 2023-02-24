import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useOnClickOutside } from 'src/app/hooks/click-outside';
import { useEditorLineContents } from './hooks/line-contents';
import { LineContentsContext } from './contexts/line-contents';
import { LineItemContext } from './contexts/line-item';
import { ActiveLineContext } from './contexts/active-line';

import { type LineId } from './types';

import { clsx } from 'clsx';

import * as styles from './editor-line-list.css';

function EditorLineList() {
  const {
    activeLine,
    activeGroup,
    nextCreateId,
    contents,
    resetLineContents,
    activateLine,
    activateAfterReset,
    activateNext,
    activatePrevious,
    openExperience,
    openEducation,
    insertSkillOnTop,
    insertSkillBelow,
  } = useEditorLineContents();

  const $containerDiv = React.useRef<HTMLDivElement>(null);
  useOnClickOutside($containerDiv, resetLineContents);

  useHotkeys('esc', resetLineContents, {
    enabled: Boolean(activeLine),
    enableOnFormTags: true,
  });

  useHotkeys('up', activatePrevious, {
    enableOnFormTags: true,
    preventDefault: true,
  });

  useHotkeys('down', activateNext, {
    enableOnFormTags: true,
    preventDefault: true,
  });

  return (
    <div ref={$containerDiv} className={styles.lineList}>
      <LineContentsContext.Provider
        value={{
          activeLine,
          activeGroup,
          nextCreateId,
          openExperience,
          openEducation,
          insertSkillOnTop,
          insertSkillBelow,
        }}
      >
        {contents.map((content, contentIndex) => (
          <LineItem
            key={content.id}
            id={content.id}
            number={contentIndex + 1}
            element={content.content}
            activateable={content.activateable}
            isActive={activeLine === content.id}
            onActivate={activateLine}
            onReset={resetLineContents}
            onActivateAfterReset={activateAfterReset}
            onNext={activateNext}
            onPrevious={activatePrevious}
          />
        ))}
      </LineContentsContext.Provider>
    </div>
  );
}

function LineItem({
  id,
  number,
  activateable,
  isActive,
  onActivate,
  onReset,
  onActivateAfterReset,
  onNext,
  onPrevious,
  element,
}: {
  id: string;
  number: number;
  activateable?: true;
  isActive: boolean;
  onActivate: (lineId: LineId) => void;
  onReset: () => void;
  onActivateAfterReset: (lineId: LineId) => void;
  onNext: () => void;
  onPrevious: () => void;
  element: React.ReactNode;
}) {
  const handleActivate = React.useCallback(
    (lineId?: LineId) => onActivate(lineId || id),
    [onActivate, id]
  );

  return (
    <div
      className={clsx(styles.line, isActive ? styles.lineActive : undefined)}
    >
      <div className={styles.lineNumber}>{number}</div>

      <div
        className={styles.lineContent}
        onClick={
          activateable
            ? (ev) => {
                ev.stopPropagation();
                handleActivate();
              }
            : undefined
        }
      >
        {element ? (
          <LineItemContext.Provider
            value={{
              lineId: id,
              lineNumber: number,
              isActive,
            }}
          >
            <ActiveLineContext.Provider
              value={{
                activate: handleActivate,
                reset: onReset,
                activateAfterReset: onActivateAfterReset,
                isActive,
                next: onNext,
                previous: onPrevious,
              }}
            >
              {element}
            </ActiveLineContext.Provider>
          </LineItemContext.Provider>
        ) : (
          element
        )}
      </div>
    </div>
  );
}

export { EditorLineList };
