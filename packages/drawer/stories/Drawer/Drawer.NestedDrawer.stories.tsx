import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

function NestedDrawerRender() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  const closeAll = () => {
    setInnerOpen(false);
    setOuterOpen(false);
  };

  return (
    <>
      <Button label='Open parent drawer' appearance='primary' view='filled' onClick={() => setOuterOpen(true)} />
      <Drawer
        open={outerOpen}
        position='right'
        width='m'
        onClose={closeAll}
        title='Родительский Drawer'
        subtitle='При открытии вложенного Drawer — этот сдвигается влево.'
        content={
          <Button label='Открыть вложенный' appearance='primary' view='outline' onClick={() => setInnerOpen(true)} />
        }
        nestedDrawer={
          <Drawer
            open={innerOpen}
            position='right'
            width='s'
            data-test-id='biba & boba'
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
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const NestedDrawer: Story = {
  tags: ['dev'],
  render: () => <NestedDrawerRender />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Open parent drawer' })).toBeVisible();
  },
};
