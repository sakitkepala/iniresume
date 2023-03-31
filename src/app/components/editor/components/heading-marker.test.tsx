import { render, screen } from '@testing-library/react';

import { HeadingMarker } from './heading-marker';

describe('HeadingMarker', () => {
  test('render marker markdown H2 di depan teks konten', () => {
    render(<HeadingMarker>Ini teks heading</HeadingMarker>);

    expect(screen.getByText('##')).toBeInTheDocument();
    expect(screen.getByText('Ini teks heading')).toBeInTheDocument();
  });

  test('render marker markdown H3 di depan teks konten', () => {
    render(<HeadingMarker sub>Ini teks heading</HeadingMarker>);

    expect(screen.getByText('###')).toBeInTheDocument();
    expect(screen.getByText('Ini teks heading')).toBeInTheDocument();
  });
});
