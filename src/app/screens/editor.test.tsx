import { render, screen } from '@testing-library/react';

import ScreenEditor from './editor';

describe('ScreenEditor', () => {
  test('render Editor screen default', () => {
    render(<ScreenEditor />);

    expect(screen.getByLabelText(/app logo/i)).toBeInTheDocument();

    expect(
      screen.getAllByRole('listitem', { name: /line/i }).length
    ).toBeGreaterThan(0);

    expect(screen.getByText(/informasi/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /generate/i })
    ).toBeInTheDocument();
  });
});
