import { LAYOUT_TYPE } from '@ds/adaptive';
import { CheckSVG, CrossSVG } from '@ds/icons/interface/system';
import { NATIVE_INPUT_SUFFIX } from '@ds/toggles';
import { TEST_IDS as TOOLBAR_TEST_IDS, Toolbar } from '@ds/toolbar';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, LayoutScope } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

// Отдельный мок: в Interaction-панели Storybook args.fn() не всегда совпадает с инстансом в render.
const onFilterOpenChange = fn();
const onMobileAction = fn();
const onDisabledAction = fn();

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
            <LayoutScope layoutType={LAYOUT_TYPE.Desktop}>
              <Toolbar
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
            </LayoutScope>
          </div>
        </DemoActions>
      </DemoPanel>
      <DemoPanel>
        <DemoTitle>Мобильные массовые действия</DemoTitle>
        <div className={styles.containerMobile}>
          <LayoutScope layoutType={LAYOUT_TYPE.Mobile}>
            <Toolbar
              data-test-id={TEST_IDS.mobile}
              checked
              selectedCount={3}
              totalCount={100}
              bulkActions={[
                {
                  label: 'Подтвердить',
                  icon: CheckSVG,
                  onClick: onMobileAction,
                  'data-test-id': TOOLBAR_TEST_IDS.confirmAction,
                },
                {
                  label: 'Отклонить',
                  icon: CrossSVG,
                  onClick: onMobileAction,
                  'data-test-id': TOOLBAR_TEST_IDS.rejectAction,
                },
                {
                  label: 'Недоступно',
                  icon: CrossSVG,
                  onClick: onDisabledAction,
                  disabled: true,
                  'data-test-id': TOOLBAR_TEST_IDS.disabledAction,
                },
              ]}
            />
          </LayoutScope>
        </div>
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
    const desktop = within(canvas.getByTestId(TEST_IDS.root));

    await step('click: refresh button calls onRefresh', async () => {
      await userEvent.click(desktop.getByTestId(TOOLBAR_TEST_IDS.refreshButton));
      expect(args.onRefresh).toHaveBeenCalledTimes(1);
    });

    await step('click: bulk checkbox calls onCheck', async () => {
      // data-test-id чекбокса — на корневом span, а обработчик клика — на вложенном `<input>`
      // (см. test-environment-pitfalls): `userEvent.click` по корню до input не доходит, кликаем сам input.
      await userEvent.click(desktop.getByTestId(`${TOOLBAR_TEST_IDS.checkbox}${NATIVE_INPUT_SUFFIX}`));
      expect(args.onCheck).toHaveBeenCalledTimes(1);
    });

    await step('click: filter button toggles open state', async () => {
      onFilterOpenChange.mockClear();
      const filterButton = desktop.getByTestId(TOOLBAR_TEST_IDS.filterButton);
      await expect(filterButton).not.toHaveAttribute('data-filter-open');

      await userEvent.click(filterButton, { pointerEventsCheck: 0 });
      await waitFor(() => {
        expect(onFilterOpenChange).toHaveBeenCalled();
        expect(onFilterOpenChange.mock.calls.at(-1)?.[0]).toBe(true);
      });
      await expect(filterButton).toHaveAttribute('data-filter-open', 'true');
    });

    await step('mobile: bulk actions open in a sheet and preserve callbacks and disabled state', async () => {
      onMobileAction.mockClear();
      onDisabledAction.mockClear();
      const mobile = within(canvas.getByTestId(TEST_IDS.mobile));
      const body = within(canvasElement.ownerDocument.body);
      await expect(mobile.queryByTestId(TOOLBAR_TEST_IDS.confirmAction)).not.toBeInTheDocument();
      const sheet = within(body.getByTestId(TOOLBAR_TEST_IDS.mobileBulkActionsSheet));
      await userEvent.click(sheet.getByTestId(TOOLBAR_TEST_IDS.confirmAction));
      expect(onMobileAction).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(sheet.getByTestId(TOOLBAR_TEST_IDS.rejectAction)).toBeVisible());
      await userEvent.click(sheet.getByTestId(TOOLBAR_TEST_IDS.disabledAction));
      expect(onDisabledAction).not.toHaveBeenCalled();
      await userEvent.click(sheet.getByTestId(TOOLBAR_TEST_IDS.rejectAction));
      expect(onMobileAction).toHaveBeenCalledTimes(2);
      await expect(body.getByTestId(TOOLBAR_TEST_IDS.mobileBulkActionsSheet)).toBeVisible();
    });
  },
};
