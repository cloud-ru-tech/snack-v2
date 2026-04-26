import { Button, ButtonGroup } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { Modal, ModalProps, MODE, WIDTH } from '../../src';
import styles from './styles.module.scss';
import { MODAL_TEST_ID, MODAL_TRIGGER_TEST_ID } from './testIds';

function PlaygroundRender(args: ModalProps) {
  const [, updateArgs] = useArgs<ModalProps>();
  const open = () => updateArgs({ open: true });
  const close = () => updateArgs({ open: false });

  return (
    <>
      <Button
        data-test-id={MODAL_TRIGGER_TEST_ID}
        label='Open modal'
        appearance='primary'
        view='filled'
        onClick={open}
      />
      <Modal
        {...args}
        onClose={close}
        footer={
          <ButtonGroup
            className={styles.footerGroup}
            primaryAction={{ label: 'Confirm', view: 'filled', onClick: close }}
            secondaryAction={{ label: 'Cancel', view: 'outline', appearance: 'neutral', onClick: close }}
          />
        }
      />
    </>
  );
}

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  args: {
    open: false,
    mode: MODE.Regular,
    width: WIDTH.S,
    heightAuto: true,
    loading: false,
    title: 'Headline text',
    subtitle: 'Subtitle text',
    content: 'Body text',
    closeOnPopstate: true,
    'data-test-id': MODAL_TEST_ID,
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Открыта ли модалка',
    },
    mode: {
      control: 'radio',
      options: Object.values(MODE),
      description:
        'Regular — клик по overlay, Esc и кнопка закрытия; Aggressive — только кнопка (подложка с blur); Forced — без кнопки и без Esc/overlay.',
    },
    width: {
      control: 'radio',
      options: Object.values(WIDTH),
      description: 'Размер окна',
    },
    heightAuto: {
      control: 'boolean',
      description: 'Растягивать ли окно по высоте контейнера',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки (в теле спиннер, футер скрыт)',
    },
    loadingState: {
      control: 'text',
      description: 'Кастомный контент тела при loading',
    },
    title: { control: 'text', description: 'Заголовок в шапке' },
    subtitle: { control: 'text', description: 'Подзаголовок в шапке' },
    content: { control: 'text', description: 'Основной контент тела' },
    closeOnPopstate: {
      control: 'boolean',
      description: 'Закрывать по navigation/popstate',
    },
    rootClassName: { control: 'text', description: 'CSS-класс корневого слоя портала' },
    className: { control: 'text', description: 'CSS-класс окна' },
    footer: { table: { disable: true } },
    media: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onBackButtonClick: { table: { disable: true } },
    container: { table: { disable: true } },
    slotAfterHeadline: { table: { disable: true } },
    truncate: { table: { disable: true } },
  },
  render: PlaygroundRender,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(MODAL_TRIGGER_TEST_ID)).toBeVisible();
  },
};
