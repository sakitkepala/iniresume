import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  type BuildLineContents,
  type BuildContentsFn,
  useBuildLineContents,
} from './hooks/build-line-contents';
import { LineContentsContext } from './contexts/line-contents';
import { ActiveLineContext } from './contexts/active-line';

import { type LineId } from './types';

import { clsx } from 'clsx';

import * as styles from './line-list.css';

function LineList({ buildContents }: { buildContents?: BuildContentsFn }) {
  const lineContents = useBuildLineContents(buildContents);
  const $containerDiv = React.useRef<HTMLDivElement>(null);

  const {
    contents,
    activeLine,
    activeGroup,
    nextCreateId,
    hotkeyPrevented,
    resetLineContents,
    activatePrevious,
    activateNext,
    openExperience,
    openProject,
    openEducation,
    insertSkillOnTop,
    insertSkillBelow,
    openOtherProject,
    preventHotkey,
  } = lineContents;

  useOnClickOutside($containerDiv, () => {
    activeLine && resetLineContents();
  });

  useHotkeys('esc', resetLineContents, {
    enabled: Boolean(activeLine),
    enableOnFormTags: true,
  });

  useHotkeys('up', activatePrevious, {
    enabled: !hotkeyPrevented,
    enableOnFormTags: true,
    preventDefault: true,
  });

  useHotkeys('down', activateNext, {
    enabled: !hotkeyPrevented,
    enableOnFormTags: true,
    preventDefault: true,
  });

  return (
    <div ref={$containerDiv} role="list" className={styles.lineList}>
      <LineContentsContext.Provider
        value={{
          activeLine,
          activeGroup: activeGroup?.type || null,
          nextCreateId,
          openExperience,
          openProject,
          openEducation,
          insertSkillOnTop,
          insertSkillBelow,
          openOtherProject,
          preventHotkey,
        }}
      >
        {contents.map((content, contentIndex) => (
          <LineItem
            key={content.id}
            number={contentIndex + 1}
            id={content.id}
            element={content.content}
            activateable={content.activateable}
            lineContents={lineContents}
          />
        ))}
      </LineContentsContext.Provider>
    </div>
  );
}

function LineItem({
  number,
  id,
  element,
  activateable = false,
  lineContents,
}: {
  number: number;
  id: string;
  element: React.ReactNode;
  activateable?: boolean;
  lineContents: BuildLineContents;
}) {
  const {
    activeLine,
    activateLine,
    resetLineContents,
    activateAfterReset,
    activateNext,
    activatePrevious,
  } = lineContents;
  const isActive = activeLine === id;

  const handleActivate = React.useCallback(
    (lineId?: LineId) => activateLine(lineId || id),
    [activateLine, id]
  );

  return (
    <div
      role="listitem"
      aria-label={`Line ${number}`}
      aria-current={isActive || undefined}
      className={clsx(styles.line, isActive ? styles.lineActive : undefined)}
    >
      <div className={styles.lineNumber}>{number}</div>

      <div
        className={styles.lineContent}
        onClick={
          !activateable
            ? undefined
            : (ev) => {
                ev.stopPropagation();
                handleActivate();
              }
        }
      >
        {!element || !activateable ? (
          element
        ) : (
          <ActiveLineContext.Provider
            value={{
              lineId: id,
              lineNumber: number,
              isActive,
              reset: resetLineContents,
              activate: handleActivate,
              activateAfterReset,
              next: activateNext,
              previous: activatePrevious,
            }}
          >
            {element}
          </ActiveLineContext.Provider>
        )}
      </div>
    </div>
  );
}

// Adaptasi dari:
// - https://usehooks.com/useOnClickOutside/
// - https://github.com/Andarist/use-onclickoutside/blob/main/src/index.ts
function useOnClickOutside(
  ref: React.MutableRefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !ref.current ||
        (event.target instanceof Node && ref.current.contains(event.target))
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export { LineList };
