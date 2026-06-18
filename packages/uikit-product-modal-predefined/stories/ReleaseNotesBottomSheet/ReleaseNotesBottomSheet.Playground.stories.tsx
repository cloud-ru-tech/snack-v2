import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ReleaseNotesBottomSheet, ReleaseNotesBottomSheetProps, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { RELEASE_NOTES_ITEMS } from '../mockData';
import styles from '../styles.module.scss';

const STORY_TEST_IDS = {
  triggerOpen: 'release-notes-bottom-sheet-story__trigger-open',
};

function PlaygroundRender(args: ReleaseNotesBottomSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>ReleaseNotesBottomSheet</DemoTitle>
        <DemoHint>Mobile release notes surface. Use mobile viewport for the closest behavior.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <Button
              label='Открыть ReleaseNotesBottomSheet'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              onClick={() => setOpen(true)}
              data-test-id={STORY_TEST_IDS.triggerOpen}
            />
          </div>
        </DemoActions>
      </DemoPanel>

      <ReleaseNotesBottomSheet {...args} open={open} onClose={() => setOpen(false)} />
    </DemoPage>
  );
}

const meta: Meta<ReleaseNotesBottomSheetProps> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotesBottomSheet',
  component: ReleaseNotesBottomSheet,
  parameters: { layout: 'fullscreen' },
  args: {
    contentState: 'data',
    items: RELEASE_NOTES_ITEMS,
    loading: false,
    'data-test-id': TEST_IDS.releaseNotesBottomSheet,
  },
  argTypes: {
    contentState: {
      control: 'select',
      options: ['data', 'noData', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<ReleaseNotesBottomSheetProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STORY_TEST_IDS.triggerOpen)).toBeVisible();
  },
};
