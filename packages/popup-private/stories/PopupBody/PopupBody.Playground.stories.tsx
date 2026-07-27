import { PopupBody, PopupBodyProps, PopupHeader } from '@ds/popup-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import frame from '../frame.module.scss';
import { SLOT_TEST_IDS } from '../testIds';

const LONG_CONTENT =
  'Основное содержимое overlay-слоя. Body — собственный scroll-контейнер: при переполнении высоты ' +
  'окна появляется вертикальный скролл, а шапка и футер остаются на месте. bodyPadding=true задаёт ' +
  'горизонтальные паддинги; bodyPadding=false растягивает контент во всю ширину (edge-to-edge). ' +
  'Прокрутите этот текст, чтобы увидеть поведение скролла внутри рамки окна. '.repeat(4);

const meta: Meta<PopupBodyProps> = {
  title: 'Components/PopupPrivate/PopupBody',
  component: PopupBody,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    content: LONG_CONTENT,
    bodyPadding: true,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Контейнер основного содержимого. Собственный scroll-контейнер; bodyPadding=false → edge-to-edge.
        </DemoHint>
        <div className={`${frame.frame} ${frame.frameTall}`}>
          <PopupHeader title='Заголовок окна' />
          <PopupBody {...args} />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<PopupBodyProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SLOT_TEST_IDS.body)).toBeVisible();
  },
};
