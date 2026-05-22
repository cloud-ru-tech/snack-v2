import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Accordion } from '../../../src';
import { SELECTION_MODE } from '../../../src/constants';
import styles from '../../styles.module.scss';
import { TEST_IDS } from '../../testIds';

type StoryArgs = {
  selectionMode?: typeof SELECTION_MODE.Single;
  onExpandedChange?: (value: string | undefined) => void;
};

const meta: Meta<StoryArgs> = {
  title: 'Components/Accordion/Accordion/Tests/Interaction',
  component: Accordion,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onExpandedChange: fn() },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: { selectionMode: SELECTION_MODE.Single },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <div className={styles.story}>
          <Accordion {...args}>
            <div className={styles.listM}>
              <Accordion.CollapseBlockPrimary id='block-1' data-test-id={TEST_IDS.accordion.block1} title='Block 1'>
                Content 1
              </Accordion.CollapseBlockPrimary>
              <Accordion.CollapseBlockPrimary id='block-2' data-test-id={TEST_IDS.accordion.block2} title='Block 2'>
                Content 2
              </Accordion.CollapseBlockPrimary>
            </div>
          </Accordion>
        </div>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const block1 = canvas.getByTestId(TEST_IDS.accordion.block1);
    const block2 = canvas.getByTestId(TEST_IDS.accordion.block2);

    await step('single mode: click expands first block', async () => {
      const chevron1 = within(block1).getAllByTestId(TEST_IDS.collapseBlock.chevron)[0];
      await userEvent.click(chevron1);
      await waitFor(() => expect(args.onExpandedChange).toHaveBeenCalled());
      await waitFor(() => expect(block1).toHaveAttribute('data-expanded', 'true'));
    });

    await step('single mode: expanding second block collapses first', async () => {
      const chevron2 = within(block2).getAllByTestId(TEST_IDS.collapseBlock.chevron)[0];
      await userEvent.click(chevron2);
      await waitFor(() => expect(block2).toHaveAttribute('data-expanded', 'true'));
      await waitFor(() => expect(block1).toHaveAttribute('data-expanded', 'false'));
    });
  },
};
