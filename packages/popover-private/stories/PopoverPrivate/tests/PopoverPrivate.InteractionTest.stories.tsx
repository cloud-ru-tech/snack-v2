import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PLACEMENT, PopoverPrivate, PopoverPrivateProps, TRIGGER } from '@ds/popover-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PopoverPrivate> = {
  title: 'Components/PopoverPrivate/Tests/Interaction',
  component: PopoverPrivate,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PopoverPrivate>;

const PopoverContent = () => (
  <div data-test-id={TEST_IDS.content} className={styles.popoverContent}>
    Popover content
  </div>
);

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    trigger: TRIGGER.Click,
    placement: PLACEMENT.Top,
    outsideClick: true,
    closeOnEscapeKey: true,
    arrowElementClassName: styles.popoverArrowElement,
    arrowContainerClassName: styles.popoverArrowContainer,
  },
  render: (args: PopoverPrivateProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>{'Открытие PopoverPrivate по клику и закрытие через Escape.'}</DemoHint>
        <DemoActions align='center'>
          <PopoverPrivate {...args} popoverContent={<PopoverContent />}>
            <Button
              data-test-id={TEST_IDS.triggerOpen}
              label='Open popover'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
            />
          </PopoverPrivate>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('User opens popover', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.triggerOpen));
    });

    await step('Popover content is visible', async () => {
      expect(canvas.getByTestId(TEST_IDS.content)).toBeInTheDocument();
    });

    await step('User closes popover with Escape', async () => {
      await userEvent.keyboard('{Escape}');
    });

    await step('Popover is hidden', async () => {
      expect(canvas.queryByTestId(TEST_IDS.content)).not.toBeInTheDocument();
    });
  },
};
