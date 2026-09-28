import { SIZE } from '@ds/typography';
import { PieChart } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { PIE_AGGREGATED_LEGEND, PIE_DATA } from '../mockData';
import styles from './styles.module.scss';

const meta: Meta<typeof PieChart> = {
  title: 'Uikit Product/Charts/PieChart',
  component: PieChart,
  parameters: { layout: 'padded', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

const SIZES = Object.values(SIZE);

const LEGENDS = [
  { label: 'legend', legendTitle: undefined },
  { label: 'legendTitle', legendTitle: 'Сервисы' },
] as const;

const TITLE = 'Расходы по сервисам';
const AGGREGATED_LEGEND = { title: 'Группы', data: PIE_AGGREGATED_LEGEND };

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='typographySize (legendTitle + aggregatedLegend)'
        firstColumnHeader='typographySize'
        cellAlign='start'
        columnHeaders={['PieChart']}
        rows={SIZES.map(size => ({
          variantLabel: size,
          cells: [
            <div key={size} className={styles.chart}>
              <PieChart
                data={PIE_DATA}
                options={{ title: TITLE, legendTitle: 'Сервисы', typographySize: size }}
                aggregatedLegend={AGGREGATED_LEGEND}
              />
            </div>,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Legend (typographySize=l)'
        firstColumnHeader='aggregatedLegend'
        cellAlign='start'
        columnHeaders={LEGENDS.map(({ label }) => label)}
        rows={[
          {
            variantLabel: 'none',
            cells: LEGENDS.map(({ label, legendTitle }) => (
              <div key={label} className={styles.chartCompact}>
                <PieChart data={PIE_DATA} options={{ title: TITLE, legendTitle }} />
              </div>
            )),
          },
        ]}
      />
    </div>
  ),
};
