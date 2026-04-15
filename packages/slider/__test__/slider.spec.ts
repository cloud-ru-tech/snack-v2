import { expect, test } from '../../../playwright/fixtures';
import { THEME_CLASS } from '../src/components/constants';

const TEST_ID = 'slider-e2e';

/** Storybook title: `Components/Slider/Playground` → id `components-slider-playground--playground` */
const SLIDER_STORY_NAME = 'slider-playground';

test.describe('Slider', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: SLIDER_STORY_NAME,
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        marksPreset: 'linear',
        showMarks: false,
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 42,
      },
    });

    const root = getByTestId(TEST_ID);
    await expect(root).toBeVisible();
    const slider = root.locator(`.${THEME_CLASS}`);
    await expect(slider).toBeVisible();
    await expect(root.locator('[role="slider"]')).toHaveCount(1);
  });

  test('should reflect controlled value in story status', async ({ gotoStory, page }) => {
    await gotoStory({
      name: SLIDER_STORY_NAME,
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        marksPreset: 'linear',
        showMarks: false,
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 42,
      },
    });

    await expect(page.getByRole('status')).toContainText('42');
  });

  test('should move value with keyboard on handle', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory({
      name: SLIDER_STORY_NAME,
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        marksPreset: 'linear',
        showMarks: false,
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 10,
      },
    });

    const handle = getByTestId(TEST_ID).locator('[role="slider"]').first();
    await handle.focus();
    await page.keyboard.press('ArrowRight');

    await expect(page.getByRole('status')).toContainText('11');
  });

  test('should render range with two handles', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: SLIDER_STORY_NAME,
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        marksPreset: 'linear',
        showMarks: false,
        min: 0,
        max: 100,
        step: 1,
        range: true,
      },
    });

    const root = getByTestId(TEST_ID);
    await expect(root.locator('[role="slider"]')).toHaveCount(2);
  });

  test('should show range values in story status', async ({ gotoStory, page }) => {
    await gotoStory({
      name: SLIDER_STORY_NAME,
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        marksPreset: 'linear',
        showMarks: false,
        min: 0,
        max: 100,
        step: 1,
        range: true,
      },
    });

    // `computeValueFromArgs`: linear, без меток, range → [20, 40]
    await expect(page.getByRole('status')).toContainText('[20, 40]');
  });

  test('should disable interaction when disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: SLIDER_STORY_NAME,
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        marksPreset: 'linear',
        showMarks: false,
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        disabled: true,
      },
    });

    const handle = getByTestId(TEST_ID).locator('[role="slider"]').first();
    await expect(handle).toHaveAttribute('aria-disabled', 'true');
  });

  test('should apply reverse layout class', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: SLIDER_STORY_NAME,
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        marksPreset: 'linear',
        showMarks: false,
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        reverse: true,
      },
    });

    const slider = getByTestId(TEST_ID).locator(`.${THEME_CLASS}`);
    await expect(slider).toHaveClass(/reverse/);
  });

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'custom-slider-e2e-class';

    await gotoStory({
      name: SLIDER_STORY_NAME,
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        marksPreset: 'linear',
        showMarks: false,
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        className: customClass,
      },
    });

    const slider = getByTestId(TEST_ID).locator(`.${THEME_CLASS}`);
    await expect(slider).toHaveClass(new RegExp(customClass));
  });
});
