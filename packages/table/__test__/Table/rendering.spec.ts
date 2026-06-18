import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  COMFORT_DENSITY_GLOBALS,
  DEFAULT_PAGE_SIZE,
  getPageNumberTestId,
  TABLE_KEY_COMBOS,
  TABLE_STORIES,
  TEST_IDS,
} from './helpers';

// Behavioral assertions (sort/select/expand/row actions/search/paginate/view
// switch + callbacks) живут в stories/Table/tests/Table.Interaction::play и
// в play-функциях examples (CardView, Filters, ColumnsSettings). Здесь — только
// scenario-driven render: что DOM собирается из props/URL-args.

// Playground args: data = SAMPLE_USERS (15 строк), pageSize = 10.
const PLAYGROUND_PAGE_SIZE = 10;

const COMPONENT = TEST_IDS.component;

test.describe('Table — rendering', () => {
  test.describe('render', () => {
    test('renders root with toolbar, header row and first page of rows', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      const root = getByTestId(TEST_IDS.table.root);
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute('data-view', 'table');
      await expect(root).toHaveAttribute('data-with-toolbar', 'true');
      await expect(getByTestId(COMPONENT.toolbar)).toBeVisible();
      await expect(getByTestId(COMPONENT.headerRow)).toBeVisible();
      await expect(getByTestId(COMPONENT.bodyRow)).toHaveCount(PLAYGROUND_PAGE_SIZE);
    });

    test('onExport renders the export trigger in the toolbar', async ({ gotoStory, getByTestId }) => {
      // Playground имеет onExport=fn() по умолчанию — кнопка экспорта должна быть видна.
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(COMPONENT.export.trigger)).toBeVisible();
    });

    test('view=cards renders card grid instead of grid rows', async ({ gotoStory, getByTestId }) => {
      // Playground — controlled `view` из args; uncontrolled defaultView — в examples/CardView
      await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.cardView));
      await expect(getByTestId(TEST_IDS.table.root)).toHaveAttribute('data-view', 'cards');
      await expect(getByTestId(COMPONENT.card)).toHaveCount(PLAYGROUND_PAGE_SIZE);
      await expect(getByTestId(COMPONENT.headerRow)).toHaveCount(0);
      await expect(getByTestId(COMPONENT.bodyRow)).toHaveCount(0);
    });

    test('suppressToolbar removes toolbar and data-with-toolbar', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ suppressToolbar: true }));
      const root = getByTestId(TEST_IDS.table.root);
      await expect(root).toBeVisible();
      await expect(root).not.toHaveAttribute('data-with-toolbar');
      await expect(getByTestId(COMPONENT.toolbar)).toHaveCount(0);
    });

    test('suppressPagination hides pagination footer', async ({ gotoStory, getByTestId }) => {
      // 15 строк при pageSize=10 → 2 страницы, пагинация видна по умолчанию
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(getPageNumberTestId(2))).toBeVisible();

      await gotoStory(buildStoryOptions({ suppressPagination: true }));
      await expect(getByTestId(TEST_IDS.table.root)).toBeVisible();
      await expect(getByTestId(getPageNumberTestId(1))).toHaveCount(0);
    });

    test('tree: expanded parent renders child rows with chevrons', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.tree));
      // TREE_USERS: org-cloud раскрыт → 3 дочерних + org-data (свёрнут) = 5 видимых строк
      await expect(getByTestId(COMPONENT.bodyRow)).toHaveCount(5);
      await expect(getByTestId(COMPONENT.tree.node)).toHaveCount(5);
      const chevrons = getByTestId(COMPONENT.tree.chevron);
      // org-cloud-1 — leaf без детей, chevron только у узлов с subRows
      await expect(chevrons).toHaveCount(4);
      // первый chevron принадлежит раскрытому org-cloud
      await expect(chevrons.first()).toHaveAttribute('data-expanded', 'true');
    });

    test('status column renders indicator and label per row', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.statusColumn));
      await expect(getByTestId(COMPONENT.statusIndicator)).toHaveCount(PLAYGROUND_PAGE_SIZE);
      // первая строка fixtures (u-1, active) → подпись «Активен» внутри <Status>
      await expect(getByTestId(COMPONENT.statusIndicator).first()).toContainText('Активен');
    });

    test('selection: checkboxes render and initial selection marks rows', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.selection));
      const rows = getByTestId(COMPONENT.bodyRow);
      await expect(rows).toHaveCount(PLAYGROUND_PAGE_SIZE);
      await expect(getByTestId(COMPONENT.rowSelect)).toHaveCount(PLAYGROUND_PAGE_SIZE);
      // story преселектит u-1 и u-3 — data-selected стоит ровно на этих строках
      const selectedIds = await rows.evaluateAll(elements =>
        elements.filter(el => el.hasAttribute('data-selected')).map(el => el.getAttribute('data-row-id')),
      );
      expect(selectedIds).toEqual(['u-1', 'u-3']);
    });

    test('row actions: per-row droplist trigger renders', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.rowActions));
      await expect(getByTestId(COMPONENT.rowActions.droplistTrigger)).toHaveCount(PLAYGROUND_PAGE_SIZE);
    });

    test('layoutType=mobile with defaultView=cards renders card list', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions(
          { layoutType: 'mobile', defaultView: 'cards' },
          TABLE_STORIES.mobileLayout,
          COMFORT_DENSITY_GLOBALS,
        ),
      );
      const root = getByTestId(TEST_IDS.table.root);
      await expect(root).toHaveAttribute('data-layout-type', 'mobile');
      await expect(root).toHaveAttribute('data-view', 'cards');
      await expect(getByTestId(COMPONENT.card)).toHaveCount(DEFAULT_PAGE_SIZE);
      await expect(getByTestId(COMPONENT.headerRow)).toHaveCount(0);
      await expect(getByTestId(COMPONENT.bodyRow)).toHaveCount(0);
    });

    test('layoutType=mobile with defaultView=table renders grid rows', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ layoutType: 'mobile' }, TABLE_STORIES.playground, COMFORT_DENSITY_GLOBALS));
      const root = getByTestId(TEST_IDS.table.root);
      await expect(root).toHaveAttribute('data-layout-type', 'mobile');
      await expect(root).toHaveAttribute('data-view', 'table');
      await expect(getByTestId(COMPONENT.bodyRow)).toHaveCount(PLAYGROUND_PAGE_SIZE);
      await expect(getByTestId(COMPONENT.card)).toHaveCount(0);
    });

    test('fullWidth=false sets data-fit-content on root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ fullWidth: false }));
      await expect(getByTestId(TEST_IDS.table.root)).toHaveAttribute('data-fit-content', 'true');
    });

    test('fullWidth example: fit-content table is narrower than full-width sibling', async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.fullWidth));
      const fullRoot = getByTestId(`${TEST_IDS.table.root}-full`);
      const fitRoot = getByTestId(`${TEST_IDS.table.root}-fit`);
      await expect(fullRoot).toBeVisible();
      await expect(fitRoot).toBeVisible();
      await expect(fullRoot).not.toHaveAttribute('data-fit-content');
      await expect(fitRoot).toHaveAttribute('data-fit-content', 'true');

      const fullWidth = await fullRoot.evaluate(element => element.getBoundingClientRect().width);
      const fitWidth = await fitRoot.evaluate(element => element.getBoundingClientRect().width);
      expect(fitWidth).toBeLessThan(fullWidth);
    });

    test('fullWidth=false on mobile ignores prop and stays full width', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions(
          { fullWidth: false, layoutType: 'mobile' },
          TABLE_STORIES.playground,
          COMFORT_DENSITY_GLOBALS,
        ),
      );

      await expect(getByTestId(TEST_IDS.table.root)).not.toHaveAttribute('data-fit-content');
    });
  });

  test.describe('states', () => {
    test('loading renders skeleton rows instead of data', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));
      const rows = getByTestId(COMPONENT.bodyRow);
      // skeleton-таблица рендерит pageSize строк-заглушек
      await expect(rows).toHaveCount(PLAYGROUND_PAGE_SIZE);
      // в skeleton-строках нет данных fixtures
      await expect(rows.first()).not.toContainText('Анна Иванова');
    });
  });

  test.describe('props propagation', () => {
    for (const { layoutType, view } of TABLE_KEY_COMBOS) {
      test(`${layoutType} + ${view}`, async ({ gotoStory, getByTestId }) => {
        const globals = layoutType === 'mobile' ? COMFORT_DENSITY_GLOBALS : undefined;
        await gotoStory(buildStoryOptions({ layoutType, view }, TABLE_STORIES.playground, globals));
        const root = getByTestId(TEST_IDS.table.root);
        await expect(root).toHaveAttribute('data-layout-type', layoutType);
        await expect(root).toHaveAttribute('data-view', view);
      });
    }
  });
});
