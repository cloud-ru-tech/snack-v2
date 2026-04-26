import { MobileStepper, STEP_STATE, Stepper, StepState } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const STATES: StepState[] = [
  STEP_STATE.Waiting,
  STEP_STATE.Current,
  STEP_STATE.Loading,
  STEP_STATE.Completed,
  STEP_STATE.Rejected,
];

function pickIndex(state: StepState): number {
  if (state === STEP_STATE.Completed) return 2;
  if (state === STEP_STATE.Waiting) return 0;
  return 1;
}

function desktopAtState(state: StepState): ReactElement {
  return (
    <div className={styles.containerMatrixDesktop}>
      <Stepper
        steps={[{ title: 'One' }, { title: 'Two' }, { title: 'Three' }]}
        defaultCurrentStepIndex={pickIndex(state)}
      >
        {({ stepper }) => stepper}
      </Stepper>
    </div>
  );
}

function mobileAtState(state: StepState): ReactElement {
  return (
    <div className={styles.containerMatrixMobile}>
      <MobileStepper
        steps={[{ title: 'One' }, { title: 'Two' }, { title: 'Three' }]}
        defaultCurrentStepIndex={pickIndex(state)}
      >
        {({ stepper }) => stepper}
      </MobileStepper>
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Desktop'
        firstColumnHeader='State'
        columnHeaders={['View']}
        rows={STATES.map(state => ({
          variantLabel: state,
          cells: [desktopAtState(state)],
        }))}
      />
      <StoryTable
        sectionTitle='Mobile'
        firstColumnHeader='State'
        columnHeaders={['View']}
        rows={STATES.map(state => ({
          variantLabel: state,
          cells: [mobileAtState(state)],
        }))}
      />
    </div>
  ),
};
