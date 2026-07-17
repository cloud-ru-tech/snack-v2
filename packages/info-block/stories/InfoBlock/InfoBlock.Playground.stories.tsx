import { Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ALIGN, InfoBlock, InfoBlockProps, SIZE } from '../../src';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

type PlaygroundArgs = InfoBlockProps & { showIcon?: boolean; showFooter?: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/InfoBlock',
  component: InfoBlock,
  parameters: { layout: 'fullscreen' },
  args: {
    'data-test-id': TEST_IDS.root,
    title: 'Title text',
    content: 'Content text',
    size: SIZE.S,
    align: ALIGN.Vertical,
    showIcon: true,
    showFooter: true,
    icon: {
      icon: PlaceholderSVG,
      appearance: 'primary',
      decor: true,
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок',
    },
    content: {
      control: 'text',
      description: 'Подзаголовок',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    align: {
      control: 'radio',
      options: Object.values(ALIGN),
      description: 'Расположение элементов',
    },
    showIcon: {
      control: 'boolean',
      description: 'Показать иконку',
    },
    showFooter: {
      control: 'boolean',
      description: 'Показать футер с кнопками',
    },
    icon: {
      table: { disable: true },
      description: 'Иконка (IconPredefined props)',
      if: { arg: 'showIcon', eq: true },
    },
    className: {
      control: 'text',
      description: 'Дополнительный CSS-класс',
    },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Информационный блок с заголовком, описанием, иконкой и футером.</DemoHint>
        <DemoActions align='center'>
          <InfoBlock
            title={args.title}
            content={args.content}
            size={args.size}
            align={args.align}
            icon={args.showIcon ? args.icon : undefined}
            footer={
              args.showFooter ? (
                <div className={styles.footerRow}>
                  <Button label='Label text' view={VIEW.Filled} size={args.size} />
                  <Button label='Label text' view={VIEW.Tonal} size={args.size} />
                </div>
              ) : undefined
            }
            className={args.className}
            data-test-id={args['data-test-id']}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
