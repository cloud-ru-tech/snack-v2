import { Button } from '@ds/button';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

type ScenarioArgs = { open: boolean };

function WithMediaRender(args: ScenarioArgs) {
  const [{ open }, updateArgs] = useArgs<ScenarioArgs>();
  const openModal = () => updateArgs({ open: true });
  const closeModal = () => updateArgs({ open: false });

  return (
    <>
      <Button label='Open welcome modal' appearance='primary' view='filled' onClick={openModal} />
      <Modal
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
  title: 'Components/Modal',
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
    await expect(within(canvasElement).getByRole('button', { name: 'Open welcome modal' })).toBeVisible();
  },
};
