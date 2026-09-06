import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ReleaseNotes, ReleaseNotesContentState, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import { RELEASE_NOTES_ITEMS, RELEASE_NOTES_ITEMS_BROKEN_IMAGE } from '../mockData';
import styles from '../styles.module.scss';

const VM_TRIGGER_TEST_ID = (state: string) => `release-notes-vm__${state}`;

const STATES = ['data', 'one', 'mediaError', 'noData', 'error', 'loading'] as const;

type State = (typeof STATES)[number];

const STATE_TO_CONTENT_STATE: Record<State, ReleaseNotesContentState> = {
  data: 'data',
  one: 'data',
  mediaError: 'data',
  noData: 'noData',
  error: 'error',
  loading: 'data',
};

const STATE_TO_ITEMS: Record<State, typeof RELEASE_NOTES_ITEMS> = {
  data: RELEASE_NOTES_ITEMS,
  one: RELEASE_NOTES_ITEMS.slice(0, 1),
  mediaError: RELEASE_NOTES_ITEMS_BROKEN_IMAGE,
  noData: RELEASE_NOTES_ITEMS,
  error: RELEASE_NOTES_ITEMS,
  loading: RELEASE_NOTES_ITEMS,
};

// Surface-swap компонент: VM снимает desktop-поверхность (модальное окно). Mobile-поверхность (bottom sheet) —
// в visual.spec с toolbar-global layoutType='mobile'. См. adaptive-components.md §«Стори / e2e / доки».
function VisualMatrixCanvas() {
  const [active, setActive] = useState<State | null>(null);
  const close = () => setActive(null);

  return (
    <div className={styles.panel}>
      {/* Состояния — строками: в колонках таблица не помещается в mobile-вьюпорт, и последние
          триггеры выходят за его границы. */}
      <StoryTable
        sectionTitle='contentState'
        firstColumnHeader='state'
        columnHeaders={['release notes']}
        rows={STATES.map(state => ({
          variantLabel: state,
          cells: [
            <Button
              key={state}
              label={state}
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              onClick={() => setActive(state)}
              data-test-id={VM_TRIGGER_TEST_ID(state)}
            />,
          ],
        }))}
      />

      {active && (
        <ReleaseNotes
          open
          onClose={close}
          contentState={STATE_TO_CONTENT_STATE[active]}
          loading={active === 'loading'}
          items={STATE_TO_ITEMS[active]}
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
