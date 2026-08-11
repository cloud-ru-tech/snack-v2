import { Tooltip } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ChangeEvent, ChangeEventHandler, ReactNode, useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ConfigSelectorProps = WithSupportProps<{
  /** Лейбл */
  label: string;
  /** Колбек смены значения */
  onChange(checked: boolean, e: ChangeEvent<HTMLInputElement>): void;
  /** Отмечен ли компонент */
  checked: boolean;
  /** CSS-класс */
  className?: string;
  /** HTML tab index */
  tabIndex?: number;
  /** Доступна ли опция */
  available?: boolean;
  /** Тултип для доступной опции */
  availableTip?: ReactNode;
  /** Деактивирован ли компонент */
  disabled?: boolean;
  /** Тултип для деактивированного компонента */
  disabledTip?: ReactNode;
}>;

/**
 * ConfigSelector — chip-toggle на скрытом `<input type=checkbox>`: выбор одной опции конфигурации.
 * Корень кликабелен целиком (`<label>`), tooltip проксируется поверх доступной/отключённой опции.
 */
export function ConfigSelector({
  available,
  availableTip,
  disabledTip,
  label,
  checked,
  disabled,
  onChange,
  className,
  tabIndex = 0,
  ...rest
}: ConfigSelectorProps) {
  const tipConfig = useMemo(() => {
    const isOpen = (available && !checked && availableTip) || (disabled && disabledTip);

    return {
      tip: disabled ? disabledTip : availableTip,
      open: isOpen ? undefined : false,
      hoverDelayOpen: disabled ? 100 : 400,
    };
  }, [available, availableTip, checked, disabled, disabledTip]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange(!checked, e);
  };

  return (
    <Tooltip {...tipConfig} disableSpanWrapper>
      <label
        {...extractSupportProps(rest)}
        data-available={available || undefined}
        data-disabled={disabled || undefined}
        data-checked={checked || undefined}
        className={cn(styles.root, className)}
      >
        <input
          type='checkbox'
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          tabIndex={tabIndex}
          className={styles.input}
          data-test-id={TEST_IDS.input}
        />

        <span className={styles.content}>
          {!disabled && (
            <span
              className={styles.borderLayer}
              data-state={checked || available ? undefined : 'borderOnBackground'}
              aria-hidden
            />
          )}

          {!disabled && (
            <span
              className={styles.stateLayer}
              data-state={checked ? 'activatedOnBackground' : 'emptyNeutralOnBackground'}
              aria-hidden
            />
          )}

          <span className={cn(styles.labelLayout, styles.label)} data-test-id={TEST_IDS.label}>
            <TruncateString text={label} />
          </span>
        </span>
      </label>
    </Tooltip>
  );
}
