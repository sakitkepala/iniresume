import * as React from 'react';
import { useResumeEditor } from '../../contexts/resume-editor';
import {
  type TemporaryInsertLine,
  TemporaryInsertLineProvider,
} from './temporary-insert-line-context';
import {
  EditableLinesManagerProvider,
  useEditableLinesManager,
  useOnClickOutside,
} from '../line-editors';
import { useRenderEditorLines } from './render-editor-lines-hook';

import * as styles from '../editor.css';

function EditorLines() {
  const { resume } = useResumeEditor();
  const [tmpInsertLine, setTmpInsertLine] =
    React.useState<TemporaryInsertLine | null>(null);
  const editorLinesUI = useRenderEditorLines(resume, tmpInsertLine);

  const insertLineContext = React.useMemo(
    () => ({
      tmpInsertLine,
      insertLine: (insert: TemporaryInsertLine) => setTmpInsertLine(insert),
      discardLine: () => setTmpInsertLine(null),
    }),
    [tmpInsertLine]
  );

  return (
    <EditorLinesContainer>
      <EditableLinesManagerProvider>
        <TemporaryInsertLineProvider value={insertLineContext}>
          {editorLinesUI}
        </TemporaryInsertLineProvider>
      </EditableLinesManagerProvider>
    </EditorLinesContainer>
  );
}

function EditorLinesContainer({ children }: React.PropsWithChildren) {
  const { resetActiveLine } = useEditableLinesManager();
  const $container = React.useRef<HTMLDivElement>(null);
  useOnClickOutside($container, () => {
    resetActiveLine?.();
  });
  return (
    <div className={styles.codeLinesContainer}>
      <div
        ref={$container}
        className={styles.codeLinesArea}
        onClick={resetActiveLine}
      >
        {children}
      </div>
    </div>
  );
}

export { EditorLines };
