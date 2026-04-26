import { Button, ButtonGroup } from '@ds/button';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

type ScenarioArgs = { open: boolean };

function WithFooterRender(args: ScenarioArgs) {
  const [{ open }, updateArgs] = useArgs<ScenarioArgs>();
  const openModal = () => updateArgs({ open: true });
  const closeModal = () => updateArgs({ open: false });

  return (
    <>
      <Button label='Open confirm dialog' appearance='primary' view='filled' onClick={openModal} />
      <Modal
        open={args.open ?? open}
        onClose={closeModal}
        title='Удалить запись'
        subtitle='Действие необратимо. Связанные данные также будут удалены.'
        content='После подтверждения запись и все её ссылки исчезнут из списка.'
        footer={
          <ButtonGroup
            className={styles.footerGroup}
            primaryAction={{
              label: 'Удалить',
              appearance: 'critical',
              view: 'filled',
              onClick: closeModal,
            }}
            secondaryAction={{
              label: 'Отмена',
              appearance: 'neutral',
              view: 'outline',
              onClick: closeModal,
            }}
          />
        }
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

export const WithFooter: Story = {
  tags: ['dev'],
  args: { open: false },
  render: WithFooterRender,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Open confirm dialog' })).toBeVisible();
  },
};
