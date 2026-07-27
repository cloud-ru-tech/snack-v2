import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Modal/Examples/BackButton',
  component: Modal,
  parameters: { layout: 'fullscreen' },
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
    <DemoPage>
      <DemoPanel>
        <DemoTitle>BackButton</DemoTitle>
        <DemoHint>
          Wizard-сценарий с двумя шагами. На втором шаге появляется стрелка «назад» в заголовке модалки.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.modal.triggerOpen}
            label='Open wizard'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <Modal
        data-test-id={TEST_IDS.modal.root}
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
        approveButton={
          step === 'details'
            ? { label: 'Далее', onClick: () => setStep('confirm') }
            : { label: 'Создать', onClick: close }
        }
        cancelButton={{ label: 'Отмена', onClick: close }}
      />
    </DemoPage>
  );
}

export const BackButton: Story = {
  tags: ['dev', 'test'],
  render: () => <BackButtonScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.modal.triggerOpen)).toBeVisible();
  },
};
