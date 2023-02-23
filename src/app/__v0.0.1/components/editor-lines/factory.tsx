import { LineEmpty, LineBreak, LineParagraph } from './components/line-legacy';
import { type LineUI, type LineContent } from './types';
import { v4 } from 'uuid';

export function createLine(content: React.ReactNode = ''): LineContent {
  return { id: v4(), content: content };
}

export function createLineObject(element: JSX.Element): LineUI {
  return {
    id: v4(),
    element: element,
  };
}

export function createLineEmpty(): LineUI {
  return createLineObject(<LineEmpty />);
}

export function createLineBreak(): LineUI {
  return createLineObject(<LineBreak />);
}

export function createLineParagraph(text: string): LineUI {
  return createLineObject(<LineParagraph>{text}</LineParagraph>);
}
