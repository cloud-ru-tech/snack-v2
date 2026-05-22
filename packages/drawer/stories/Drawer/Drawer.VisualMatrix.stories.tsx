import { APPEARANCE, Button, ButtonGroup, VIEW } from '@ds/button';
import { Drawer, POSITION, Position, WIDTH, Width } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle, StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';

type Combo = {
  key: string;
  position: Position;
  width?: Width;
  heightAuto?: boolean;
};

const LR_POSITIONS: Position[] = [POSITION.Left, POSITION.Right];
const TB_POSITIONS: Position[] = [POSITION.Top, POSITION.Bottom];
const WIDTHS: Width[] = [WIDTH.S, WIDTH.M, WIDTH.L];
const HEIGHT_AUTOS = [
  { key: 'auto', value: true, label: 'auto' },
  { key: 'full', value: false, label: 'full' },
];

function VisualMatrixCanvas() {
  const [active, setActive] = useState<Combo | null>(null);
  const close = () => setActive(null);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Visual matrix</DemoTitle>
        <DemoHint>
          Триггеры сгруппированы по осям: <code>left/right × width</code> и <code>top/bottom × heightAuto</code>. Снимки
          собираются visual.spec&apos;ом: клик → screenshot → закрыть → следующий.
        </DemoHint>

        <StoryTable
          sectionTitle='Left / Right × Width'
          firstColumnHeader='position \ width'
          columnHeaders={WIDTHS.map(w => w.toUpperCase())}
          rows={LR_POSITIONS.map(position => ({
            variantLabel: position,
            cells: WIDTHS.map(width => {
              const key = `${position}-${width}`;
              return (
                <Button
                  key={key}
                  data-test-id={TEST_IDS.drawerVm.trigger(key)}
                  label={`${position} · ${width}`}
                  view={VIEW.Outline}
                  appearance={APPEARANCE.Neutral}
                  onClick={() => setActive({ key, position, width })}
                />
              );
            }),
          }))}
        />

        <StoryTable
          sectionTitle='Top / Bottom × Height'
          firstColumnHeader='position \ height'
          columnHeaders={HEIGHT_AUTOS.map(h => h.label)}
          rows={TB_POSITIONS.map(position => ({
            variantLabel: position,
            cells: HEIGHT_AUTOS.map(({ key: hKey, value, label }) => {
              const key = `${position}-${hKey}`;
              return (
                <Button
                  key={key}
                  data-test-id={TEST_IDS.drawerVm.trigger(key)}
                  label={`${position} · ${label}`}
                  view={VIEW.Outline}
                  appearance={APPEARANCE.Neutral}
                  onClick={() => setActive({ key, position, heightAuto: value })}
                />
              );
            }),
          }))}
        />
      </DemoPanel>
      {active && (
        <Drawer
          key={active.key}
          open
          onClose={close}
          position={active.position}
          width={active.width}
          heightAuto={active.heightAuto}
          title={active.key}
          subtitle={`position=${active.position}${active.width ? ` width=${active.width}` : ''}`}
          content='Содержимое панели.'
          footer={
            <ButtonGroup
              primaryAction={{
                label: 'Закрыть',
                view: 'filled',
                appearance: 'neutral',
                'data-test-id': TEST_IDS.drawerVm.dismiss,
                onClick: close,
              }}
            />
          }
        />
      )}
    </DemoPage>
  );
}

const meta: Meta<typeof VisualMatrixCanvas> = {
  title: 'Components/Drawer/Drawer',
  component: VisualMatrixCanvas,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj<typeof VisualMatrixCanvas>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
};
