import { Button } from '@ds/button';
import { DrawerCustom, DrawerCustomProps, POSITION, WIDTH } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

function PlaygroundRender(args: DrawerCustomProps) {
  const [, updateArgs] = useArgs<DrawerCustomProps>();
  const open = () => updateArgs({ open: true });
  const close = () => updateArgs({ open: false });

  return (
    <>
      <Button label='Open custom drawer' appearance='primary' view='filled' onClick={open} />
      <DrawerCustom {...args} onClose={close}>
        <DrawerCustom.Header title='Custom composition' subtitle='Шапка, тело и футер собираются вручную.' />
        <DrawerCustom.Body
          content={
            <div className={styles.customBody}>
              <p>Тело Drawer собирается из произвольной разметки — ограничений нет.</p>
              <p>Скролл включается автоматически при большом содержимом.</p>
            </div>
          }
        />
        <DrawerCustom.Footer>
          <div className={styles.footer}>
            <Button label='Close' appearance='neutral' view='outline' onClick={close} />
            <Button label='Confirm' appearance='primary' view='filled' onClick={close} />
          </div>
        </DrawerCustom.Footer>
      </DrawerCustom>
    </>
  );
}

const meta: Meta<typeof DrawerCustom> = {
  title: 'Components/DrawerCustom',
  component: DrawerCustom,
  parameters: { layout: 'centered' },
  args: {
    open: false,
    position: POSITION.Right,
    width: WIDTH.S,
    heightAuto: false,
    showBlackout: true,
    closeOnPopstate: true,
  },
  argTypes: {
    open: { control: 'boolean', description: 'Управление видимостью' },
    position: {
      control: 'radio',
      options: Object.values(POSITION),
      description: 'Сторона появления панели',
    },
    width: {
      control: 'radio',
      options: Object.values(WIDTH),
      description: 'Ширина (только для position left/right)',
    },
    heightAuto: {
      control: 'boolean',
      description: 'Высота по контенту (только для position top/bottom)',
    },
    showBlackout: { control: 'boolean', description: 'Показывать затемнение фона' },
    closeOnPopstate: { control: 'boolean', description: 'Закрывать при navigation/popstate' },
    className: { control: 'text', description: 'CSS-класс панели' },
    rootClassName: { control: 'text', description: 'CSS-класс корневого слоя портала' },
    children: { table: { disable: true } },
    onClose: { table: { disable: true } },
    container: { table: { disable: true } },
    push: { table: { disable: true } },
    nestedDrawer: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  render: PlaygroundRender,
};
export default meta;

type Story = StoryObj<typeof DrawerCustom>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Open custom drawer' })).toBeVisible();
  },
};
