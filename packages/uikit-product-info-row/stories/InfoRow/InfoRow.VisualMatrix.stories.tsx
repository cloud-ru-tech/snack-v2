import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { InfoRow, InfoRowProps } from '../../src';

const iconAction = (testId: string) => ({
  icon: <PlaceholderSVG />,
  'aria-label': 'Действие',
  'data-test-id': testId,
});

const meta: Meta<InfoRowProps> = {
  title: 'Uikit Product/InfoRow/InfoRow',
  component: InfoRow,
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<InfoRowProps>;

const widths = ['fixed', 'full'] as const;
const loadingStates = [false, true] as const;
const widthDemoFrameStyle = { width: '920px', maxWidth: '100%' } as const;

/** Три комбинации из матрицы Figma infoRow (без column=2 + maxWidth=false) */
const figmaMatrix: Array<{ column: '1' | '2'; maxWidth: boolean; label: string }> = [
  { column: '1', maxWidth: false, label: '1 / maxW false' },
  { column: '1', maxWidth: true, label: '1 / maxW true' },
  { column: '2', maxWidth: true, label: '2 / maxW true' },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='Figma matrix (column × maxWidth)'
        firstColumnHeader='combo'
        columnHeaders={['sample']}
        rows={figmaMatrix.map(({ column, maxWidth, label }) => ({
          variantLabel: label,
          cells: [
            <InfoRow
              key={label}
              label='Field A'
              secondaryLabel={column === '2' ? 'Field B' : undefined}
              content='Value A'
              secondaryContent={column === '2' ? 'Value B' : undefined}
              column={column}
              maxWidth={maxWidth}
              width='fixed'
              topDivider
              bottomDivider
              data-test-id={`info-row-figma-${column}-${maxWidth}`}
              rowActions={{
                first: iconAction(`info-row-figma-${column}-${maxWidth}-a1`),
                ...(column === '1' ? { second: iconAction(`info-row-figma-${column}-${maxWidth}-a2`) } : {}),
              }}
              secondaryRowActions={
                column === '2' ? { first: iconAction(`info-row-figma-${column}-${maxWidth}-b1`) } : undefined
              }
            />,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Width × Loading'
        firstColumnHeader='Width'
        columnHeaders={loadingStates.map(l => (l ? 'loading' : 'idle'))}
        rows={widths.map(width => ({
          variantLabel: width,
          cells: loadingStates.map(loading => (
            <div key={`${width}-${loading}`} style={widthDemoFrameStyle}>
              <InfoRow
                label='Label'
                content='Value'
                width={width}
                loading={loading}
                column='1'
                topDivider
                bottomDivider
                data-test-id={`info-row-matrix-${width}-${loading}`}
                rowActions={{
                  first: iconAction(`info-row-matrix-${width}-${loading}-a1`),
                  second: iconAction(`info-row-matrix-${width}-${loading}-a2`),
                }}
              />
            </div>
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Dividers'
        firstColumnHeader='top / bottom'
        columnHeaders={['fixed']}
        rows={[
          {
            variantLabel: 'both',
            cells: [
              <InfoRow
                key='div-both'
                label='L'
                content='C'
                topDivider
                bottomDivider
                data-test-id='info-row-div-both'
              />,
            ],
          },
          {
            variantLabel: 'top only',
            cells: [
              <InfoRow
                key='div-top'
                label='L'
                content='C'
                topDivider
                bottomDivider={false}
                data-test-id='info-row-div-top'
              />,
            ],
          },
          {
            variantLabel: 'bottom only',
            cells: [
              <InfoRow
                key='div-bottom'
                label='L'
                content='C'
                topDivider={false}
                bottomDivider
                data-test-id='info-row-div-bottom'
              />,
            ],
          },
        ]}
      />
    </>
  ),
};
