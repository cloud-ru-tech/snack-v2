import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

const CUSTOM_SEARCH_PLACEHOLDER = { skill: 'Skill name', mention: 'Who to mention' };

test.describe('AiFieldInput — keyboard', () => {
  test('slash opens the list, arrows move into it, Enter inserts a chip', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const editor = getByTestId(TEST_IDS.editor);

    await editor.click();
    await page.keyboard.type('/');
    await expect(getByTestId(TEST_IDS.actionList)).toBeVisible();

    await page.keyboard.press('ArrowDown');
    await expect(getByTestId('summarize')).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(getByTestId(TEST_IDS.chip)).toHaveCount(1);
    await expect(getByTestId(TEST_IDS.actionList)).toHaveCount(0);
  });

  test('plus menu opens the skills list without a slash and returns focus to the field', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    const editor = getByTestId(TEST_IDS.editor);
    const expectListFocusedWithoutRow = async () => {
      await expect(getByTestId(TEST_IDS.actionList)).toBeVisible();
      await expect(getByTestId(TEST_IDS.menu)).toHaveCount(0);
      await expect
        .poll(() =>
          page.evaluate(id => {
            const active = document.activeElement;
            return Boolean(
              active && active !== document.body && active.contains(document.querySelector(`[data-test-id="${id}"]`)),
            );
          }, TEST_IDS.actionList),
        )
        .toBe(true);
    };
    const openSkills = async () => {
      await getByTestId(TEST_IDS.plus).click();
      await getByTestId(TEST_IDS.menuItem).nth(1).click();
      await expectListFocusedWithoutRow();
    };

    await editor.click();
    await page.keyboard.type('hi');
    await getByTestId(TEST_IDS.plus).focus();
    await page.keyboard.press('Enter');
    await expect(getByTestId(TEST_IDS.menuItem).first()).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(TEST_IDS.menuItem).first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(TEST_IDS.menuItem).nth(1)).toBeFocused();
    await page.keyboard.press('Enter');
    await expectListFocusedWithoutRow();
    await page.keyboard.press('ArrowDown');
    await expect(getByTestId('summarize')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(editor).toBeFocused();

    await openSkills();
    await expect(editor).toHaveText('hi');

    await page.keyboard.press('ArrowDown');
    await expect(getByTestId('summarize')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(getByTestId('translate')).toBeFocused();
    await expect(getByTestId(TEST_IDS.menu)).toHaveCount(0);

    await page.keyboard.type('x');
    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.actionList)).toHaveCount(0);
    await expect(editor).toBeFocused();
    await expect(editor).toHaveText('hi');

    await openSkills();
    await page.keyboard.press('Enter');
    await expect(getByTestId(TEST_IDS.chip)).toHaveCount(1);
    await expect(editor).toBeFocused();

    await openSkills();
    await page.keyboard.press('ArrowUp');
    await expect(getByTestId('agents')).toBeFocused();
    await page.keyboard.press('Enter');
    await expectListFocusedWithoutRow();
    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(TEST_IDS.actionListBack)).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(getByTestId('hermes')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(getByTestId(TEST_IDS.chip)).toHaveCount(2);
    await expect(editor).toBeFocused();

    await openSkills();
    await getByTestId('agents').click();
    await getByTestId('analyst').click();
    await expect(getByTestId(TEST_IDS.chip)).toHaveCount(3);
    await expect(editor).toBeFocused();
  });

  test('Escape turns search back into text and closes the list', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const editor = getByTestId(TEST_IDS.editor);

    await editor.click();
    await page.keyboard.type('@');
    await expect(getByTestId(TEST_IDS.actionList)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.actionList)).toHaveCount(0);
    await expect(editor).toContainText('@');
  });

  test('search placeholder: custom per trigger, locale default otherwise', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ searchPlaceholder: CUSTOM_SEARCH_PLACEHOLDER }));
    const editor = getByTestId(TEST_IDS.editor);

    await editor.click();
    await page.keyboard.type('/');
    await expect(editor).toContainText('Skill name');
    await page.keyboard.press('Escape');
    await page.keyboard.type(' @');
    await expect(editor).toContainText('Who to mention');

    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.editor).click();
    await page.keyboard.type('/');
    await expect(getByTestId(TEST_IDS.editor)).toContainText('Type a name');
  });
});
