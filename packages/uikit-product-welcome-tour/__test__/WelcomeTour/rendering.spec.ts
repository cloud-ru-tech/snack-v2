import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, WELCOME_TOUR_STORIES } from './helpers';

// Поведение тура (клик «Далее» / «Назад», закрытие крестиком) живёт в
// stories/WelcomeTour/tests/WelcomeTour.InteractionTest.stories.tsx::play.
// Playwright держит только render-проверки: что смонтировалось и какие слоты видны.

test.describe('WelcomeTour — rendering', () => {
  test('mounts hint in portal after trigger click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.hint)).not.toBeAttached();

    await getByTestId(TEST_IDS.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.hint)).toBeVisible();
    await expect(getByTestId(TEST_IDS.title)).toHaveText('Шаг 1: Меню');
    await expect(getByTestId(TEST_IDS.content)).toContainText('Меню');
  });

  test('renders subtitle slot only when step provides it', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showSubtitle: true }));
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.subtitle)).toBeVisible();

    await gotoStory(buildStoryOptions({ showSubtitle: false }));
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.hint)).toBeVisible();
    await expect(getByTestId(TEST_IDS.subtitle)).not.toBeAttached();
  });

  test('renders steps indicator only for multi-step tour', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showSteps: true }));
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.steps)).toBeVisible();

    await gotoStory(buildStoryOptions({ showSteps: false }));
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.hint)).toBeVisible();
    await expect(getByTestId(TEST_IDS.steps)).not.toBeAttached();
  });

  test('first step renders next + close, without back', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.nextButton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.closeIcon)).toBeVisible();
    await expect(getByTestId(TEST_IDS.backButton)).not.toBeAttached();
  });

  test('last step renders finish button instead of next', async ({ gotoStory, getByTestId }) => {
    // Controlled-стори запускает тур с произвольного шага — последний шаг доступен
    // без прохода по туру кликами (это уже покрыто play-функцией).
    await gotoStory(buildStoryOptions(undefined, WELCOME_TOUR_STORIES.controlled));
    await getByTestId(TEST_IDS.controlled.startFrom(2)).click();

    await expect(getByTestId(TEST_IDS.finishButton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.backButton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.nextButton)).not.toBeAttached();
  });

  test('buttons prop drops slots that are not requested', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ buttons: ['primary'] }));
    await getByTestId(TEST_IDS.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.nextButton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.closeIcon)).not.toBeAttached();
  });

  test('labels prop overrides locale defaults', async ({ gotoStory, getByTestId }) => {
    // Значения латиницей: URL-args с кириллицей Storybook не декодирует и без ошибки
    // подставляет дефолт (см. test-environment-pitfalls.md).
    await gotoStory(buildStoryOptions({ labels: { next: 'Onward' } }));
    await getByTestId(TEST_IDS.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.nextButton)).toHaveText('Onward');
  });
});
