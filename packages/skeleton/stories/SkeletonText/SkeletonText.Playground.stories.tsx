import { ALIGN, SIZE, SkeletonText, VARIANT } from '@ds/skeleton';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof SkeletonText> = {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
  parameters: { layout: 'fullscreen' },
  args: {
    loading: true,
    variant: VARIANT.Body,
    size: SIZE.M,
    align: ALIGN.Left,
    lines: 3,
    'data-test-id': TEST_IDS.skeletonText.root,
  },
  argTypes: {
    loading: { control: 'boolean', description: 'Флаг состояния загрузки' },
    lines: { control: { type: 'number', min: 1, max: 10 }, description: 'Количество строк' },
    variant: { options: Object.values(VARIANT), control: 'select', description: 'Роль типографики' },
    size: { options: Object.values(SIZE), control: 'radio', description: 'Масштаб: s / m / l' },
    align: { options: Object.values(ALIGN), control: 'radio', description: 'Выравнивание' },
    width: { control: { type: 'number' }, description: 'Ширина контейнера' },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonText>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Многострочный текстовый скелетон с настройкой типографики и количества строк.</DemoHint>
        <DemoActions block>
          <div className={styles.wrapper}>
            <SkeletonText {...args}>
              <span>Контент после загрузки.</span>
            </SkeletonText>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.skeletonText.root)).toBeVisible();
  },
};
