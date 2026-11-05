import { CONTAINER, SectionBasic } from '@ds/site-section';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ContentPlaceholder, TABS, TITLE } from '../fixtures';
import { TEST_IDS } from '../testIds';

const onTabClick = fn();
const onMoreButtonClick = fn();

const meta: Meta<typeof SectionBasic> = {
  title: 'Site/SectionBasic/Tests/Interaction',
  component: SectionBasic,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    container: CONTAINER.New,
    title: TITLE,
    tabBarItems: TABS.map(tab => ({ ...tab, onClick: onTabClick })),
    defaultTabBarValue: 'data',
    onTabBarChange: fn(),
    moreButton: { onClick: onMoreButtonClick },
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof SectionBasic>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Изначальная вкладка из `defaultTabBarValue`; клик вызывает `onTabBarChange` и `onClick` вкладки, «Показать
          еще» — свой `onClick`.
        </DemoHint>
        <SectionBasic {...args}>
          <ContentPlaceholder />
        </SectionBasic>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const firstTab = canvas.getByTestId(`${TEST_IDS.tabPrefix}-infrastructure`);
    const secondTab = canvas.getByTestId(`${TEST_IDS.tabPrefix}-data`);

    await step('initial: defaultTabBarValue selects the tab', async () => {
      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
      await expect(firstTab).toHaveAttribute('aria-selected', 'false');
    });

    await step('click: selects the tab, calls onTabBarChange and the tab onClick', async () => {
      await userEvent.click(firstTab);
      await expect(firstTab).toHaveAttribute('aria-selected', 'true');
      await expect(secondTab).toHaveAttribute('aria-selected', 'false');
      await expect(args.onTabBarChange).toHaveBeenCalledWith('infrastructure');
      await expect(onTabClick).toHaveBeenCalledTimes(1);
    });

    await step('click: more button calls onClick', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.moreButton));
      await expect(onMoreButtonClick).toHaveBeenCalledTimes(1);
    });
  },
};
