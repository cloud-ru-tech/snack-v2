import { AiButtonControls, DIRECTION } from '@ds/ai-button-controls';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiButtonControls> = {
  title: 'AI/AiButtonControls',
  component: AiButtonControls,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiButtonControls>;

const directions = Object.values(DIRECTION);

const states = [
  { key: 'default', disabled: false },
  { key: 'disabled', disabled: true },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='State × Direction'
      firstColumnHeader='State'
      columnHeaders={directions.map(direction => direction.toUpperCase())}
      rows={states.map(({ key, disabled }) => ({
        variantLabel: key,
        cells: directions.map(direction => (
          <AiButtonControls
            key={direction}
            direction={direction}
            disabled={disabled}
            data-test-id={`${TEST_IDS.root}-${key}-${direction}`}
          />
        )),
      }))}
    />
  ),
};
