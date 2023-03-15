import { render } from '@testing-library/react';
import {
  type ResumeData,
  ResumeEditorProvider,
} from 'src/app/contexts/resume-editor';

import { LineList } from './line-list';

import { LineContent, BuildConfigState } from './types';

function renderLineContent(lineContent: LineContent | LineContent[]) {
  return render(
    <ResumeEditorProvider>
      <LineList
        buildContents={() =>
          Array.isArray(lineContent)
            ? lineContent
            : [
                lineContent,
                {
                  id: 'next-activateable',
                  activateable: true,
                },
              ]
        }
      />
    </ResumeEditorProvider>
  );
}

function renderLineContentWithData(
  renderFnWithData: (
    resume: ResumeData,
    state: BuildConfigState
  ) => LineContent | LineContent[]
) {
  return render(
    <ResumeEditorProvider>
      <LineList
        buildContents={(resume, state) => {
          const contents = renderFnWithData(resume, state);
          if (Array.isArray(contents)) {
            return contents;
          }
          return [
            contents,
            {
              id: 'next-activateable',
              activateable: true,
            },
          ];
        }}
      />
    </ResumeEditorProvider>
  );
}

export { renderLineContent, renderLineContentWithData };
