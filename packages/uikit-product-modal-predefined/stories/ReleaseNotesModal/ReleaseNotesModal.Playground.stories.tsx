import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ReleaseNotesModal, ReleaseNotesModalProps, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { RELEASE_NOTES_ITEMS } from '../mockData';
import styles from '../styles.module.scss';

const STORY_TEST_IDS = {
  triggerOpen: 'release-notes-modal-story__trigger-open',
};

function PlaygroundRender(args: ReleaseNotesModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>ReleaseNotesModal</DemoTitle>
        <DemoHint>Desktop release notes preset. Use `contentState` to switch Figma states.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <Button
              label='Открыть ReleaseNotesModal'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              onClick={() => setOpen(true)}
              data-test-id={STORY_TEST_IDS.triggerOpen}
            />
          </div>
        </DemoActions>
      </DemoPanel>

      <ReleaseNotesModal {...args} open={open} onClose={() => setOpen(false)} />
    </DemoPage>
  );
}

const meta: Meta<ReleaseNotesModalProps> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotesModal',
  component: ReleaseNotesModal,
  parameters: { layout: 'fullscreen' },
  args: {
    contentState: 'data',
    items: RELEASE_NOTES_ITEMS,
    loading: false,
    'data-test-id': TEST_IDS.releaseNotesModal,
  },
  argTypes: {
    contentState: {
      control: 'select',
      options: ['data', 'noData', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<ReleaseNotesModalProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STORY_TEST_IDS.triggerOpen)).toBeVisible();
  },
};
