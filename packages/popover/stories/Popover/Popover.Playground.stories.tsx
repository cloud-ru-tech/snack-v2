import { APPEARANCE, Button, VIEW } from '@ds/button';
import {
  PLACEMENT,
  Popover,
  POPOVER_HEIGHT_STRATEGY,
  POPOVER_WIDTH_STRATEGY,
  PopoverProps,
  TRIGGER,
} from '@ds/popover';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const PopoverContentSlot = () => (
  <div className={styles.popoverContent} data-test-id={TEST_IDS.content}>
    Popover content
  </div>
);

const meta: Meta<PopoverProps> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'fullscreen' },
  args: {
    placement: PLACEMENT.Top,
    trigger: TRIGGER.Click,
    outsideClick: true,
    closeOnEscapeKey: true,
    widthStrategy: POPOVER_WIDTH_STRATEGY.Auto,
    heightStrategy: POPOVER_HEIGHT_STRATEGY.Auto,
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
    outsideClick: {
      control: 'boolean',
      description: 'Закрывать при клике вне поповера',
    },
    closeOnEscapeKey: {
      control: 'boolean',
      description: 'Закрывать по Escape',
    },
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
    offset: {
      control: 'number',
      description: 'Отступ от триггера',
    },
    hoverDelayOpen: {
      control: 'number',
      description: 'Задержка открытия по hover',
    },
    hoverDelayClose: {
      control: 'number',
      description: 'Задержка закрытия по hover',
    },
    content: {
      control: 'text',
      description: 'Контент поповера (в stories — подставляется в слот)',
      table: {
        category: 'Slots',
      },
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
  render: args => {
    const { content: contentArg, ...rest } = args;
    const content = contentArg != null && contentArg !== '' ? contentArg : <PopoverContentSlot />;
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>
            Открыть поповер триггером ниже. Тип ({rest.trigger}) и позиционирование рулятся из Controls.
          </DemoHint>
          <DemoActions align='center'>
            <Popover {...rest} content={content}>
              <Button
                data-test-id={TEST_IDS.triggerOpen}
                label='Open popover'
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
              />
            </Popover>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
};
