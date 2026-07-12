import { STEP_STATE, Stepper, StepState, StepViewData } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { DesktopStep } from '../../../src/helperComponents/DesktopStep';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper/Tests/InteractionStates',
  component: Stepper,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

// Кружки шагов в каждом базовом состоянии — источник для матричного снимка
// `interaction-states.png` (default × hover × focus × pressed по каждому состоянию,
// см. visual.spec). `onClick` делает кнопку-кружок фокусируемой/ховерящейся; сам
// колбек в снимке не участвует. Рендерим приватный DesktopStep напрямую, потому что
// loading/rejected недостижимы через публичный контроллер Stepper.
const STATES: StepState[] = [
  STEP_STATE.Completed,
  STEP_STATE.Current,
  STEP_STATE.Loading,
  STEP_STATE.Waiting,
  STEP_STATE.Rejected,
];

function buildStep(state: StepState, index: number): StepViewData {
  return { title: state, number: index + 1, state, onClick: fn() };
}

export const InteractionStates: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>InteractionStates</DemoTitle>
        <DemoHint>Кружки шагов по состояниям — матрица hover/focus/pressed снимается в visual-спеке.</DemoHint>
        <div className={styles.interactionMatrix}>
          {STATES.map((state, index) => (
            <DesktopStep key={state} step={buildStep(state, index)} hideTailLine data-test-id={TEST_IDS.root} />
          ))}
        </div>
      </DemoPanel>
    </DemoPage>
  ),
};
