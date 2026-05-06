import { ROLE, STYLE, Track, type TrackProps, VARIANT } from '@ds/timeline';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';

const meta: Meta = {
  title: 'Components/Timeline/Track',
};

export default meta;

type Story = StoryObj;

type Role = TrackProps['role'];
type LineStyle = NonNullable<TrackProps['lineStyle']>;
type DotVariant = NonNullable<TrackProps['dotVariant']>;

function trackProps(partial: Partial<TrackProps>): TrackProps {
  return {
    role: 'start',
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

const roles = Object.values(ROLE) as Role[];
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
      <section className={styles.matrixSection} aria-labelledby='track-matrix-role-line-default'>
        <StoryTable
          sectionTitle='Роль × стиль линии (точка default)'
          firstColumnHeader='Роль'
          columnHeaders={lineColumnLabels}
          rows={roles.map(role => ({
            variantLabel: role,
            cells: lineStyles.map(lineStyle => (
              <MatrixCellTrack
                key={`${role}-${lineStyle}-def`}
                role={role}
                lineStyle={lineStyle}
                dotVariant='default'
                dotAppearance='primary'
              />
            )),
          }))}
        />
      </section>

      <section className={styles.matrixSection} aria-labelledby='track-matrix-role-line-sub'>
        <StoryTable
          sectionTitle='Роль × стиль линии (точка subEvent)'
          firstColumnHeader='Роль'
          columnHeaders={lineColumnLabels}
          rows={roles.map(role => ({
            variantLabel: role,
            cells: lineStyles.map(lineStyle => (
              <MatrixCellTrack
                key={`${role}-${lineStyle}-sub`}
                role={role}
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
                role={ROLE.Center}
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
                role={ROLE.Center}
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
