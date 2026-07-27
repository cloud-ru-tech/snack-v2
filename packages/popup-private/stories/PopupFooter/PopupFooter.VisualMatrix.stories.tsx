import { FooterActions, PopupFooter, PopupFooterProps } from '@ds/popup-private';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import frame from '../frame.module.scss';
import { SLOT_TEST_IDS } from '../testIds';

const footerTestIds = {
  approve: SLOT_TEST_IDS.footerApprove,
  cancel: SLOT_TEST_IDS.footerCancel,
  additional: SLOT_TEST_IDS.footerAdditional,
};

const CONFIGS: { label: string; actions: ReactNode }[] = [
  {
    label: 'single',
    actions: <FooterActions approveButton={{ label: 'Применить' }} testIds={footerTestIds} />,
  },
  {
    label: 'pair',
    actions: (
      <FooterActions
        approveButton={{ label: 'Применить' }}
        cancelButton={{ label: 'Отмена' }}
        testIds={footerTestIds}
      />
    ),
  },
  {
    label: 'triple',
    actions: (
      <FooterActions
        approveButton={{ label: 'Применить' }}
        cancelButton={{ label: 'Отмена' }}
        additionalButton={{ label: 'Ещё' }}
        testIds={footerTestIds}
      />
    ),
  },
];

const preview = (label: string, actions: ReactNode): ReactNode => (
  <figure key={label} className={frame.item}>
    <figcaption className={frame.caption}>{label}</figcaption>
    <div className={frame.frame}>
      <div className={frame.bodyStub}>
        <span className={frame.bodyLine} />
        <span className={frame.bodyLine} />
      </div>
      <PopupFooter>{actions}</PopupFooter>
    </div>
  </figure>
);

const meta: Meta<PopupFooterProps> = {
  title: 'Components/PopupPrivate/PopupFooter',
  component: PopupFooter,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<PopupFooterProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>PopupFooter</DemoTitle>
        <DemoHint>
          Нижняя action-зона overlay-слоя внизу рамки окна: одна кнопка, пара кнопок и три кнопки с дисклеймером.
        </DemoHint>
        <div className={frame.grid}>{CONFIGS.map(c => preview(c.label, c.actions))}</div>
      </DemoPanel>
    </DemoPage>
  ),
};
