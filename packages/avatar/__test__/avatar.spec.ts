import { expect, test } from '../../../playwright/fixtures';
import { APPEARANCE, SHAPE, SIZE } from '../src/constants';

const TEST_ID = 'avatar';

test.describe('Avatar', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const avatar = getByTestId(TEST_ID);
    await expect(avatar).toBeVisible();
  });

  test('should display abbreviation by default', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        name: 'John Doe',
      },
    });

    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator('.abbreviation');

    await expect(abbreviation).toBeVisible();
    const text = await abbreviation.textContent();
    expect(text).toBe('J');
  });

  test('should display two symbols when showTwoSymbols is true', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'avatar',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        name: 'John Doe',
        showTwoSymbols: true,
      },
    });

    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator('.abbreviation');
    const text = await abbreviation.textContent();

    expect(text?.length).toBe(2);
  });

  test('should render with image when src is provided', async ({ gotoStory, getByTestId }) => {
    const imageSrc = 'https://i.pravatar.cc/300';

    await gotoStory({
      name: 'avatar',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        name: 'John Doe',
        src: imageSrc,
      },
    });

    const avatar = getByTestId(TEST_ID);
    const image = avatar.locator('img');

    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', imageSrc);
  });

  test('should fallback to abbreviation when image fails to load', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'avatar',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        name: 'John Doe',
        src: 'https://invalid-url.com/broken-image.jpg',
      },
    });

    const avatar = getByTestId(TEST_ID);

    // Ждем, пока изображение попытается загрузиться и упадет
    await avatar.page().waitForTimeout(1000);

    const abbreviation = avatar.locator('.abbreviation');
    await expect(abbreviation).toBeVisible();
  });

  test.describe('Sizes', () => {
    const sizes = Object.values(SIZE);

    for (const size of sizes) {
      test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'avatar',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            size,
          },
        });

        const avatar = getByTestId(TEST_ID);
        await expect(avatar).toBeVisible();
        await expect(avatar).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('Shapes', () => {
    const shapes = Object.values(SHAPE);

    for (const shape of shapes) {
      test(`should render with shape ${shape}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'avatar',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            shape,
          },
        });

        const avatar = getByTestId(TEST_ID);
        await expect(avatar).toBeVisible();
        await expect(avatar).toHaveAttribute('data-shape', shape);
      });
    }
  });

  test.describe('Appearances', () => {
    const appearances = Object.values(APPEARANCE);

    for (const appearance of appearances) {
      test(`should render with appearance ${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'avatar',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            appearance,
          },
        });

        const avatar = getByTestId(TEST_ID);
        await expect(avatar).toBeVisible();
        await expect(avatar).toHaveAttribute('data-appearance', appearance);
      });
    }
  });

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'custom-avatar-class';

    await gotoStory({
      name: 'avatar',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        className: customClass,
      },
    });

    const avatar = getByTestId(TEST_ID);
    await expect(avatar).toHaveClass(new RegExp(customClass));
  });

  test('should handle long names correctly', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        name: 'Very Long Name With Multiple Words',
        showTwoSymbols: true,
      },
    });

    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator('.abbreviation');
    const text = await abbreviation.textContent();

    expect(text?.length).toBe(2);
    await expect(abbreviation).toBeVisible();
  });
});
