import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

/**
 * Controlled snap — потребитель сам владеет активным snap'ом через `snapIndex` + `onSnapIndexChange`.
 * Swipe вызывает `onSnapIndexChange`, но позицию двигает не компонент, а потребитель, прокидывая новое
 * значение обратно в `snapIndex`. Кнопки «Peek» / «Full» переключают snap программно.
 */
function ControlledSnapRender() {
  const [open, setOpen] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);
  const [reported, setReported] = useState<number | null>(null);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Controlled snap</DemoTitle>
        <DemoHint>
          Активный snap — во внешнем <code>useState</code>. Swipe зовёт <code>onSnapIndexChange</code>, потребитель
          прокидывает значение обратно в <code>snapIndex</code>.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        container={portalRoot.current || undefined}
        snapPoints={[0.5, 1]}
        snapIndex={snapIndex}
        onSnapIndexChange={index => {
          setReported(index);
          setSnapIndex(index);
        }}
        title='Controlled snap'
        content={
          <div>
            <DemoActions align='start'>
              <Button
                data-test-id={TEST_IDS.controlledSnap.toPeek}
                label='Peek (0.5)'
                size='s'
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
                onClick={() => setSnapIndex(0)}
              />
              <Button
                data-test-id={TEST_IDS.controlledSnap.toFull}
                label='Full (1)'
                size='s'
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
                onClick={() => setSnapIndex(1)}
              />
            </DemoActions>
            <p data-test-id={TEST_IDS.controlledSnap.reported}>
              onSnapIndexChange: {reported === null ? '—' : reported}
            </p>
            {Array.from({ length: 24 }).map((_, i) => (
              <p key={i}>Параграф {i + 1}. Контент для прокрутки и переключения снапов.</p>
            ))}
          </div>
        }
      />
    </DemoPage>
  );
}

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet/Examples/ControlledSnap',
  globals: { density: 'comfort' },
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const ControlledSnap: Story = {
  // Без play: эта story используется как сцена в swipe.spec (controlled swipe + программный переход).
  // Storybook авто-запускает play при загрузке canvas'а — он бы открыл sheet и перекрыл триггер e2e.
  tags: ['dev', 'test'],
  render: () => <ControlledSnapRender />,
};
