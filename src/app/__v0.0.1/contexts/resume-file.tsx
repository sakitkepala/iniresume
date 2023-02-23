import * as React from 'react';

const RenderedFileContext = React.createContext<{
  downloadUrl: string;
  setDownloadUrl?: (url: string) => void;
}>({ downloadUrl: '' });

function useResumeFile() {
  return React.useContext(RenderedFileContext);
}

function ResumeFileProvider({ children }: React.PropsWithChildren) {
  const [url, setUrl] = React.useState<string>('');
  const context = React.useMemo(
    () => ({
      downloadUrl: url,
      setDownloadUrl(url: string) {
        setUrl(url);
      },
    }),
    [url]
  );
  return (
    <RenderedFileContext.Provider value={context}>
      {children}
    </RenderedFileContext.Provider>
  );
}

export { ResumeFileProvider, useResumeFile };
