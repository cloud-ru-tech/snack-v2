import { APPEARANCE, Button, VIEW } from '@ds/button';
import { TourStep, WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const TARGETS = ['Меню', 'Поиск', 'Профиль'];

const STEPS: TourStep[] = TARGETS.map((label, index) => ({
  target: `[data-test-id='${TEST_IDS.target(index)}']`,
  title: `Шаг ${index + 1}: ${label}`,
  content: `Описание того, что делает «${label}».`,
}));

/**
 * Управляемый режим: `open` и `stepIndex` живут во внешнем состоянии, компонент
 * только сообщает о намерениях через `onOpenChange` / `onStepChange`. Так тур можно
 * запустить с произвольного шага и синхронизировать с роутером или онбординг-стейтом.
 */
function ControlledRender() {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const start = (index: number) => {
    setStepIndex(index);
    setOpen(true);
  };

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Controlled</DemoTitle>
        <DemoHint>
          Шаг и состояние тура хранит родитель. Кнопки ниже запускают тур с конкретного шага; текущий шаг показан рядом.
        </DemoHint>

        <DemoActions align='center'>
          <div className={styles.targets}>
            {TARGETS.map((label, index) => (
              <span key={label} className={styles.target} data-test-id={TEST_IDS.target(index)}>
                {label}
              </span>
            ))}
          </div>
        </DemoActions>

        <DemoActions align='center'>
          {TARGETS.map((label, index) => (
            <Button
              key={label}
              appearance={APPEARANCE.Neutral}
              data-test-id={TEST_IDS.controlled.startFrom(index)}
              label={`С шага ${index + 1}`}
              view={VIEW.Outline}
              onClick={() => start(index)}
            />
          ))}
        </DemoActions>

        <DemoHint>
          <span data-test-id={TEST_IDS.controlled.state}>
            open: {String(open)}, stepIndex: {stepIndex}
          </span>
        </DemoHint>
      </DemoPanel>

      <WelcomeTour open={open} stepIndex={stepIndex} steps={STEPS} onOpenChange={setOpen} onStepChange={setStepIndex} />
    </DemoPage>
  );
}

const meta: Meta<typeof WelcomeTour> = {
  title: 'Components/WelcomeTour/Examples/Controlled',
  component: WelcomeTour,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

type Story = StoryObj<typeof WelcomeTour>;

export const Controlled: Story = {
  tags: ['dev', 'test'],
  render: () => <ControlledRender />,
  // Регрессия: в управляемом режиме движок не двигает индекс сам, поэтому переход
  // «Далее» держится на `onStepChange` компонента. Без этой проверки тур молча
  // закрывал текущий шаг и не открывал следующий, оставаясь `open: true`.
  play: async ({ canvasElement, step }) => {
    // Подсказка живёт в портале вне canvasElement — ищем её от document.body.
    const screen = within(canvasElement.ownerDocument.body);
    const canvas = within(canvasElement);

    await step('click: «С шага 1» открывает тур на первом шаге', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.controlled.startFrom(0)));

      // Floater монтируется скрытым и становится видимым после позиционирования.
      await waitFor(async () => {
        await expect(screen.getByTestId(TEST_IDS.hint)).toBeVisible();
      });
      await expect(screen.getByTestId(TEST_IDS.title)).toHaveTextContent('Шаг 1');
    });

    await step('click: «Далее» переводит на второй шаг и двигает внешний stepIndex', async () => {
      await userEvent.click(screen.getByTestId(TEST_IDS.nextButton));

      await waitFor(async () => {
        await expect(screen.getByTestId(TEST_IDS.title)).toHaveTextContent('Шаг 2');
      });
      await expect(canvas.getByTestId(TEST_IDS.controlled.state)).toHaveTextContent('stepIndex: 1');
    });

    await step('click: «Назад» возвращает на первый шаг', async () => {
      await userEvent.click(screen.getByTestId(TEST_IDS.backButton));

      await waitFor(async () => {
        await expect(screen.getByTestId(TEST_IDS.title)).toHaveTextContent('Шаг 1');
      });
      await expect(canvas.getByTestId(TEST_IDS.controlled.state)).toHaveTextContent('stepIndex: 0');
    });

    await step('click: крестик закрывает тур, не сдвигая шаг', async () => {
      await userEvent.click(screen.getByTestId(TEST_IDS.closeIcon));

      await waitFor(() => {
        expect(screen.queryByTestId(TEST_IDS.hint)).toBeNull();
      });
      await expect(canvas.getByTestId(TEST_IDS.controlled.state)).toHaveTextContent('open: false, stepIndex: 0');
    });
  },
};
