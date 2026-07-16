import { APPEARANCE, Button, VIEW } from '@ds/button';
import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';

const VM_TRIGGER_TEST_ID = (state: string) => `recall-modal-vm__${state}`;

type State = 'regular' | 'confirmable' | 'loading';

function VisualMatrixCanvas() {
  const [active, setActive] = useState<State | null>(null);
  const close = () => setActive(null);

  return (
    <div className={styles.panel}>
      <StoryTable
        sectionTitle='states'
        firstColumnHeader='state'
        columnHeaders={['regular', 'confirmable', 'loading']}
        rows={[
          {
            variantLabel: 'recall',
            cells: (['regular', 'confirmable', 'loading'] as const).map(state => (
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
          description='Действие будет отозвано для всех связанных объектов.'
          titleTooltip='Отзыв затронет все связанные операции'
          confirmable={active === 'confirmable'}
          confirmText={active === 'confirmable' ? 'recall-operation-01' : undefined}
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
