import { TabsSegmentedItem } from '@ds/site-tabs-segmented';
import { ChildThemeProvider, COLOR_SCHEME } from '@ds/theme';
import { ReactNode } from 'react';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

function item(value: string, label: string, extra?: Partial<TabsSegmentedItem>): TabsSegmentedItem {
  return { value, label, 'data-test-id': `${TEST_IDS.itemPrefix}-${value}`, ...extra };
}

export const ITEMS: TabsSegmentedItem[] = [
  item('infrastructure', 'Инфраструктура'),
  item('data', 'Данные'),
  item('ai', 'Искусственный интеллект'),
];

export const MANY_ITEMS: TabsSegmentedItem[] = [
  ...ITEMS,
  item('security', 'Безопасность'),
  item('network', 'Сеть'),
  item('support', 'Поддержка'),
];

export const ITEMS_WITH_DISABLED: TabsSegmentedItem[] = [...ITEMS, item('archive', 'Архив', { disabled: true })];

/** Тёмная подложка для appearance=onAccent — аналог `onAccentBackdrop` в Figma. */
export function AccentBackdrop({ children }: { children: ReactNode }) {
  return (
    <ChildThemeProvider value={{ colorScheme: COLOR_SCHEME.Dark }} className={styles.backdrop}>
      {children}
    </ChildThemeProvider>
  );
}
