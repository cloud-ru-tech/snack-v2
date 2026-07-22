import { BottomSheet, MEDIA_KIND } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, placeholderImage } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const MEDIA_SRC = placeholderImage(360, 184, 'Media');

function WithMediaRender() {
  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>WithMedia</DemoTitle>
        <DemoHint>
          Media-блок (<code>kind=image</code>) full-bleed, прижат к шапке. Горизонтальные паддинги body не меняются (для
          edge-to-edge — <code>bodyPadding={false}</code>).
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть с media'
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
        title='Bottom-sheet with media'
        media={{
          src: MEDIA_SRC,
          alt: 'Media',
          kind: MEDIA_KIND.Image,
        }}
        content={<p>Media-блок full-bleed, прижат к шапке. bodyPadding управляет паддингами body отдельно.</p>}
        approveButton={{ label: 'Подтвердить', onClick: () => setOpen(false) }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet/Examples/WithMedia',
  globals: { density: 'comfort' },
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const WithMedia: Story = {
  tags: ['dev', 'test'],
  render: () => <WithMediaRender />,
};
