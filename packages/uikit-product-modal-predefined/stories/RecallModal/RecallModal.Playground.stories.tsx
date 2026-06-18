import { APPEARANCE, Button, VIEW } from '@ds/button';
import { RecallModal, RecallModalProps, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';

const STORY_TEST_IDS = {
  triggerOpen: 'recall-modal-story__trigger-open',
};

function PlaygroundRender(args: RecallModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>RecallModal</DemoTitle>
        <DemoHint>Preset recall modal from Figma with optional text confirmation.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <Button
              label='Открыть RecallModal'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              onClick={() => setOpen(true)}
              data-test-id={STORY_TEST_IDS.triggerOpen}
            />
          </div>
        </DemoActions>
      </DemoPanel>

      <RecallModal {...args} open={open} onClose={() => setOpen(false)} onRecall={close => close()} />
    </DemoPage>
  );
}

const meta: Meta<RecallModalProps> = {
  title: 'Uikit Product/ModalPredefined/RecallModal',
  component: RecallModal,
  parameters: { layout: 'fullscreen' },
  args: {
    description: 'Действие будет отозвано для всех связанных объектов.',
    confirmable: true,
    confirmText: 'recall-operation-01',
    loading: false,
    'data-test-id': TEST_IDS.recallModal,
  },
};

export default meta;
type Story = StoryObj<RecallModalProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STORY_TEST_IDS.triggerOpen)).toBeVisible();
  },
};
