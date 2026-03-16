import { Counter, CounterProps } from '@design-system/counter';
import { Typography, TypographyProps } from '@design-system/typography';
import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import { FocusEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useRef } from 'react';

import { SIZE } from '../../constants';
import { useTabBarContext, useTabsContext } from '../../context';
import { Size } from '../../types';
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
    label: number;
    /** Внешний вид */
    appearance?: CounterProps['appearance'];
    /** Семантический цвет */
    color?: CounterProps['color'];
  };
  /** Колбек клика по кнопке переключения */
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}>;

const MAP_SIZE_TO_PROPS: Record<
  Size,
  { typographyProps: Pick<TypographyProps, 'variant' | 'size'>; counterProps: Pick<CounterProps, 'size'> }
> = {
  [SIZE.L]: {
    typographyProps: {
      variant: 'title',
      size: 'm',
    },
    counterProps: {
      size: 's',
    },
  },
  [SIZE.M]: {
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
  const { onSelect, size, orientation, focusedTab, onFocus } = useTabBarContext();
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

  if (!size) {
    return null;
  }

  const { typographyProps, counterProps } = MAP_SIZE_TO_PROPS[size];

  return (
    <button
      type='button'
      role='tab'
      data-testid={`tabs__tab-${value}`}
      {...extractSupportProps(otherProps)}
      id={value}
      ref={ref}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      className={cn(styles.tab, className)}
      aria-controls={getTabContentId(value)}
      aria-selected={selected}
      data-selected={selected || undefined}
      data-size={size}
      data-orientation={orientation}
      onClick={handleClick}
      onFocus={onFocusHandler}
      onKeyDown={clickByEnterOrSpaceKey}
    >
      <Typography className={styles.container} as='div' {...typographyProps}>
        {label}
        {counter && (
          <Counter
            appearance={counter.appearance}
            color={counter.color}
            value={counter.label}
            data-testid={`tabs__tab-counter-${value}`}
            {...counterProps}
          />
        )}
        <span data-state-layer aria-hidden data-state='regularBackground' />
      </Typography>
    </button>
  );
}
