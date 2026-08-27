import { APPEARANCE, Button, VIEW } from '@ds/button';
import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';

const VM_TRIGGER_TEST_ID = (state: string) => `recall-modal-vm__${state}`;

type State = 'regular' | 'confirmable' | 'confirmableLong' | 'loading';

const STATES = ['regular', 'confirmable', 'confirmableLong', 'loading'] as const;

// confirmableLong несёт длинный идентификатор: проверяет middle-truncate строки подтверждения.
const CONFIRM_TEXT_BY_STATE: Partial<Record<State, string>> = {
  confirmable: 'recall-operation-01',
  confirmableLong: 'recall-operation-cluster-eu-central-01-batch-0007-retry-region-a-zone-3-step-17',
};

function VisualMatrixCanvas() {
  const [active, setActive] = useState<State | null>(null);
  const close = () => setActive(null);

  return (
    <div className={styles.panel}>
      <StoryTable
        sectionTitle='states'
        firstColumnHeader='state'
        columnHeaders={[...STATES]}
        rows={[
          {
            variantLabel: 'recall',
            cells: STATES.map(state => (
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
        <RecallModal
          open
          onClose={close}
          content='Действие будет отозвано для всех связанных объектов.'
          titleTooltip='Отзыв затронет все связанные операции'
          confirmable={active === 'confirmable' || active === 'confirmableLong'}
          confirmText={active ? CONFIRM_TEXT_BY_STATE[active] : undefined}
          loading={active === 'loading'}
          onRecall={closeModal => closeModal()}
        />
      )}
    </div>
  );
}

const meta: Meta<typeof VisualMatrixCanvas> = {
  title: 'Uikit Product/ModalPredefined/RecallModal',
  component: VisualMatrixCanvas,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof VisualMatrixCanvas>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
};
