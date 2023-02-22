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
  activeable?: true;
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

function LinesContents() {
  const { resume } = useResumeEditor();
  const [activeLine, setActiveLine] = React.useState<LineId | null>(null);
  const [activeGroup, setActiveGroup] = React.useState<GroupTypes | null>(null);
  const [nextCreateId, setNextCreateId] = React.useState<string>(() => v4());

  const lines = React.useMemo(() => {
    const contents = _buildContents(resume, {
      createId: nextCreateId,
      experienceIsOpen: activeGroup === GroupTypes.EXPERIENCE,
      educationIsOpen: activeGroup === GroupTypes.EDUCATION,
    });

    const activateableLines = contents
      .filter((content) => content.activeable)
      .map((content) => content.id);

    const groupLineIds = new Set([
      nextCreateId + '-experience-title',
      nextCreateId + '-experience-employer',
      nextCreateId + '-experience-description',
      nextCreateId + '-education-school',
      nextCreateId + '-education-major',
      nextCreateId + '-education-description',
    ]);

    const activateLine = (lineId: LineId) => {
      setActiveLine(lineId);
      if (!activeGroup) {
        return;
      }
      const isLineOfActiveGroup = groupLineIds.has(lineId);
      if (!isLineOfActiveGroup) {
        setActiveGroup(null);
        setNextCreateId(v4());
      }
    };

    const activateNext = () => {
      if (!activeLine) {
        activateLine(activateableLines[0]);
        return;
      }

      const index = activateableLines.indexOf(activeLine);
      const nextIndex = index + 1;
      if (nextIndex >= activateableLines.length) {
        setActiveLine(null);
        activeGroup && setActiveGroup(null);
      } else {
        activateLine(activateableLines[nextIndex]);
      }
    };

    const activatePrevious = () => {
      if (!activeLine) {
        setActiveLine(activateableLines[activateableLines.length - 1]);
        return;
      }

      const index = activateableLines.indexOf(activeLine);
      const prevIndex = index - 1;
      if (prevIndex < 0) {
        setActiveLine(null);
        activeGroup && setActiveGroup(null);
      } else {
        activateLine(activateableLines[prevIndex]);
      }
    };

    const value = {
      contents,

      activateLine,
      activateNext,
      activatePrevious,

      openExperience: () => {
        setActiveGroup(GroupTypes.EXPERIENCE);
        setActiveLine(nextCreateId + '-experience-title');
      },
      closeExperience: () => {
        setActiveGroup(null);
        setNextCreateId(v4());
      },

      openEducation: () => {
        setActiveGroup(GroupTypes.EDUCATION);
        setActiveLine(nextCreateId + '-education-school');
      },
      closeEducation: () => {
        setActiveGroup(null);
        setNextCreateId(v4());
      },
    };

    return value;
  }, [resume, activeLine, activeGroup, nextCreateId]);

  useHotkeys(
    'esc',
    () => {
      setActiveLine(null);
      if (activeGroup) {
        setActiveGroup(null);
        setNextCreateId(v4());
      }
    },
    {
      enabled: Boolean(activeLine),
      enableOnFormTags: true,
    }
  );

  useHotkeys('enter, tab, down', lines.activateNext, {
    enableOnFormTags: true,
    preventDefault: true,
  });

  useHotkeys('shift+tab, up', lines.activatePrevious, {
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
          openExperience: lines.openExperience,
          openEducation: lines.openEducation,
        }}
      >
        {lines.contents.map((content, contentIndex) => (
          <LineItem
            key={content.id}
            id={content.id}
            number={contentIndex + 1}
            element={content.content}
            isActive={activeLine === content.id}
            onActivate={lines.activateLine}
            onNext={lines.activateNext}
            onPrevious={lines.activatePrevious}
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

  const handleNext = React.useCallback(onNext, [onNext]);

  const handlePrevious = React.useCallback(onPrevious, [onPrevious]);

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
                next: handleNext,
                previous: handlePrevious,
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
      activeable: true,
    },
    {
      id: 'title',
      content: <FieldText>Titel profesi</FieldText>,
      activeable: true,
    },
    {
      id: 'city',
      content: <FieldText>Kota Domisili</FieldText>,
      activeable: true,
    },
    {
      id: 'province',
      content: <FieldText>Provinsi Domisili</FieldText>,
      activeable: true,
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
          activeable: true,
        },
        { id: experience.id + '-experience-title-trail' },

        {
          id: experience.id + '-experience-employer',
          content: <FieldText>Nama Perusahaan</FieldText>,
          activeable: true,
        },
        { id: experience.id + '-experience-employer-trail' },

        {
          id: experience.id + '-experience-description',
          content: <FieldText>Deskripsikan pekerjaannya</FieldText>,
          activeable: true,
        },
        { id: experience.id + '-experience-description-trail' },
      ],
      []
    ),

    {
      id: createId + '-experience-title',
      content: <GroupMainField value="Titel Pekerjaan" />,
      activeable: true,
      show: experienceIsOpen,
    },
    {
      id: createId + '-experience-title-trail',
      show: experienceIsOpen,
    },

    {
      id: createId + '-experience-employer',
      content: <FieldText>Nama Perusahaan</FieldText>,
      activeable: true,
      show: experienceIsOpen,
    },
    {
      id: createId + '-experience-employer-trail',
      show: experienceIsOpen,
    },

    {
      id: createId + '-experience-description',
      content: <FieldText>Deskripsikan pekerjaannya</FieldText>,
      activeable: true,
      show: experienceIsOpen,
    },
    {
      id: createId + '-experience-description-trail',
      show: experienceIsOpen,
    },

    {
      id: 'experience-add',
      content: <LineAddExperience />,
      activeable: true,
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
          activeable: true,
        },
        { id: education.id + '-education-school-trail' },

        {
          id: education.id + '-education-major',
          content: <FieldText>Jurusan</FieldText>,
          activeable: true,
        },
        { id: education.id + '-education-major-trail' },

        {
          id: education.id + '-education-description',
          content: <FieldText>Deskripsi</FieldText>,
          activeable: true,
        },
        { id: education.id + '-education-description-trail' },
      ],
      []
    ),

    {
      id: createId + '-education-school',
      content: <GroupMainField value="Universitas atau Sekolah" />,
      activeable: true,
      show: educationIsOpen,
    },
    {
      id: createId + '-education-school-trail',
      show: educationIsOpen,
    },

    {
      id: createId + '-education-major',
      content: <FieldText>Jurusan</FieldText>,
      activeable: true,
      show: educationIsOpen,
    },
    {
      id: createId + '-education-major-trail',
      show: educationIsOpen,
    },

    {
      id: createId + '-education-description',
      content: <FieldText>Deskripsi</FieldText>,
      activeable: true,
      show: educationIsOpen,
    },
    {
      id: createId + '-education-description-trail',
      show: educationIsOpen,
    },

    {
      id: 'education-add',
      content: <LineAddEducation />,
      activeable: true,
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
