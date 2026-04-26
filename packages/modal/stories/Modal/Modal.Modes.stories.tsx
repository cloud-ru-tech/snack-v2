import { Button, ButtonGroup } from '@ds/button';
import { Modal, ModalMode, MODE } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const MODE_SUBTITLE: Record<ModalMode, string> = {
  [MODE.Regular]: 'Закрытие по Esc, клику по overlay и кнопке.',
  [MODE.Aggressive]: 'Только кнопка закрытия. Подложка с размытием.',
  [MODE.Forced]: 'Без кнопки и без Esc/overlay — закрыть только из футера.',
};

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
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
      <Button label='Regular' view='outline' appearance='neutral' onClick={() => setActiveMode(MODE.Regular)} />
      <Button label='Aggressive' view='outline' appearance='neutral' onClick={() => setActiveMode(MODE.Aggressive)} />
      <Button label='Forced' view='outline' appearance='neutral' onClick={() => setActiveMode(MODE.Forced)} />

      {activeMode && (
        <Modal
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
    await expect(within(canvasElement).getByRole('button', { name: 'Regular' })).toBeVisible();
  },
};
