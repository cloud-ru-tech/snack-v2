import { APPEARANCE, Button, VIEW } from '@ds/button';
import { DeleteModal, DeleteModalProps, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';

const STORY_TEST_IDS = {
  triggerOpen: 'delete-modal-story__trigger-open',
};

function PlaygroundRender(args: DeleteModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>DeleteModal</DemoTitle>
        <DemoHint>Preset delete modal from Figma. `confirmable` controls the confirmation field.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <Button
              label='Открыть DeleteModal'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              onClick={() => setOpen(true)}
              data-test-id={STORY_TEST_IDS.triggerOpen}
            />
          </div>
        </DemoActions>
      </DemoPanel>

      <DeleteModal {...args} open={open} onClose={() => setOpen(false)} onDelete={close => close()} />
    </DemoPage>
  );
}

const meta: Meta<DeleteModalProps> = {
  title: 'Uikit Product/ModalPredefined/DeleteModal',
  component: DeleteModal,
  parameters: { layout: 'fullscreen' },
  args: {
    objectType: 'виртуальную машину',
    description: 'После удаления восстановить объект будет невозможно.',
    confirmable: true,
    confirmText: 'vm-production-01',
    deleting: false,
    'data-test-id': TEST_IDS.deleteModal,
  },
};

export default meta;
type Story = StoryObj<DeleteModalProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STORY_TEST_IDS.triggerOpen)).toBeVisible();
  },
};
