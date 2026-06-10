import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

function ScrollableRender() {
  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Scrollable</DemoTitle>
        <DemoHint>
          Body скроллится; header и footer остаются sticky. <code>withDividers</code> рисует разделители.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть scrollable'
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
        title='Scrollable content'
        withDividers
        content={
          <div>
            {Array.from({ length: 30 }).map((_, i) => (
              <p key={i}>Параграф {i + 1}. Body скроллится, header и footer остаются sticky.</p>
            ))}
          </div>
        }
        approveButton={{ label: 'Закрыть', onClick: () => setOpen(false) }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet/Examples/Scrollable',
  globals: { density: 'comfort' },
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Scrollable: Story = {
  tags: ['dev', 'test'],
  render: () => <ScrollableRender />,
};
