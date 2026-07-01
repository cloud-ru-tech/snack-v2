import { Button } from '@ds/button';
import { FileSVG, FolderSVG, HomeSVG, SettingsSVG, StarSVG } from '@ds/icons';
import { Droplist, DroplistProps, ItemProps as Item, SIZE } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ERROR_DATA_STATE, NO_DATA_STATE, NO_RESULTS_STATE, STORY_EMPTY_STATE, STORY_SELECTION } from '../constants';
import { TEST_IDS } from '../testIds';
import { StoryEmptyState, StorySelection } from '../types';

// Богатый набор для проверки всех кейсов: rich base items (иконка + description + caption),
// collapse, group (с switch-айтемом), next-list (с вложенным next-list).
const playgroundItems: Item[] = [
  {
    id: 'overview',
    beforeContent: <HomeSVG />,
    content: { option: 'Overview', description: 'Сводка по проекту', caption: '⌘O' },
  },
  { id: 'analytics', beforeContent: <FileSVG />, content: { option: 'Analytics', description: 'Метрики и отчёты' } },
  {
    id: 'resources',
    type: 'collapse',
    content: { option: 'Resources' },
    items: [
      { id: 'servers', content: { option: 'Servers' } },
      { id: 'databases', content: { option: 'Databases' } },
    ],
  },
  {
    type: 'group',
    label: 'Workspace',
    groupVariant: 'subtitle',
    items: [
      { id: 'billing', beforeContent: <StarSVG />, content: { option: 'Billing', caption: 'Pro' } },
      { id: 'members', content: { option: 'Members', description: '12 человек' } },
      { id: 'notifications', switch: true, content: { option: 'Notifications' } },
    ],
  },
  {
    id: 'settings',
    type: 'next-list',
    beforeContent: <SettingsSVG />,
    content: { option: 'Settings' },
    items: [
      { id: 's-general', content: { option: 'General' } },
      {
        id: 's-advanced',
        type: 'next-list',
        beforeContent: <FolderSVG />,
        content: { option: 'Advanced' },
        items: [
          { id: 's-flags', content: { option: 'Feature flags' } },
          { id: 's-tokens', content: { option: 'API tokens' } },
        ],
      },
    ],
  },
];

// Виртуализация рендерит только viewport — нужна большая коллекция, иначе эффект не виден.
const virtualizedItems: Item[] = Array.from({ length: 10000 }, (_, i) => ({
  id: `item-${i}`,
  content: { option: `Item ${i + 1}` },
}));

type StoryProps = DroplistProps & {
  selectionMode?: StorySelection;
  emptyState?: StoryEmptyState;
  showSearch: boolean;
  showHeader: boolean;
  showFooter: boolean;
};

function buildSelection(mode?: StorySelection): DroplistProps['selection'] {
  if (mode === STORY_SELECTION.Single) {
    return { mode: 'single', defaultValue: 'analytics' };
  }
  if (mode === STORY_SELECTION.Multiple) {
    return { mode: 'multiple', defaultValue: ['overview', 'billing'] };
  }
  return undefined;
}

/** Текст айтема (`option`) или `label` группы — для рекурсивного фильтра поиска. */
function itemText(item: Item): string {
  if ('label' in item && item.label) {
    return String(item.label);
  }
  const content = 'content' in item ? item.content : undefined;
  if (content && typeof content === 'object' && 'option' in content) {
    return String((content as { option: string | number }).option);
  }
  return '';
}

/**
 * Рекурсивно фильтрует rich-items (group / collapse / next-list) по подстроке: контейнер остаётся,
 * если совпал сам или есть совпавшие потомки (показываем только их).
 */
function filterItems(items: Item[], query: string): Item[] {
  const lower = query.trim().toLowerCase();
  if (!lower) {
    return items;
  }

  const result: Item[] = [];
  for (const item of items) {
    if ('items' in item && Array.isArray(item.items)) {
      const children = filterItems(item.items, query);
      if (children.length || itemText(item).toLowerCase().includes(lower)) {
        result.push({ ...item, items: children.length ? children : item.items } as Item);
      }
    } else if (itemText(item).toLowerCase().includes(lower)) {
      result.push(item);
    }
  }

  return result;
}

// Droplist сам управляет open по клику на триггер; controlled open фронтит его логику — здесь uncontrolled.
function PlaygroundRender({
  selectionMode,
  emptyState,
  virtualized,
  showSearch,
  showHeader,
  showFooter,
  headerDivider,
  footerDivider,
  scroll,
  limitedScrollHeight,
  ...args
}: StoryProps) {
  const [query, setQuery] = useState('');

  // Виртуализатор берёт scroll-элемент только при `scroll`; без него рендерит пустой контейнер.
  const isScroll = scroll || virtualized;

  let sourceItems: Item[] = playgroundItems;
  if (emptyState !== undefined) {
    sourceItems = [];
  } else if (virtualized) {
    sourceItems = virtualizedItems;
  }
  const items = showSearch && !virtualized && emptyState === undefined ? filterItems(sourceItems, query) : sourceItems;

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Открыть droplist триггером ниже.</DemoHint>
        <DemoActions align='center'>
          <Droplist
            {...args}
            items={items}
            virtualized={virtualized}
            scroll={isScroll}
            limitedScrollHeight={limitedScrollHeight || virtualized}
            selection={buildSelection(selectionMode)}
            search={showSearch ? { value: query, onChange: setQuery, placeholder: 'Поиск' } : undefined}
            header={showHeader ? 'Сортировать по' : undefined}
            footer={showFooter ? 'Показаны элементы' : undefined}
            headerDivider={showHeader && headerDivider}
            footerDivider={showFooter && footerDivider}
            dataError={emptyState === STORY_EMPTY_STATE.Error}
            dataFiltered={emptyState === STORY_EMPTY_STATE.NoResults}
            noDataState={NO_DATA_STATE}
            noResultsState={NO_RESULTS_STATE}
            errorDataState={ERROR_DATA_STATE}
          >
            <Button
              data-test-id={TEST_IDS.droplist.triggerOpen}
              label='Open droplist'
              view='outline'
              appearance='neutral'
              size='m'
            />
          </Droplist>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/List/Droplist',
  component: Droplist,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BnDZww7tvszWBemlYQS1Pg/?node-id=2663-475758',
    },
  },
  args: {
    size: 's',
    marker: true,
    placement: 'bottom-start',
    closeDroplistOnItemClick: false,
    closeOnPopstate: false,
    trigger: 'click',
    widthStrategy: 'gte',
    loading: false,
    scroll: false,
    untouchableScrollbars: false,
    scrollToSelectedItem: false,
    limitedScrollHeight: false,
    virtualized: false,
    headerDivider: false,
    footerDivider: false,
    barHideStrategy: 'leave',
    // Story-only оси (не из API Droplist) — рулят items / selection / empty-state / слоты.
    // «Не задано» — undefined (контрол показывает «Choose option…»), сентинелов вида `none` нет.
    selectionMode: undefined,
    emptyState: undefined,
    showSearch: false,
    showHeader: false,
    showFooter: false,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    // placement — курируем подмножество из 4 значений (остальные в демо не показываем). Только desktop:
    // раскладку берём из тулбар-глобала `layoutType` (не из args), поэтому `if: { global: ... }`.
    placement: {
      control: 'radio',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      if: { global: 'layoutType', neq: 'mobile' },
    },
    // widthStrategy / barHideStrategy / trigger — enum'ы из API: options и значения подтягивает
    // docgen, ручаем только тип контрола (radio для ≤4 значений). widthStrategy — только desktop.
    widthStrategy: { control: 'radio', if: { global: 'layoutType', neq: 'mobile' } },
    barHideStrategy: { control: 'radio' },
    headerDivider: { if: { arg: 'showHeader', eq: true } },
    footerDivider: { if: { arg: 'showFooter', eq: true } },
    // Story-only оси.
    // select (а не radio): «без селекции» = undefined → контрол показывает «Choose option…»,
    // radio же оставил бы пустой выбор без подсветки (выглядит сломанным).
    selectionMode: { name: '[Stories]: selection', control: 'select', options: Object.values(STORY_SELECTION) },
    emptyState: { name: '[Stories]: emptyState', control: 'select', options: Object.values(STORY_EMPTY_STATE) },
    // marker имеет визуальный смысл только при single-селекции — иначе контрол «мёртвый».
    marker: { if: { arg: 'selectionMode', eq: 'single' } },
    showSearch: { name: '[Stories]: showSearch', control: 'boolean' },
    showHeader: { name: '[Stories]: showHeader', control: 'boolean' },
    showFooter: { name: '[Stories]: showFooter', control: 'boolean' },
    // Управляется через [Stories]: emptyState — прячем «сырые» флаги.
    dataError: { table: { disable: true } },
    dataFiltered: { table: { disable: true } },
    noDataState: { table: { disable: true } },
    noResultsState: { table: { disable: true } },
    errorDataState: { table: { disable: true } },
    // Слоты / items / selection задаёт render (через [Stories]: оси) — прямой контроль не нужен.
    items: { table: { disable: true } },
    children: { table: { disable: true } },
    pinTop: { table: { disable: true } },
    pinBottom: { table: { disable: true } },
    search: { table: { disable: true } },
    collapse: { table: { disable: true } },
    selection: { table: { disable: true } },
    header: { table: { disable: true } },
    footer: { table: { disable: true } },
    // RefObject-проп (контейнер портала) — не сериализуется в контрол, прячем из панели.
    container: { table: { disable: true } },
    // Технические scroll-пропсы — управляются внутри render (scroll включается под virtualized).
    scroll: { table: { disable: true } },
    untouchableScrollbars: { table: { disable: true } },
    scrollToSelectedItem: { table: { disable: true } },
    limitedScrollHeight: { table: { disable: true } },
    // Refs / callbacks / технические слоты — не имеют смысла в Controls.
    open: { table: { disable: true } },
    triggerElemRef: { table: { disable: true } },
    listRef: { table: { disable: true } },
    triggerClassName: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    onScroll: { table: { disable: true } },
    scrollRef: { table: { disable: true } },
    scrollContainerRef: { table: { disable: true } },
    scrollContainerClassName: { table: { disable: true } },
    contentRender: { table: { disable: true } },
    footerActiveElementsRefs: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: args => <PlaygroundRender {...args} />,
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByTestId(TEST_IDS.droplist.triggerOpen);
    await expect(trigger).toBeVisible();
  },
};
