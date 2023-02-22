import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useOnClickOutside } from 'src/app/hooks/click-outside';
import { useEditorLineContents } from './hooks/line-contents';
import { LineContentsContext } from './contexts/line-contents';
import { LineItemContext } from './contexts/line-item';
import { ActiveLineContext } from './contexts/active-line';

import { type LineId } from './types';

function EditorLineList() {
  const {
    activeLine,
    activeGroup,
    nextCreateId,
    contents,
    resetLineContents,
    activateLine,
    activateNext,
    activatePrevious,
    openExperience,
    openEducation,
  } = useEditorLineContents();

  const $containerDiv = React.useRef<HTMLDivElement>(null);
  useOnClickOutside($containerDiv, resetLineContents);

  useHotkeys('esc', resetLineContents, {
    enabled: Boolean(activeLine),
    enableOnFormTags: true,
  });

  useHotkeys('enter, tab, down', activateNext, {
    enableOnFormTags: true,
    preventDefault: true,
  });

  useHotkeys('shift+tab, up', activatePrevious, {
    enableOnFormTags: true,
    preventDefault: true,
  });

  return (
    <div ref={$containerDiv} style={{ fontFamily: 'monospace', fontSize: 13 }}>
      <LineContentsContext.Provider
        value={{
          activeLine,
          activeGroup,
          nextCreateId,
          openExperience,
          openEducation,
        }}
      >
        {contents.map((content, contentIndex) => (
          <LineItem
            key={content.id}
            id={content.id}
            number={contentIndex + 1}
            element={content.content}
            isActive={activeLine === content.id}
            onActivate={activateLine}
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
  isActive,
  onActivate,
  onNext,
  onPrevious,
  element,
}: {
  id: string;
  number: number;
  isActive: boolean;
  onActivate: (lineId: LineId) => void;
  onNext: () => void;
  onPrevious: () => void;
  element: React.ReactNode;
}) {
  const handleActivate = React.useCallback(
    () => onActivate(id),
    [onActivate, id]
  );

  return (
    <div style={isActive ? { backgroundColor: 'yellowgreen' } : undefined}>
      {number < 10 && <span>&nbsp;</span>}
      {number < 100 && <span>&nbsp;</span>}
      <span>{number}</span>
      <span>&nbsp;</span>

      {element ? (
        <span>
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
                isActive,
                next: onNext,
                previous: onPrevious,
              }}
            >
              {element}
            </ActiveLineContext.Provider>
          </LineItemContext.Provider>
        </span>
      ) : (
        <>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </>
      )}

      <span>&nbsp;</span>
      <span style={{ color: 'turquoise' }}>`{id}`</span>
    </div>
  );
}

export { EditorLineList };
