import { ItemProps } from '@ds/list';

// Story-only ось пустых состояний (List/Droplist Playground). «Не задано» — undefined,
// сентинел-опций вида `none` не вводим (см. rules/storybook-args-conventions.md).
export const STORY_EMPTY_STATE = {
  NoData: 'no-data',
  NoResults: 'no-results',
  Error: 'error',
} as const;

// Story-only ось селекции. «Без селекции» — undefined.
export const STORY_SELECTION = {
  Single: 'single',
  Multiple: 'multiple',
} as const;

// Пресеты empty-state — общие для List и Droplist, чтобы no-data / no-results / error
// визуально различались одинаково в обоих Playground'ах.
export const NO_DATA_STATE = { description: 'Нет данных для отображения' };
export const NO_RESULTS_STATE = { description: 'Ничего не найдено по фильтру' };
export const ERROR_DATA_STATE = { description: 'Не удалось загрузить данные' };

// Демо-контент: 100 элементов, чтобы скролл и virtualized были показательны.
export const DEMO_ITEMS: ItemProps[] = Array.from({ length: 100 }, (_, i) => ({
  id: `item-${i}`,
  content: { option: `Item ${i + 1}` },
}));
