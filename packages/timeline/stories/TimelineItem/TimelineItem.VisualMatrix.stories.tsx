import { ROLE, STYLE, TrackItem, type TrackItemProps } from '@ds/timeline';
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

type Role = TrackItemProps['role'];
type LineStyle = NonNullable<TrackItemProps['lineStyle']>;

function MatrixWrap({ children }: { children: ReactNode }) {
  return <div className={styles.matrixCell}>{children}</div>;
}

function itemProps(partial: Partial<TrackItemProps>): TrackItemProps {
  return {
    role: 'start',
    content: <DemoComponent title='Content title' description='Description' />,
    showLines: true,
    ...partial,
  };
}

const roles = Object.values(ROLE) as Role[];
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
      <section className={styles.matrixSection} aria-labelledby='track-item-matrix-role-line'>
        <StoryTable
          sectionTitle='Роль × стиль линии'
          firstColumnHeader='Роль'
          columnHeaders={lineStyles.map(s => (s === 'solid' ? 'Solid' : 'Dashed'))}
          rows={roles.map(role => ({
            variantLabel: role,
            cells: lineStyles.map(lineStyle => (
              <MatrixWrap key={`${role}-${lineStyle}`}>
                <TrackItem
                  {...itemProps({
                    role,
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
                    role: ROLE.Center,
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
                    role: ROLE.Center,
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
                      role: 'start',
                      dotVariant: 'default',
                      dotAppearance: 'primary',
                    })}
                  />
                </MatrixWrap>,
                <MatrixWrap key='sub'>
                  <TrackItem
                    {...itemProps({
                      role: 'start',
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
                      role: 'start',
                      dotVariant: 'default',
                      dotAppearance: 'red',
                    })}
                  />
                </MatrixWrap>,
                <MatrixWrap key='sub-r'>
                  <TrackItem
                    {...itemProps({
                      role: 'start',
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
