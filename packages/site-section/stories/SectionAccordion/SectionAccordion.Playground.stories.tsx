import { SELECTION_MODE } from '@ds/accordion';
import { SectionAccordion } from '@ds/site-section';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { ITEMS, TITLE } from './fixtures';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof SectionAccordion> = {
  title: 'Site/SectionAccordion',
  component: SectionAccordion,
  parameters: { layout: 'fullscreen' },
  args: {
    title: TITLE,
    items: ITEMS,
    selectionMode: SELECTION_MODE.Multiple,
    expandedDefault: [`accordion-item-${ITEMS[0].title}-0`],
    onExpandedChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof SectionAccordion>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <SectionAccordion {...args} />
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.item0)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.item0)).toHaveAttribute('data-expanded', 'true');
  },
};
