import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

function WithSubHeadlineRender() {
  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>WithSubHeadline</DemoTitle>
        <DemoHint>
          Sticky-зона под заголовком для поиска/фильтров. В продакшене сюда монтируется SearchBar или SegmentControl.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть с subHeadline'
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
        title='Filters'
        subtitle={<div data-test-id={TEST_IDS.exampleContent}>SearchBar / SegmentControl placeholder</div>}
        content={<p>SubHeadline располагается под заголовком — sticky-зона для поиска/фильтров.</p>}
        approveButton={{ label: 'Применить', onClick: () => setOpen(false) }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet/Examples/WithSubHeadline',
  globals: { density: 'comfort' },
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const WithSubHeadline: Story = {
  tags: ['dev', 'test'],
  render: () => <WithSubHeadlineRender />,
};
