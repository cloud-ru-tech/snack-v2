import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Accordion } from '../../../src';
import { SELECTION_MODE } from '../../../src/constants';
import styles from '../../styles.module.scss';
import { TEST_IDS } from '../../testIds';

type ControlledProps = {
  onExpandedChange?(value: string[]): void;
};

function ControlledAccordion({ onExpandedChange }: ControlledProps) {
  const [expanded, setExpanded] = useState<string[]>([]);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Controlled</DemoTitle>
        <DemoHint>{'Controlled Accordion — состояние expanded хранится в родительском state.'}</DemoHint>
        <div className={styles.story}>
          <Accordion
            selectionMode={SELECTION_MODE.Multiple}
            expanded={expanded}
            onExpandedChange={next => {
              const arr = next ?? [];
              setExpanded(arr);
              onExpandedChange?.(arr);
            }}
          >
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
  );
}

const meta: Meta<typeof ControlledAccordion> = {
  title: 'Components/Accordion/Accordion/Tests/Controlled',
  component: ControlledAccordion,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onExpandedChange: fn() },
};

export default meta;
type Story = StoryObj<typeof ControlledAccordion>;

export const Controlled: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const block1 = canvas.getByTestId(TEST_IDS.accordion.block1);
    const block2 = canvas.getByTestId(TEST_IDS.accordion.block2);

    await step('click block-1: callback fires, parent state -> ["block-1"], DOM expanded', async () => {
      const chevron1 = within(block1).getAllByTestId(TEST_IDS.collapseBlock.chevron)[0];
      await userEvent.click(chevron1);
      await waitFor(() => expect(args.onExpandedChange).toHaveBeenCalled());
      expect(args.onExpandedChange).toHaveBeenLastCalledWith(['block-1']);
      await waitFor(() => expect(block1).toHaveAttribute('data-expanded', 'true'));
    });

    await step('click block-2: both expanded in controlled state', async () => {
      const chevron2 = within(block2).getAllByTestId(TEST_IDS.collapseBlock.chevron)[0];
      await userEvent.click(chevron2);
      await waitFor(() => expect(block2).toHaveAttribute('data-expanded', 'true'));
      await waitFor(() => expect(block1).toHaveAttribute('data-expanded', 'true'));
      expect(args.onExpandedChange).toHaveBeenLastCalledWith(['block-1', 'block-2']);
    });
  },
};
