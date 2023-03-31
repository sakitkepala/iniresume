import * as React from 'react';
import { usePDF } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf';

export type PreviewContentProps = {
  doc: React.ReactElement;
  onRendering: () => void;
  onSuccess: (url: string) => void;
};

function PreviewContent({ doc, onRendering, onSuccess }: PreviewContentProps) {
  const [instance] = usePDF({ document: doc });

  React.useEffect(() => {
    !instance.url && onRendering();
  }, [instance.url, onRendering]);

  if (!instance.url) {
    return null;
  }

  return (
    <Document key={instance.url} file={instance.url} loading="">
      <Page
        key={instance.url}
        pageNumber={1}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        onRenderSuccess={() => onSuccess(instance.url || '')}
      />
    </Document>
  );
}

export { PreviewContent };
