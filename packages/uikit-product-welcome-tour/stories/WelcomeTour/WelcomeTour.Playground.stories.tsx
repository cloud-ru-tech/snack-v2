import { APPEARANCE, Button, VIEW } from '@ds/button';
import { TOUR_PLACEMENT, WelcomeTour, WelcomeTourProps } from '@ds/uikit-product-welcome-tour';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

type PlaygroundStoryProps = WelcomeTourProps & {
  showSubtitle: boolean;
  showSteps: boolean;
};

const TARGETS = ['Меню', 'Поиск', 'Профиль'];

function PlaygroundRender({ showSubtitle, showSteps, ...restProps }: PlaygroundStoryProps) {
  // Trigger-based: open живёт в локальном state, не в args (trigger-based-stories.md §1).
  const [open, setOpen] = useState(false);

  const steps: WelcomeTourProps['steps'] = TARGETS.slice(0, showSteps ? TARGETS.length : 1).map((label, index) => ({
    target: `[data-test-id='${TEST_IDS.target(index)}']`,
    title: `Шаг ${index + 1}: ${label}`,
    subtitle: showSubtitle ? `Подзаголовок шага ${index + 1}` : undefined,
    content: `Описание того, что делает «${label}» и зачем это пользователю.`,
    placement: TOUR_PLACEMENT.Bottom,
  }));

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Запустить тур кнопкой ниже. Тур затемняет страницу, подсвечивает целевой элемент шага и показывает подсказку
          рядом с ним.
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
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>

      <WelcomeTour {...restProps} open={open} steps={steps} onOpenChange={setOpen} />
    </DemoPage>
  );
}

const meta: Meta<PlaygroundStoryProps> = {
  title: 'Components/WelcomeTour',
  component: WelcomeTour,
  parameters: { layout: 'fullscreen' },
  args: {
    showSubtitle: true,
    showSteps: true,
  },
  argTypes: {
    steps: { table: { disable: true } },
    open: { table: { disable: true } },
    defaultOpen: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    stepIndex: { table: { disable: true } },
    onStepChange: { table: { disable: true } },
    portalContainer: { table: { disable: true } },
    showSubtitle: { name: '[Stories]: showSubtitle', control: 'boolean' },
    showSteps: { name: '[Stories]: showSteps', control: 'boolean' },
  },
  render: args => <PlaygroundRender {...args} />,
};

export default meta;

type Story = StoryObj<PlaygroundStoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.triggerOpen)).toBeVisible();
  },
};
