import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Drawer, POSITION, WIDTH } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, usePreviewTheme } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { resolveDrawerStoryMediaSrc, ThemedDrawerMedia } from '../ThemedDrawerMedia';

function NestedDrawerScenario() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  const previewTheme = usePreviewTheme();
  const storyMediaSrc = resolveDrawerStoryMediaSrc(previewTheme);

  const closeAll = () => {
    setInnerOpen(false);
    setOuterOpen(false);
  };

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>NestedDrawer</DemoTitle>
        <DemoHint>
          Родительский Drawer открывает вложенный — родитель сдвигается влево, вложенный накладывается. У вложенного
          своя стрелка «назад».
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.drawer.triggerOpen}
            label='Open parent drawer'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOuterOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <Drawer
        data-test-id={TEST_IDS.drawer.parent}
        open={outerOpen}
        onClose={closeAll}
        position={POSITION.Right}
        width={WIDTH.M}
        media={<ThemedDrawerMedia src={storyMediaSrc} />}
        title='Родительский Drawer'
        subtitle='При открытии вложенного Drawer — этот сдвигается влево.'
        content={
          <Button
            data-test-id={TEST_IDS.drawer.nestedTrigger}
            label='Открыть вложенный'
            appearance='primary'
            view='outline'
            onClick={() => setInnerOpen(true)}
          />
        }
        approveButton={{ label: 'Закрыть', appearance: 'neutral', onClick: closeAll }}
        nestedDrawer={
          <Drawer
            open={innerOpen}
            position={POSITION.Right}
            width={WIDTH.S}
            data-test-id={TEST_IDS.nestedDrawer}
            onClose={() => setInnerOpen(false)}
            title='Вложенный Drawer'
            subtitle='Кнопка «назад» возвращает к родителю'
            onBackButtonClick={() => setInnerOpen(false)}
            content='Вложенный Drawer рендерится внутри родителя и управляется собственным состоянием.'
            approveButton={{ label: 'Закрыть вложенный', appearance: 'neutral', onClick: () => setInnerOpen(false) }}
          />
        }
      />
    </DemoPage>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer/Examples/NestedDrawer',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const NestedDrawer: Story = {
  tags: ['test', 'dev'],
  render: () => <NestedDrawerScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.drawer.triggerOpen)).toBeVisible();
  },
};
