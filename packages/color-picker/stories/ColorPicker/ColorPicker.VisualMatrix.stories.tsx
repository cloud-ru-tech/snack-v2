import { COLOR_MODE, ColorPicker, SIZE } from '@ds/color-picker';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

const sizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const modes = [
  { key: COLOR_MODE.Hex, available: [COLOR_MODE.Hex] },
  { key: COLOR_MODE.Rgb, available: [COLOR_MODE.Rgb] },
  { key: COLOR_MODE.Hsv, available: [COLOR_MODE.Hsv] },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Size × ColorModel (autoApply, withAlpha)'
        firstColumnHeader='ColorModel'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={modes.map(({ key, available }) => ({
          variantLabel: key,
          cells: sizes.map(size => (
            <ColorPicker
              key={`${key}-${size}`}
              size={size}
              autoApply
              withAlpha
              value='#ff0000'
              availableModes={[...available]}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Size × Alpha (Hex, autoApply)'
        firstColumnHeader='Alpha'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'withAlpha',
            cells: sizes.map(size => (
              <ColorPicker
                key={`alpha-${size}`}
                size={size}
                autoApply
                withAlpha
                value='#ff0000cc'
                availableModes={[COLOR_MODE.Hex]}
              />
            )),
          },
          {
            variantLabel: 'noAlpha',
            cells: sizes.map(size => (
              <ColorPicker
                key={`noalpha-${size}`}
                size={size}
                autoApply
                withAlpha={false}
                value='#ff0000'
                availableModes={[COLOR_MODE.Hex]}
              />
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Footer (autoApply on/off, size m)'
        firstColumnHeader='Mode'
        columnHeaders={['Hex']}
        rows={[
          {
            variantLabel: 'autoApply',
            cells: [<ColorPicker key='auto' size='m' autoApply value='#ff0000' availableModes={[COLOR_MODE.Hex]} />],
          },
          {
            variantLabel: 'manual',
            cells: [<ColorPicker key='manual' size='m' value='#ff0000' availableModes={[COLOR_MODE.Hex]} />],
          },
        ]}
      />
    </div>
  ),
};
