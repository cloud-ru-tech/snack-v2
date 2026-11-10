import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TAG_ROW_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('TagRow — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.tagRow.root)).toBeVisible();
    });
  });

  test('does not reserve an overflow button when every tag fits', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ itemCount: 2, rowLimit: 1 }));
    const root = getByTestId(TEST_IDS.tagRow.root);
    await expect(root.getByText('Frontend', { exact: true }).last()).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await root.evaluate(element => {
      const measurementRow = element.firstElementChild as HTMLElement;
      const tags = [...measurementRow.children] as HTMLElement[];
      const gap = parseFloat(getComputedStyle(measurementRow).columnGap) || 0;
      element.style.width = `${tags.reduce((sum, tag) => sum + tag.offsetWidth, 0) + gap + 1}px`;
    });

    const visibleRow = root.locator('[data-test-id="tag-row__visible-row"]');
    await expect(visibleRow.getByText('Frontend', { exact: true })).toBeVisible();
    await expect(visibleRow.getByText('Backend', { exact: true })).toBeVisible();
    await expect(visibleRow.locator('button')).toHaveCount(0);
  });

  test.describe('props propagation', () => {
    for (const { size } of TAG_ROW_KEY_COMBOS) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        const root = getByTestId(TEST_IDS.tagRow.root);
        await expect(root).toBeVisible();
        // Root wrapper carries the propagated size (inner hiddenRow measurement row is display-hidden).
        await expect(root).toHaveAttribute('data-size', size);
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
