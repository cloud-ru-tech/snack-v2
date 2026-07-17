import { OrganizationSVG, UserSVG } from '@ds/icons/interface/product';
import { FileSVG, FolderSVG, HomeSVG, SettingsSVG, StarSVG } from '@ds/icons/interface/system';
import { ItemProps, ReorderItem } from '@ds/list';

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
export const NO_DATA_STATE = { content: 'Нет данных для отображения' };
export const NO_RESULTS_STATE = { content: 'Ничего не найдено по фильтру' };
export const ERROR_DATA_STATE = { content: 'Не удалось загрузить данные' };

// Демо-контент: 100 элементов, чтобы скролл и virtualized были показательны.
export const DEMO_ITEMS: ItemProps[] = Array.from({ length: 100 }, (_, i) => ({
  id: `item-${i}`,
  content: { option: `Item ${i + 1}` },
}));

export const REORDERABLE_ITEMS: ReorderItem[] = [
  { id: 'catalog', beforeContent: <HomeSVG />, content: { option: 'Каталог' } },
  {
    type: 'group',
    id: 'group-1',
    label: 'Группа 1',
    divider: true,
    items: [
      { id: 'profile', beforeContent: <UserSVG />, content: { option: 'Профиль' } },
      { id: 'settings-2', beforeContent: <OrganizationSVG />, content: { option: 'Организация' } },
    ],
  },
  {
    type: 'group',
    id: 'group-2',
    label: 'Группа 2',
    divider: true,
    items: [
      {
        id: 'orders',
        beforeContent: <FileSVG />,
        content: { option: 'Заказы' },
      },
      { id: 'favorites', beforeContent: <StarSVG />, content: { option: 'Избранное' } },
      { id: 'settings', beforeContent: <SettingsSVG />, content: { option: 'Настройки' }, disabled: true },
      { id: 'trash', beforeContent: <FolderSVG />, content: { option: 'Корзина' } },
    ],
  },
];
