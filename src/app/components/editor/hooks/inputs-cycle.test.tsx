import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useInputsCycle } from './inputs-cycle';

function TestInputsCycling() {
  const { getCycleProps, reachesEnd } = useInputsCycle();

  return (
    <div>
      <input
        {...getCycleProps('first')}
        id="first"
        placeholder="first"
        type="text"
      />
      <input
        {...getCycleProps('second')}
        id="second"
        placeholder="second"
        type="text"
      />
      <input
        {...getCycleProps('third')}
        id="third"
        placeholder="third"
        type="text"
      />
      {reachesEnd && <span data-testid="reachesEnd">End reached</span>}
    </div>
  );
}

function TestInputsCyclingWithOnChange({
  onChange,
  onFocus,
}: {
  onChange: (value: string) => void;
  onFocus: (name: string) => void;
}) {
  const { getCycleProps } = useInputsCycle();

  return (
    <div>
      <input
        {...getCycleProps('first', {
          onChange: (ev) => onChange(ev.target.value),
          onFocus: () => onFocus('first'),
        })}
        id="first"
        placeholder="first"
        type="text"
      />
      <input
        {...getCycleProps('second', {
          onChange: (ev) => onChange(ev.target.value),
          onFocus: () => onFocus('second'),
        })}
        id="second"
        placeholder="second"
        type="text"
      />
      <input
        {...getCycleProps('third', {
          onChange: (ev) => onChange(ev.target.value),
          onFocus: () => onFocus('third'),
        })}
        id="third"
        placeholder="third"
        type="text"
      />
    </div>
  );
}

function TestInputsCyclingDirectControl() {
  const { getCycleProps, cycleInput, focusLastInput } = useInputsCycle();

  return (
    <div data-testid="blur-target-container">
      <input
        {...getCycleProps('first')}
        id="first"
        placeholder="first"
        type="text"
      />
      <input
        {...getCycleProps('second')}
        id="second"
        placeholder="second"
        type="text"
      />
      <input
        {...getCycleProps('third')}
        id="third"
        placeholder="third"
        type="text"
      />
      <button onClick={() => cycleInput()}>cycle</button>
      <button onClick={() => cycleInput({ reverse: true })}>reverse</button>
      <button onClick={() => focusLastInput()}>refocus</button>
    </div>
  );
}

function TestAutoSwitchOption() {
  const { getCycleProps } = useInputsCycle();

  return (
    <div>
      <input
        {...getCycleProps('first', {
          autoSwitchWhen: (value) => value === 'first',
        })}
        id="first"
        placeholder="first"
        type="text"
      />
      <input
        {...getCycleProps('four-chars', {
          autoSwitchWhen: (value) => value.length >= 4,
        })}
        id="four-chars"
        placeholder="four-chars"
        type="text"
      />
      <input
        {...getCycleProps('third')}
        id="third"
        placeholder="third"
        type="text"
      />
    </div>
  );
}

describe('useActiveLine', () => {
  test('nge-cycling input berurutan', async () => {
    render(<TestInputsCycling />);

    expect(screen.getByPlaceholderText(/first/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.keyboard('{Tab}');

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.keyboard('{Tab}');

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).toHaveFocus();

    await userEvent.keyboard('{Tab}');

    expect(screen.getByPlaceholderText(/first/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.keyboard('{Shift>}{Tab}');

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).toHaveFocus();

    await userEvent.keyboard('{Shift>}{Tab}');

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();
  });

  test('nge-cycling dengan Enter berhenti di input terakhir', async () => {
    render(<TestInputsCycling />);

    expect(screen.getByPlaceholderText(/first/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();
    expect(screen.queryByTestId('reachesEnd')).not.toBeInTheDocument();

    await userEvent.keyboard('{Enter}');

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.keyboard('{Enter}');

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).toHaveFocus();

    await userEvent.keyboard('{Enter}');

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).toHaveFocus();
    expect(screen.getByTestId('reachesEnd')).toBeInTheDocument();
  });

  test('onchange & onfocus handler custom', async () => {
    const handleChange = jest.fn();
    const handleFocus = jest.fn();
    render(
      <TestInputsCyclingWithOnChange
        onChange={handleChange}
        onFocus={handleFocus}
      />
    );

    expect(handleFocus).toHaveBeenCalled();
    expect(handleFocus).toHaveBeenCalledWith('first');

    await userEvent.type(screen.getByPlaceholderText(/first/i), 'first');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith('first');

    await userEvent.keyboard('{Enter}');

    expect(handleFocus).toHaveBeenCalled();
    expect(handleFocus).toHaveBeenCalledWith('second');

    await userEvent.type(screen.getByPlaceholderText(/second/i), 'second');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith('second');

    await userEvent.keyboard('{Enter}');

    expect(handleFocus).toHaveBeenCalled();
    expect(handleFocus).toHaveBeenCalledWith('third');

    await userEvent.type(screen.getByPlaceholderText(/third/i), 'third');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith('third');
  });

  test('kendali cycling langsung', async () => {
    render(<TestInputsCyclingDirectControl />);

    expect(screen.getByPlaceholderText(/first/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: /cycle/i }));

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: /cycle/i }));

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: /cycle/i }));

    expect(screen.getByPlaceholderText(/first/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: /reverse/i }));

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: /reverse/i }));

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.click(screen.getByTestId('blur-target-container'));

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: /refocus/i }));

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/second/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();
  });

  test('opsi autoswitch dengan kondisi', async () => {
    render(<TestAutoSwitchOption />);

    expect(screen.getByPlaceholderText(/first/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/four-chars/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.clear(screen.getByPlaceholderText(/first/));
    await userEvent.type(screen.getByPlaceholderText(/first/), 'notfirst');

    expect(screen.getByPlaceholderText(/first/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/four-chars/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.clear(screen.getByPlaceholderText(/first/));
    await userEvent.type(screen.getByPlaceholderText(/first/), 'first');

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/four-chars/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).not.toHaveFocus();

    await userEvent.clear(screen.getByPlaceholderText(/four-chars/));
    await userEvent.type(screen.getByPlaceholderText(/four-chars/), 'ab12');

    expect(screen.getByPlaceholderText(/first/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/four-chars/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/third/i)).toHaveFocus();
  });
});
