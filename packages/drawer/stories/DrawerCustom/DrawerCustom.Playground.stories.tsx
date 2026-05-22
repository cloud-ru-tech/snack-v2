import { APPEARANCE, Button, VIEW } from '@ds/button';
import { DrawerCustom, DrawerCustomProps, POSITION, WIDTH } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

function PlaygroundRender(args: DrawerCustomProps) {
  const { open: initialOpen, ...rest } = args;
  const [open, setOpen] = useState(initialOpen ?? false);
  useEffect(() => {
    if (initialOpen !== undefined) setOpen(initialOpen);
  }, [initialOpen]);
  const openDrawer = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Открыть кастомный Drawer триггером ниже. Состав слотов задан вручную в render.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.drawerCustom.triggerOpen}
            label='Open custom drawer'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={openDrawer}
          />
        </DemoActions>
      </DemoPanel>
      <DrawerCustom {...rest} open={open} onClose={close}>
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
    </DemoPage>
  );
}

const meta: Meta<typeof DrawerCustom> = {
  title: 'Components/Drawer/DrawerCustom',
  component: DrawerCustom,
  parameters: { layout: 'fullscreen' },
  args: {
    position: POSITION.Right,
    width: WIDTH.S,
    heightAuto: false,
    showBlackout: true,
    closeOnPopstate: true,
    'data-test-id': TEST_IDS.drawerCustom.root,
  },
  argTypes: {
    open: { control: 'boolean', table: { disable: true } },
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
    await expect(within(canvasElement).getByTestId(TEST_IDS.drawerCustom.triggerOpen)).toBeVisible();
  },
};
