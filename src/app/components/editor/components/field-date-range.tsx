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

const DIGITS_MONTH = 2;
const DIGITS_YEAR = 4;

function FieldExperienceDates({
  experienceId,
  from = '',
  to = '',
  ongoing = false,
}: {
  experienceId: string; // untuk update data
  from?: string;
  to?: string;
  ongoing?: boolean;
}) {
  const { updateExperienceDates } = useResumeEditor();
  const { isActive, activateAfterReset, shouldPromptDirty } = useActiveLine();

  if (isActive) {
    return (
      <RangeInputWithMonth
        from={from}
        to={to}
        ongoing={ongoing}
        onDirty={() => shouldPromptDirty()}
        onClean={() => shouldPromptDirty(false)}
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

  return <DisplayRangeText withMonth from={from} to={to} ongoing={ongoing} />;
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
  const { isActive, activateAfterReset, shouldPromptDirty } = useActiveLine();

  if (isActive) {
    return (
      <RangeInput
        from={from}
        to={to}
        onDirty={() => shouldPromptDirty()}
        onClean={() => shouldPromptDirty(false)}
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
  ongoing = false,
  withMonth,
}: {
  from?: string;
  to?: string;
  ongoing?: boolean;
  withMonth?: boolean;
}) {
  const periodText = withMonth
    ? _getMonthRangeText({ from, to, ongoing })
    : _getYearRangeText({ from, to });
  return <span className={styles.text}>{periodText}</span>;
}

function StaticDisplay({ children = null }: React.PropsWithChildren) {
  return <span className={fieldStyles.staticDisplay}>{children}</span>;
}

function RangeInput({
  from = '',
  to = '',
  onDirty,
  onClean,
  onSave,
}: {
  from?: string;
  to?: string;
  onDirty?: () => void;
  onClean?: () => void;
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

      <label htmlFor="from-year" className={styles.label}>
        Tahun mulai
      </label>
      <input
        spellCheck={false}
        id="from-year"
        {...getCycleProps('from-year', {
          autoSwitchWhen: (value) => value.length >= DIGITS_YEAR,
          onChange: (ev) => {
            setFromYear(ev.target.value);

            const isDirty =
              JSON.stringify({ from: ev.target.value, to: toYear }) !==
              JSON.stringify({ from, to });
            isDirty && onDirty?.();
            !isDirty && onClean?.();
          },
        })}
        className={clsx(fieldStyles.inputText, styles.inputYear)}
        placeholder="20xx"
        value={fromYear}
      />

      <span>&nbsp;</span>
      <StaticDisplay>sampai</StaticDisplay>
      <span>&nbsp;</span>

      <label htmlFor="to-year" className={styles.label}>
        Tahun selesai
      </label>
      <input
        spellCheck={false}
        id="to-year"
        {...getCycleProps('to-year', {
          autoSwitchWhen: (value) => value.length >= DIGITS_YEAR,
          onChange: (ev) => {
            ev.target.value.length <= DIGITS_YEAR && setToYear(ev.target.value);

            const isDirty =
              JSON.stringify({ from: fromYear, to: ev.target.value }) !==
              JSON.stringify({ from, to });
            isDirty && onDirty?.();
            !isDirty && onClean?.();
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
  ongoing = false,
  onDirty,
  onClean,
  onSave,
}: {
  from?: string;
  to?: string;
  ongoing?: boolean;
  onDirty?: () => void;
  onClean?: () => void;
  onSave: (range: { from: string; to: string; ongoing: boolean }) => void;
}) {
  const [fromYear, setFromYear] = React.useState(() =>
    _getDateItem(from, 'year')
  );
  const [fromMonth, setFromMonth] = React.useState(() =>
    _getDateItem(from, 'month')
  );
  const [toYear, setToYear] = React.useState(() => _getDateItem(to, 'year'));
  const [toMonth, setToMonth] = React.useState(() => _getDateItem(to, 'month'));
  const [isOngoing, setOngoing] = React.useState(ongoing);

  const { getCycleProps, focusLastInput } = useInputsCycle();

  useHotkeys(
    'enter',
    () => {
      const valueFrom = _getValueFromParts(fromYear, fromMonth);
      const valueTo = _getValueFromParts(toYear, toMonth);
      onSave({
        from: valueFrom,
        to: valueTo,
        ongoing: valueTo ? false : isOngoing,
      });
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  return (
    <div className={styles.wrapper}>
      <div>
        <StaticDisplay>Dari</StaticDisplay>
        <span>&nbsp;</span>

        <label htmlFor="from-month" className={styles.label}>
          Bulan mulai
        </label>
        <input
          spellCheck={false}
          id="from-month"
          {...getCycleProps('from-month', {
            autoSwitchWhen: _getAutoswitch(fromMonth, DIGITS_MONTH),
            onChange: (ev) => {
              const value = _getValue(fromMonth, ev.target.value, DIGITS_MONTH);
              setFromMonth(value);
              const isDirty =
                JSON.stringify({
                  from: value + fromYear,
                  to: toMonth + toYear,
                }) !==
                JSON.stringify({
                  from: from.split('-').join(''),
                  to: to.split('-').join(''),
                });
              isDirty && onDirty?.();
              !isDirty && onClean?.();
            },
          })}
          className={clsx(fieldStyles.inputText, styles.inputDate)}
          placeholder="12"
          value={fromMonth}
        />

        <StaticDisplay>-</StaticDisplay>

        <label htmlFor="from-year" className={styles.label}>
          Tahun mulai
        </label>
        <input
          spellCheck={false}
          id="from-year"
          {...getCycleProps('from-year', {
            autoSwitchWhen: _getAutoswitch(fromYear, DIGITS_YEAR),
            onChange: (ev) => {
              const value = _getValue(fromYear, ev.target.value, DIGITS_YEAR);
              setFromYear(value);
              const isDirty =
                JSON.stringify({
                  from: fromMonth + value,
                  to: toMonth + toYear,
                }) !==
                JSON.stringify({
                  from: from.split('-').join(''),
                  to: to.split('-').join(''),
                });
              isDirty && onDirty?.();
              !isDirty && onClean?.();
            },
          })}
          className={clsx(fieldStyles.inputText, styles.inputYear)}
          placeholder="20xx"
          value={fromYear}
        />

        <span>&nbsp;</span>
        <StaticDisplay>sampai</StaticDisplay>
        <span>&nbsp;</span>

        <label htmlFor="to-month" className={styles.label}>
          Bulan selesai
        </label>
        <input
          spellCheck={false}
          id="to-month"
          {...getCycleProps('to-month', {
            autoSwitchWhen: _getAutoswitch(toMonth, DIGITS_MONTH),
            onChange: (ev) => {
              const value = _getValue(toMonth, ev.target.value, DIGITS_MONTH);
              setToMonth(value);
              const isDirty =
                JSON.stringify({
                  from: fromMonth + fromYear,
                  to: value + toYear,
                }) !==
                JSON.stringify({
                  from: from.split('-').join(''),
                  to: to.split('-').join(''),
                });
              isDirty && onDirty?.();
              !isDirty && onClean?.();
            },
          })}
          className={clsx(fieldStyles.inputText, styles.inputDate)}
          placeholder="12"
          value={toMonth}
        />

        <StaticDisplay>-</StaticDisplay>

        <label htmlFor="to-year" className={styles.label}>
          Tahun selesai
        </label>
        <input
          spellCheck={false}
          id="to-year"
          {...getCycleProps('to-year', {
            autoSwitchWhen: _getAutoswitch(toYear, DIGITS_YEAR),
            onChange: (ev) => {
              const value = _getValue(toYear, ev.target.value, DIGITS_YEAR);
              setToYear(value);
              const isDirty =
                JSON.stringify({
                  from: fromMonth + fromYear,
                  to: toMonth + value,
                }) !==
                JSON.stringify({
                  from: from.split('-').join(''),
                  to: to.split('-').join(''),
                });
              isDirty && onDirty?.();
              !isDirty && onClean?.();
            },
          })}
          className={clsx(fieldStyles.inputText, styles.inputYear)}
          placeholder="20xx"
          value={toYear}
        />
      </div>

      {(!toYear || !toMonth) && (
        <div className={styles.fieldOngoing} onClick={focusLastInput}>
          <input
            id="experience-ongoing"
            type="checkbox"
            value="ongoing"
            checked={isOngoing}
            onChange={(ev) => setOngoing(ev.target.checked)}
          />
          <label
            htmlFor="experience-ongoing"
            className={clsx(styles.triggerText, styles.fieldOngoingLabel)}
          >
            masih berlangsung?
          </label>
        </div>
      )}
    </div>
  );
}

function _getYearRangeText({ from, to }: { from: string; to?: string }) {
  const _formatYear = (dateString: string) =>
    format(parseISO(dateString), 'yyyy', { locale: id });
  return to ? `${_formatYear(from)}-${_formatYear(to)}` : _formatYear(from);
}

function _getMonthRangeText({
  from,
  to = '',
  ongoing,
}: {
  from: string;
  to?: string;
  ongoing: boolean;
}) {
  const _formatMonth = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMMM yyyy', { locale: id });
    } catch (error) {
      return dateString;
    }
  };

  if (!to && !ongoing) {
    return `${_formatMonth(
      from
    )} - belum diisi (centang bila "masih berlangsung")`;
  }

  if (!to && ongoing) {
    return `${_formatMonth(from)} - Sekarang`;
  }

  return `${_formatMonth(from)} - ${_formatMonth(to)}`;
}

const _getDateItem = (date: string, part: 'year' | 'month') => {
  const parts = date.split('-');
  const item = part === 'year' ? parts[0] : parts[1];
  return item || '';
};

const _getValueFromParts = (year: string, month: string) => {
  const validatedYear = year.length < DIGITS_YEAR ? '' : year;
  const validatedMonth = !month
    ? ''
    : [...new Array(DIGITS_MONTH - month.length)].reduce<string>(
        (value) => '0' + value,
        month
      );
  if (!validatedYear || !validatedMonth) return '';
  return [validatedYear, validatedMonth].filter((v) => Boolean(v)).join('-');
};

function _getValue(prevState: string, value: string, digits: number) {
  const validatedValue = _validateValue(prevState, value);
  const endValue = validatedValue.length > digits ? prevState : validatedValue;
  return endValue;
}

function _getAutoswitch(prevState: string, digits: number) {
  return (value: string): boolean => {
    const checkedValue = _validateValue(prevState, value);
    return checkedValue.length >= digits;
  };
}

function _validateValue(prevState: string, value: string) {
  const valueAsNumber = Number(value);
  return isNaN(valueAsNumber) ? prevState : value;
}

export { FieldExperienceDates, FieldEducationDates };
