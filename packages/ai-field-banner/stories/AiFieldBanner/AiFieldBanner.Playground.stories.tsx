import { AiFieldBanner, AiFieldBannerProps, SIZE, VARIANT, VARIANT_ORDER } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const ICON_OPTIONS = {
  none: undefined,
  placeholder: <PlaceholderSVG />,
} as const;

type StoryProps = AiFieldBannerProps & { showClose: boolean };

const meta: Meta<StoryProps> = {
  title: 'Ai/AiFieldBanner',
  component: AiFieldBanner,
  parameters: { layout: 'fullscreen' },
  args: {
    variant: VARIANT.Information,
    content: 'Description',
    actionLabel: 'Label text',
    icon: 'placeholder' as unknown as AiFieldBannerProps['icon'],
    showClose: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    layoutPresets: { table: { disable: true } },
    variant: {
      control: 'select',
      options: VARIANT_ORDER,
      description: 'Семантический вариант баннера.',
    },
    size: {
      control: 'inline-radio',
      options: Object.values(SIZE),
      description: 'Размер (Figma: Mobile Off → s, Mobile On → m)',
    },
    content: { control: 'text', description: 'Текст основной строки.' },
    bottomContent: { control: 'text', description: 'Дополнительный слот.' },
    icon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Иконка слева (`none` | `placeholder`).',
    },
    actionLabel: { control: 'text', description: 'Подпись кнопки действия.' },
    onActionClick: { table: { disable: true } },
    onClose: { table: { disable: true } },
    showClose: { name: '[Stories]: showClose', control: 'boolean' },
  },
  render: ({ showClose, ...args }: StoryProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Инлайн-баннер для поля ввода: тип, описание, действие и доп. слот.</DemoHint>
        <DemoActions align='start'>
          <AiFieldBanner
            {...args}
            className={styles.bannerCell}
            onActionClick={fn()}
            onClose={showClose ? fn() : undefined}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.content)).toHaveTextContent('Description');
    await userEvent.click(canvas.getByTestId(TEST_IDS.action));
  },
};
