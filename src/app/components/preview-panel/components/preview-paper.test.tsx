import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { PreviewPaper } from './preview-paper';
import { PreviewContent, type PreviewContentProps } from './preview-content';

const dummyPdfContent = 'pdf content';
const dummyPdfUrl = 'http://localhost:2211/pdf';

// Mock secara inline tapi bisa pakai komponen beneran:
// https://ericdcobb.medium.com/advanced-react-component-mocks-with-jest-and-react-testing-library-f1ae8838400b
function MockPreviewContent({ onRendering, onSuccess }: PreviewContentProps) {
  React.useEffect(onRendering, []);
  const [rendering, setRendering] = React.useState(true);
  setTimeout(() => {
    onSuccess(dummyPdfUrl);
    setRendering(false);
  }, 0);
  return rendering ? null : dummyPdfContent;
}

jest.mock('./components/preview-content', () => ({
  PreviewContent: jest.fn(),
}));

beforeAll(() => {
  PreviewContent.mockImplementation(MockPreviewContent);
});

describe('PreviewPaper', () => {
  test('render loading di awal render & hilang setelah file tergenerate', async () => {
    const handleUrlChange = jest.fn();
    render(
      <PreviewPaper onUrlChange={handleUrlChange}>
        <span>{dummyPdfContent}</span>
      </PreviewPaper>
    );

    expect(screen.getByLabelText(/merender/i)).toBeInTheDocument();
    expect(screen.queryByText(dummyPdfContent)).not.toBeInTheDocument();
    expect(handleUrlChange).toHaveBeenCalled();
    expect(handleUrlChange).toHaveBeenCalledWith('');

    await waitFor(() => {
      expect(screen.queryByLabelText(/merender/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(dummyPdfContent)).toBeInTheDocument();
    expect(handleUrlChange).toHaveBeenCalled();
    expect(handleUrlChange).toHaveBeenCalledWith(dummyPdfUrl);
  });
});
