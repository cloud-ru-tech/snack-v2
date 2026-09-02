import { APPEARANCE, Button, VIEW } from '@ds/button';
import { TourStep, WelcomeTour, WelcomeTourProps } from '@ds/uikit-product-welcome-tour';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const TARGETS = ['Меню', 'Поиск', 'Профиль'];

const STEPS: TourStep[] = TARGETS.map((label, index) => ({
  target: `[data-test-id='${TEST_IDS.target(index)}']`,
  title: `Шаг ${index + 1}: ${label}`,
  content: `Описание того, что делает «${label}».`,
}));

type InteractionStoryProps = Omit<WelcomeTourProps, 'onOpenChange' | 'onStepChange'> & {
  onOpenChange(open: boolean): void;
  onStepChange(index: number): void;
};

function InteractionRender({ onOpenChange, onStepChange, ...rest }: InteractionStoryProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    onOpenChange(next);
  };

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Play-функция проходит тур целиком: запуск, «Далее», «Назад», кнопка завершения на последнем шаге.
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
          <Button
            appearance={APPEARANCE.Neutral}
            data-test-id={TEST_IDS.triggerOpen}
            label='Запустить тур'
            view={VIEW.Outline}
            onClick={() => handleOpenChange(true)}
          />
        </DemoActions>
      </DemoPanel>

      <WelcomeTour {...rest} open={open} onOpenChange={handleOpenChange} onStepChange={onStepChange} />
    </DemoPage>
  );
}

const meta: Meta<InteractionStoryProps> = {
  title: 'Components/WelcomeTour/Tests/Interaction',
  component: WelcomeTour,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    steps: STEPS,
    onOpenChange: fn(),
    onStepChange: fn(),
  },
  render: args => <InteractionRender {...args} />,
};

export default meta;

type Story = StoryObj<InteractionStoryProps>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    // Подсказка живёт в портале вне canvasElement — ищем её от document.body.
    const screen = within(canvasElement.ownerDocument.body);
    const canvas = within(canvasElement);

    await step('click: триггер запускает тур и показывает первый шаг', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.triggerOpen));

      // Floater монтируется скрытым, поэтому ждём видимость, а не появление узла в DOM.
      await waitFor(async () => {
        await expect(screen.getByTestId(TEST_IDS.hint)).toBeVisible();
      });
      expect(args.onOpenChange).toHaveBeenCalledWith(true);
    });

    await step('first step: кнопки «Назад» нет', async () => {
      expect(screen.queryByTestId(TEST_IDS.backButton)).toBeNull();
    });

    await step('click: «Далее» переводит на второй шаг', async () => {
      await userEvent.click(screen.getByTestId(TEST_IDS.nextButton));

      // Узел кнопки появляется раньше, чем floater позиционируется, поэтому видимость
      // проверяется с повтором, а не однократно после `findBy`.
      await waitFor(async () => {
        await expect(screen.getByTestId(TEST_IDS.backButton)).toBeVisible();
      });
      expect(args.onStepChange).toHaveBeenCalledWith(1);
    });

    await step('click: «Назад» возвращает на первый шаг', async () => {
      await userEvent.click(screen.getByTestId(TEST_IDS.backButton));

      await expect(await screen.findByTestId(TEST_IDS.title)).toHaveTextContent('Шаг 1');
    });

    await step('click: на последнем шаге показывается кнопка завершения и закрывает тур', async () => {
      await userEvent.click(screen.getByTestId(TEST_IDS.nextButton));
      await userEvent.click(await screen.findByTestId(TEST_IDS.nextButton));

      await userEvent.click(await screen.findByTestId(TEST_IDS.finishButton));

      // Закрытие приходит событием `tour:end` движка — оно асинхронно клику.
      await waitFor(() => {
        expect(args.onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  },
};
