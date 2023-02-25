import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

function useInputsCycle<T extends HTMLInputElement>() {
  const $inputs = React.useRef<Map<string, T | null>>(new Map());
  const [lastFocusIndex, setLastFocusIndex] = React.useState<number>(0);
  const reachesEnd = $inputs.current.size - 1 === lastFocusIndex;

  const inputsCycle = React.useMemo(() => {
    const getCycleProps = (
      name: string,
      options: {
        onChange?: React.ChangeEventHandler<T>;
        autoSwitchWhen?: (value: string) => boolean;
        onFocus?: () => void;
      } = {}
    ): {
      ref: React.Ref<T>;
      onChange: React.ChangeEventHandler<T>;
      onFocus: () => void;
    } => ({
      ref: (handle) => {
        handle &&
          !$inputs.current.has(name) &&
          $inputs.current.set(name, handle);
      },

      onChange: (ev) => {
        const { value } = ev.target;
        options.autoSwitchWhen?.(value) && !reachesEnd && cycleInput();
        options.onChange?.(ev);
      },

      onFocus: () => {
        const $inputNames = [...$inputs.current.keys()];
        const index = $inputNames.indexOf(name);
        options.onFocus?.();
        setLastFocusIndex(index);
      },
    });

    const getNextFocusIndex = () => {
      const nextIndex = lastFocusIndex + 1;
      if (nextIndex >= $inputs.current.size) {
        return 0;
      } else {
        return nextIndex;
      }
    };

    const getPrevFocusIndex = () => {
      const prevIndex = lastFocusIndex - 1;
      if (prevIndex < 0) {
        return $inputs.current.size - 1;
      } else {
        return prevIndex;
      }
    };

    const cycleInput = ({ reverse }: { reverse?: true } = {}) => {
      const inputNameSequence = [...$inputs.current.keys()];
      const position = reverse ? getPrevFocusIndex() : getNextFocusIndex();
      const $input = $inputs.current.get(inputNameSequence[position]);
      if ($input?.focus) {
        $input.focus();
        setLastFocusIndex(position);
      }
    };

    return { getCycleProps, cycleInput, reachesEnd };
  }, [lastFocusIndex, reachesEnd]);

  const { cycleInput } = inputsCycle;

  useHotkeys('enter', () => cycleInput(), {
    enabled: !reachesEnd,
    enableOnFormTags: true,
    preventDefault: true,
  });

  useHotkeys('tab', () => cycleInput(), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  useHotkeys('shift+tab', () => cycleInput({ reverse: true }), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  React.useEffect(() => {
    const $firstInput = [...$inputs.current.values()][0];
    $firstInput?.focus();
  }, []);

  return inputsCycle;
}

export { useInputsCycle };
