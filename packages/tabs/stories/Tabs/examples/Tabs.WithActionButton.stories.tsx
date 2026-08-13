import { APPEARANCE, Button, SIZE as BUTTON_SIZE, VIEW } from '@ds/button';
import { ORIENTATION, Orientation, SIZE, Size, Tabs, TabsProps } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const TAB_ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'settings', label: 'Settings' },
  { value: 'billing', label: 'Billing' },
];

// Оси story поверх пропсов `Tabs`: `component: Tabs` требует, чтобы тип args был его надмножеством.
type StoryProps = TabsProps & {
  orientation: Orientation;
  tabSize: Size;
};

function WithActionButtonRender({ orientation, tabSize }: StoryProps) {
  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>WithActionButton</DemoTitle>
        <DemoHint>
          Слот действия рядом со списком вкладок. В вертикальной раскладке правый край кнопки совпадает с линией списка
          — слот тянется на его ширину.
        </DemoHint>
        <DemoActions align='start'>
          <Tabs defaultValue='overview'>
            <Tabs.TabBar
              orientation={orientation}
              size={tabSize}
              data-test-id={TEST_IDS.tabBar.root}
              slotActionButton={
                <Button
                  label='Создать'
                  appearance={APPEARANCE.Primary}
                  view={VIEW.Filled}
                  size={BUTTON_SIZE.S}
                  data-test-id={TEST_IDS.actionButton}
                />
              }
            >
              {TAB_ITEMS.map(item => (
                <Tabs.Tab
                  key={item.value}
                  value={item.value}
                  label={item.label}
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
                {item.label} content
              </Tabs.TabContent>
            ))}
          </Tabs>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/Tabs/Tabs/Examples/WithActionButton',
  component: Tabs,
  parameters: { layout: 'fullscreen' },
  render: args => <WithActionButtonRender {...args} />,
  args: {
    orientation: ORIENTATION.Vertical,
    tabSize: SIZE.M,
  },
  argTypes: {
    orientation: { name: '[Stories]: orientation', control: 'radio', options: Object.values(ORIENTATION) },
    tabSize: { name: '[Stories]: size', control: 'radio', options: Object.values(SIZE) },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const WithActionButton: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.actionButton)).toBeVisible();
  },
};
