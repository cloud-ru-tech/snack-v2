import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ReleaseNotesBottomSheet, ReleaseNotesContentState } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import { RELEASE_NOTES_ITEMS } from '../mockData';
import styles from '../styles.module.scss';

const VM_TRIGGER_TEST_ID = (state: string) => `release-notes-bottom-sheet-vm__${state}`;

type State = 'data' | 'noData' | 'error';

const STATE_TO_CONTENT_STATE: Record<State, ReleaseNotesContentState> = {
  data: 'data',
  noData: 'noData',
  error: 'error',
};

function VisualMatrixCanvas() {
  const [active, setActive] = useState<State | null>(null);
  const close = () => setActive(null);

  return (
    <div className={styles.panel}>
      <StoryTable
        sectionTitle='contentState'
        firstColumnHeader='surface'
        columnHeaders={['data', 'noData', 'error']}
        rows={[
          {
            variantLabel: 'bottom sheet',
            cells: (['data', 'noData', 'error'] as const).map(state => (
              <Button
                key={state}
                label={state}
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
                onClick={() => setActive(state)}
                data-test-id={VM_TRIGGER_TEST_ID(state)}
              />
            )),
          },
        ]}
      />

      {active && (
        <ReleaseNotesBottomSheet
          open
          onClose={close}
          contentState={STATE_TO_CONTENT_STATE[active]}
          items={RELEASE_NOTES_ITEMS}
        />
      )}
    </div>
  );
}

const meta: Meta<typeof VisualMatrixCanvas> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotesBottomSheet',
  component: VisualMatrixCanvas,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof VisualMatrixCanvas>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
};
