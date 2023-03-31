import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  type BuildLineContents,
  type BuildContentsFn,
  useBuildLineContents,
} from './hooks/build-line-contents';
import { LineContentsContext } from './contexts/line-contents';
import { ActiveLineContext } from './contexts/active-line';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import * as HoverCard from '@radix-ui/react-hover-card';

import { type LineId } from './types';

import { clsx } from 'clsx';

import * as styles from './line-list.css';

function LineList({ buildContents }: { buildContents?: BuildContentsFn }) {
  const $containerDiv = React.useRef<HTMLDivElement>(null);
  const { resume } = useResumeEditor();
  const data = JSON.stringify(resume);
  const lineContents = useBuildLineContents(buildContents);
  const [shouldPrompt, setShouldPrompt] = React.useState(false);
  const [showPrompt, setShowPrompt] = React.useState(false);

  const handleActivationWithPrompt = (activateFn: () => void) => {
    return () => {
      if (shouldPrompt) {
        setShowPrompt(true);
        // prompt sekali aja, yang selanjutnya bisa skip untuk reset
        setShouldPrompt(false);
      } else {
        setShowPrompt(false);
        setShouldPrompt(false);
        activateFn();
      }
    };
  };

  React.useEffect(() => {
    setShouldPrompt((should) => (should ? false : should));
    setShowPrompt((show) => (show ? false : show));
  }, [data, lineContents.activeLine]);

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

  // Aktifkan line pertama ketika pertama mounted
  React.useEffect(() => {
    activateNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOnClickOutside($containerDiv, () => {
    activeLine && resetLineContents();
  });

  useHotkeys('esc', handleActivationWithPrompt(resetLineContents), {
    enabled: Boolean(activeLine),
    enableOnFormTags: true,
  });

  useHotkeys('up', handleActivationWithPrompt(activatePrevious), {
    enabled: !hotkeyPrevented,
    enableOnFormTags: true,
    preventDefault: true,
  });

  useHotkeys('down', handleActivationWithPrompt(activateNext), {
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
            shouldPromptDirty={(should = true) => {
              setShouldPrompt(should);
              setShowPrompt(false);
            }}
            showPrompt={showPrompt}
            handleActivationWithPrompt={handleActivationWithPrompt}
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
  shouldPromptDirty,
  showPrompt,
  handleActivationWithPrompt,
}: {
  number: number;
  id: string;
  element: React.ReactNode;
  activateable?: boolean;
  lineContents: BuildLineContents;
  shouldPromptDirty: (should?: boolean) => void;
  showPrompt: boolean;
  handleActivationWithPrompt: (activateFn: () => void) => () => void;
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
                const activateWithPrompt =
                  handleActivationWithPrompt(handleActivate);
                activateWithPrompt();
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
              shouldPromptDirty,
            }}
          >
            {element}
          </ActiveLineContext.Provider>
        )}
      </div>

      {isActive && <DirtyLinePrompt isOpen={showPrompt} />}
    </div>
  );
}

function DirtyLinePrompt({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) {
    return null;
  }
  return (
    <HoverCard.Root defaultOpen>
      <HoverCard.Trigger asChild>
        <div className={styles.promptFocus} />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content sideOffset={6} className={styles.promptMessage}>
          <HoverCard.Arrow className={styles.promptMessageArrow} />
          <div>
            Ups, yang ditulis belum disimpan. Tekan{' '}
            <span className={styles.promptMessageKb}>Enter</span> dulu untuk
            menyimpan, atau abaikan saja supaya kembali ke data awal.
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
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
