import { ChildThemeProvider, COLOR_SCHEME, ThemeAppearance } from '@ds/theme';
import { extractSupportProps, useValueControl } from '@ds/utils';
import cn from 'classnames';
import { FocusEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';

import { APPEARANCE, SIZE } from '../../constants';
import { Segment } from '../../helperComponents';
import { Appearance, TabsSegmentedProps } from '../../types';
import { getFirstEnabledValue, getNextFocusIndex } from '../../utils';
import styles from './styles.module.scss';

// Figma: у appearance=onAccent режим цвета приколот к тёмному, у default наследуется.
const APPEARANCE_THEME: Record<Appearance, Partial<ThemeAppearance>> = {
  [APPEARANCE.Default]: {},
  [APPEARANCE.OnAccent]: { colorScheme: COLOR_SCHEME.Dark },
};

/**
 * Сегментированные вкладки (Figma `tabsSegmentedV2`, orientation=horizontal): ряд подписей в общей обводке.
 * Клавиатура: в порядке Tab одна вкладка (выбранная), стрелки и Home/End переводят фокус, Enter/Space выбирают.
 */
export function TabsSegmented({
  items,
  value: valueProp,
  defaultValue,
  onChange,
  size = SIZE.M,
  appearance = APPEARANCE.Default,
  wrap = false,
  className,
  ...rest
}: TabsSegmentedProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [focusedValue, setFocusedValue] = useState<string>();
  const [value, setValue] = useValueControl<string>({
    value: valueProp,
    defaultValue: defaultValue ?? getFirstEnabledValue(items),
    onChange,
  });

  const handleSelect = useCallback(
    (next: string) => {
      if (next !== value) {
        setValue(next);
      }
    },
    [setValue, value],
  );

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? []);
    const nextIndex = getNextFocusIndex(event.key, tabs.indexOf(event.target as HTMLButtonElement), tabs.length);

    if (nextIndex !== undefined) {
      event.preventDefault();
      tabs[nextIndex]?.focus();
    }
  }, []);

  // Фокус ушёл из ряда — при следующем входе по Tab фокус снова попадает на выбранную вкладку.
  const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocusedValue(undefined);
    }
  }, []);

  const enabledValues = items.filter(item => !item.disabled).map(item => item.value);
  const tabbableValue =
    [focusedValue, value].find(candidate => candidate !== undefined && enabledValues.includes(candidate)) ??
    enabledValues[0];

  // Обёртка провайдера темы рендерит классы `sn-*` в разметке, поэтому тема есть и в SSR-HTML.
  return (
    <ChildThemeProvider value={APPEARANCE_THEME[appearance]} className={styles.themeScope}>
      {/* Фокус получают вкладки (одна в порядке Tab), ряд только перехватывает стрелки — как в segment-control. */}
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        ref={listRef}
        role='tablist'
        className={cn(styles.tabsSegmented, className)}
        data-size={size}
        data-appearance={appearance}
        data-wrap={wrap || undefined}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        {...extractSupportProps(rest)}
      >
        {items.map(item => (
          <Segment
            key={item.value}
            {...item}
            size={size}
            appearance={appearance}
            selected={item.value === value}
            tabbable={item.value === tabbableValue}
            onSelect={handleSelect}
            onFocusSegment={setFocusedValue}
          />
        ))}
      </div>
    </ChildThemeProvider>
  );
}
