import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { type Account, useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';
import { useProfileInputsCycle } from '../hooks/profile-inputs-cycle';

import { ListItemLine } from './list-item-line';
import { AutogrowingInput } from './autogrowing-input';
import { ProfileLinkEditorWithCustomAccount } from './field-list-item-add-profile';

import * as fieldStyles from './fields.css';
import { staticDisplay } from './fields.css';

type AccountInfo = {
  label: string;
  urlTemplate: string;
};

const ACCOUNT_TEMPLATE: {
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

const _getAccountLabel = (account = '') => {
  if (!account) return '';
  const template = ACCOUNT_TEMPLATE[account.toLowerCase()];
  if (!template) return account;
  const { label } = ACCOUNT_TEMPLATE[account.toLowerCase()];
  return label;
};

const _getUrlTemplate = (account = '') => {
  if (!account) return 'https://';
  const template = ACCOUNT_TEMPLATE[account.toLowerCase()];
  if (!template) return 'https://';
  const { urlTemplate } = ACCOUNT_TEMPLATE[account.toLowerCase()];
  return urlTemplate;
};

function FieldProfileAccount({
  account = {
    id: '',
    text: '',
    url: '',
    account: '',
  },
}: {
  account?: Account;
}) {
  const { updateAccount } = useResumeEditor();
  const { isActive, next } = useActiveLine();
  const value = account?.text || account?.url || '';
  const accountLabel = _getAccountLabel(account.account);
  const withCustomAccount = !new Set(['github', 'linkedin']).has(
    account.account.toLowerCase()
  );

  if (isActive) {
    return (
      <ListItemLine muted>
        {withCustomAccount ? (
          <ProfileLinkEditorWithCustomAccount
            initialValue={account}
            onSave={(account) => {
              updateAccount(account);
              next();
            }}
          />
        ) : (
          <ProfileLinkEditor
            initialValue={account}
            onSave={(account) => {
              updateAccount(account);
              next();
            }}
          />
        )}
      </ListItemLine>
    );
  }

  if (!value) {
    return (
      <ListItemLine muted>
        <span className={fieldStyles.fieldEmptyLabel}>{accountLabel}</span>
      </ListItemLine>
    );
  }

  return (
    <ListItemLine>
      <span>{accountLabel}:</span>
      <span>&nbsp;</span>
      <span className={fieldStyles.fieldValueLabel}>{value}</span>
    </ListItemLine>
  );
}

function StaticDisplay({ children = null }: React.PropsWithChildren) {
  return <span className={staticDisplay}>{children}</span>;
}

function ProfileLinkEditor({
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
  const [linkText, setLinkText] = React.useState(initialValue.text);
  const [url, setUrl] = React.useState(initialValue.url);
  const { getCycleProps, reachesEnd } = useProfileInputsCycle();

  const PLACEHOLDER_LINK_TEXT = 'Teks link';
  const PLACEHOLDER_URL = 'URL alamat profil/akun';
  const accountLabel = _getAccountLabel(initialValue.account);

  useHotkeys(
    'enter',
    () => {
      onSave({
        id: initialValue.id,
        text: linkText,
        url: url === _getUrlTemplate(initialValue.account) ? '' : url,
        account: initialValue.account,
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
      <StaticDisplay>{accountLabel}:</StaticDisplay>
      <span>&nbsp;</span>
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

export { FieldProfileAccount };
