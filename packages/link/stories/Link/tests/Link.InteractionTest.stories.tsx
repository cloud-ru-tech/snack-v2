import { Link } from '@ds/link';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Link> = {
  title: 'Components/Link/Tests/Interaction',
  component: Link,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    label: 'Click me',
    href: 'https://example.com',
    onClick: fn(e => e.preventDefault()),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Click + Tab + Enter — onClick срабатывает.</DemoHint>
        <DemoActions align='center'>
          <Link {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByTestId(TEST_IDS.root);

    await step('click: anchor fires onClick once', async () => {
      await userEvent.click(link);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Tab focuses anchor', async () => {
      link.blur();
      await userEvent.tab();
      await expect(link).toHaveFocus();
    });

    await step('keyboard: Enter on focused anchor fires onClick', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  },
};
