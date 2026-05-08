import { Switch } from '@ds/toggles';
import { Tooltip } from '@ds/tooltip';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { KeyboardEventHandler, ReactNode } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { SWITCH_ROW_TYPES, TEST_IDS } from '../../constants';
import { SwitchRowType } from '../../types';
import { Title } from '../Title';
import styles from './styles.module.scss';

export type SwitchRowProps = WithSupportProps<{
  /** Заголовок переключателя */
  title: string;
  /** Дополнительное описание под заголовком */
  description?: string;
  /** Состояние переключателя (controlled) */
  checked?: boolean;
  /** Начальное состояние переключателя (uncontrolled) */
  defaultChecked?: boolean;
  /** Отключённое состояние */
  disabled?: boolean;
  /** Состояние загрузки — переключатель крутит Sun */
  loading?: boolean;
  /** Колбэк при переключении */
  onChange?(checked: boolean): void;
  /** Подсказка рядом с заголовком (иконка «?») */
  tip?: ReactNode;
  /** Тултип поверх переключателя, когда он disabled */
  disabledToggleTip?: ReactNode;
  /** CSS-класс корневого элемента */
  className?: string;
  /** Отключить truncation заголовка */
  disableTitleTruncate?: boolean;
  /** Тип лейаута: `block` (карточка с отступами) или `line` (inline без паддингов) */
  type?: SwitchRowType;
  /** Атрибут `name` для нативного `<input>` внутри Switch */
  name?: string;
}>;

/**
 * SwitchRow — строка с заголовком, описанием и переключателем Switch.
 * Кликабельна целиком: клик / Enter / Space в пределах корня триггерит `onChange(!checked)`.
 */
export function SwitchRow({
  title,
  description,
  checked: checkedProp,
  defaultChecked,
  disabled,
  onChange,
  tip,
  className,
  disabledToggleTip,
  loading,
  disableTitleTruncate = false,
  type = SWITCH_ROW_TYPES.Block,
  name,
  ...rest
}: SwitchRowProps) {
  const [checked, setChecked] = useUncontrolledProp(checkedProp, Boolean(defaultChecked), onChange);

  const handleChange = () => {
    if (disabled || loading) return;
    setChecked(!checked);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      handleChange();
    }
  };

  const toggle = (
    <Switch
      data-test-id={TEST_IDS.switch}
      size='s'
      checked={checked}
      disabled={disabled}
      tabIndex={-1}
      loading={loading}
      name={name}
    />
  );

  const titleLayout = (
    <div className={styles.titleLayout}>
      <div className={styles.titleWrapper}>
        <Title title={title} tip={tip} disableTitleTruncate={disableTitleTruncate} />
      </div>
    </div>
  );

  return (
    <div
      className={cn(styles.switchRow, className)}
      role='switch'
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onClick={handleChange}
      onKeyDown={handleKeyDown}
      data-type={type}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      data-checked={checked || undefined}
      {...extractSupportProps(rest)}
    >
      {type === SWITCH_ROW_TYPES.Block && (
        <span className={styles.stateLayer} data-state={'activatedFilled'} aria-hidden />
      )}

      <div className={styles.headline} data-test-id={TEST_IDS.title}>
        {type === SWITCH_ROW_TYPES.Block && titleLayout}

        {disabled && disabledToggleTip ? (
          <Tooltip
            tip={disabledToggleTip}
            data-test-id={TEST_IDS.toggleTooltip}
            triggerClassName={styles.switchRowWrapper}
          >
            {toggle}
          </Tooltip>
        ) : (
          toggle
        )}

        {type === SWITCH_ROW_TYPES.Line && titleLayout}
      </div>

      {description && (
        <div className={styles.description} data-test-id={TEST_IDS.description}>
          {description}
        </div>
      )}
    </div>
  );
}
