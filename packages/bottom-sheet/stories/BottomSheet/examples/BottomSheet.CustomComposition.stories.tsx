import { BottomSheetCustom } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

function CustomCompositionRender() {
  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>CustomComposition</DemoTitle>
        <DemoHint>
          <code>BottomSheetCustom</code> + namespace-слоты <code>.Header / .Body / .Footer</code>. Handle / media —
          ручные, если нужны.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть Custom'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>

      {/* Low-level BottomSheetCustom не знает про title-слот → accessible name задаём aria-label сами. */}
      <BottomSheetCustom
        open={open}
        onClose={() => setOpen(false)}
        container={portalRoot.current || undefined}
        aria-label='Custom composition'
      >
        <BottomSheetCustom.Header title='Custom composition' slotAfterTitle={<span>NEW</span>} />
        <BottomSheetCustom.Body>
          <p>Свободный JSX внутри Body. Можно вставить любой контент между Header и Footer.</p>
        </BottomSheetCustom.Body>
        <BottomSheetCustom.Footer>
          <Button
            fullWidth
            view={VIEW.Filled}
            appearance={APPEARANCE.Primary}
            label='Готово'
            onClick={() => setOpen(false)}
          />
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </DemoPage>
  );
}

const meta: Meta<typeof BottomSheetCustom> = {
  title: 'Components/BottomSheet/Examples/CustomComposition',
  globals: { density: 'comfort' },
  component: BottomSheetCustom,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof BottomSheetCustom>;

export const CustomComposition: Story = {
  tags: ['dev', 'test'],
  render: () => <CustomCompositionRender />,
};
