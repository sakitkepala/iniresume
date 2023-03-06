import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ResumeEditorProvider } from 'src/app/contexts/resume-editor';
import { LineItem } from '../editor-line-list';
import { FieldListItemText } from './field-list-item-text';

function renderField(element: React.ReactNode) {
  return render(
    <ResumeEditorProvider>
      <LineItem
        {...{
          id: '',
          number: 1,
          activateable: true,
          isActive: true,
          onActivate: jest.fn(),
          onReset: jest.fn(),
          onActivateAfterReset: jest.fn(),
          onNext: jest.fn(),
          onPrevious: jest.fn(),
          element,
        }}
      />
    </ResumeEditorProvider>
  );
}

describe('FieldListItemText', () => {
  test('Render defaultnya teks placeholder/label ketika valuenya kosong', () => {
    renderField(<FieldListItemText field="fullName" label="Nama lengkap" />);

    expect(screen.getByText(/Nama lengkap/i)).toBeInTheDocument();
  });
});
