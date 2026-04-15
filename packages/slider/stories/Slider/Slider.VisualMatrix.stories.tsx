import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import sliderReadme from '../../README.md?raw';
import { Slider } from '../../src';
import styles from '../styles.module.scss';
import { VISUAL_MATRIX_COMMON } from './constants';

const meta: Meta = {
  title: 'Components/Slider/VisualMatrix',
  parameters: {
    readme: { content: sliderReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3461-243&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj;

function MatrixWrap({ children }: { children: ReactNode }) {
  return (
    <div className={styles.matrixCell}>
      <div className={styles.matrixSlider}>{children}</div>
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <section className={styles.matrixSection} aria-labelledby='slider-matrix-states'>
      <StoryTable
        sectionTitle='All states'
        firstColumnHeader='State'
        columnHeaders={['Preview']}
        rows={[
          {
            variantLabel: 'Single, enabled',
            cells: [
              <MatrixWrap key='single-enabled'>
                <Slider {...VISUAL_MATRIX_COMMON} defaultValue={35} />
              </MatrixWrap>,
            ],
          },
          {
            variantLabel: 'Single, disabled',
            cells: [
              <MatrixWrap key='single-disabled'>
                <Slider {...VISUAL_MATRIX_COMMON} defaultValue={35} disabled />
              </MatrixWrap>,
            ],
          },
          {
            variantLabel: 'Range, enabled',
            cells: [
              <MatrixWrap key='range-enabled'>
                <Slider {...VISUAL_MATRIX_COMMON} range defaultValue={[20, 40]} />
              </MatrixWrap>,
            ],
          },
          {
            variantLabel: 'Range, disabled',
            cells: [
              <MatrixWrap key='range-disabled'>
                <Slider {...VISUAL_MATRIX_COMMON} range defaultValue={[20, 40]} disabled />
              </MatrixWrap>,
            ],
          },
        ]}
        tableMinWidthPx={480}
      />
    </section>
  ),
};
