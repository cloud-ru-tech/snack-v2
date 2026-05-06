import { LOADER_SIZE, Spinner } from '@ds/loader';
import cn from 'classnames';
import { useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { MODE, SIZE } from '../../constants';
import { ToggleProps } from '../../types';
import { getVisualStateAttributes } from '../../utils';
import styles from './styles.module.scss';

export type RadioProps = ToggleProps;

const SPINNER_SIZE_MAP = {
  [SIZE.XS]: LOADER_SIZE.XS,
  [SIZE.S]: LOADER_SIZE.S,
};

export function Radio({
  inputRef,
  'data-test-id': dataTestId,
  checked: checkedProp,
  defaultChecked,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  loading = false,
  className,
  size = SIZE.XS,
  ...otherProps
}: RadioProps) {
  const [checked, setChecked] = useUncontrolledProp(checkedProp, Boolean(defaultChecked), onChange);
  const [focusVisible, setFocusVisible] = useState(false);

  const stateDataAttributes = getVisualStateAttributes({
    loading,
    disabled,
    checked,
  });

  return (
    <span
      className={cn(styles.root, className)}
      role={MODE.Radio}
      data-size={size}
      {...stateDataAttributes}
      data-test-id={dataTestId || undefined}
    >
      <div className={styles.container}>
        <div className={styles.framing} {...stateDataAttributes} data-focusvisible={focusVisible || undefined}>
          <div className={styles.backgroundStateLayer} data-state='regularFilled' />
          <div className={styles.flag}>
            {loading ? (
              <Spinner size={SPINNER_SIZE_MAP[size]} />
            ) : (
              <div className={styles.surface} {...stateDataAttributes} data-text-opacity={checked || undefined} />
            )}
          </div>
        </div>

        {!loading && (
          <input
            {...otherProps}
            data-test-id={dataTestId ? `${dataTestId}-native-input` : undefined}
            ref={inputRef}
            type={MODE.Radio}
            className={styles.inputPrivate}
            checked={checked}
            disabled={disabled}
            onChange={e => setChecked(e.target.checked)}
            onFocus={event => {
              setFocusVisible(event.target.matches(':focus-visible'));
              onFocus?.(event);
            }}
            onBlur={event => {
              setFocusVisible(false);
              onBlur?.(event);
            }}
          />
        )}
      </div>
    </span>
  );
}
