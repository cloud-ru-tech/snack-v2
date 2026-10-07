import { Counter, CounterProps } from '@ds/counter';
import { TruncateString } from '@ds/truncate-string';
import { Typography, TypographyProps } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { FocusEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useRef } from 'react';

import { ORIENTATION, VARIANT } from '../../constants';
import { useTabBarContext, useTabsContext } from '../../context';
import { Variant } from '../../types';
import { getTabContentId } from '../../utils';
import styles from './styles.module.scss';

export type TabProps = WithSupportProps<{
  /** Value вкладки */
  value: string;
  /** Заголовок вкладки */
  label: string;
  /** Деактивирована ли вкладка */
  disabled?: boolean;
  /** CSS-класс */
  className?: string;
  /** Счетчик, отображающийся внутри кнопки переключения */
  counter?: {
    /** Значение счетчика */
    value: number;
    /** Внешний вид */
    appearance?: CounterProps['appearance'];
    /** Роль, в которой применяется `appearance` счётчика */
    roleAppearance?: CounterProps['roleAppearance'];
  };
  /** Колбек клика по кнопке переключения */
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}>;

const MAP_VARIANT_TO_PROPS: Record<
  Variant,
  { typographyProps: Pick<TypographyProps, 'variant' | 'size'>; counterProps: Pick<CounterProps, 'size'> }
> = {
  [VARIANT.Primary]: {
    typographyProps: {
      variant: 'title',
      size: 'm',
    },
    counterProps: {
      size: 's',
    },
  },
  [VARIANT.Secondary]: {
    typographyProps: {
      variant: 'title',
      size: 's',
    },
    counterProps: {
      size: 'xs',
    },
  },
};

export function Tab({ label, value, disabled = false, className, onClick, counter, ...otherProps }: TabProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { onSelect, variant, orientation, focusedTab, onFocus } = useTabBarContext();
  const { selectedTab, setSelectedTab } = useTabsContext();
  const selected = value === selectedTab;

  useEffect(() => {
    const { current } = ref;

    if (selected && current) {
      onSelect?.(current);
    }
  }, [selected, onSelect]);

  useEffect(() => {
    const { current } = ref;
    if (focusedTab === value && current) {
      current.focus();
    }
  }, [value, focusedTab]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      setSelectedTab(value);
      onClick?.(e);
    },
    [disabled, value, onClick, setSelectedTab],
  );

  const clickByEnterOrSpaceKey = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (disabled) return;
        ref.current?.click();
      }
    },
    [disabled],
  );

  const onFocusHandler = useCallback(
    (e: FocusEvent<HTMLButtonElement>) => {
      onFocus?.(e.target, value);
    },
    [onFocus, value],
  );

  if (!variant) {
    return null;
  }

  const { typographyProps, counterProps } = MAP_VARIANT_TO_PROPS[variant];

  return (
    <button
      type='button'
      role='tab'
      data-test-id={`tabs__tab-${value}`}
      {...extractSupportProps(otherProps)}
      id={value}
      ref={ref}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      className={cn(styles.tab, className)}
      aria-controls={getTabContentId(value)}
      aria-selected={selected}
      data-selected={selected || undefined}
      data-variant={variant}
      data-orientation={orientation}
      onClick={handleClick}
      onFocus={onFocusHandler}
      onKeyDown={clickByEnterOrSpaceKey}
    >
      <Typography className={styles.container} as='div' {...typographyProps}>
        {orientation === ORIENTATION.Vertical ? <TruncateString text={label} className={styles.label} /> : label}
        {counter && (
          <Counter
            className={styles.counter}
            appearance={counter.appearance}
            roleAppearance={counter.roleAppearance}
            value={counter.value}
            data-test-id={`tabs__tab-counter-${value}`}
            {...counterProps}
          />
        )}
        <span data-state-layer aria-hidden data-state='emptyNeutralOnBackground' />
      </Typography>
    </button>
  );
}
