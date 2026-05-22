import { APPEARANCE, Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Tag/Examples/Removable',
  component: Tag,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Removable: Story = {
  tags: ['dev', 'test'],
  args: { onDelete: fn() },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Removable</DemoTitle>
        <DemoHint>Тег с кнопкой удаления — onDelete срабатывает по клику на крестик.</DemoHint>
        <DemoActions align='center'>
          <Tag label='Удаляемый тег' onDelete={args.onDelete} data-test-id={TEST_IDS.tag.removableNeutral} />
          <Tag
            appearance={APPEARANCE.Primary}
            label='Primary removable'
            onDelete={args.onDelete}
            data-test-id={TEST_IDS.tag.removablePrimary}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Click first remove', async () => {
      const firstRemoveButton = within(canvas.getByTestId(TEST_IDS.tag.removableNeutral)).getByTestId(
        TEST_IDS.tag.removeButton,
      );
      await userEvent.click(firstRemoveButton);
    });
    await step('onDelete fires', async () => {
      expect(args.onDelete).toHaveBeenCalled();
    });
  },
};
