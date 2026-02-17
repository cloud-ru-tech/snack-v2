import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import readme from '../../README.md?raw';
import { PLACEMENT, Tooltip, type TooltipProps, TRIGGER } from '../../src';

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
  parameters: {
    readme: { content: readme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3182-9180',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipProps>;

const keyPlacements = [PLACEMENT.Top, PLACEMENT.Bottom, PLACEMENT.Left, PLACEMENT.Right];
const keyTriggers = [TRIGGER.HoverAndFocusVisible, TRIGGER.Click];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Trigger × Placement'
      firstColumnHeader='Trigger'
      columnHeaders={keyPlacements.map(p => p)}
      rows={keyTriggers.map(trigger => ({
        variantLabel: trigger,
        cells: keyPlacements.map(placement => (
          <Tooltip key={`${trigger}-${placement}`} tip={placement} placement={placement} trigger={trigger}>
            <button type='button'>{placement}</button>
          </Tooltip>
        )),
      }))}
    />
  ),
};
