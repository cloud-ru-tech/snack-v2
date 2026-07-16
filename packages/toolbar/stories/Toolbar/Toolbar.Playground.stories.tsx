import { Button } from '@ds/button';
import { CrossSVG, PlaceholderSVG } from '@ds/icons/interface/system';
import { TEST_IDS as TOOLBAR_TEST_IDS, Toolbar } from '@ds/toolbar';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const PLAYGROUND_FILTERS = [
  {
    id: 'status',
    type: 'single' as const,
    label: 'Статус',
    options: [
      { value: 'active', label: 'Активные' },
      { value: 'archived', label: 'Архив' },
    ],
  },
  {
    id: 'category',
    type: 'multiple' as const,
    label: 'Категория',
    options: [
      { value: 'network', label: 'Сеть' },
      { value: 'compute', label: 'Вычисления' },
      { value: 'storage', label: 'Хранилище' },
    ],
  },
  {
    id: 'type',
    type: 'single' as const,
    label: 'Тип',
    options: [
      { value: 'standard', label: 'Стандартный' },
      { value: 'premium', label: 'Премиум' },
    ],
  },
  {
    id: 'region',
    type: 'single' as const,
    label: 'Регион',
    options: [
      { value: 'ru-central', label: 'ru-central-1' },
      { value: 'ru-north', label: 'ru-north-1' },
    ],
  },
];

const PLAYGROUND_FILTER_VALUE: Record<string, unknown> = {
  status: 'active',
  category: ['network', 'compute'],
  type: 'standard',
  region: 'ru-central',
};

type ToolbarPlaygroundArgs = {
  outline: boolean;
  showSearch: boolean;
  showRefresh: boolean;
  showMoreActions: boolean;
  showFilterRow: boolean;
  filterOpen: boolean;
  showBulkActions: boolean;
  bulkChecked: boolean;
  bulkIndeterminate: boolean;
  showBulkCheckbox: boolean;
  showExtraSlot: boolean;
  showDataView: boolean;
};

type ToolbarPlaygroundProps = ToolbarPlaygroundArgs & {
  onFilterOpenChange?: (open: boolean) => void;
};

function ToolbarPlayground({
  outline,
  showSearch,
  showRefresh,
  showMoreActions,
  showFilterRow,
  filterOpen,
  showBulkActions,
  bulkChecked,
  bulkIndeterminate,
  showBulkCheckbox,
  showExtraSlot,
  showDataView,
  onFilterOpenChange,
}: ToolbarPlaygroundProps) {
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState<Record<string, unknown>>(PLAYGROUND_FILTER_VALUE);
  const [filtersOpen, setFiltersOpen] = useState(filterOpen);

  useEffect(() => {
    setFiltersOpen(filterOpen);
  }, [filterOpen]);

  const filterRow = showFilterRow
    ? {
        open: filtersOpen,
        onOpenChange: (open: boolean) => {
          setFiltersOpen(open);
          onFilterOpenChange?.(open);
        },
        value: filterValue,
        onChange: setFilterValue,
        filters: PLAYGROUND_FILTERS,
        defaultValue: PLAYGROUND_FILTER_VALUE,
      }
    : undefined;

  const commonProps = {
    outline,
    'data-test-id': TEST_IDS.root,
    search: showSearch ? { value: search, onChange: setSearch, placeholder: 'Поиск' } : undefined,
    onRefresh: showRefresh ? () => setSearch('') : undefined,
    moreActions: showMoreActions
      ? [
          { content: { label: 'Экспорт' }, onClick: () => undefined },
          { content: { label: 'Настройки' }, onClick: () => undefined },
        ]
      : undefined,
    after: showExtraSlot ? (
      <Button
        view='function'
        appearance='neutral'
        icon={<PlaceholderSVG />}
        size='m'
        aria-label='Дополнительное действие'
        onClick={() => undefined}
      />
    ) : undefined,
    dataView: { show: showDataView },
    filterRow,
  };

  const bulkProps = showBulkActions
    ? {
        checked: bulkChecked,
        indeterminate: bulkIndeterminate,
        selectedCount: bulkChecked || bulkIndeterminate ? 5 : 0,
        totalCount: 100,
        onCheck: () => {},
        showBulkCheckbox,
        bulkActions: [
          { label: 'Удалить', icon: CrossSVG, onClick: () => undefined },
          { label: 'Редактировать', icon: PlaceholderSVG, onClick: () => undefined },
          { label: 'Переместить', icon: PlaceholderSVG, onClick: () => undefined },
          { label: 'Экспорт', icon: PlaceholderSVG, onClick: () => undefined },
          { label: 'Архив', icon: PlaceholderSVG, onClick: () => undefined },
        ],
      }
    : {};

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Слоты тулбара: поиск, обновление, after, фильтры, bulk-actions и меню «Ещё».</DemoHint>
        <DemoActions block>
          <DemoResizable width='full' className={styles.playgroundWrapper}>
            <Toolbar {...commonProps} {...bulkProps} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<ToolbarPlaygroundArgs> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: { layout: 'fullscreen' },
  render: (args, { updateArgs }) => (
    <ToolbarPlayground {...args} onFilterOpenChange={open => updateArgs({ filterOpen: open })} />
  ),
  args: {
    outline: true,
    showSearch: true,
    showRefresh: true,
    showMoreActions: true,
    showFilterRow: false,
    filterOpen: false,
    showBulkActions: false,
    bulkIndeterminate: false,
    bulkChecked: false,
    showBulkCheckbox: true,
    showExtraSlot: false,
    showDataView: false,
  },
  argTypes: {
    showSearch: {
      name: '[Stories]: showSearch',
      control: 'boolean',
    },
    showRefresh: {
      name: '[Stories]: showRefresh',
      control: 'boolean',
    },
    showMoreActions: {
      name: '[Stories]: showMoreActions',
      control: 'boolean',
    },
    showFilterRow: {
      name: '[Stories]: showFilterRow',
      control: 'boolean',
    },
    filterOpen: {
      name: '[Stories]: filterOpen',
      if: { arg: 'showFilterRow' },
    },
    showBulkActions: {
      name: '[Stories]: showBulkActions',
      control: 'boolean',
    },
    bulkChecked: {
      name: '[Stories]: bulkChecked',
      if: { arg: 'showBulkActions' },
    },
    bulkIndeterminate: {
      name: '[Stories]: bulkIndeterminate',
      if: { arg: 'showBulkActions' },
    },
    showBulkCheckbox: {
      name: '[Stories]: showBulkCheckbox',
      if: { arg: 'showBulkActions' },
    },
    showExtraSlot: {
      name: '[Stories]: showExtraSlot',
      control: 'boolean',
    },
    showDataView: {
      name: '[Stories]: showDataView',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ToolbarPlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    if (args.showSearch) {
      await expect(canvas.getByTestId(TOOLBAR_TEST_IDS.search)).toBeVisible();
    }

    if (args.showDataView) {
      await expect(canvas.getByTestId(TOOLBAR_TEST_IDS.dataView)).toBeVisible();
    }

    if (args.showMoreActions) {
      await expect(canvas.getByTestId(TOOLBAR_TEST_IDS.moreActionsButton)).toBeVisible();
    }

    // Тулбар-глобал `layoutType` по умолчанию desktop — refresh-кнопка видна.
    if (args.showRefresh) {
      await expect(canvas.getByTestId(TOOLBAR_TEST_IDS.refreshButton)).toBeVisible();
    }
  },
};
