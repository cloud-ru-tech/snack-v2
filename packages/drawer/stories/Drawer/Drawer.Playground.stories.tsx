import { Button, ButtonGroup } from '@ds/button';
import { Drawer, DrawerProps, POSITION, WIDTH } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { DRAWER_TEST_ID, DRAWER_TRIGGER_TEST_ID } from './testIds';

function PlaygroundRender(args: DrawerProps) {
  const [, updateArgs] = useArgs<DrawerProps>();
  const open = () => updateArgs({ open: true });
  const close = () => updateArgs({ open: false });

  return (
    <>
      <Button
        data-test-id={DRAWER_TRIGGER_TEST_ID}
        label='Open drawer'
        appearance='primary'
        view='filled'
        onClick={open}
      />
      <Drawer
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

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
  args: {
    open: false,
    position: POSITION.Right,
    width: WIDTH.S,
    heightAuto: false,
    showBlackout: true,
    closeOnPopstate: true,
    title: 'Headline text',
    subtitle: 'Subtitle text',
    content: 'Body content',
    'data-test-id': DRAWER_TEST_ID,
  },
  argTypes: {
    open: { control: 'boolean', description: 'Управление видимостью' },
    position: {
      control: 'radio',
      options: Object.values(POSITION),
      description: 'Сторона появления: left / right / top / bottom',
    },
    width: {
      control: 'radio',
      options: Object.values(WIDTH),
      description: 'Ширина панели (только для position left/right)',
    },
    heightAuto: {
      control: 'boolean',
      description: 'Высота панели по контенту (только для position top/bottom)',
    },
    showBlackout: { control: 'boolean', description: 'Показывать затемнение фона' },
    closeOnPopstate: { control: 'boolean', description: 'Закрывать при navigation/popstate' },
    title: { control: 'text', description: 'Заголовок' },
    subtitle: { control: 'text', description: 'Подзаголовок' },
    content: { control: 'text', description: 'Основной контент тела' },
    className: { control: 'text', description: 'CSS-класс панели' },
    rootClassName: { control: 'text', description: 'CSS-класс корневого слоя портала' },
    footer: { table: { disable: true } },
    media: { table: { disable: true } },
    nestedDrawer: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onBackButtonClick: { table: { disable: true } },
    slotAfterHeadline: { table: { disable: true } },
    container: { table: { disable: true } },
  },
  render: PlaygroundRender,
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DRAWER_TRIGGER_TEST_ID)).toBeVisible();
  },
};
