import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TAG_ROW_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('TagRow — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.tagRow.root)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size } of TAG_ROW_KEY_COMBOS) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        const root = getByTestId(TEST_IDS.tagRow.root);
        await expect(root).toBeVisible();
        // TagRow renders inner wrapper(s) with data-size; assert at least one is present.
        const sized = root.locator(`[data-size="${size}"]`).first();
        await expect(sized).toBeVisible();
      });
    }
  });

  test.describe('link + removable', () => {
    // Тег-ссылка крестик не рендерит, а onDelete для неё не должен протекать на DOM
    // (React иначе пишет warning «Unknown event handler property onDelete»).
    test('link tags render without a remove button and do not leak onDelete', async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      const reactWarnings: string[] = [];
      page.on('console', message => {
        if (message.type() === 'error' || message.type() === 'warning') {
          reactWarnings.push(message.text());
        }
      });

      await gotoStory(buildStoryOptions({ itemCount: 4, asLinks: true, removable: true, rowLimit: 0 }));

      const root = getByTestId(TEST_IDS.tagRow.root);
      await expect(root.locator('a[data-tag-link]').first()).toBeVisible();
      // Ссылки не несут крестик-remove.
      await expect(root.locator(`a [data-test-id="${TEST_IDS.tag.removeButton}"]`)).toHaveCount(0);
      // onDelete не протёк на DOM — React-warning отсутствует.
      expect(reactWarnings.filter(text => /onDelete/i.test(text))).toHaveLength(0);
    });
  });
});
