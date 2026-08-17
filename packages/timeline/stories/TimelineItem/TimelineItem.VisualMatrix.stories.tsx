import { POSITION, STYLE, TrackItem, TrackItemProps } from '@ds/timeline';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import { DemoComponent } from '../helperComponents/DemoComponent/DemoComponent';
import styles from '../styles.module.scss';

const meta: Meta = {
  title: 'Components/Timeline/TimelineItem',
};

export default meta;

type Story = StoryObj;

type Position = TrackItemProps['position'];
type LineStyle = NonNullable<TrackItemProps['lineStyle']>;

function MatrixWrap({ children }: { children: ReactNode }) {
  return <div className={styles.matrixCell}>{children}</div>;
}

function itemProps(partial: Partial<TrackItemProps>): TrackItemProps {
  return {
    position: 'start',
    content: <DemoComponent title='Content title' description='Description' />,
    showLines: true,
    ...partial,
  };
}

const positions = Object.values(POSITION) as Position[];
const lineStyles = Object.values(STYLE) as LineStyle[];

const appearanceSamples: Array<NonNullable<TrackItemProps['dotAppearance']>> = [
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
      <section className={styles.matrixSection} aria-labelledby='track-item-matrix-position-line'>
        <StoryTable
          sectionTitle='Положение × стиль линии'
          firstColumnHeader='Положение'
          columnHeaders={lineStyles.map(s => (s === 'solid' ? 'Solid' : 'Dashed'))}
          rows={positions.map(position => ({
            variantLabel: position,
            cells: lineStyles.map(lineStyle => (
              <MatrixWrap key={`${position}-${lineStyle}`}>
                <TrackItem
                  {...itemProps({
                    position,
                    lineStyle,
                    dotVariant: 'default',
                    dotAppearance: 'primary',
                  })}
                />
              </MatrixWrap>
            )),
          }))}
        />
      </section>

      <section className={styles.matrixSection} aria-labelledby='track-item-matrix-appearance'>
        <StoryTable
          sectionTitle='Внешний вид точки (default)'
          firstColumnHeader='Appearance'
          columnHeaders={['Right', 'Left']}
          rows={appearanceSamples.map(appearance => ({
            variantLabel: appearance,
            cells: [
              <MatrixWrap key={`${appearance}-r`}>
                <TrackItem
                  {...itemProps({
                    contentPosition: 'right',
                    position: POSITION.Center,
                    lineStyle: 'dashed',
                    dotVariant: 'default',
                    dotAppearance: appearance,
                  })}
                />
              </MatrixWrap>,
              <MatrixWrap key={`${appearance}-l`}>
                <TrackItem
                  {...itemProps({
                    contentPosition: 'left',
                    position: POSITION.Center,
                    lineStyle: 'dashed',
                    dotVariant: 'default',
                    dotAppearance: appearance,
                  })}
                />
              </MatrixWrap>,
            ],
          }))}
          // tableMinWidthPx={700}
        />
      </section>

      <section className={styles.matrixSection} aria-labelledby='track-item-matrix-variant'>
        <StoryTable
          sectionTitle='Вариант точки'
          firstColumnHeader=''
          columnHeaders={['Default', 'SubEvent']}
          rows={[
            {
              variantLabel: 'primary',
              cells: [
                <MatrixWrap key='def'>
                  <TrackItem
                    {...itemProps({
                      position: 'start',
                      dotVariant: 'default',
                      dotAppearance: 'primary',
                    })}
                  />
                </MatrixWrap>,
                <MatrixWrap key='sub'>
                  <TrackItem
                    {...itemProps({
                      position: 'start',
                      dotVariant: 'subEvent',
                      dotAppearance: 'primary',
                    })}
                  />
                </MatrixWrap>,
              ],
            },
            {
              variantLabel: 'red',
              cells: [
                <MatrixWrap key='def-r'>
                  <TrackItem
                    {...itemProps({
                      position: 'start',
                      dotVariant: 'default',
                      dotAppearance: 'red',
                    })}
                  />
                </MatrixWrap>,
                <MatrixWrap key='sub-r'>
                  <TrackItem
                    {...itemProps({
                      position: 'start',
                      dotVariant: 'subEvent',
                      dotAppearance: 'red',
                    })}
                  />
                </MatrixWrap>,
              ],
            },
          ]}
        />
      </section>
    </>
  ),
};
