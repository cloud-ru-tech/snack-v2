import { PlaceholderSVG } from '@ds/icons/interface/system';
import { SIZE, ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';
import styles from './styles.module.scss';

const meta: Meta<typeof ToggleCard> = {
  title: 'Uikit Product/TogglesPredefined/ToggleCard',
  component: ToggleCard,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Тариф Pro',
    description: '100 ГБ хранилища, приоритетная поддержка',
    size: SIZE.M,
    disabled: false,
    'data-test-id': TEST_IDS.card,
  },
  argTypes: {
    value: { control: 'text' },
    size: { control: 'radio', options: Object.values(SIZE) },
    promoBadge: { control: 'text' },
    emblem: {
      control: 'select',
      options: ['placeholder'],
      mapping: { placeholder: { icon: PlaceholderSVG } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleCard>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Кликабельная карточка выбора внутри ToggleGroup. Клик / Enter / Space переключает.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <ToggleGroup defaultValue={args.value}>
              <ToggleCard {...args} />
            </ToggleGroup>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.card)).toBeVisible();
  },
};
