import { APPEARANCE, Button, VIEW } from '@ds/button';
import {
  CLOSE_ALL_THRESHOLD,
  POSITION_SYSTEM_EVENT,
  SystemEventPosition,
  toaster,
  TOASTER_TYPE,
  ToasterContainer,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

// VisualMatrix для Toaster — карта 6 позиций × stacked-ось. Каждый угол —
// свой контейнер, кнопка спавнит 5 тостов подряд, чтобы стек собрался; «Закрыть все»
// в центре чистит все шесть контейнеров.

const SYSTEM_EVENT_POSITIONS = Object.values(POSITION_SYSTEM_EVENT);
const stackContainerId = (p: SystemEventPosition) => `story-stacking-${p}`;

type Cell = { position: SystemEventPosition; className: string };

const CELLS: Cell[] = [
  { position: POSITION_SYSTEM_EVENT.TopLeft, className: styles.cellTl },
  { position: POSITION_SYSTEM_EVENT.TopCenter, className: styles.cellTc },
  { position: POSITION_SYSTEM_EVENT.TopRight, className: styles.cellTr },
  { position: POSITION_SYSTEM_EVENT.BottomLeft, className: styles.cellBl },
  { position: POSITION_SYSTEM_EVENT.BottomCenter, className: styles.cellBc },
  { position: POSITION_SYSTEM_EVENT.BottomRight, className: styles.cellBr },
];

// Сквозная нумерация по контейнеру: повторные клики продолжают счёт (1..5, 6..10, …).
const spawnCounters = new Map<string, number>();

function spawnInto(containerId: string, n: number) {
  const start = (spawnCounters.get(containerId) ?? 0) + 1;
  for (let i = 0; i < n; i++) {
    const idx = start + i;
    toaster.systemEvent.neutral({
      title: `Тост #${idx}`,
      description: `Авто-сгенерирован в стек (#${idx})`,
      containerId,
    });
  }
  spawnCounters.set(containerId, start + n - 1);
}

function VisualMatrixDemo() {
  const dismissAll = () =>
    SYSTEM_EVENT_POSITIONS.forEach(p => toaster.systemEvent.dismiss({ containerId: stackContainerId(p) }));

  return (
    <div className={styles.demoPage}>
      <div className={`${styles.demoPanel} ${styles.positionsMap}`}>
        {CELLS.map(({ position, className }) => (
          <div key={position} className={`${styles.positionsCell} ${className}`}>
            <Button
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              label={`${position} · спавн 5`}
              onClick={() => spawnInto(stackContainerId(position), 5)}
              data-test-id={TEST_IDS.visualMatrix.spawnAt(position)}
            />
          </div>
        ))}

        <div className={styles.positionsCenter}>
          <h3 className={styles.demoTitle}>Position × Stacked</h3>
          <p className={styles.demoHint}>
            Каждый угол — свой контейнер с <code>stacked</code>, <code>limit: 5</code>,{' '}
            <code>displayCloseAllButton</code> и <code>autoClose: 5000</code>. Тосты собираются в collapsed-стек, на
            hover раскрываются. Кнопка «Закрыть все» в углу появляется при ≥ {CLOSE_ALL_THRESHOLD} тостах.
          </p>
          <Button
            appearance={APPEARANCE.Critical}
            label='Закрыть все'
            onClick={dismissAll}
            data-test-id={TEST_IDS.visualMatrix.triggerReset}
          />
        </div>
      </div>

      {SYSTEM_EVENT_POSITIONS.map(position => (
        <ToasterContainer
          key={position}
          type={TOASTER_TYPE.SystemEvent}
          containerId={stackContainerId(position)}
          position={position}
          stacked
          limit={5}
          displayCloseAllButton
          autoClose={5000}
        />
      ))}
    </div>
  );
}

const meta: Meta<typeof VisualMatrixDemo> = {
  title: 'Components/Toaster/Toaster',
  component: VisualMatrixDemo,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof VisualMatrixDemo>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
};
