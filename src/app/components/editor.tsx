import * as React from 'react';
import { useResumeEditor } from '../contexts/resume-editor';
import { _buildCodeLinesUI } from '../hooks/build-code-lines-ui';
import {
  EditableLinesManagerProvider,
  useEditableLinesManager,
  useOnClickOutside,
} from './line-editors';

import * as ScrollArea from '@radix-ui/react-scroll-area';

import * as styles from './editor.css';

function Editor() {
  const { resume } = useResumeEditor();
  const codeLinesUI = React.useMemo(() => _buildCodeLinesUI(resume), [resume]);
  return (
    <EditorScrollable>
      <EditableLinesManagerProvider>
        <CodeLinesContainer>{codeLinesUI}</CodeLinesContainer>
      </EditableLinesManagerProvider>
    </EditorScrollable>
  );
}

function CodeLinesContainer({ children }: React.PropsWithChildren) {
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

function EditorScrollable({ children = null }: React.PropsWithChildren) {
  return (
    <ScrollArea.Root className={styles.editorScrollableRoot}>
      <ScrollArea.Viewport className={styles.editorScrollableViewport}>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export { Editor };
