import { Button } from '@ds/button';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Modal>;

function BackButtonScenario() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'details' | 'confirm'>('details');

  const close = () => {
    setOpen(false);
    setStep('details');
  };

  return (
    <>
      <Button label='Open wizard' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={close}
        title={step === 'details' ? 'Новый проект' : 'Подтверждение'}
        subtitle={step === 'details' ? 'Шаг 1 из 2' : 'Шаг 2 из 2'}
        content={
          step === 'details'
            ? 'Здесь заполняются детали нового проекта.'
            : 'Проверьте введённые данные перед созданием.'
        }
        onBackButtonClick={step === 'confirm' ? () => setStep('details') : undefined}
      />
    </>
  );
}

export const WithBackButton: Story = {
  tags: ['dev'],
  render: () => <BackButtonScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Open wizard' })).toBeVisible();
  },
};
