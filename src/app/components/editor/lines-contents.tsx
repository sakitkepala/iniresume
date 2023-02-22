import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  type ResumeData,
  useResumeEditor,
} from 'src/app/contexts/resume-editor';

import { LineBreak } from './components/line-break';

import { v4 } from 'uuid';
import { makeContext } from 'src/app/contexts/makeContext';

export type LineId = string;

export type LineContent = {
  id: LineId;
  content?: React.ReactNode;
  show?: boolean;
  activateable?: true;
};

const [LineContentsContext, useLineContents] = makeContext<{
  activeLine: LineId | null;
  activeGroup: string | null;
  nextCreateId: string;
  generateCreateId?: () => void;
  openExperience: () => void;
  openEducation: () => void;
}>();

const [LineItemContext, useLineItem] = makeContext<{
  lineId: LineId;
  lineNumber: number;
  isActive: boolean;
}>();

const [ActiveLineContext, useActiveLine] = makeContext<{
  isActive: boolean;
  activate: () => void;
  next: () => void; // ini kenapa perlu di register list id-nya...
  previous: () => void; // ...supaya bisa diurutkan & di-switch ke next/prev
}>();

enum GroupTypes {
  EXPERIENCE = 'EXPERIENCE',
  EDUCATION = 'EDUCATION',
}

enum ActionTypes {
  LINE_ACTIVATED = 'LINE_ACTIVATED',
  LINE_CONTENTS_RESET = 'LINE_CONTENTS_RESET',
  LINES_GROUP_OPEN = 'LINES_GROUP_OPEN',
  LINES_GROUP_RESET = 'LINES_GROUP_RESET',
}

type Actions =
  | {
      type: ActionTypes.LINE_ACTIVATED;
      payload: LineId;
    }
  | {
      type: ActionTypes.LINE_CONTENTS_RESET;
    }
  | {
      type: ActionTypes.LINES_GROUP_OPEN;
      group: GroupTypes;
      payload?: LineId;
    }
  | {
      type: ActionTypes.LINES_GROUP_RESET;
    };

const initialState: {
  activeLine: LineId | null;
  activeGroup: GroupTypes | null;
  nextCreateId: string;
} = {
  activeLine: null,
  activeGroup: null,
  nextCreateId: v4(),
};

function LinesContents() {
  const { resume } = useResumeEditor();

  const [{ activeLine, activeGroup, nextCreateId }, dispatch] =
    React.useReducer((state: typeof initialState, action: Actions) => {
      switch (action.type) {
        case ActionTypes.LINE_ACTIVATED: {
          const groupLineIds = new Set([
            state.nextCreateId + '-experience-title',
            state.nextCreateId + '-experience-employer',
            state.nextCreateId + '-experience-description',
            state.nextCreateId + '-education-school',
            state.nextCreateId + '-education-major',
            state.nextCreateId + '-education-description',
          ]);
          const lineBelongsToActiveGroup = groupLineIds.has(action.payload);

          if (!state.activeGroup || lineBelongsToActiveGroup) {
            return {
              ...state,
              activeLine: action.payload,
            };
          }

          return {
            ...state,
            activeLine: action.payload,
            activeGroup: null,
            nextCreateId: v4(),
          };
        }

        case ActionTypes.LINE_CONTENTS_RESET: {
          return {
            activeLine: null,
            activeGroup: null,
            nextCreateId: v4(),
          };
        }

        case ActionTypes.LINES_GROUP_OPEN: {
          const activeLine = {
            [GroupTypes.EXPERIENCE]: state.nextCreateId + '-experience-title',
            [GroupTypes.EDUCATION]: state.nextCreateId + '-education-school',
          };
          return {
            ...state,
            activeGroup: action.group,
            activeLine: action.payload || activeLine[action.group],
          };
        }

        case ActionTypes.LINES_GROUP_RESET: {
          return {
            ...state,
            activeGroup: null,
            nextCreateId: v4(),
          };
        }

        default: {
          return state;
        }
      }
    }, initialState);

  const { contents, activateableLines } = React.useMemo(() => {
    const contents = _buildContents(resume, {
      createId: nextCreateId,
      experienceIsOpen: activeGroup === GroupTypes.EXPERIENCE,
      educationIsOpen: activeGroup === GroupTypes.EDUCATION,
    });
    return {
      contents,
      activateableLines: contents
        .filter((content) => content.activateable)
        .map((content) => content.id),
    };
  }, [resume, activeGroup, nextCreateId]);

  const {
    resetLineContents,
    activateLine,
    activateNext,
    activatePrevious,
    openExperience,
    openEducation,
  } = React.useMemo(() => {
    const resetLineContents = () => {
      dispatch({ type: ActionTypes.LINE_CONTENTS_RESET });
    };

    const activateLine = (lineId: LineId) => {
      dispatch({ type: ActionTypes.LINE_ACTIVATED, payload: lineId });
    };

    const activateNext = () => {
      if (!activeLine) {
        activateLine(activateableLines[0]);
        return;
      }
      const index = activateableLines.indexOf(activeLine);
      const nextIndex = index + 1;
      const nextLineId = activateableLines[nextIndex];
      nextLineId ? activateLine(nextLineId) : resetLineContents();
    };

    const activatePrevious = () => {
      if (!activeLine) {
        activateLine(activateableLines[activateableLines.length - 1]);
        return;
      }
      const index = activateableLines.indexOf(activeLine);
      const prevIndex = index - 1;
      const prevLineId = activateableLines[prevIndex];
      prevLineId ? activateLine(prevLineId) : resetLineContents();
    };

    const openExperience = () => {
      dispatch({
        type: ActionTypes.LINES_GROUP_OPEN,
        group: GroupTypes.EXPERIENCE,
      });
    };

    const closeExperience = () => {
      dispatch({ type: ActionTypes.LINES_GROUP_RESET });
    };

    const openEducation = () => {
      dispatch({
        type: ActionTypes.LINES_GROUP_OPEN,
        group: GroupTypes.EDUCATION,
      });
    };

    const closeEducation = () => {
      dispatch({ type: ActionTypes.LINES_GROUP_RESET });
    };

    return {
      resetLineContents,
      activateLine,
      activateNext,
      activatePrevious,
      openExperience,
      closeExperience,
      openEducation,
      closeEducation,
    };
  }, [activeLine, activateableLines]);

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
    <div style={{ fontFamily: 'monospace', fontSize: 13 }}>
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

function _buildContents(
  resume: ResumeData,
  {
    createId,
    experienceIsOpen,
    educationIsOpen,
  }: {
    createId: string | null;
    experienceIsOpen: boolean;
    educationIsOpen: boolean;
  }
): LineContent[] {
  const contentsTemplate: (LineContent & { show?: boolean })[] = [
    {
      id: 'section-infos',
      content: 'Informasi',
    },
    { id: 'section-infos-trail' },

    { id: 'infos-general', content: <>Umum:</> },
    { id: 'infos-general-trail' },

    {
      id: 'fullName',
      content: <FieldText value="Nama lengkap" />,
      activateable: true,
    },
    {
      id: 'title',
      content: <FieldText>Titel profesi</FieldText>,
      activateable: true,
    },
    {
      id: 'city',
      content: <FieldText>Kota Domisili</FieldText>,
      activateable: true,
    },
    {
      id: 'province',
      content: <FieldText>Provinsi Domisili</FieldText>,
      activateable: true,
    },
    { id: 'infos-general-list-trail' },

    { id: 'section-infos-br', content: <LineBreak /> },
    { id: 'section-infos-br-trail' },

    {
      id: 'section-experiences',
      content: 'Pengalaman',
    },
    { id: 'section-experiences-trail' },

    ...resume.experiences.reduce<LineContent[]>(
      (contents, experience) => [
        ...contents,
        {
          id: experience.id + '-experience-title',
          content: <GroupMainField value="Titel Pekerjaan" />,
          activateable: true,
        },
        { id: experience.id + '-experience-title-trail' },

        {
          id: experience.id + '-experience-employer',
          content: <FieldText>Nama Perusahaan</FieldText>,
          activateable: true,
        },
        { id: experience.id + '-experience-employer-trail' },

        {
          id: experience.id + '-experience-description',
          content: <FieldText>Deskripsikan pekerjaannya</FieldText>,
          activateable: true,
        },
        { id: experience.id + '-experience-description-trail' },
      ],
      []
    ),

    {
      id: createId + '-experience-title',
      content: <GroupMainField value="Titel Pekerjaan" />,
      activateable: true,
      show: experienceIsOpen,
    },
    {
      id: createId + '-experience-title-trail',
      show: experienceIsOpen,
    },

    {
      id: createId + '-experience-employer',
      content: <FieldText>Nama Perusahaan</FieldText>,
      activateable: true,
      show: experienceIsOpen,
    },
    {
      id: createId + '-experience-employer-trail',
      show: experienceIsOpen,
    },

    {
      id: createId + '-experience-description',
      content: <FieldText>Deskripsikan pekerjaannya</FieldText>,
      activateable: true,
      show: experienceIsOpen,
    },
    {
      id: createId + '-experience-description-trail',
      show: experienceIsOpen,
    },

    {
      id: 'experience-add',
      content: <LineAddExperience />,
      activateable: true,
      show: !experienceIsOpen,
    },
    {
      id: 'experience-add-trail',
      show: !experienceIsOpen,
    },

    { id: 'section-experiences-br', content: <LineBreak /> },
    { id: 'section-experiences-br-trail' },

    {
      id: 'section-educations',
      content: 'Pendidikan',
    },
    { id: 'section-educations-trail' },

    ...resume.education.reduce<LineContent[]>(
      (contents, education) => [
        ...contents,
        {
          id: education.id + '-education-school',
          content: <GroupMainField value="Universitas atau Sekolah" />,
          activateable: true,
        },
        { id: education.id + '-education-school-trail' },

        {
          id: education.id + '-education-major',
          content: <FieldText>Jurusan</FieldText>,
          activateable: true,
        },
        { id: education.id + '-education-major-trail' },

        {
          id: education.id + '-education-description',
          content: <FieldText>Deskripsi</FieldText>,
          activateable: true,
        },
        { id: education.id + '-education-description-trail' },
      ],
      []
    ),

    {
      id: createId + '-education-school',
      content: <GroupMainField value="Universitas atau Sekolah" />,
      activateable: true,
      show: educationIsOpen,
    },
    {
      id: createId + '-education-school-trail',
      show: educationIsOpen,
    },

    {
      id: createId + '-education-major',
      content: <FieldText>Jurusan</FieldText>,
      activateable: true,
      show: educationIsOpen,
    },
    {
      id: createId + '-education-major-trail',
      show: educationIsOpen,
    },

    {
      id: createId + '-education-description',
      content: <FieldText>Deskripsi</FieldText>,
      activateable: true,
      show: educationIsOpen,
    },
    {
      id: createId + '-education-description-trail',
      show: educationIsOpen,
    },

    {
      id: 'education-add',
      content: <LineAddEducation />,
      activateable: true,
      show: !educationIsOpen,
    },
    {
      id: 'education-add-trail',
      show: !educationIsOpen,
    },

    { id: 'section-educations-br', content: <LineBreak /> },
    { id: 'section-educations-br-trail' },
  ];

  return contentsTemplate.filter(
    (content) => typeof content.show === 'undefined' || content.show
  );
}

function FieldText({
  children = null,
  value = '',
}: React.PropsWithChildren<{
  value?: string;
}>) {
  const { isActive, activate } = useActiveLine();
  return (
    <span onClick={activate}>
      {value || children}
      {isActive ? ' (buka)' : null}
    </span>
  );
}

function GroupMainField({ value = '' }: { value: string }) {
  const { activate } = useActiveLine();
  return <span onClick={activate}>{value}</span>;
}

function LineAddExperience() {
  const { isActive } = useActiveLine();
  const { openExperience } = useLineContents();

  React.useEffect(() => {
    isActive && openExperience();
  }, [isActive, openExperience]);

  return (
    <button
      onClick={(ev) => {
        ev.stopPropagation();
        openExperience();
      }}
    >
      Isi pengalaman
    </button>
  );
}

function LineAddEducation() {
  const { isActive } = useActiveLine();
  const { openEducation } = useLineContents();

  React.useEffect(() => {
    isActive && openEducation();
  }, [isActive, openEducation]);

  return <button onClick={openEducation}>Isi pendidikan</button>;
}

export { LinesContents };
