import { APPEARANCE, Button, VIEW } from '@ds/button';
import { TOUR_BUTTON, TOUR_PLACEMENT, TourPlacement, TourStep, WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle, StoryTable } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

/** Композиции слотов подсказки — строки матрицы. */
const COMPOSITIONS = [
  { key: 'full', label: 'title + subtitle + content', title: true, subtitle: true, content: true },
  { key: 'no-subtitle', label: 'title + content', title: true, subtitle: false, content: true },
  { key: 'content-only', label: 'content', title: false, subtitle: false, content: true },
] as const;

/** Положения подсказки — колонки матрицы. */
const PLACEMENTS: TourPlacement[] = [
  TOUR_PLACEMENT.Top,
  TOUR_PLACEMENT.Bottom,
  TOUR_PLACEMENT.Left,
  TOUR_PLACEMENT.Right,
];

type Composition = (typeof COMPOSITIONS)[number];

type ActiveCombo = { key: string; composition: Composition; placement: TourPlacement };

function buildStep(composition: Composition, placement: TourPlacement): TourStep {
  return {
    target: `[data-test-id='${TEST_IDS.vm.target}']`,
    title: composition.title ? 'Заголовок шага' : undefined,
    subtitle: composition.subtitle ? 'Подзаголовок шага' : undefined,
    content: composition.content ? 'Описание шага тура для пользователя.' : undefined,
    placement,
  };
}

function VisualMatrixCanvas() {
  const [active, setActive] = useState<ActiveCombo | null>(null);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Visual matrix</DemoTitle>
        <DemoHint>
          Каждая ячейка — триггер тура в комбинации <code>композиция слотов × placement</code>. Снимки собирает
          visual.spec: клик → screenshot → закрыть → следующая ячейка.
        </DemoHint>

        <div className={styles.matrixTargetRow}>
          <span className={styles.target} data-test-id={TEST_IDS.vm.target}>
            Целевой элемент
          </span>
        </div>

        <StoryTable
          firstColumnHeader='композиция \\ placement'
          columnHeaders={PLACEMENTS.map(placement => placement.toUpperCase())}
          rows={COMPOSITIONS.map(composition => ({
            variantLabel: composition.label,
            cells: PLACEMENTS.map(placement => {
              const key = `${composition.key}-${placement}`;

              return (
                <Button
                  key={key}
                  appearance={APPEARANCE.Neutral}
                  data-test-id={TEST_IDS.vm.trigger(key)}
                  label={placement}
                  view={VIEW.Outline}
                  onClick={() => setActive({ key, composition, placement })}
                />
              );
            }),
          }))}
        />
      </DemoPanel>

      {active && (
        <WelcomeTour
          key={active.key}
          buttons={[TOUR_BUTTON.Back, TOUR_BUTTON.Primary, TOUR_BUTTON.Skip]}
          open
          steps={[buildStep(active.composition, active.placement)]}
          onOpenChange={() => setActive(null)}
        />
      )}
    </DemoPage>
  );
}

const meta: Meta<typeof WelcomeTour> = {
  title: 'Components/WelcomeTour',
  component: WelcomeTour,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof WelcomeTour>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => <VisualMatrixCanvas />,
};
