import { Card, RADIUS, VIEW } from '@ds/card';
import { APPEARANCE, IconPredefined, SIZE as ICON_SIZE } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { CARD_TEST_ID } from './testIds';

function CardPlaygroundExampleContent() {
  return (
    <div className={styles.playgroundExample}>
      <IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Primary} size={ICON_SIZE.L} shape='round' />
      <div className={styles.playgroundExampleText}>
        <Typography variant={VARIANT.title} size={SIZE.s}>
          Title text
        </Typography>
        <Typography variant={VARIANT.body} size={SIZE.s} className={styles.playgroundExampleSubtitle}>
          Subtitle text
        </Typography>
        <Typography variant={VARIANT.body} size={SIZE.m}>
          Description text
        </Typography>
      </div>
    </div>
  );
}

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  args: {
    radius: RADIUS.M,
    view: VIEW.Simple,
    backgroundPredefined: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
    disabled: false,
    checked: false,
    multiSelect: false,
    children: <CardPlaygroundExampleContent />,
    className: '',
    'data-test-id': CARD_TEST_ID,
  },
  argTypes: {
    radius: {
      control: 'radio',
      options: Object.values(RADIUS),
      description: 'Радиус контейнера (s / m / l)',
    },
    view: {
      control: 'radio',
      options: Object.values(VIEW),
      description: 'Режим: simple / outline / shadow',
    },
    backgroundPredefined: {
      control: 'select',
      options: Object.values(BACKGROUND_PREDEFINED_FILL),
      description: 'Предустановленная заливка фона (`BACKGROUND_PREDEFINED_FILL`).',
    },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    multiSelect: { control: 'boolean', description: 'Показ галочки в checked состоянии' },
    children: {
      control: false,
      description: 'По умолчанию — пример с иконкой и тремя строками текста; можно переопределить через args.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(CARD_TEST_ID)).toBeVisible();
  },
};
