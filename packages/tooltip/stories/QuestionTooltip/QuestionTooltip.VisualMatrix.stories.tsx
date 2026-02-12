import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { PLACEMENT, QuestionTooltip, type QuestionTooltipProps, TRIGGER } from '../../src';

const meta: Meta<QuestionTooltipProps> = {
  title: 'Components/Tooltip/QuestionTooltip',
  component: QuestionTooltip,
};

export default meta;
type Story = StoryObj<QuestionTooltipProps>;

const keyPlacements = [PLACEMENT.Top, PLACEMENT.Bottom, PLACEMENT.Left, PLACEMENT.Right];
const keyTriggers = [TRIGGER.HoverAndFocusVisible, TRIGGER.Click];

export const VisualMatrix: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <StoryTable
      sectionTitle='Trigger × Placement'
      firstColumnHeader='Trigger'
      columnHeaders={keyPlacements.map(p => p)}
      rows={keyTriggers.map(trigger => ({
        variantLabel: trigger,
        cells: keyPlacements.map(placement => (
          <QuestionTooltip
            key={`${trigger}-${placement}`}
            content={placement}
            placement={placement}
            trigger={trigger}
          />
        )),
      }))}
    />
  ),
};
