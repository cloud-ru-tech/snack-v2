import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { InfoRow, InfoRowProps } from '../../src';

type PlaygroundArgs = InfoRowProps & {
  showRowActions?: boolean;
  showSecondRowAction?: boolean;
  showSecondaryActions?: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Uikit Product/InfoRow/InfoRow',
  component: InfoRow,
  parameters: { layout: 'padded' },
  args: {
    label: 'Label',
    secondaryLabel: 'Label 2',
    content: 'Content value',
    secondaryContent: 'Second value',
    'data-test-id': 'info-row',
    topDivider: true,
    bottomDivider: true,
    loading: false,
    width: 'fixed',
    column: '1',
    maxWidth: false,
    labelTruncate: 1,
    showRowActions: true,
    showSecondRowAction: true,
    showSecondaryActions: false,
  },
  argTypes: {
    label: { control: 'text', description: 'Текст метки' },
    content: { control: 'text', description: 'Первая колонка значений' },
    secondaryContent: { control: 'text', description: 'Второе значение (`column="2"`)' },
    secondaryLabel: { control: 'text', description: 'Вторая метка (`column="2"`)' },
    labelTruncate: { control: 'number', description: 'Макс. строк метки (TruncateString)' },
    secondaryLabelTruncate: { control: 'number', description: 'Макс. строк второй метки' },
    labelTooltip: { control: 'text', description: 'Подсказка у метки (строка или объект пропсов)' },
    secondaryLabelTooltip: { control: 'text', description: 'Подсказка у второй метки' },
    topDivider: { control: 'boolean', description: 'Разделитель сверху' },
    bottomDivider: { control: 'boolean', description: 'Разделитель снизу' },
    loading: { control: 'boolean', description: 'Скелетон контента' },
    width: { control: 'radio', options: ['fixed', 'full'], description: 'Ширина строки' },
    column: { control: 'radio', options: ['1', '2'], description: 'Ось Figma: число колонок значений' },
    maxWidth: { control: 'boolean', description: 'Ось Figma maxWidth' },
    labelWidth: { control: 'select', options: ['fixed', 'auto'], description: 'Ширина колонки метки' },
    showRowActions: { control: 'boolean', description: 'Кнопки у первой колонки' },
    showSecondRowAction: {
      control: 'boolean',
      description:
        'Вторая icon-only кнопка у первой колонки. Имеет смысл при `column="1"` и включённых «Кнопках у первой колонки».',
      if: { arg: 'column', eq: '1' },
    },
    showSecondaryActions: {
      control: 'boolean',
      description: 'Одна icon-only кнопка у второй колонки (`column="2"`, как в макете)',
      if: { arg: 'column', eq: '2' },
    },
    className: { control: 'text' },
    labelClassName: { control: 'text' },
    secondaryLabelClassName: { control: 'text' },
    rowClassName: { control: 'text' },
    rowActions: { control: false },
    rowActionsSlot: { control: false },
    secondaryRowActions: { control: false },
    secondaryRowActionsSlot: { control: false },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Label')).toBeVisible();
  },
  render: ({
    showRowActions,
    showSecondRowAction,
    showSecondaryActions,
    column,
    secondaryContent,
    secondaryLabel,
    secondaryLabelTooltip,
    ...args
  }) => (
    <InfoRow
      {...args}
      column={column}
      secondaryLabel={column === '2' ? secondaryLabel : undefined}
      secondaryLabelTooltip={column === '2' ? secondaryLabelTooltip : undefined}
      secondaryContent={column === '2' ? secondaryContent : undefined}
      rowActions={
        showRowActions
          ? {
              first: {
                icon: <PlaceholderSVG />,
                'aria-label': 'Действие',
                'data-test-id': 'info-row-action-first',
              },
              ...(column === '1' && showSecondRowAction
                ? {
                    second: {
                      icon: <PlaceholderSVG />,
                      'aria-label': 'Действие',
                      'data-test-id': 'info-row-action-second',
                    },
                  }
                : {}),
            }
          : undefined
      }
      secondaryRowActions={
        column === '2' && showSecondaryActions
          ? {
              first: {
                icon: <PlaceholderSVG />,
                'aria-label': 'Действие',
                'data-test-id': 'info-row-action-second-col-first',
              },
            }
          : undefined
      }
    />
  ),
};
