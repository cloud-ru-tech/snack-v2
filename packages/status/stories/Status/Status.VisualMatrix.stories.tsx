import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import statusReadme from '../../README.md?raw';
import { APPEARANCE, Status, STATUS_SIZE, StatusProps } from '../../src';

const meta: Meta<StatusProps> = {
  title: 'Components/Status/Status',
  component: Status,
  parameters: {
    readme: { content: statusReadme },
  },
};

export default meta;
type Story = StoryObj<StatusProps>;

const keySizesAndBackground = Object.values(STATUS_SIZE).flatMap(size => [
  [size, true] as const,
  [size, false] as const,
]);
const keyAppearances = Object.values(APPEARANCE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Appearance × Size'
        firstColumnHeader='Appearance'
        columnHeaders={keySizesAndBackground.map(
          ([size, hasBackground]) => `${size} ${hasBackground ? 'с фоном' : 'без фона'}`,
        )}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizesAndBackground.map(([size, hasBackground]) => (
            <Status key={size} size={size} appearance={appearance} label='Label text' hasBackground={hasBackground} />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Loading × Size'
        firstColumnHeader=''
        columnHeaders={keySizesAndBackground.map(
          ([size, hasBackground]) => `${size} ${hasBackground ? 'с фоном' : 'без фона'}`,
        )}
        rows={[
          {
            variantLabel: '',
            cells: keySizesAndBackground.map(([size, hasBackground]) => (
              <Status
                key={size}
                size={size}
                appearance='neutral'
                label='Label text'
                hasBackground={hasBackground}
                loading
              />
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Progress × Size'
        firstColumnHeader=''
        columnHeaders={keySizesAndBackground.map(
          ([size, hasBackground]) => `${size} ${hasBackground ? 'с фоном' : 'без фона'}`,
        )}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizesAndBackground.map(([size, hasBackground]) => (
            <Status
              key={size}
              size={size}
              appearance={appearance}
              label='Label text'
              hasBackground={hasBackground}
              progress={60}
            />
          )),
        }))}
      />
    </>
  ),
};
