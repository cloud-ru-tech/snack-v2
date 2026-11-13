import { SELECTION_MODE } from '@ds/accordion';
import { SectionAccordion, SectionAccordionProps } from '@ds/site-section';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { ITEMS, TITLE } from '../fixtures';
import { TEST_IDS } from '../testIds';

type InteractionArgs = Extract<SectionAccordionProps, { selectionMode?: typeof SELECTION_MODE.Multiple }>;

const meta: Meta<InteractionArgs> = {
  title: 'Site/SectionAccordion/Tests/Interaction',
  component: SectionAccordion,
  parameters: { layout: 'fullscreen' },
  args: {
    title: TITLE,
    items: ITEMS.slice(0, 2),
    selectionMode: SELECTION_MODE.Multiple,
    onExpandedChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<InteractionArgs>;

export const InteractionTest: Story = {
  tags: ['dev', 'test'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByTestId(TEST_IDS.item0);
    const second = canvas.getByTestId(TEST_IDS.item1);

    await step('click expands the first item', async () => {
      await userEvent.click(first);
      await waitFor(() => expect(first).toHaveAttribute('data-expanded', 'true'));
      await waitFor(() => expect(args.onExpandedChange).toHaveBeenCalled());
    });

    await step('opening the second item keeps the first open', async () => {
      await userEvent.click(second);
      await waitFor(() => expect(second).toHaveAttribute('data-expanded', 'true'));
      await waitFor(() => expect(first).toHaveAttribute('data-expanded', 'true'));
    });
  },
};
