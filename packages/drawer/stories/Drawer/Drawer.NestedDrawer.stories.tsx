import { Button } from '@ds/button';
import { Drawer, POSITION, TEST_IDS, WIDTH } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { usePreviewTheme } from '#storybook/components';

import { DRAWER_TRIGGER_TEST_ID } from './testIds';
import { resolveDrawerStoryMediaSrc, ThemedDrawerMedia } from './ThemedDrawerMedia';

function NestedDrawerRender() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  const previewTheme = usePreviewTheme();
  const storyMediaSrc = resolveDrawerStoryMediaSrc(previewTheme);

  const closeAll = () => {
    setInnerOpen(false);
    setOuterOpen(false);
  };

  return (
    <>
      <Button
        data-test-id={DRAWER_TRIGGER_TEST_ID}
        label='Open parent drawer'
        appearance='primary'
        view='filled'
        onClick={() => setOuterOpen(true)}
      />
      <Drawer
        data-test-id='drawer-parent'
        open={outerOpen}
        onClose={closeAll}
        position={POSITION.Right}
        width={WIDTH.M}
        media={<ThemedDrawerMedia src={storyMediaSrc} />}
        title='Родительский Drawer'
        subtitle='При открытии вложенного Drawer — этот сдвигается влево.'
        content={
          <Button
            data-test-id='drawer-nested-trigger'
            label='Открыть вложенный'
            appearance='primary'
            view='outline'
            onClick={() => setInnerOpen(true)}
          />
        }
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
          />
        }
      />
    </>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const NestedDrawer: Story = {
  tags: ['dev'],
  render: () => <NestedDrawerRender />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DRAWER_TRIGGER_TEST_ID)).toBeVisible();
  },
};
