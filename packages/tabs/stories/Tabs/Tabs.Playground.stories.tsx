import { ORIENTATION, Orientation, SIZE, Size, Tabs, TabsProps } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

type TabDef = {
  value: string;
  label: string;
  disabled?: boolean;
  counter?: { label: number; appearance?: 'neutral' | 'primary' };
};

// Набор вкладок демонстрирует API: счётчики (neutral/primary), disabled, длинный ряд для скролла.
const TAB_ITEMS: TabDef[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'settings', label: 'Settings' },
  { value: 'billing', label: 'Billing' },
  { value: 'analytics', label: 'Analytics', counter: { label: 12, appearance: 'neutral' } },
  { value: 'reports', label: 'Reports', counter: { label: 3, appearance: 'primary' } },
  { value: 'team', label: 'Team' },
  { value: 'integrations', label: 'Integrations', counter: { label: 128, appearance: 'neutral' } },
  { value: 'archived', label: 'Archived', disabled: true },
];

// Story-only контролы (`[Stories]:`) прокидываются в TabBar; сами не входят в API Tabs.
type StoryProps = TabsProps & {
  orientation: Orientation;
  tabSize: Size;
};

function PlaygroundRender({ orientation, tabSize, ...tabsProps }: StoryProps) {
  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Счётчики (neutral / primary), disabled-вкладки и длинный ряд. Ориентацию и размер меняют контролы; контейнер
          тянется за угол — при нехватке места появляются кнопки прокрутки.
        </DemoHint>
        <DemoActions align='center'>
          <DemoResizable width={480} axis='both'>
            <Tabs {...tabsProps}>
              <Tabs.TabBar orientation={orientation} size={tabSize} data-test-id={TEST_IDS.tabBar.root}>
                {TAB_ITEMS.map(item => (
                  <Tabs.Tab
                    key={item.value}
                    value={item.value}
                    label={item.label}
                    disabled={item.disabled}
                    counter={item.counter}
                    data-test-id={`${TEST_IDS.tab.root}-${item.value}`}
                  />
                ))}
              </Tabs.TabBar>
              {TAB_ITEMS.map(item => (
                <Tabs.TabContent
                  key={item.value}
                  value={item.value}
                  data-test-id={`${TEST_IDS.tabContent.root}-${item.value}`}
                >
                  <div className={styles.panel}>{item.label} content</div>
                </Tabs.TabContent>
              ))}
            </Tabs>
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/Tabs/Tabs',
  component: Tabs,
  parameters: { layout: 'fullscreen' },
  render: args => <PlaygroundRender {...args} />,
  args: {
    defaultValue: 'overview',
    orientation: ORIENTATION.Horizontal,
    tabSize: SIZE.L,
  },
  argTypes: {
    defaultValue: { control: 'text', description: 'Активная вкладка по умолчанию' },
    value: { control: 'text', description: 'Активная вкладка (контролируемый режим)' },
    orientation: { name: '[Stories]: orientation', control: 'radio', options: Object.values(ORIENTATION) },
    tabSize: { name: '[Stories]: size', control: 'radio', options: Object.values(SIZE) },
  },
};
export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.tabBar.root)).toBeVisible();
  },
};
