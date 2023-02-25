import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { type Website, useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';
import { useProfileInputsCycle } from '../hooks/profile-inputs-cycle';

import { ListItemLine } from './list-item-line';
import { AutogrowingInput } from './autogrowing-input';

import * as fieldStyles from './fields.css';
import { staticDisplay } from './fields.css';

function FieldWebsite() {
  const {
    resume: { website },
    updateWebsite,
  } = useResumeEditor();
  const { isActive, next } = useActiveLine();
  const value = website?.text || website?.url || '';

  if (isActive) {
    return (
      <ListItemLine muted>
        <WebsiteLinkEditor
          initialValue={website}
          onSave={(website) => {
            updateWebsite(website);
            next();
          }}
        />
      </ListItemLine>
    );
  }

  if (!value) {
    return (
      <ListItemLine muted>
        <span className={fieldStyles.fieldEmptyLabel}>
          {'//'} Website personal
        </span>
      </ListItemLine>
    );
  }

  return (
    <ListItemLine>
      <span className={fieldStyles.fieldValueLabel}>{value}</span>
    </ListItemLine>
  );
}

/* ========================== */

const PLACEHOLDER_LINK_TEXT = 'Teks link';
const PLACEHOLDER_URL = 'Alamat URL website';

function StaticDisplay({ children = null }: React.PropsWithChildren) {
  return <span className={staticDisplay}>{children}</span>;
}

function WebsiteLinkEditor({
  initialValue = { text: '', url: '' },
  onSave,
}: {
  initialValue?: Website;
  onSave: (website: Website) => void;
}) {
  const [linkText, setLinkText] = React.useState(initialValue.text);
  const [url, setUrl] = React.useState(initialValue.url);
  const { getCycleProps, reachesEnd } = useProfileInputsCycle();

  useHotkeys(
    'enter',
    () => {
      const isEmpty = new Set(['http://', 'https://']).has(url);
      onSave({
        text: linkText,
        url: isEmpty ? '' : url,
      });
    },
    {
      enabled: reachesEnd,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  return (
    <span>
      <StaticDisplay>{'['}</StaticDisplay>
      <span>
        <AutogrowingInput
          {...getCycleProps('text')}
          autofocus
          placeholder={PLACEHOLDER_LINK_TEXT}
          initialSize={!linkText ? PLACEHOLDER_LINK_TEXT.length : undefined}
          value={linkText}
          onChange={setLinkText}
        />
      </span>
      <StaticDisplay>{']'}</StaticDisplay>
      <StaticDisplay>{'('}</StaticDisplay>
      <span>
        <AutogrowingInput
          {...getCycleProps('url', {
            onFocus: !url ? () => setUrl('https://') : undefined,
          })}
          placeholder={PLACEHOLDER_URL}
          initialSize={!url ? PLACEHOLDER_URL.length : undefined}
          value={url}
          onChange={setUrl}
        />
      </span>
      <StaticDisplay>{')'}</StaticDisplay>
    </span>
  );
}

export { FieldWebsite };
