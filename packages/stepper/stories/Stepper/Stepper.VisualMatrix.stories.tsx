import { STEP_STATE, Stepper, StepState, StepViewData } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import { DesktopStep } from '../../src/helperComponents/DesktopStep';
import { MobileStep } from '../../src/helperComponents/MobileStep';
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

// Stepper управляется контроллером: loading/rejected — это runtime-состояния
// текущего шага (валидация/отказ валидатора), их нельзя задать через пропсы.
// Поэтому для матрицы состояний собираем `stepsView` вручную и форсим state
// на первом шаге, рендеря приватные DesktopStep/MobileStep напрямую.
function buildStepsView(state: StepState): StepViewData[] {
  return [
    { title: 'One', number: 1, state: STEP_STATE.Completed },
    { title: 'Two', number: 2, state },
    { title: 'Three', number: 3, state: STEP_STATE.Waiting },
  ];
}

function desktopAtState(state: StepState): ReactElement {
  const view = buildStepsView(state);
  return (
    <div className={styles.containerMatrixDesktop}>
      <div className={styles.stepperRowDesktop}>
        {view.map((step, index) => (
          <DesktopStep key={step.title} step={step} hideTailLine={index === view.length - 1} />
        ))}
      </div>
    </div>
  );
}

function mobileAtState(state: StepState): ReactElement {
  const view = buildStepsView(state);
  return (
    <div className={styles.containerMatrixMobile}>
      <div className={styles.stepperRowMobile}>
        {view.map(step => (
          <MobileStep key={step.title} step={step} />
        ))}
      </div>
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
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
