import { Button } from '@ds/button';
import { MARKER_POSITION, MarkerPosition, ORIENTATION, Tabs, TabsProps, VARIANT, Variant } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

type TabDef = {
  value: string;
  label: string;
  disabled?: boolean;
  counter?: { value: number; appearance?: 'neutral' | 'primary' };
};

// Набор вкладок демонстрирует API: счётчики (neutral/primary), disabled, длинный ряд для скролла.
const TAB_ITEMS: TabDef[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'settings', label: 'Settings' },
  { value: 'billing', label: 'Billing' },
  { value: 'analytics', label: 'Analytics', counter: { value: 12, appearance: 'neutral' } },
  { value: 'reports', label: 'Reports', counter: { value: 3, appearance: 'primary' } },
  { value: 'team', label: 'Team' },
  { value: 'integrations', label: 'Integrations', counter: { value: 128, appearance: 'neutral' } },
  { value: 'archived', label: 'Archived', disabled: true },
];

// Story-only контролы (`[Stories]:`) прокидываются в TabBar; сами не входят в API Tabs.
type StoryProps = TabsProps & {
  tabVariant: Variant;
  markerPosition: MarkerPosition;
  divider: boolean;
  showAction: boolean;
  longLabel: boolean;
};

function PlaygroundRender({
  tabVariant,
  markerPosition,
  divider,
  showAction,
  longLabel,
  orientation,
  ...tabsProps
}: StoryProps) {
  const isVertical = orientation === ORIENTATION.Vertical;

  const tabBar = (
    <Tabs.TabBar
      variant={tabVariant}
      markerPosition={markerPosition}
      divider={divider}
      afterContent={showAction ? <Button size={tabVariant === 'primary' ? 'l' : 'm'} label='Создать' /> : undefined}
      data-test-id={TEST_IDS.tabBar.root}
      className={cn({ [styles.verticalTabBar]: orientation === 'vertical' })}
    >
      {TAB_ITEMS.map(item => (
        <Tabs.Tab
          key={item.value}
          value={item.value}
          label={longLabel ? `${item.label}: полная длинная подпись вкладки без сокращения` : item.label}
          disabled={item.disabled}
          counter={item.counter}
          data-test-id={`${TEST_IDS.tab.root}-${item.value}`}
        />
      ))}
    </Tabs.TabBar>
  );

  const tabContent = TAB_ITEMS.map(item => (
    <Tabs.TabContent key={item.value} value={item.value} data-test-id={`${TEST_IDS.tabContent.root}-${item.value}`}>
      <div className={styles.panel}>{item.label} content</div>
    </Tabs.TabContent>
  ));

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Счётчики (neutral / primary), disabled-вкладки и длинный ряд. Ориентацию и тип меняют контролы; контейнер
          тянется за угол — при нехватке места появляются кнопки прокрутки.
        </DemoHint>
        <DemoActions align='center'>
          <DemoResizable width={480} axis='both' className={cn({ [styles.verticalContainer]: isVertical })}>
            <Tabs orientation={orientation} {...tabsProps} className={cn({ [styles.verticalTabs]: isVertical })}>
              {markerPosition === 'after' ? (
                <>
                  {tabBar}
                  {tabContent}
                </>
              ) : (
                <>
                  {tabContent}
                  {tabBar}
                </>
              )}
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
    tabVariant: VARIANT.Primary,
    markerPosition: MARKER_POSITION.After,
    divider: true,
    showAction: false,
    longLabel: false,
  },
  argTypes: {
    markerPosition: { control: 'radio', options: Object.values(MARKER_POSITION) },
    divider: { control: 'boolean' },
    showAction: { name: '[Stories]: showAction', control: 'boolean' },
    longLabel: { name: '[Stories]: longLabel', control: 'boolean' },
    defaultValue: { control: 'text', description: 'Активная вкладка по умолчанию' },
    value: { control: 'text', description: 'Активная вкладка (контролируемый режим)' },
    orientation: { control: 'radio', options: Object.values(ORIENTATION) },
    tabVariant: { name: '[Stories]: variant', control: 'radio', options: Object.values(VARIANT) },
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
