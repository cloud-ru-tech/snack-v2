import { APPEARANCE, Button, SIZE as BUTTON_SIZE, VIEW } from '@ds/button';
import { ORIENTATION, Tabs, TabsProps, VARIANT, Variant } from '@ds/tabs';
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
  tabVariant: Variant;
};

function WithActionButtonRender({ orientation, tabVariant }: StoryProps) {
  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>WithActionButton</DemoTitle>
        <DemoHint>
          Слот действия рядом со списком вкладок. В вертикальной раскладке обёртка занимает ширину панели с отступами
          выбранного типа; разделитель проходит вдоль всей панели.
        </DemoHint>
        <DemoActions align='start'>
          <Tabs defaultValue='overview' orientation={orientation}>
            <Tabs.TabBar
              variant={tabVariant}
              data-test-id={TEST_IDS.tabBar.root}
              afterContent={
                <Button
                  label='Создать'
                  appearance={APPEARANCE.Primary}
                  view={VIEW.Filled}
                  size={tabVariant === VARIANT.Secondary ? BUTTON_SIZE.M : BUTTON_SIZE.L}
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
    tabVariant: VARIANT.Secondary,
  },
  argTypes: {
    orientation: { control: 'radio', options: Object.values(ORIENTATION) },
    tabVariant: { name: '[Stories]: variant', control: 'radio', options: Object.values(VARIANT) },
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
