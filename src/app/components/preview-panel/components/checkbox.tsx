import * as React from 'react';
import { clsx } from 'clsx';
import * as styles from './checkbox.css';

function Checkbox({
  id,
  name,
  label,
  checked,
  onChange,
}: {
  id?: string;
  name?: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const [checkedValue, setChecked] = React.useState(checked || false);

  return (
    <div className={styles.checkboxInput}>
      <input
        type="checkbox"
        className={styles.input}
        tabIndex={-1}
        value="on"
        id={id}
        name={name}
        checked={typeof checked !== 'undefined' ? checked : checkedValue}
        onChange={(ev) => {
          setChecked(ev.target.checked);
          onChange?.(ev.target.checked);
        }}
      />
      <button
        aria-hidden
        className={clsx(
          styles.checkbox,
          checkedValue ? styles.checkboxChecked : undefined
        )}
        onClick={() => setChecked((checked) => !checked)}
      >
        {checkedValue && <CheckMark />}
      </button>

      {Boolean(label) && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
}

function CheckMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { Checkbox };
