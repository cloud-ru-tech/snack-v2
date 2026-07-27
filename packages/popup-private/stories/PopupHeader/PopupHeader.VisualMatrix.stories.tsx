import { Button } from '@ds/button';
import { PopupHeader, PopupHeaderProps } from '@ds/popup-private';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import frame from '../frame.module.scss';

const CONFIGS: { label: string; props: Partial<PopupHeaderProps> }[] = [
  { label: 'title only', props: { title: 'Заголовок окна' } },
  {
    label: 'title + subtitle',
    props: { title: 'Заголовок окна', subtitle: 'Пояснение под заголовком в одну–две строки' },
  },
  {
    label: 'title + slotSecondTitle',
    props: {
      title: 'Заголовок окна',
      slotSecondTitle: <Button size='m' fullWidth view='outline' appearance='neutral' label='Поиск / SegmentControl' />,
    },
  },
  {
    label: 'back button + action',
    props: {
      title: 'Заголовок окна',
      onBackButtonClick: () => {},
      actionButton: <Button size='s' view='outline' appearance='neutral' label='Действие' />,
    },
  },
  {
    label: 'title + slotAfterTitle',
    props: { title: 'Заголовок окна', slotAfterTitle: <Button size='s' view='function' label='Beta' /> },
  },
];

const preview = (label: string, props: Partial<PopupHeaderProps>): ReactNode => (
  <figure key={label} className={frame.item}>
    <figcaption className={frame.caption}>{label}</figcaption>
    <div className={frame.frame}>
      <PopupHeader title='Заголовок окна' {...props} />
      <div className={frame.bodyStub}>
        <span className={frame.bodyLine} />
        <span className={frame.bodyLine} />
      </div>
    </div>
  </figure>
);

const meta: Meta<PopupHeaderProps> = {
  title: 'Components/PopupPrivate/PopupHeader',
  component: PopupHeader,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<PopupHeaderProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>PopupHeader</DemoTitle>
        <DemoHint>
          Шапка overlay-слоя внутри рамки окна: заголовок, подзаголовок, кнопка «назад» и action-слот.
        </DemoHint>
        <div className={frame.grid}>{CONFIGS.map(c => preview(c.label, c.props))}</div>
      </DemoPanel>
    </DemoPage>
  ),
};
