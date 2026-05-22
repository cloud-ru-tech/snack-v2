import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PLACEMENT, Popover, PopoverProps, TRIGGER } from '@ds/popover';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<PopoverProps> = {
  title: 'Components/Popover/Tests/Interaction',
  component: Popover,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    trigger: TRIGGER.Click,
    placement: PLACEMENT.Top,
    outsideClick: true,
    closeOnEscapeKey: true,
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>{'Открытие Popover по клику и закрытие по клику снаружи.'}</DemoHint>
        <DemoActions align='center'>
          <Popover
            {...args}
            content={
              <div className={styles.popoverContent} data-test-id={TEST_IDS.content}>
                Popover content
              </div>
            }
          >
            <Button
              data-test-id={TEST_IDS.triggerOpen}
              label='Open popover'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
            />
          </Popover>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
export default meta;

type Story = StoryObj<PopoverProps>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId(TEST_IDS.triggerOpen);

    await step('click: opens content', async () => {
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(within(document.body).getByTestId(TEST_IDS.content)).toBeVisible();
      });
    });

    await step('outside click: closes content', async () => {
      await userEvent.click(document.body);
      await waitFor(() => {
        expect(within(document.body).queryByTestId(TEST_IDS.content)).toBeNull();
      });
    });
  },
};
