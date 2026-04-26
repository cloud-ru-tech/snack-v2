import { Button, ButtonGroup } from '@ds/button';
import { Modal, ModalMode, MODE } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { MODAL_TEST_ID } from './testIds';

const MODE_SUBTITLE: Record<ModalMode, string> = {
  [MODE.Regular]: 'Закрытие по Esc, клику по overlay и кнопке.',
  [MODE.Aggressive]: 'Только кнопка закрытия. Подложка с размытием.',
  [MODE.Forced]: 'Без кнопки и без Esc/overlay — закрыть только из футера.',
};

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Modal>;

function ModeDemo() {
  const [activeMode, setActiveMode] = useState<ModalMode | null>(null);
  const close = () => setActiveMode(null);

  return (
    <div className={styles.scenarioRoot}>
      <Button
        data-test-id='modal-trigger-regular'
        label='Regular'
        view='outline'
        appearance='neutral'
        onClick={() => setActiveMode(MODE.Regular)}
      />
      <Button
        data-test-id='modal-trigger-aggressive'
        label='Aggressive'
        view='outline'
        appearance='neutral'
        onClick={() => setActiveMode(MODE.Aggressive)}
      />
      <Button
        data-test-id='modal-trigger-forced'
        label='Forced'
        view='outline'
        appearance='neutral'
        onClick={() => setActiveMode(MODE.Forced)}
      />

      {activeMode && (
        <Modal
          data-test-id={MODAL_TEST_ID}
          open
          onClose={close}
          mode={activeMode}
          title={`Режим: ${activeMode}`}
          subtitle={MODE_SUBTITLE[activeMode]}
          content='Выберите один из трёх режимов закрытия, чтобы сравнить поведение.'
          footer={
            activeMode === MODE.Forced ? (
              <ButtonGroup
                className={styles.footerGroup}
                primaryAction={{ label: 'Завершить', view: 'filled', onClick: close }}
              />
            ) : undefined
          }
        />
      )}
    </div>
  );
}

export const Modes: Story = {
  tags: ['dev'],
  render: () => <ModeDemo />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('modal-trigger-regular')).toBeVisible();
  },
};
