import { CheckSVG, CrossSVG } from '@ds/icons';
import { LAYOUT_TYPE, TEST_IDS as TOOLBAR_TEST_IDS, Toolbar } from '@ds/toolbar';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

// Отдельный мок: в Interaction-панели Storybook args.fn() не всегда совпадает с инстансом в render.
const onFilterOpenChange = fn();

type InteractionArgs = {
  onRefresh: () => void;
  onCheck: () => void;
};

function InteractionDemo({ onRefresh, onCheck }: InteractionArgs) {
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Refresh, bulk-checkbox и кнопка фильтров вызывают соответствующие колбэки.</DemoHint>
        <DemoActions block>
          <div className={styles.containerPlayground}>
            <Toolbar
              layoutType={LAYOUT_TYPE.Desktop}
              data-test-id={TEST_IDS.root}
              search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
              onRefresh={onRefresh}
              filterRow={{
                open: filtersOpen,
                onOpenChange: open => {
                  setFiltersOpen(open);
                  onFilterOpenChange(open);
                },
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
              checked
              selectedCount={3}
              totalCount={100}
              onCheck={onCheck}
              bulkActions={[
                { label: 'Подтвердить', icon: CheckSVG, onClick: () => undefined },
                { label: 'Отклонить', icon: CrossSVG, onClick: () => undefined },
              ]}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<InteractionArgs> = {
  title: 'Components/Toolbar/Tests/Interaction',
  component: Toolbar,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onRefresh: fn(),
    onCheck: fn(),
  },
};

export default meta;
type Story = StoryObj<InteractionArgs>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => <InteractionDemo {...args} />,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: refresh button calls onRefresh', async () => {
      await userEvent.click(canvas.getByTestId(TOOLBAR_TEST_IDS.refreshButton));
      expect(args.onRefresh).toHaveBeenCalledTimes(1);
    });

    await step('click: bulk checkbox calls onCheck', async () => {
      await userEvent.click(canvas.getByTestId(TOOLBAR_TEST_IDS.checkbox));
      expect(args.onCheck).toHaveBeenCalledTimes(1);
    });

    await step('click: filter button toggles open state', async () => {
      onFilterOpenChange.mockClear();
      const filterButton = canvas.getByTestId(TOOLBAR_TEST_IDS.filterButton);
      await expect(filterButton).not.toHaveAttribute('data-filter-open');

      await userEvent.click(filterButton, { pointerEventsCheck: 0 });
      await waitFor(() => {
        expect(onFilterOpenChange).toHaveBeenCalled();
        expect(onFilterOpenChange.mock.calls.at(-1)?.[0]).toBe(true);
      });
      await expect(filterButton).toHaveAttribute('data-filter-open', 'true');
    });
  },
};
