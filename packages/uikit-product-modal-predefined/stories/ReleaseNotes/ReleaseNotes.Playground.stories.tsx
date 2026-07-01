import { APPEARANCE, Button, VIEW } from '@ds/button';
import { CONTENT_STATE, ReleaseNotes, ReleaseNotesProps, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { RELEASE_NOTES_ITEMS } from '../mockData';
import styles from '../styles.module.scss';

const STORY_TEST_IDS = {
  triggerOpen: 'release-notes-story__trigger-open',
};

function PlaygroundRender(args: ReleaseNotesProps) {
  const [open, setOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>ReleaseNotes</DemoTitle>
        <DemoHint>
          Адаптивный release notes: на desktop — модальное окно, на mobile — bottom sheet. Переключи `layoutType` в
          панели инструментов.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <Button
              label='Открыть ReleaseNotes'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              onClick={() => setOpen(true)}
              data-test-id={STORY_TEST_IDS.triggerOpen}
            />
          </div>
        </DemoActions>
      </DemoPanel>

      <ReleaseNotes {...args} open={open} onClose={() => setOpen(false)} onReadLaterClick={() => setOpen(false)} />
    </DemoPage>
  );
}

const meta: Meta<ReleaseNotesProps> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotes',
  component: ReleaseNotes,
  parameters: { layout: 'fullscreen' },
  args: {
    contentState: CONTENT_STATE.Data,
    items: RELEASE_NOTES_ITEMS,
    loading: false,
    'data-test-id': TEST_IDS.releaseNotes,
  },
  argTypes: {
    contentState: {
      control: 'select',
      options: Object.values(CONTENT_STATE),
    },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onReadLaterClick: { table: { disable: true } },
    onDataErrorRetryClick: { table: { disable: true } },
    onSlideChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<ReleaseNotesProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STORY_TEST_IDS.triggerOpen)).toBeVisible();
  },
};
