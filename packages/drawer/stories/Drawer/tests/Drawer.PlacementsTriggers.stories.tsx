import { Button } from '@ds/button';
import { Drawer, POSITION, Position } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

type TriggerSpec = {
  position: Position;
  label: string;
  testId: string;
};

const TRIGGERS: TriggerSpec[] = [
  { position: POSITION.Right, label: 'right', testId: TEST_IDS.drawer.placementTrigger[POSITION.Right] },
  { position: POSITION.Left, label: 'left', testId: TEST_IDS.drawer.placementTrigger[POSITION.Left] },
  { position: POSITION.Top, label: 'top', testId: TEST_IDS.drawer.placementTrigger[POSITION.Top] },
  { position: POSITION.Bottom, label: 'bottom', testId: TEST_IDS.drawer.placementTrigger[POSITION.Bottom] },
];

function PlacementsCanvas() {
  const [activePosition, setActivePosition] = useState<Position | null>(null);

  const isHorizontal = activePosition === POSITION.Left || activePosition === POSITION.Right;

  return (
    <>
      <DemoPage>
        <DemoPanel>
          <DemoTitle>PlacementsTriggers</DemoTitle>
          <DemoHint>{'Кнопки открывают Drawer в одной из четырёх позиций.'}</DemoHint>
          <DemoActions align='center'>
            {TRIGGERS.map(spec => (
              <Button
                key={spec.position}
                data-test-id={spec.testId}
                label={spec.label}
                appearance='neutral'
                view='outline'
                onClick={() => setActivePosition(spec.position)}
              />
            ))}
          </DemoActions>
        </DemoPanel>
      </DemoPage>
      {activePosition && (
        <Drawer
          key={activePosition}
          open
          onClose={() => setActivePosition(null)}
          position={activePosition}
          width={isHorizontal ? 's' : undefined}
          heightAuto={!isHorizontal}
          title='Headline'
          subtitle='Subtitle'
          content='Body'
        />
      )}
    </>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer/Tests/PlacementsTriggers',
  component: Drawer,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const PlacementsTriggers: Story = {
  tags: ['test', 'dev'],
  render: () => <PlacementsCanvas />,
};
