import { ChevronRightSVG, FileSVG, FolderSVG, HomeSVG, SettingsSVG, StarSVG } from '@ds/icons/interface/system';
import { ItemProps as Item, List, ListProps, SIZE } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { ERROR_DATA_STATE, NO_DATA_STATE, NO_RESULTS_STATE, STORY_EMPTY_STATE, STORY_SELECTION } from '../constants';
import { TEST_IDS } from '../testIds';
import { StoryEmptyState, StorySelection } from '../types';

const ICONS = [HomeSVG, FileSVG, StarSVG, SettingsSVG, FolderSVG];

const LONG_LABEL = 'Very long item title that does not fit on one line and is truncated with an ellipsis';
const LONG_CAPTION = 'Very long caption on the right that also does not fit and is truncated with an ellipsis';

function demoLabelAndCaption(index: number, textTruncation: boolean = false): { label: string; caption: string } {
  const label = `Item ${index + 1}`;
  const caption = `${index + 1} items`;

  if (textTruncation) {
    if (index === 0) return { label: LONG_LABEL, caption };
    if (index === 1) return { label, caption: LONG_CAPTION };
    if (index === 2) return { label: LONG_LABEL, caption: LONG_CAPTION };
  }

  return { label, caption };
}

// 100 элементов: scroll / virtualized / limitedScrollHeight дают показательный диапазон прокрутки.
const getDemoItems = (count: number, textTruncation: boolean = false): Item[] =>
  Array.from({ length: count }, (_, i) => {
    const Icon = ICONS[i % ICONS.length];

    return {
      id: `item-${i}`,
      beforeContent: <Icon />,
      content: {
        ...demoLabelAndCaption(i, textTruncation),
        content: `Description for row ${i + 1}`,
      },
      afterContent: <ChevronRightSVG />,
      disabled: i === 4,
    };
  });

const demoItems = getDemoItems(100);
const truncationDemoItems = getDemoItems(10, true);

type StoryProps = ListProps & {
  selectionMode?: StorySelection;
  emptyState?: StoryEmptyState;
  showHeader: boolean;
  showFooter: boolean;
  textTruncation?: boolean;
};

function buildSelection(mode?: StorySelection): ListProps['selection'] {
  if (mode === STORY_SELECTION.Single) {
    return { mode: 'single', defaultValue: 'item-1' };
  }
  if (mode === STORY_SELECTION.Multiple) {
    return { mode: 'multiple', defaultValue: ['item-0', 'item-2'] };
  }
  return undefined;
}

function PlaygroundRender({
  selectionMode,
  emptyState,
  showHeader,
  showFooter,
  headerDivider,
  footerDivider,
  scroll,
  virtualized,
  limitedScrollHeight,
  textTruncation,
  ...args
}: StoryProps) {
  const isEmpty = emptyState !== undefined;
  // Виртуализатор берёт scroll-элемент только при `scroll`; без него рендерит пустой контейнер.
  const isScroll = scroll || virtualized;

  const items = textTruncation ? truncationDemoItems : demoItems;

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Список: размер, маркер, selection, scroll, состояния loading / empty.</DemoHint>
        <DemoActions align='center'>
          <DemoResizable axis='horizontal'>
            <List
              {...args}
              items={isEmpty ? [] : items}
              scroll={isScroll}
              virtualized={virtualized}
              limitedScrollHeight={limitedScrollHeight || virtualized}
              selection={buildSelection(selectionMode)}
              header={showHeader ? <strong>Navigation</strong> : undefined}
              footer={showFooter ? 'Показаны все элементы' : undefined}
              headerDivider={showHeader && headerDivider}
              footerDivider={showFooter && footerDivider}
              dataError={emptyState === STORY_EMPTY_STATE.Error}
              dataFiltered={emptyState === STORY_EMPTY_STATE.NoResults}
              noDataState={NO_DATA_STATE}
              noResultsState={NO_RESULTS_STATE}
              errorDataState={ERROR_DATA_STATE}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/List/List',
  component: List,
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
    scroll: true,
    loading: false,
    virtualized: false,
    untouchableScrollbars: false,
    scrollToSelectedItem: false,
    limitedScrollHeight: true,
    hasListInFocusChain: true,
    headerDivider: false,
    footerDivider: false,
    'data-test-id': TEST_IDS.list.root,
    // Story-only оси. «Не задано» — undefined (контрол показывает «Choose option…»),
    // сентинелов вида `none` нет.
    selectionMode: undefined,
    emptyState: undefined,
    showHeader: false,
    showFooter: false,
    textTruncation: false,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    headerDivider: { if: { arg: 'showHeader', eq: true } },
    footerDivider: { if: { arg: 'showFooter', eq: true } },
    // Story-only оси.
    // select (а не radio): «без селекции» = undefined → контрол показывает «Choose option…»,
    // radio оставил бы пустой выбор без подсветки (паритет с Droplist).
    selectionMode: { name: '[Stories]: selection', control: 'select', options: Object.values(STORY_SELECTION) },
    emptyState: { name: '[Stories]: emptyState', control: 'select', options: Object.values(STORY_EMPTY_STATE) },
    // marker имеет визуальный смысл только при single-селекции — иначе контрол «мёртвый».
    marker: { if: { arg: 'selectionMode', eq: 'single' } },
    showHeader: { name: '[Stories]: showHeader', control: 'boolean' },
    showFooter: { name: '[Stories]: showFooter', control: 'boolean' },
    textTruncation: { name: '[Stories]: show text truncation', control: 'boolean' },
    // Управляется через [Stories]: emptyState — прячем «сырые» флаги.
    dataError: { table: { disable: true } },
    dataFiltered: { table: { disable: true } },
    noDataState: { table: { disable: true } },
    noResultsState: { table: { disable: true } },
    errorDataState: { table: { disable: true } },
    // items / selection / header / footer задаёт render — прямой контроль не нужен.
    items: { table: { disable: true } },
    pinTop: { table: { disable: true } },
    pinBottom: { table: { disable: true } },
    footer: { table: { disable: true } },
    header: { table: { disable: true } },
    search: { table: { disable: true } },
    collapse: { table: { disable: true } },
    selection: { table: { disable: true } },
    // Refs / callbacks / технические слоты — не имеют смысла в Controls.
    onKeyDown: { table: { disable: true } },
    onScroll: { table: { disable: true } },
    scrollRef: { table: { disable: true } },
    scrollContainerRef: { table: { disable: true } },
    scrollContainerClassName: { table: { disable: true } },
    contentRender: { table: { disable: true } },
    footerActiveElementsRefs: { table: { disable: true } },
    keyboardNavigationRef: { table: { disable: true } },
  },
  render: args => <PlaygroundRender {...args} />,
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.list.root)).toBeVisible();
  },
};
