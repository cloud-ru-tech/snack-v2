import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PLACEMENT, Tooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle, StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const PLACEMENTS = [PLACEMENT.Top, PLACEMENT.Right, PLACEMENT.Bottom, PLACEMENT.Left] as const;
const TIPS = [
  { key: 'short', label: 'short', tip: 'Краткая подсказка' },
  {
    key: 'long',
    label: 'long',
    tip: 'Длинная подсказка с пояснением в нескольких предложениях, которая требует переноса строки в контейнере.',
  },
];

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Visual matrix</DemoTitle>
        <DemoHint>
          Триггеры Tooltip по осям <code>placement × content-length</code>. Тултип открывается на hover/focus;
          visual.spec наводит по очереди и собирает composite.
        </DemoHint>
        <StoryTable
          firstColumnHeader='placement \ content'
          columnHeaders={TIPS.map(t => t.label)}
          rows={PLACEMENTS.map(placement => ({
            variantLabel: placement,
            cells: TIPS.map(({ key: tKey, tip }) => {
              const key = `${placement}-${tKey}`;
              return (
                <Tooltip key={key} tip={tip} placement={placement}>
                  <Button
                    data-test-id={TEST_IDS.tooltip.vmTrigger(key)}
                    label={`${placement} · ${tKey}`}
                    view={VIEW.Outline}
                    appearance={APPEARANCE.Neutral}
                  />
                </Tooltip>
              );
            }),
          }))}
        />
      </DemoPanel>
    </DemoPage>
  ),
};
