import { Flex, GAP_SIZE } from '@ds/uikit-product-flex';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Flex> = {
  title: 'Uikit Product/Flex',
  component: Flex,
  parameters: { figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Flex>;

const box = (label: ReactNode, tall = false) => (
  <span className={tall ? `${styles.box} ${styles.boxTall}` : styles.box}>{label}</span>
);

const threeBoxes = [box(1), box(2), box(3)];

const justifyValues = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const;
const alignValues = ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'] as const;
const alignContentValues = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'] as const;
const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;
const overflowValues = ['visible', 'hidden', 'scroll', 'auto'] as const;
// Ключевая выборка из модульной шкалы для матрицы (полная шкала — в Playground / Props).
const gapValues = [GAP_SIZE.Gap1, GAP_SIZE.Gap2, GAP_SIZE.Gap3, GAP_SIZE.Gap5] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Justify (main axis)'
        firstColumnHeader='justify'
        columnHeaders={['row']}
        rows={justifyValues.map(justify => ({
          variantLabel: justify,
          cells: [
            <div key={justify} className={styles.mainAxisFrame}>
              <Flex fullWidth gap={GAP_SIZE.Gap1} justify={justify}>
                {threeBoxes}
              </Flex>
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Align (cross axis)'
        firstColumnHeader='align'
        columnHeaders={['fixed height']}
        rows={alignValues.map(align => ({
          variantLabel: align,
          cells: [
            <div key={align} className={styles.crossAxisFrame}>
              <Flex fullWidth height='100%' gap={GAP_SIZE.Gap1} align={align}>
                {box('a')}
                {box('b', true)}
                {box('c')}
              </Flex>
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Direction × Gap'
        firstColumnHeader='direction'
        columnHeaders={gapValues.map(g => g.toUpperCase())}
        rows={(['row', 'column'] as const).map(direction => ({
          variantLabel: direction,
          cells: gapValues.map(gap => (
            <Flex key={gap} direction={direction} gap={gap}>
              {box(1)}
              {box(2)}
            </Flex>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Wrap (narrow frame)'
        firstColumnHeader='wrap'
        columnHeaders={['width 140']}
        rows={wrapValues.map(wrap => ({
          variantLabel: wrap,
          cells: [
            <div key={wrap} className={styles.wrapFrame}>
              <Flex gap={GAP_SIZE.Gap1} wrap={wrap}>
                {box(1)}
                {box(2)}
                {box(3)}
                {box(4)}
              </Flex>
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Row / Column gap (independent)'
        firstColumnHeader='props'
        columnHeaders={['wrapped grid']}
        rows={[
          {
            variantLabel: 'columnGap=4m, rowGap=1m',
            cells: [
              <div key='cg' className={styles.wrapFrame}>
                <Flex wrap columnGap={GAP_SIZE.Gap4} rowGap={GAP_SIZE.Gap1}>
                  {box(1)}
                  {box(2)}
                  {box(3)}
                  {box(4)}
                </Flex>
              </div>,
            ],
          },
          {
            variantLabel: 'columnGap=1m, rowGap=4m',
            cells: [
              <div key='rg' className={styles.wrapFrame}>
                <Flex wrap columnGap={GAP_SIZE.Gap1} rowGap={GAP_SIZE.Gap4}>
                  {box(1)}
                  {box(2)}
                  {box(3)}
                  {box(4)}
                </Flex>
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Align content (multiline, tall frame)'
        firstColumnHeader='alignContent'
        columnHeaders={['wrap × tall']}
        rows={alignContentValues.map(alignContent => ({
          variantLabel: alignContent,
          cells: [
            <div key={alignContent} className={styles.alignContentFrame}>
              <Flex fullWidth height='100%' wrap alignContent={alignContent} gap={GAP_SIZE.Gap1}>
                {box(1)}
                {box(2)}
                {box(3)}
                {box(4)}
                {box(5)}
                {box(6)}
              </Flex>
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Overflow (content larger than box)'
        firstColumnHeader='overflow'
        columnHeaders={['120×70 box']}
        rows={overflowValues.map(overflow => ({
          variantLabel: overflow,
          cells: [
            <Flex key={overflow} className={styles.overflowHost} overflow={overflow} width={120} height={70}>
              <span className={styles.overflowContent} />
            </Flex>,
          ],
        }))}
      />
    </div>
  ),
};
