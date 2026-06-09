import { APPEARANCE, CardVacancy } from '@ds/site-card-vacancy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof CardVacancy> = {
  title: 'Site/CardVacancy',
  component: CardVacancy,
  parameters: { layout: 'fullscreen' },
  args: {
    href: '#',
    target: '_self',
    title: 'Frontend Developer',
    description: 'Remote · Full-time',
    appearance: APPEARANCE.Neutral,
    mobile: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    href: { control: 'text' },
    target: {
      control: 'radio',
      options: ['_self', '_blank', '_parent', '_top'],
    },
    appearance: { control: 'radio', options: Object.values(APPEARANCE) },
    onClick: { action: 'onClick' },
  },
};

export default meta;
type Story = StoryObj<typeof CardVacancy>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Карточка вакансии-ссылка: заголовок + описание, фон по appearance, hover/pressed и фокус.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.playgroundCard}>
            <CardVacancy {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
