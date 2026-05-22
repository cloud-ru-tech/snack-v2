import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString',
  component: TruncateString,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Обрезка длинной строки с тултипом полного текста, обрез по концу или середине.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.container}>
            <TruncateString {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    variant: VARIANT.End,
    text: 'Очень длинный текст, который не помещается в контейнер и должен быть обрезан',
    maxLines: 1,
    hideTooltip: false,
    placement: 'top',
    trigger: 'hoverAndFocusVisible',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант обрезания: end / middle',
    },
    text: { control: 'text', description: 'Текст, который будет обрезаться' },
    maxLines: { control: 'number', description: 'Максимум строк (только для variant=end)' },
    hideTooltip: { control: 'boolean', description: 'Скрывать тултип с полным текстом' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Позиция тултипа',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
