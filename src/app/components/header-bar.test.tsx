import { render, screen } from '@testing-library/react';

import { HeaderBar } from './header-bar';

describe('HeaderBar', () => {
  test('Render defaultnya statik', () => {
    render(<HeaderBar />);

    expect(screen.getByLabelText(/app logo/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/resume info/i)).not.toBeInTheDocument();
  });
});
