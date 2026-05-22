import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ModalCustom, ModalCustomProps, MODE, WIDTH } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

function PlaygroundRender(args: ModalCustomProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- open отбрасываем, открытие управляется триггером
  const { open: _open, ...rest } = args;
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Открыть кастомную модалку триггером ниже. Состав слотов задан вручную в render.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.modalCustom.triggerOpen}
            label='Open custom modal'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={openModal}
          />
        </DemoActions>
      </DemoPanel>
      <ModalCustom {...rest} open={isOpen} onClose={close}>
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
    </DemoPage>
  );
}

const meta: Meta<typeof ModalCustom> = {
  title: 'Components/Modal/ModalCustom',
  component: ModalCustom,
  parameters: { layout: 'fullscreen' },
  args: {
    mode: MODE.Regular,
    width: WIDTH.S,
    heightAuto: true,
    closeOnPopstate: true,
    'data-test-id': TEST_IDS.modalCustom.root,
  },
  argTypes: {
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
    await expect(within(canvasElement).getByTestId(TEST_IDS.modalCustom.triggerOpen)).toBeVisible();
  },
};
