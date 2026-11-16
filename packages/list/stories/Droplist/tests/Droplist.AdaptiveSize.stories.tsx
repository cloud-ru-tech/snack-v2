import { Button } from '@ds/button';
import { Droplist, DroplistProps } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { LayoutScope } from '#storybook/components';

const meta: Meta<typeof Droplist> = {
  title: 'Components/List/Droplist/Tests/AdaptiveSize',
  component: Droplist,
  parameters: { controls: { disable: true } },
  args: { items: [{ id: 'size-check', content: { label: 'Item' } }], size: 's' },
};
export default meta;
type Story = StoryObj<typeof Droplist>;

function renderMobile(args: DroplistProps) {
  return (
    <LayoutScope layoutType='mobile'>
      <Droplist {...args}>
        <Button label='Open list' />
      </Droplist>
    </LayoutScope>
  );
}

export const MobileDefault: Story = {
  tags: ['test', 'dev'],
  render: renderMobile,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open list' }));
    const item = await within(canvasElement.ownerDocument.body).findByTestId('list__base-item_size-check');
    expect(item).toHaveAttribute('data-size', 'l');
  },
};

export const MobilePreset: Story = {
  ...MobileDefault,
  args: { layoutPresets: { mobile: { size: 'm' } } },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open list' }));
    const item = await within(canvasElement.ownerDocument.body).findByTestId('list__base-item_size-check');
    expect(item).toHaveAttribute('data-size', 'm');
  },
};
