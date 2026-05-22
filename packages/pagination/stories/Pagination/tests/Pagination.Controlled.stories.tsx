import { Pagination } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { getPageNumberTestId, TEST_IDS } from '../../testIds';

const PARENT_STATE_TEST_ID = 'pagination-parent-state';

function ControlledRender() {
  const [page, setPage] = useState(1);
  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Controlled</DemoTitle>
        <DemoHint>{'Внешний state контролирует страницу; клики по нумерации синхронизируются с родителем.'}</DemoHint>
        <DemoActions align='center'>
          <div data-test-id={PARENT_STATE_TEST_ID}>{page}</div>
          <Pagination data-test-id={TEST_IDS.pagination.root} total={10} page={page} maxLength={7} onChange={setPage} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Pagination/Tests/Controlled',
  component: Pagination,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <ControlledRender />,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Controlled: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const parentState = canvas.getByTestId(PARENT_STATE_TEST_ID);

    await step('initial: parent state shows page 1', async () => {
      expect(parentState.textContent).toBe('1');
    });

    await step('click: page button "3" updates parent state to 3', async () => {
      await userEvent.click(canvas.getByTestId(getPageNumberTestId(3)));
      await waitFor(() => expect(parentState.textContent).toBe('3'));
    });

    await step('active: page 3 button reflects active state', async () => {
      const active = canvas.getByTestId(getPageNumberTestId(3));
      await waitFor(() => expect(active).toHaveAttribute('aria-current', 'page'));
    });

    await step('click: next button advances parent state to 4', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.pagination.next));
      await waitFor(() => expect(parentState.textContent).toBe('4'));
    });
  },
};
