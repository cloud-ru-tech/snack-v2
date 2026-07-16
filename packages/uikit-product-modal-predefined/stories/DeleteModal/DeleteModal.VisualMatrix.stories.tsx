import { APPEARANCE, Button, VIEW } from '@ds/button';
import { CONFIRM_TEXT_VARIANT, DeleteModal } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';

const VM_TRIGGER_TEST_ID = (state: string) => `delete-modal-vm__${state}`;

type State = 'regular' | 'confirmable' | 'confirmableText' | 'deleting';

const STATES = ['regular', 'confirmable', 'confirmableText', 'deleting'] as const;

function VisualMatrixCanvas() {
  const [active, setActive] = useState<State | null>(null);
  const close = () => setActive(null);

  const isConfirmable = active === 'confirmable' || active === 'confirmableText';

  return (
    <div className={styles.panel}>
      <StoryTable
        sectionTitle='states'
        firstColumnHeader='state'
        columnHeaders={[...STATES]}
        rows={[
          {
            variantLabel: 'delete',
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
        <DeleteModal
          open
          onClose={close}
          objectType='виртуальную машину'
          description='После удаления восстановить объект будет невозможно.'
          titleTooltip='Удаление затронет все связанные ресурсы'
          confirmable={isConfirmable}
          confirmText={isConfirmable ? 'vm-production-01' : undefined}
          confirmTextVariant={active === 'confirmableText' ? CONFIRM_TEXT_VARIANT.Text : CONFIRM_TEXT_VARIANT.Name}
          deleting={active === 'deleting'}
          onDelete={closeModal => closeModal()}
        />
      )}
    </div>
  );
}

const meta: Meta<typeof VisualMatrixCanvas> = {
  title: 'Uikit Product/ModalPredefined/DeleteModal',
  component: VisualMatrixCanvas,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof VisualMatrixCanvas>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
};
