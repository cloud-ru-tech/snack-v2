import { expect, test } from '../../../playwright/fixtures';
import { APPEARANCE, SHAPE, SIZE } from '../src/constants';
import { AVATAR_TEST_ID, buildStoryOptions, getAbbreviation } from './helpers';

test.describe('Avatar', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const avatar = getByTestId(AVATAR_TEST_ID);
    await expect(avatar).toBeVisible();
  });

  test('should display abbreviation by default', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ name: 'John Doe' }));

    const abbreviation = getAbbreviation(getByTestId(AVATAR_TEST_ID));

    await expect(abbreviation).toBeVisible();
    await expect(abbreviation).toHaveText('J');
  });

  test('should display two symbols when showTwoSymbols is true', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ name: 'John Doe', showTwoSymbols: true }));

    const abbreviation = getAbbreviation(getByTestId(AVATAR_TEST_ID));
    const text = await abbreviation.textContent();

    expect(text?.length).toBe(2);
  });

  test('should fallback to abbreviation when image fails to load', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        name: 'John Doe',
        src: 'https://invalid-url.com/broken-image.jpg',
      }),
    );

    const abbreviation = getAbbreviation(getByTestId(AVATAR_TEST_ID));
    await expect(abbreviation).toBeVisible();
  });

  test.describe('Sizes', () => {
    const sizes = Object.values(SIZE);

    for (const size of sizes) {
      test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        const avatar = getByTestId(AVATAR_TEST_ID);
        await expect(avatar).toBeVisible();
        await expect(avatar).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('Shapes', () => {
    const shapes = Object.values(SHAPE);

    for (const shape of shapes) {
      test(`should render with shape ${shape}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ shape }));

        const avatar = getByTestId(AVATAR_TEST_ID);
        await expect(avatar).toBeVisible();
        await expect(avatar).toHaveAttribute('data-shape', shape);
      });
    }
  });

  test.describe('Appearances', () => {
    const appearances = Object.values(APPEARANCE);

    for (const appearance of appearances) {
      test(`should render with appearance ${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance }));

        const avatar = getByTestId(AVATAR_TEST_ID);
        await expect(avatar).toBeVisible();
        await expect(avatar).toHaveAttribute('data-appearance', appearance);
      });
    }
  });

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'custom-avatar-class';

    await gotoStory(buildStoryOptions({ className: customClass }));

    const avatar = getByTestId(AVATAR_TEST_ID);
    await expect(avatar).toHaveClass(new RegExp(customClass));
  });

  test('should handle long names correctly', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        name: 'Very Long Name With Multiple Words',
        showTwoSymbols: true,
      }),
    );

    const abbreviation = getAbbreviation(getByTestId(AVATAR_TEST_ID));
    const text = await abbreviation.textContent();

    expect(text?.length).toBe(2);
    await expect(abbreviation).toBeVisible();
  });
});
