import { Button } from '@ds/button';
import { ModalCustom, ModalCustomProps, MODE, WIDTH } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

function PlaygroundRender(args: ModalCustomProps) {
  const [, updateArgs] = useArgs<ModalCustomProps>();
  const open = () => updateArgs({ open: true });
  const close = () => updateArgs({ open: false });

  return (
    <>
      <Button label='Open custom modal' appearance='primary' view='filled' onClick={open} />
      <ModalCustom {...args} onClose={close}>
        <ModalCustom.Header title='Custom composition' subtitle='Шапка, тело и футер собираются вручную.' />
        <ModalCustom.Body
          content={
            <div className={styles.customBody}>
              <p>Тело модалки собирается из произвольной разметки — ограничений нет.</p>
              <p>Скролл включается автоматически при большом содержимом.</p>
            </div>
          }
        />
        <ModalCustom.Footer>
          <div className={styles.footer}>
            <Button label='Close' appearance='neutral' view='outline' onClick={close} />
            <Button label='Confirm' appearance='primary' view='filled' onClick={close} />
          </div>
        </ModalCustom.Footer>
      </ModalCustom>
    </>
  );
}

const meta: Meta<typeof ModalCustom> = {
  title: 'Components/ModalCustom',
  component: ModalCustom,
  parameters: { layout: 'centered' },
  args: {
    open: false,
    mode: MODE.Regular,
    width: WIDTH.S,
    heightAuto: true,
    closeOnPopstate: true,
  },
  argTypes: {
    open: { control: 'boolean' },
    mode: {
      control: 'radio',
      options: Object.values(MODE),
      description: 'Режим закрытия окна',
    },
    width: { control: 'radio', options: Object.values(WIDTH) },
    heightAuto: { control: 'boolean' },
    closeOnPopstate: { control: 'boolean' },
    className: { control: 'text' },
    rootClassName: { control: 'text' },
    container: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: PlaygroundRender,
};
export default meta;

type Story = StoryObj<typeof ModalCustom>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Open custom modal' })).toBeVisible();
  },
};
