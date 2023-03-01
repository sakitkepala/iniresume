import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { type Account, useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';
import { useProfileInputsCycle } from '../hooks/profile-inputs-cycle';

import { ListItemLine } from './list-item-line';
import { TriggerText } from './trigger-text';
import { AutogrowingInput } from './autogrowing-input';

import { v1, v4 } from 'uuid';

import { staticDisplay } from './fields.css';

function FieldListItemAddProfile() {
  const { updateAccount } = useResumeEditor();
  const { isActive, activate } = useActiveLine();
  const [resetId, setResetId] = React.useState(() => v1());

  if (isActive) {
    return (
      <ListItemLine muted>
        <ProfileLinkEditorWithCustomAccount
          key={resetId}
          initialValue={{ id: v4(), account: '', text: '', url: '' }}
          onSave={(account) => {
            updateAccount(account);
            setResetId(v1());
          }}
        />
      </ListItemLine>
    );
  }

  return (
    <span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <TriggerText onClick={activate}>Tambah lagi profil lain</TriggerText>
    </span>
  );
}

/* ========================== */

type AccountInfo = {
  label: string;
  urlTemplate: string;
};

const ACCOUNT_LABELS: {
  [account: string]: AccountInfo;
} = {
  github: {
    label: 'Github',
    urlTemplate: 'https://github.com/',
  },
  linkedin: {
    label: 'LinkedIn',
    urlTemplate: 'https://linkedin.com/in/',
  },
  gitlab: {
    label: 'Gitlab',
    urlTemplate: 'https://gitlab.com/',
  },
  twitter: {
    label: 'Twitter',
    urlTemplate: 'https://twitter.com/',
  },
  instagram: {
    label: 'Instagram',
    urlTemplate: 'https://instagram.com/',
  },
};

const _getUrlTemplate = (account = '') => {
  return ACCOUNT_LABELS[account?.toLowerCase()]?.urlTemplate || 'https://';
};

const PLACEHOLDER_PLATFORM = 'Platform';
const PLACEHOLDER_LINK_TEXT = 'Teks link';
const PLACEHOLDER_URL = 'URL alamat profil/akun';

function StaticDisplay({ children = null }: React.PropsWithChildren) {
  return <span className={staticDisplay}>{children}</span>;
}

function ProfileLinkEditorWithCustomAccount({
  initialValue = {
    id: '',
    text: '',
    url: '',
    account: '',
  },
  onSave,
}: {
  initialValue?: Account;
  onSave: (account: Account) => void;
}) {
  const [accountPlatform, setAccountPlatform] = React.useState(
    initialValue.account
  );
  const [linkText, setLinkText] = React.useState(initialValue.text);
  const [url, setUrl] = React.useState(initialValue.url);
  const { getCycleProps, reachesEnd } = useProfileInputsCycle();

  useHotkeys(
    'enter',
    () => {
      onSave({
        id: initialValue.id,
        text: linkText,
        url: url === _getUrlTemplate(initialValue.account) ? '' : url,
        account: accountPlatform,
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
      <span>
        <AutogrowingInput
          {...getCycleProps('account')}
          autofocus
          placeholder={PLACEHOLDER_PLATFORM}
          initialSize={
            !accountPlatform ? PLACEHOLDER_PLATFORM.length : undefined
          }
          value={accountPlatform}
          onChange={setAccountPlatform}
        />
      </span>
      <StaticDisplay>:</StaticDisplay>
      <span>&nbsp;</span>
      <StaticDisplay>{'['}</StaticDisplay>
      <span>
        <AutogrowingInput
          {...getCycleProps('text')}
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
            onFocus: !url
              ? () => setUrl(_getUrlTemplate(initialValue.account))
              : undefined,
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

export { FieldListItemAddProfile, ProfileLinkEditorWithCustomAccount };
