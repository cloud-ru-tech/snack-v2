import { TEST_IDS as TOOLBAR_TEST_IDS, Toolbar } from '@ds/toolbar';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

function WithFiltersExample() {
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filterValue, setFilterValue] = useState<Record<string, unknown>>({});

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>With filters</DemoTitle>
        <DemoHint>Кнопка фильтров и строка ChipChoiceRow.</DemoHint>
        <DemoActions block>
          <div className={styles.containerPlayground}>
            <Toolbar
              data-test-id={TEST_IDS.root}
              search={{ value: search, onChange: setSearch }}
              filterRow={{
                open: filtersOpen,
                onOpenChange: setFiltersOpen,
                value: filterValue,
                onChange: setFilterValue,
                filters: [
                  {
                    id: 'status',
                    type: 'single',
                    label: 'Статус',
                    options: [
                      { value: 'active', label: 'Активные' },
                      { value: 'archived', label: 'Архив' },
                    ],
                  },
                ],
                defaultValue: {},
              }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof WithFiltersExample> = {
  title: 'Components/Toolbar/Examples/WithFilters',
  component: WithFiltersExample,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof WithFiltersExample>;

export const WithFilters: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TOOLBAR_TEST_IDS.filterButton)).toBeVisible();
    await expect(within(canvasElement).getByTestId(TOOLBAR_TEST_IDS.filterRow)).toBeVisible();
  },
};
