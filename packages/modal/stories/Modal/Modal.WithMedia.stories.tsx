import { Button } from '@ds/button';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { MODAL_TEST_ID, MODAL_TRIGGER_TEST_ID } from './testIds';

type ScenarioArgs = { open: boolean };

function WithMediaRender(args: ScenarioArgs) {
  const [{ open }, updateArgs] = useArgs<ScenarioArgs>();
  const openModal = () => updateArgs({ open: true });
  const closeModal = () => updateArgs({ open: false });

  return (
    <>
      <Button
        data-test-id={MODAL_TRIGGER_TEST_ID}
        label='Open welcome modal'
        appearance='primary'
        view='filled'
        onClick={openModal}
      />
      <Modal
        data-test-id={MODAL_TEST_ID}
        open={args.open ?? open}
        onClose={closeModal}
        width='m'
        media={<div className={styles.image}>Media slot — место под иллюстрацию</div>}
        title='Добро пожаловать'
        subtitle='Кратко о том, что изменилось в этой версии.'
        content='Список ключевых улучшений и ссылки на подробности могут размещаться в теле.'
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

export const WithMedia: Story = {
  tags: ['dev'],
  args: { open: false },
  render: WithMediaRender,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(MODAL_TRIGGER_TEST_ID)).toBeVisible();
  },
};
