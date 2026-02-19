import { expect, test } from '../../../playwright/fixtures';
import { APPEARANCE, DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT, SIZE } from '../src/constants';

const TEST_ID = 'rating-test';

test.describe('Rating', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'rating',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const rating = getByTestId(TEST_ID);
    await expect(rating).toBeVisible();

    if (!DEFAULT_RATING_VALUE) {
      await expect(rating.locator('[aria-checked="true"]')).toHaveCount(0);
    } else {
      await expect(rating.locator('[aria-checked="true"]')).toHaveCount(DEFAULT_RATING_VALUE);
    }

    await expect(rating.locator('[role="radio"]')).toHaveCount(DEFAULT_STAR_COUNT);
  });

  test('should render with custom number of stars checked', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'rating',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        defaultValue: 3,
      },
    });

    await expect(getByTestId(TEST_ID).locator('[aria-checked="true"]')).toHaveCount(3);
  });

  test('should render with custom stars number', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'rating',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        count: 10,
      },
    });

    await expect(getByTestId(TEST_ID).locator('[role="radio"]')).toHaveCount(10);
  });

  test.describe('Sizes', () => {
    const sizes = Object.values(SIZE);

    for (const size of sizes) {
      test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'rating',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            size,
            count: DEFAULT_STAR_COUNT,
            defaultValue: DEFAULT_RATING_VALUE,
          },
        });

        const rating = getByTestId(TEST_ID);
        await expect(rating).toBeVisible();
        await expect(rating.locator(`[data-size="${size}"]`)).toHaveCount(DEFAULT_STAR_COUNT);
      });
    }
  });

  test.describe('Appearances', () => {
    const appearances = Object.values(APPEARANCE);

    for (const appearance of appearances) {
      test(`should render with appearance ${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'rating',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            appearance,
            defaultValue: 2,
          },
        });

        const rating = getByTestId(TEST_ID);
        await expect(rating).toBeVisible();
        await expect(rating.locator(`[data-appearance="${appearance}"]`)).toHaveCount(DEFAULT_STAR_COUNT);
      });
    }
  });

  test('should render without role="radio" when readonly', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'rating',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        readonly: true,
        defaultValue: 2,
      },
    });

    const rating = getByTestId(TEST_ID);
    await expect(rating).toBeVisible();
    await expect(rating.locator('[role="radio"]')).toHaveCount(0);
    await expect(rating.locator('[data-value]')).toHaveCount(DEFAULT_STAR_COUNT);
  });

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'custom-rating-class';

    await gotoStory({
      name: 'rating',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        className: customClass,
      },
    });

    const rating = getByTestId(TEST_ID);
    await expect(rating).toBeVisible();
    await expect(rating).toHaveClass(new RegExp(customClass));
  });
});
