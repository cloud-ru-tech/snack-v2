import { APPEARANCE, Button, ButtonGroup, VIEW } from '@ds/button';
import { Modal, ModalMode, MODE } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle, StoryTable } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const MODE_SUBTITLE: Record<ModalMode, string> = {
  [MODE.Regular]: 'Закрытие по Esc, клику по overlay и кнопке.',
  [MODE.Aggressive]: 'Только кнопка закрытия. Подложка с размытием.',
  [MODE.Forced]: 'Без кнопки и без Esc/overlay — закрыть только из футера.',
};

const MODES: ModalMode[] = [MODE.Regular, MODE.Aggressive, MODE.Forced];

const triggerTestId = (mode: ModalMode) => `modal-trigger-${mode}`;
const DISMISS_TEST_ID = 'modal-modes-dismiss';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Modal/Examples/Modes',
  component: Modal,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Modal>;

function ModeDemo() {
  const [activeMode, setActiveMode] = useState<ModalMode | null>(null);
  const close = () => setActiveMode(null);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Modes</DemoTitle>
        <DemoHint>
          Три режима закрытия: <code>regular</code> (overlay + Esc + кнопка), <code>aggressive</code> (только кнопка),
          <code>forced</code> (только action в футере).
        </DemoHint>
        <StoryTable
          firstColumnHeader='mode'
          columnHeaders={['trigger']}
          rows={MODES.map(mode => ({
            variantLabel: mode,
            cells: [
              <Button
                key={mode}
                data-test-id={triggerTestId(mode)}
                label={mode}
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
                onClick={() => setActiveMode(mode)}
              />,
            ],
          }))}
        />
      </DemoPanel>

      {activeMode && (
        <Modal
          data-test-id={TEST_IDS.modal.root}
          open
          onClose={close}
          mode={activeMode}
          title={`Режим: ${activeMode}`}
          subtitle={MODE_SUBTITLE[activeMode]}
          content='Выберите один из трёх режимов закрытия, чтобы сравнить поведение.'
          footer={
            <ButtonGroup
              primaryAction={{
                label: 'Закрыть',
                view: 'filled',
                appearance: 'neutral',
                'data-test-id': DISMISS_TEST_ID,
                onClick: close,
              }}
            />
          }
        />
      )}
    </DemoPage>
  );
}

export const Modes: Story = {
  tags: ['dev', 'test'],
  render: () => <ModeDemo />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(triggerTestId(MODE.Regular))).toBeVisible();
  },
};
