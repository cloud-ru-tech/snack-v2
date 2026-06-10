import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

/**
 * Expandable bottom-sheet — снап-точки `[0.5, 1]`: открывается на половину viewport'а,
 * drag вверх раскрывает на full-screen, drag вниз ниже первого snap'а закрывает.
 */
function ExpandableRender() {
  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Expandable</DemoTitle>
        <DemoHint>
          Snap-points <code>[0.5, 1]</code>. Drag за handle вверх — раскрывает; вниз ниже половины — закрывает.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть Expandable'
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
        defaultSnapIndex={0}
        title='Expandable bottom-sheet'
        content={
          <div>
            {Array.from({ length: 30 }).map((_, i) => (
              <p key={i}>Параграф {i + 1}. Длинный контент для демонстрации snap-points поведения.</p>
            ))}
          </div>
        }
        approveButton={{ label: 'Закрыть', onClick: () => setOpen(false) }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet/Examples/Expandable',
  globals: { density: 'comfort' },
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Expandable: Story = {
  tags: ['dev', 'test'],
  render: () => <ExpandableRender />,
};
