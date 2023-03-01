import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';
import { useInputsCycle } from '../hooks/inputs-cycle';

import { clsx } from 'clsx';
import { parseISO, format } from 'date-fns';
import id from 'date-fns/locale/id';

import * as fieldStyles from './fields.css';
import * as styles from './field-date-range.css';

function FieldExperienceDates({
  experienceId,
  from = '',
  to = '',
}: {
  experienceId: string; // untuk update data
  from?: string;
  to?: string;
}) {
  const { updateExperienceDates } = useResumeEditor();
  const { isActive, activateAfterReset } = useActiveLine();

  if (isActive) {
    return (
      <RangeInputWithMonth
        from={from}
        to={to}
        onSave={(range) => {
          updateExperienceDates(experienceId, range);
          activateAfterReset(`${experienceId}-experience-description`);
        }}
      />
    );
  }

  if (!from && !to) {
    return (
      <span className={fieldStyles.fieldEmptyLabel}>
        {'//'} Isi waktu masa bekerja
      </span>
    );
  }

  return <DisplayRangeText withMonth from={from} to={to} />;
}

function FieldEducationDates({
  educationId,
  from = '',
  to = '',
}: {
  educationId: string;
  from?: string;
  to?: string;
}) {
  const { updateEducationDates } = useResumeEditor();
  const { isActive, activateAfterReset } = useActiveLine();

  if (isActive) {
    return (
      <RangeInput
        from={from}
        to={to}
        onSave={(range) => {
          updateEducationDates(educationId, range);
          activateAfterReset(`${educationId}-education-description`);
        }}
      />
    );
  }

  if (!from && !to) {
    return (
      <span className={fieldStyles.fieldEmptyLabel}>
        {'//'} Isi waktu masa studi
      </span>
    );
  }

  return <DisplayRangeText from={from} to={to} />;
}

/* ========================== */

function DisplayRangeText({
  from = '',
  to = '',
  withMonth,
}: {
  from?: string;
  to?: string;
  withMonth?: boolean;
}) {
  const periodText = withMonth
    ? _getMonthRangeText({ from, to })
    : _getYearRangeText({ from, to });
  return <span className={styles.text}>{periodText}</span>;
}

function StaticDisplay({ children = null }: React.PropsWithChildren) {
  return <span className={fieldStyles.staticDisplay}>{children}</span>;
}

const _getCommonInputProps = () => ({
  tabIndex: -1,
  spellCheck: false,
});

function RangeInput({
  from = '',
  to = '',
  onSave,
}: {
  from?: string;
  to?: string;
  onSave: (range: { from: string; to: string }) => void;
}) {
  const [fromYear, setFromYear] = React.useState(() =>
    _getDateItem(from, 'year')
  );
  const [toYear, setToYear] = React.useState(() => _getDateItem(to, 'year'));

  const { getCycleProps } = useInputsCycle();

  useHotkeys('enter', () => onSave({ from: fromYear, to: toYear }), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  return (
    <span>
      <StaticDisplay>Dari</StaticDisplay>
      <span>&nbsp;</span>

      <input
        {..._getCommonInputProps()}
        {...getCycleProps('from-year', {
          autoSwitchWhen: (value) => value.length >= 4,
          onChange: (ev) => setFromYear(ev.target.value),
        })}
        className={clsx(fieldStyles.inputText, styles.inputYear)}
        placeholder="20xx"
        value={fromYear}
      />

      <span>&nbsp;</span>
      <StaticDisplay>sampai</StaticDisplay>
      <span>&nbsp;</span>

      <input
        {..._getCommonInputProps()}
        {...getCycleProps('to-year', {
          autoSwitchWhen: (value) => value.length >= 4,
          onChange: (ev) => {
            ev.target.value.length <= 4 && setToYear(ev.target.value);
          },
        })}
        className={clsx(fieldStyles.inputText, styles.inputYear)}
        placeholder="20xx"
        value={toYear}
      />
    </span>
  );
}

function RangeInputWithMonth({
  from = '',
  to = '',
  onSave,
}: {
  from?: string;
  to?: string;
  onSave: (range: { from: string; to: string }) => void;
}) {
  const [fromYear, setFromYear] = React.useState(() =>
    _getDateItem(from, 'year')
  );
  const [fromMonth, setFromMonth] = React.useState(() =>
    _getDateItem(from, 'month')
  );
  const [toYear, setToYear] = React.useState(() => _getDateItem(to, 'year'));
  const [toMonth, setToMonth] = React.useState(() => _getDateItem(to, 'month'));

  const { getCycleProps } = useInputsCycle();

  useHotkeys(
    'enter',
    () => {
      onSave({
        from: _getValueFromParts(fromYear, fromMonth),
        to: _getValueFromParts(toYear, toMonth),
      });
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  return (
    <span>
      <StaticDisplay>Dari</StaticDisplay>
      <span>&nbsp;</span>

      <input
        {..._getCommonInputProps()}
        {...getCycleProps('from-month', {
          autoSwitchWhen: (value) => value.length >= 2,
          onChange: (ev) => setFromMonth(ev.target.value),
        })}
        className={clsx(fieldStyles.inputText, styles.inputDate)}
        placeholder="12"
        value={fromMonth}
      />

      <StaticDisplay>-</StaticDisplay>

      <input
        {..._getCommonInputProps()}
        {...getCycleProps('from-year', {
          autoSwitchWhen: (value) => value.length >= 4,
          onChange: (ev) => setFromYear(ev.target.value),
        })}
        className={clsx(fieldStyles.inputText, styles.inputYear)}
        placeholder="20xx"
        value={fromYear}
      />

      <span>&nbsp;</span>
      <StaticDisplay>sampai</StaticDisplay>
      <span>&nbsp;</span>

      <input
        {..._getCommonInputProps()}
        {...getCycleProps('to-month', {
          autoSwitchWhen: (value) => value.length >= 2,
          onChange: (ev) => setToMonth(ev.target.value),
        })}
        className={clsx(fieldStyles.inputText, styles.inputDate)}
        placeholder="12"
        value={toMonth}
      />

      <StaticDisplay>-</StaticDisplay>

      <input
        {..._getCommonInputProps()}
        {...getCycleProps('to-year', {
          autoSwitchWhen: (value) => value.length >= 4,
          onChange: (ev) => {
            ev.target.value.length <= 4 && setToYear(ev.target.value);
          },
        })}
        className={clsx(fieldStyles.inputText, styles.inputYear)}
        placeholder="20xx"
        value={toYear}
      />
    </span>
  );
}

function _getYearRangeText({ from, to }: { from: string; to?: string }) {
  const _formatYear = (dateString: string) =>
    format(parseISO(dateString), 'yyyy', { locale: id });
  return to ? `${_formatYear(from)}-${_formatYear(to)}` : _formatYear(from);
}

function _getMonthRangeText({ from, to }: { from: string; to?: string }) {
  const _formatMonth = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMMM yyyy', { locale: id });
    } catch (error) {
      return dateString;
    }
  };
  if (!to) {
    return `${_formatMonth(
      from
    )} - belum diisi (centang bila "masih berlangsung")`;
  }
  return `${_formatMonth(from)} - ${_formatMonth(to)}`;
}

const _getDateItem = (date: string, part: 'year' | 'month') => {
  const parts = date.split('-');
  const item = part === 'year' ? parts[0] : parts[1];
  return item || '';
};

const _getValueFromParts = (year: string, month: string) => {
  if (!year || !month) return '';
  return [year, month].filter((part) => Boolean(part)).join('-');
};

export { FieldExperienceDates, FieldEducationDates };
