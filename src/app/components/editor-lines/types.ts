import * as React from 'react';

export type LineUI = {
  id: string;
  element: JSX.Element;
};

export type LineContent = {
  id: string;
  content?: React.ReactNode;
};
