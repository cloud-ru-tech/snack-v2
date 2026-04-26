import { Button } from '@ds/button';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { MODAL_TEST_ID, MODAL_TRIGGER_TEST_ID } from './testIds';

type ScenarioArgs = { open: boolean };

function LoadingRender(args: ScenarioArgs) {
  const [{ open }, updateArgs] = useArgs<ScenarioArgs>();
  const openModal = () => updateArgs({ open: true });
  const closeModal = () => updateArgs({ open: false });

  return (
    <>
      <Button
        data-test-id={MODAL_TRIGGER_TEST_ID}
        label='Open loading modal'
        appearance='primary'
        view='filled'
        onClick={openModal}
      />
      <Modal
        data-test-id={MODAL_TEST_ID}
        open={args.open ?? open}
        onClose={closeModal}
        title='Сохранение изменений'
        subtitle='Пожалуйста, подождите'
        content='Основной контент тела модалки'
        loading
      />
    </>
  );
}

function LoadingCustomStateRender(args: ScenarioArgs) {
  const [{ open }, updateArgs] = useArgs<ScenarioArgs>();
  const openModal = () => updateArgs({ open: true });
  const closeModal = () => updateArgs({ open: false });

  return (
    <>
      <Button
        data-test-id='modal-custom-loading-trigger'
        label='Open modal with custom loading state'
        appearance='primary'
        view='filled'
        onClick={openModal}
      />
      <Modal
        data-test-id={MODAL_TEST_ID}
        open={args.open ?? open}
        onClose={closeModal}
        title='Импорт данных'
        content='Основной контент'
        loading
        loadingState={<p>Обрабатываем файл, это может занять до минуты.</p>}
      />
    </>
  );
}

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<ScenarioArgs>;

export const Loading: Story = {
  tags: ['dev'],
  args: { open: false },
  render: LoadingRender,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(MODAL_TRIGGER_TEST_ID)).toBeVisible();
  },
};

export const LoadingCustomState: Story = {
  tags: ['dev'],
  args: { open: false },
  render: LoadingCustomStateRender,
};
