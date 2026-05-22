import { APPEARANCE, Button, VIEW } from '@ds/button';
import {
  PLACEMENT,
  POPOVER_HEIGHT_STRATEGY,
  POPOVER_WIDTH_STRATEGY,
  PopoverPrivate,
  type PopoverPrivateProps,
  TRIGGER,
} from '@ds/popover-private';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const PopoverContent = () => (
  <div className={styles.popoverContent} data-test-id={TEST_IDS.content}>
    Popover content
  </div>
);

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/PopoverPrivate',
  component: PopoverPrivate,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    placement: PLACEMENT.Top,
    trigger: TRIGGER.Click,
    hasArrow: false,
    outsideClick: true,
    closeOnEscapeKey: true,
    widthStrategy: POPOVER_WIDTH_STRATEGY.Auto,
    heightStrategy: POPOVER_HEIGHT_STRATEGY.Auto,
    arrowElementClassName: styles.popoverArrowElement,
    arrowContainerClassName: styles.popoverArrowContainer,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: Object.values(PLACEMENT),
      description: 'Положение поповера относительно триггера',
    },
    trigger: {
      control: 'radio',
      options: Object.values(TRIGGER),
      description: 'Тип триггера для открытия',
    },
    hasArrow: { control: 'boolean', description: 'Отображать стрелку' },
    outsideClick: { control: 'boolean', description: 'Закрывать при клике вне поповера' },
    closeOnEscapeKey: { control: 'boolean', description: 'Закрывать по Escape' },
    widthStrategy: {
      control: 'radio',
      options: Object.values(POPOVER_WIDTH_STRATEGY),
      description: 'Стратегия ширины контейнера',
    },
    heightStrategy: {
      control: 'radio',
      options: Object.values(POPOVER_HEIGHT_STRATEGY),
      description: 'Стратегия высоты контейнера',
    },
    offset: { control: 'number', description: 'Отступ от триггера' },
    hoverDelayOpen: { control: 'number', description: 'Задержка открытия по hover' },
    hoverDelayClose: { control: 'number', description: 'Задержка закрытия по hover' },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: { category: 'HTML Attributes' },
    },
    arrowElementClassName: { table: { disable: true } },
    arrowContainerClassName: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Открыть PopoverPrivate триггером ниже. Тип ({args.trigger}) и позиционирование рулятся из Controls.
        </DemoHint>
        <DemoActions align='center'>
          <PopoverPrivate {...args} popoverContent={<PopoverContent />}>
            <Button
              data-test-id={TEST_IDS.triggerOpen}
              label='Open popover'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
            />
          </PopoverPrivate>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<PopoverPrivateProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
};
