import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { MARKER_POSITION, type MarkerPosition, ORIENTATION, type Orientation, SIZE, type Size, Tabs } from '../../src';
import styles from './styles.module.scss';

const TAB_ITEMS: Array<{ value: string; label: string; disabled?: boolean; counter?: number }> = [
  { value: 'tab1', label: 'Вкладка 1', counter: 12 },
  { value: 'tab2', label: 'Вкладка 2' },
  { value: 'tab3', label: 'Вкладка 3' },
  { value: 'tab4', label: 'Вкладка 4' },
  { value: 'tab5', label: 'Вкладка 5' },
  { value: 'tab6', label: 'Вкладка 6' },
  { value: 'tab7', label: 'Вкладка 7' },
  { value: 'tab8', label: 'Вкладка 8' },
  { value: 'tab9', label: 'Вкладка 9' },
  { value: 'tab10', label: 'Отключена', disabled: true },
];

const TAB_VALUES = TAB_ITEMS.map(item => item.value);

const meta: Meta<{
  value: string;
  size: Size;
  orientation: Orientation;
  markerPosition: MarkerPosition;
  showCounter: boolean;
  disableDivider: boolean;
}> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BnDZww7tvszWBemlYQS1Pg/%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-list--tab--toggles--FF-8135-?node-id=8671-2412&m=dev',
    },
  },
  args: {
    value: 'tab1',
    size: SIZE.L,
    orientation: ORIENTATION.Horizontal,
    markerPosition: MARKER_POSITION.After,
    showCounter: true,
    disableDivider: false,
  },
  argTypes: {
    value: {
      control: 'select',
      options: TAB_VALUES,
      description: 'Выбранная вкладка',
    },
    defaultValue: {
      control: 'select',
      options: TAB_VALUES,
      description: 'Начальная вкладка (для инициализации)',
    },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер панели табов',
    },
    orientation: {
      control: 'radio',
      options: Object.values(ORIENTATION),
      description: 'Ориентация',
    },
    markerPosition: {
      control: 'radio',
      options: Object.values(MARKER_POSITION),
      description: 'Позиция маркера активной вкладки',
    },
    showCounter: {
      control: 'boolean',
      description: 'Показать счётчик на первой вкладке',
    },
    disableDivider: {
      control: 'boolean',
      description: 'Скрыть разделитель',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function TabsPlayground({
  value: valueArg,
  defaultValue,
  size,
  orientation,
  markerPosition,
  showCounter,
  disableDivider,
}: {
  value: string;
  defaultValue: string;
  size: Size;
  orientation: Orientation;
  markerPosition: MarkerPosition;
  showCounter: boolean;
  disableDivider: boolean;
}) {
  const [value, setValue] = useState(valueArg || defaultValue || 'tab1');

  useEffect(() => {
    setValue(valueArg || defaultValue || 'tab1');
  }, [valueArg, defaultValue]);

  return (
    <div className={styles.storyWrapper}>
      <Tabs value={value} onChange={setValue}>
        <Tabs.TabBar
          size={size}
          orientation={orientation}
          markerPosition={markerPosition}
          disableDivider={disableDivider}
        >
          {TAB_ITEMS.map(item => (
            <Tabs.Tab
              key={item.value}
              label={item.label}
              value={item.value}
              disabled={item.disabled}
              counter={showCounter && item.counter != null ? { label: item.counter } : undefined}
            />
          ))}
        </Tabs.TabBar>
        {TAB_ITEMS.map(item => (
          <Tabs.TabContent key={item.value} value={item.value}>
            Контент вкладки {item.value.replace('tab', '')}
          </Tabs.TabContent>
        ))}
      </Tabs>
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <TabsPlayground {...args} />,
};
