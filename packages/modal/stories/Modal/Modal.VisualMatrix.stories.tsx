import { APPEARANCE, Button, ButtonGroup, VIEW } from '@ds/button';
import { Modal, ModalMode, ModalWidth, MODE, WIDTH } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle, StoryTable } from '#storybook/components';

import { VM_DISMISS_TEST_ID, VM_TRIGGER_TEST_ID } from '../testIds';

type Combo = { key: string; mode: ModalMode; width: ModalWidth };

const MODES: ModalMode[] = [MODE.Regular, MODE.Aggressive, MODE.Forced];
const WIDTHS: ModalWidth[] = [WIDTH.S, WIDTH.M, WIDTH.L];

const comboKey = (mode: ModalMode, width: ModalWidth) => `${mode}-${width}`;

function VisualMatrixCanvas() {
  const [active, setActive] = useState<Combo | null>(null);
  const close = () => setActive(null);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Visual matrix</DemoTitle>
        <DemoHint>
          Каждая ячейка — триггер Modal в комбинации <code>mode × width</code>. Снимки собираются visual.spec&apos;ом:
          клик → screenshot → закрыть → следующий.
        </DemoHint>
        <StoryTable
          firstColumnHeader='mode \ width'
          columnHeaders={WIDTHS.map(w => w.toUpperCase())}
          rows={MODES.map(mode => ({
            variantLabel: mode,
            cells: WIDTHS.map(width => {
              const key = comboKey(mode, width);
              return (
                <Button
                  key={key}
                  data-test-id={VM_TRIGGER_TEST_ID(key)}
                  label={`${mode} · ${width}`}
                  view={VIEW.Outline}
                  appearance={APPEARANCE.Neutral}
                  onClick={() => setActive({ key, mode, width })}
                />
              );
            }),
          }))}
        />
      </DemoPanel>
      {active && (
        <Modal
          key={active.key}
          open
          onClose={close}
          mode={active.mode}
          width={active.width}
          title={`${active.mode} · ${active.width}`}
          subtitle={`mode=${active.mode} width=${active.width}`}
          content='Содержимое модального окна.'
          footer={
            <ButtonGroup
              primaryAction={{
                label: 'Закрыть',
                view: 'filled',
                appearance: 'neutral',
                'data-test-id': VM_DISMISS_TEST_ID,
                onClick: close,
              }}
            />
          }
        />
      )}
    </DemoPage>
  );
}

const meta: Meta<typeof VisualMatrixCanvas> = {
  title: 'Components/Modal/Modal',
  component: VisualMatrixCanvas,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj<typeof VisualMatrixCanvas>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
};
