import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ReleaseNotes, ReleaseNotesContentState, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import { RELEASE_NOTES_ITEMS } from '../mockData';
import styles from '../styles.module.scss';

const VM_TRIGGER_TEST_ID = (state: string) => `release-notes-vm__${state}`;

type State = 'data' | 'one' | 'noData' | 'error' | 'loading';

const STATE_TO_CONTENT_STATE: Record<State, ReleaseNotesContentState> = {
  data: 'data',
  one: 'data',
  noData: 'noData',
  error: 'error',
  loading: 'data',
};

// Surface-swap компонент: VM снимает desktop-поверхность (модальное окно). Mobile-поверхность (bottom sheet) —
// в visual.spec с toolbar-global layoutType='mobile'. См. adaptive-components.md §«Стори / e2e / доки».
function VisualMatrixCanvas() {
  const [active, setActive] = useState<State | null>(null);
  const close = () => setActive(null);

  return (
    <div className={styles.panel}>
      <StoryTable
        sectionTitle='contentState'
        firstColumnHeader='state'
        columnHeaders={['data', 'one item', 'noData', 'error', 'loading']}
        rows={[
          {
            variantLabel: 'release notes',
            cells: (['data', 'one', 'noData', 'error', 'loading'] as const).map(state => (
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
        <ReleaseNotes
          open
          onClose={close}
          contentState={STATE_TO_CONTENT_STATE[active]}
          loading={active === 'loading'}
          items={active === 'one' ? RELEASE_NOTES_ITEMS.slice(0, 1) : RELEASE_NOTES_ITEMS}
          data-test-id={TEST_IDS.releaseNotes}
        />
      )}
    </div>
  );
}

const meta: Meta<typeof VisualMatrixCanvas> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotes',
  component: VisualMatrixCanvas,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof VisualMatrixCanvas>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
};
