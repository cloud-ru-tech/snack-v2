import { Card, RADIUS, VIEW } from '@ds/card';
import { APPEARANCE, IconPredefined, SIZE as ICON_SIZE } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

function CardPlaygroundExampleContent() {
  return (
    <div className={styles.playgroundExample}>
      <IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Primary} size={ICON_SIZE.M} shape='round' />
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
  title: 'Components/Card/Card',
  component: Card,
  parameters: { layout: 'fullscreen' },
  args: {
    radius: RADIUS.M,
    view: VIEW.Outline,
    backgroundPredefined: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
    disabled: false,
    checked: false,
    multiSelect: false,
    interactive: true,
    children: <CardPlaygroundExampleContent />,
    className: '',
    'data-test-id': TEST_IDS.root,
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
    interactive: {
      control: 'boolean',
      description: 'Включает hover/press state layer и focus-ring. `false` — презентационная карточка.',
    },
    children: {
      table: { disable: true },
      description: 'По умолчанию — пример с иконкой и тремя строками текста; можно переопределить через args.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Карточка-контейнер с радиусом, фоном и опциональным selected-состоянием.</DemoHint>
        <DemoActions align='center'>
          <Card {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
