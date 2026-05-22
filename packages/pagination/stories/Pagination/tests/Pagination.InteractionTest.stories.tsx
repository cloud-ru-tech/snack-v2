import { Pagination } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { getPageNumberTestId, TEST_IDS } from '../../testIds';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Pagination/Tests/Interaction',
  component: Pagination,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    total: 10,
    page: 3,
    maxLength: 7,
    onChange: fn(),
    'data-test-id': TEST_IDS.pagination.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>{'Клики по номерам и стрелкам вызывают onChange с целевой страницей.'}</DemoHint>
        <DemoActions align='center'>
          <Pagination {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: page number "5" calls onChange(5)', async () => {
      const pageFive = canvas.getByTestId(getPageNumberTestId(5));
      await userEvent.click(pageFive);
      expect(args.onChange).toHaveBeenCalled();
      const firstCallPage = (args.onChange as ReturnType<typeof fn>).mock.calls[0][0];
      expect(firstCallPage).toBe(5);
    });

    await step('click: next button calls onChange(page+1)', async () => {
      (args.onChange as ReturnType<typeof fn>).mockClear();
      const next = canvas.getByTestId(TEST_IDS.pagination.next);
      await userEvent.click(next);
      const callPage = (args.onChange as ReturnType<typeof fn>).mock.calls[0][0];
      expect(callPage).toBe(4);
    });

    await step('click: prev button calls onChange(page-1)', async () => {
      (args.onChange as ReturnType<typeof fn>).mockClear();
      const prev = canvas.getByTestId(TEST_IDS.pagination.prev);
      await userEvent.click(prev);
      const callPage = (args.onChange as ReturnType<typeof fn>).mock.calls[0][0];
      expect(callPage).toBe(2);
    });
  },
};

export const EdgeAtLastPage: Story = {
  tags: ['test', 'dev'],
  args: { page: 10, total: 10, onChange: fn(), 'data-test-id': TEST_IDS.pagination.root },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('next button on last page is disabled and does not fire', async () => {
      const next = canvas.getByTestId(TEST_IDS.pagination.next);
      expect(next).toBeDisabled();
      await userEvent.click(next).catch(() => undefined);
      expect(args.onChange).not.toHaveBeenCalled();
    });
  },
};

export const EdgeAtFirstPage: Story = {
  tags: ['test', 'dev'],
  args: { page: 1, total: 10, onChange: fn(), 'data-test-id': TEST_IDS.pagination.root },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('prev button on first page is disabled and does not fire', async () => {
      const prev = canvas.getByTestId(TEST_IDS.pagination.prev);
      expect(prev).toBeDisabled();
      await userEvent.click(prev).catch(() => undefined);
      expect(args.onChange).not.toHaveBeenCalled();
    });
  },
};
