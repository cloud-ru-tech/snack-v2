import { POSITION, STYLE, Track, TrackProps, VARIANT } from '@ds/timeline';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';

const meta: Meta = {
  title: 'Components/Timeline/Track',
};

export default meta;

type Story = StoryObj;

type Position = TrackProps['position'];
type LineStyle = NonNullable<TrackProps['lineStyle']>;
type DotVariant = NonNullable<TrackProps['dotVariant']>;

function trackProps(partial: Partial<TrackProps>): TrackProps {
  return {
    position: 'start',
    lineStyle: 'solid',
    dotVariant: 'default',
    dotAppearance: 'primary',
    showLines: true,
    ...partial,
  };
}

function TrackWithContent(props: TrackProps) {
  return (
    <div className={`${styles.trackWithContent} ${styles.trackWithContentAppearanceFill}`}>
      <Track {...props} />
    </div>
  );
}

function MatrixCellTrack(partial: Partial<TrackProps>) {
  return (
    <div className={styles.appearanceMatrixCell}>
      <TrackWithContent {...trackProps(partial)} />
    </div>
  );
}

const positions = Object.values(POSITION) as Position[];
const lineStyles = Object.values(STYLE) as LineStyle[];
const dotVariants = Object.values(VARIANT) as DotVariant[];

const lineColumnLabels = lineStyles.map(s => (s === 'solid' ? 'Solid' : 'Dashed'));

const appearanceSamples: Array<NonNullable<TrackProps['dotAppearance']>> = [
  'neutral',
  'primary',
  'green',
  'red',
  'blue',
  'orange',
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <section className={styles.matrixSection} aria-labelledby='track-matrix-position-line-default'>
        <StoryTable
          sectionTitle='Положение × стиль линии (точка default)'
          firstColumnHeader='Положение'
          columnHeaders={lineColumnLabels}
          rows={positions.map(position => ({
            variantLabel: position,
            cells: lineStyles.map(lineStyle => (
              <MatrixCellTrack
                key={`${position}-${lineStyle}-def`}
                position={position}
                lineStyle={lineStyle}
                dotVariant='default'
                dotAppearance='primary'
              />
            )),
          }))}
        />
      </section>

      <section className={styles.matrixSection} aria-labelledby='track-matrix-position-line-sub'>
        <StoryTable
          sectionTitle='Положение × стиль линии (точка subEvent)'
          firstColumnHeader='Положение'
          columnHeaders={lineColumnLabels}
          rows={positions.map(position => ({
            variantLabel: position,
            cells: lineStyles.map(lineStyle => (
              <MatrixCellTrack
                key={`${position}-${lineStyle}-sub`}
                position={position}
                lineStyle={lineStyle}
                dotVariant='subEvent'
                dotAppearance='primary'
              />
            )),
          }))}
        />
      </section>

      <section className={styles.matrixSection} aria-labelledby='track-matrix-appearance'>
        <StoryTable
          sectionTitle='Внешний вид точки (default)'
          firstColumnHeader='Appearance'
          columnHeaders={lineColumnLabels}
          rows={appearanceSamples.map(appearance => ({
            variantLabel: appearance,
            cells: lineStyles.map(lineStyle => (
              <MatrixCellTrack
                key={`${appearance}-${lineStyle}`}
                position={POSITION.Center}
                lineStyle={lineStyle}
                dotVariant='default'
                dotAppearance={appearance}
              />
            )),
          }))}
        />
      </section>

      <section className={styles.matrixSection} aria-labelledby='track-matrix-variant'>
        <StoryTable
          sectionTitle='Вариант точки × appearance (center, dashed)'
          firstColumnHeader='Appearance'
          columnHeaders={dotVariants.map(v => (v === 'default' ? 'Default' : 'SubEvent'))}
          rows={appearanceSamples.map(appearance => ({
            variantLabel: appearance,
            cells: dotVariants.map(dotVariant => (
              <MatrixCellTrack
                key={`${appearance}-${dotVariant}`}
                position={POSITION.Center}
                lineStyle='dashed'
                dotVariant={dotVariant}
                dotAppearance={appearance}
              />
            )),
          }))}
        />
      </section>
    </>
  ),
};
