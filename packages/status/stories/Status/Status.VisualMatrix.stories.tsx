import { APPEARANCE, Status, STATUS_SIZE, StatusProps } from '@ds/status';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './Status.VisualMatrix.module.scss';

const meta: Meta<StatusProps> = {
  title: 'Components/Status/Status',
  component: Status,
  parameters: { layout: 'padded' },
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
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Appearance × Size'
        firstColumnHeader='Appearance'
        columnHeaders={keySizesAndBackground.map(
          ([size, background]) => `${size} ${background ? 'с фоном' : 'без фона'}`,
        )}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizesAndBackground.map(([size, background]) => (
            <Status key={size} size={size} appearance={appearance} label='Label text' background={background} />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Loading × Size'
        firstColumnHeader=''
        columnHeaders={keySizesAndBackground.map(
          ([size, background]) => `${size} ${background ? 'с фоном' : 'без фона'}`,
        )}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizesAndBackground.map(([size, background]) => (
            <Status key={size} size={size} appearance={appearance} label='Label text' background={background} loading />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Progress × Size'
        firstColumnHeader=''
        columnHeaders={keySizesAndBackground.map(
          ([size, background]) => `${size} ${background ? 'с фоном' : 'без фона'}`,
        )}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizesAndBackground.map(([size, background]) => (
            <Status
              key={size}
              size={size}
              appearance={appearance}
              label='Label text'
              background={background}
              progress={60}
            />
          )),
        }))}
      />
    </div>
  ),
};
