import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DRAWER_TRIGGER_TEST_ID } from './testIds';

function NestedDrawerRender() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

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
        position='right'
        width='m'
        onClose={closeAll}
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
            position='right'
            width='s'
            data-test-id='drawer-nested'
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
