import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CLEAR_BUTTON_TEST_ID, FIELD_TEXT_STORIES, STORY_TEST_IDS, TEST_IDS } from './helpers';

test.describe('FieldText — keyboard navigation', () => {
  test('arrow nav: input ↔ clear button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const input = getByTestId(TEST_IDS.fieldTextInput);
    await input.click();
    await input.fill('Value');

    await input.press('End');
    await input.press('ArrowRight');
    await expect(getByTestId(CLEAR_BUTTON_TEST_ID)).toBeFocused();

    await getByTestId(CLEAR_BUTTON_TEST_ID).press('ArrowLeft');
    await expect(input).toBeFocused();
  });

  test('arrow nav: input ↔ elementBefore (ArrowLeft at start)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_TEXT_STORIES.withDroplist));
    const input = getByTestId(STORY_TEST_IDS.fieldText.droplistBeforeRoot).getByTestId(TEST_IDS.fieldTextInput);
    const beforeButton = getByTestId(STORY_TEST_IDS.fieldText.droplistBeforeButton);

    await input.click();
    await input.press('Home');
    await input.press('ArrowLeft');
    await expect(beforeButton).toBeFocused();

    await beforeButton.press('ArrowRight');
    await expect(input).toBeFocused();
  });

  test('arrow nav: input → elementAfter (ArrowRight at end)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_TEXT_STORIES.withDroplist));
    const input = getByTestId(STORY_TEST_IDS.fieldText.droplistAfterRoot).getByTestId(TEST_IDS.fieldTextInput);
    const afterButton = getByTestId(STORY_TEST_IDS.fieldText.droplistAfterButton);

    await input.click();
    await input.press('End');
    await input.press('ArrowRight');
    await expect(afterButton).toBeFocused();
  });

  // Сцена с одновременно видимой clear-кнопкой и слот-кнопкой elementAfter: roving-цепочка
  // input → clear → elementAfter в три перехода, и обратный ArrowLeft с elementAfter ведёт
  // на clear (а не сразу в input), пока clear видна.
  test('arrow nav: 3-hop input → clear → elementAfter, then back to clear', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_TEXT_STORIES.rovingScene));
    const root = getByTestId(STORY_TEST_IDS.fieldText.rovingSceneRoot);
    const input = root.getByTestId(TEST_IDS.fieldTextInput);
    const clearButton = getByTestId(CLEAR_BUTTON_TEST_ID);
    const afterButton = getByTestId(STORY_TEST_IDS.fieldText.droplistAfterButton);

    await input.click();
    await input.press('End');
    await input.press('ArrowRight');
    await expect(clearButton).toBeFocused();

    await clearButton.press('ArrowRight');
    await expect(afterButton).toBeFocused();

    // ArrowLeft с elementAfter возвращает на видимую postfix-кнопку (clear), не в input.
    await afterButton.press('ArrowLeft');
    await expect(clearButton).toBeFocused();
  });

  // ArrowDown на слот-кнопке elementAfter раскрывает встроенный Droplist (портал с пунктами).
  test('elementAfter: ArrowDown opens the embedded droplist', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_TEXT_STORIES.rovingScene));
    const afterButton = getByTestId(STORY_TEST_IDS.fieldText.droplistAfterButton);
    await afterButton.focus();
    await afterButton.press('ArrowDown');

    // Пункты несут явные story-id; ищем по document (портал монтируется вне корня поля).
    await expect(getByTestId(`${STORY_TEST_IDS.fieldText.droplistItem}-1`)).toBeVisible();
  });
});
