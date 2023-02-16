import * as React from 'react';
import { useOnClickOutside } from 'src/app/hooks/click-outside';
import { useResumeEditor } from '../../contexts/resume-editor';
import {
  type TemporaryInsertLine,
  type TemporaryInsertLineContextValue,
  TemporaryInsertLineProvider,
} from './contexts/temporary-insert-line';
import {
  EditableLinesManagerProvider,
  useEditableLinesManager,
} from './contexts/editable-lines-manager';
import { useRenderEditorLines } from './hooks/render-editor-lines';

import * as styles from '../editor.css';

function EditorLines() {
  const { resume } = useResumeEditor();
  const [insertedLines, setTmpInsertLine] = React.useState<
    TemporaryInsertLine[] | null
  >(null);
  const editorLinesUI = useRenderEditorLines(resume, insertedLines);

  const insertLineContext = React.useMemo<TemporaryInsertLineContextValue>(
    () => ({
      insertedLines: insertedLines,
      insertLines: (insert: TemporaryInsertLine[]) => setTmpInsertLine(insert),
      discardLines: () => setTmpInsertLine(null),
    }),
    [insertedLines]
  );

  return (
    <EditableLinesManagerProvider>
      <EditorLinesContainer>
        <TemporaryInsertLineProvider value={insertLineContext}>
          {editorLinesUI}
        </TemporaryInsertLineProvider>
      </EditorLinesContainer>
    </EditableLinesManagerProvider>
  );
}

function EditorLinesContainer({ children }: React.PropsWithChildren) {
  const { resetActiveLine } = useEditableLinesManager();
  const $container = React.useRef<HTMLDivElement>(null);
  useOnClickOutside($container, resetActiveLine);
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
