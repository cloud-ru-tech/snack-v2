import { Timeline, type TimelineProps } from '@ds/timeline';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import { DemoComponent } from '../helperComponents/DemoComponent/DemoComponent';
import styles from '../styles.module.scss';

const meta: Meta = {
  title: 'Components/Timeline',
};

export default meta;

type Story = StoryObj;

function matrixItems(): TimelineProps['items'] {
  return [
    {
      content: <DemoComponent title='Start' description='Description' />,
      dotAppearance: 'primary',
    },
    {
      content: <DemoComponent title='Center' description='Description' />,
      lineStyle: 'dashed',
    },
    {
      content: <DemoComponent title='Sub Center' description='Long description text for wrap' />,
      lineStyle: 'dashed',
      dotVariant: 'subEvent',
      dotAppearance: 'red',
    },
    {
      content: <DemoComponent title='End' description='Description' />,
    },
  ];
}

function MatrixWrap({ children }: { children: ReactNode }) {
  return <div className={styles.matrixCell}>{children}</div>;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <section className={styles.matrixSection} aria-labelledby='timeline-matrix-layout'>
        <StoryTable
          sectionTitle='Расположение контента и режимы'
          firstColumnHeader='Режим'
          columnHeaders={['4 шага']}
          rows={[
            {
              variantLabel: 'Right',
              cells: [
                <MatrixWrap key='r'>
                  <Timeline contentPosition='right' items={matrixItems()} />
                </MatrixWrap>,
              ],
            },
            {
              variantLabel: 'Left',
              cells: [
                <MatrixWrap key='l'>
                  <Timeline contentPosition='left' items={matrixItems()} />
                </MatrixWrap>,
              ],
            },
            {
              variantLabel: 'Full width',
              cells: [
                <MatrixWrap key='fw'>
                  <Timeline contentPosition='right' fullWidth items={matrixItems()} />
                </MatrixWrap>,
              ],
            },
            {
              variantLabel: 'Alternate',
              cells: [
                <MatrixWrap key='alt'>
                  <Timeline contentPosition='right' alternate items={matrixItems()} />
                </MatrixWrap>,
              ],
            },
          ]}
          tableMinWidthPx={420}
        />
      </section>

      <section className={styles.matrixSection} aria-labelledby='timeline-matrix-count'>
        <StoryTable
          sectionTitle='Количество пунктов'
          firstColumnHeader='Количество'
          columnHeaders={['Превью']}
          rows={[
            {
              variantLabel: '1 пункт',
              cells: [
                <MatrixWrap key='1'>
                  <Timeline items={matrixItems().slice(0, 1)} />
                </MatrixWrap>,
              ],
            },
            {
              variantLabel: '2 пункта',
              cells: [
                <MatrixWrap key='2'>
                  <Timeline items={matrixItems().slice(0, 2)} />
                </MatrixWrap>,
              ],
            },
            {
              variantLabel: '3 пункта',
              cells: [
                <MatrixWrap key='3'>
                  <Timeline items={matrixItems().slice(0, 3)} />
                </MatrixWrap>,
              ],
            },
          ]}
          tableMinWidthPx={420}
        />
      </section>
    </>
  ),
};
