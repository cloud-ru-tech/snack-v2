import { Button } from '@ds/button';
import { Drawer, POSITION, Position, WIDTH, Width } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

type Combo = { position: Position; width?: Width; heightAuto?: boolean; label: string };

function DrawerTrigger({ combo }: { combo: Combo }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label={combo.label} appearance='neutral' view='outline' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position={combo.position}
        width={combo.width}
        heightAuto={combo.heightAuto}
        onClose={() => setOpen(false)}
        title={combo.label}
        subtitle={`position=${combo.position}${combo.width ? ` width=${combo.width}` : ''}`}
        content='Содержимое панели.'
      />
    </>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

const keyPositions: Position[] = [POSITION.Left, POSITION.Right, POSITION.Top, POSITION.Bottom];
const keyWidths: Width[] = [WIDTH.S, WIDTH.M, WIDTH.L];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Position (trigger buttons)'
        firstColumnHeader='Position'
        columnHeaders={['Trigger']}
        rows={keyPositions.map(position => ({
          variantLabel: position,
          cells: [<DrawerTrigger key={position} combo={{ position, label: position }} />],
        }))}
      />

      <StoryTable
        sectionTitle='Width × Position (left/right)'
        firstColumnHeader='Width'
        columnHeaders={[POSITION.Left, POSITION.Right]}
        rows={keyWidths.map(width => ({
          variantLabel: width.toUpperCase(),
          cells: [POSITION.Left, POSITION.Right].map(position => (
            <DrawerTrigger
              key={`${position}-${width}`}
              combo={{ position: position as Position, width, label: `${position} / ${width}` }}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Height-auto (top/bottom)'
        firstColumnHeader='Height'
        columnHeaders={[POSITION.Top, POSITION.Bottom]}
        rows={[
          {
            variantLabel: 'auto',
            cells: [POSITION.Top, POSITION.Bottom].map(position => (
              <DrawerTrigger
                key={`${position}-auto`}
                combo={{ position: position as Position, heightAuto: true, label: `${position} auto` }}
              />
            )),
          },
          {
            variantLabel: 'full',
            cells: [POSITION.Top, POSITION.Bottom].map(position => (
              <DrawerTrigger
                key={`${position}-full`}
                combo={{ position: position as Position, heightAuto: false, label: `${position} full` }}
              />
            )),
          },
        ]}
      />
    </>
  ),
};
