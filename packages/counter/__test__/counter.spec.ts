import { expect, test } from '../../../playwright/fixtures';
import { APPEARANCE, DEFAULT_PLUS_LIMIT, SIZE, VARIANT } from '../src/constants';

const TEST_ID = 'counter';

test.describe('Counter', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'counter',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        value: 5,
      },
    });

    const counter = getByTestId(TEST_ID);
    await expect(counter).toBeVisible();
    await expect(counter).toHaveText('5');
  });

  test('should display numeric value', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'counter',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        value: 42,
      },
    });

    const counter = getByTestId(TEST_ID);
    await expect(counter).toHaveText('42');
  });

  test.describe('Variants', () => {
    test('should display count variant', async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        name: 'counter',
        story: 'playground',
        props: {
          'data-test-id': TEST_ID,
          value: 150,
          variant: VARIANT.Count,
        },
      });

      const counter = getByTestId(TEST_ID);
      await expect(counter).toHaveText('150');
      await expect(counter).toHaveAttribute('data-variant', VARIANT.Count);
    });

    test('should display count-plus variant when exceeding limit', async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'counter',
        story: 'playground',
        props: {
          'data-test-id': TEST_ID,
          value: 100,
          variant: VARIANT.CountPlus,
          plusLimit: 99,
        },
      });

      const counter = getByTestId(TEST_ID);
      await expect(counter).toHaveText('99+');
      await expect(counter).toHaveAttribute('data-variant', VARIANT.CountPlus);
    });

    test('should display exact value in count-plus variant when not exceeding limit', async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'counter',
        story: 'playground',
        props: {
          'data-test-id': TEST_ID,
          value: 50,
          variant: VARIANT.CountPlus,
          plusLimit: 99,
        },
      });

      const counter = getByTestId(TEST_ID);
      await expect(counter).toHaveText('50');
    });

    test('should display count-k variant with K notation', async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        name: 'counter',
        story: 'playground',
        props: {
          'data-test-id': TEST_ID,
          value: 5500,
          variant: VARIANT.CountK,
        },
      });

      const counter = getByTestId(TEST_ID);
      const text = await counter.textContent();
      expect(text).toMatch(/k/i);
      await expect(counter).toHaveAttribute('data-variant', VARIANT.CountK);
    });
  });

  test.describe('Sizes', () => {
    const sizes = Object.values(SIZE);

    for (const size of sizes) {
      test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'counter',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            value: 10,
            size,
          },
        });

        const counter = getByTestId(TEST_ID);
        await expect(counter).toBeVisible();
        await expect(counter).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('Appearances', () => {
    const appearances = Object.values(APPEARANCE);

    for (const appearance of appearances) {
      test(`should render with appearance ${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'counter',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            value: 10,
            appearance,
          },
        });

        const counter = getByTestId(TEST_ID);
        await expect(counter).toBeVisible();
        await expect(counter).toHaveAttribute('data-appearance', appearance);
      });
    }
  });

  test.describe('Colors', () => {
    const colors = ['accent', 'decor'];

    for (const color of colors) {
      test(`should render with color ${color}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'counter',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            value: 10,
            color,
          },
        });

        const counter = getByTestId(TEST_ID);
        await expect(counter).toBeVisible();
        await expect(counter).toHaveAttribute('data-color', color);
      });
    }
  });

  test('should handle zero value', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'counter',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        value: 0,
      },
    });

    const counter = getByTestId(TEST_ID);
    await expect(counter).toHaveText('0');
  });

  test('should use default plus limit', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'counter',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        value: DEFAULT_PLUS_LIMIT + 1,
        variant: VARIANT.CountPlus,
      },
    });

    const counter = getByTestId(TEST_ID);
    await expect(counter).toHaveText(`${DEFAULT_PLUS_LIMIT}+`);
  });

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'custom-counter-class';

    await gotoStory({
      name: 'counter',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        value: 10,
        className: customClass,
      },
    });

    const counter = getByTestId(TEST_ID);
    await expect(counter).toHaveClass(new RegExp(customClass));
  });

  test('should handle large numbers', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'counter',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        value: 999999,
        variant: VARIANT.Count,
      },
    });

    const counter = getByTestId(TEST_ID);
    await expect(counter).toBeVisible();
    const text = await counter.textContent();
    expect(text).toBeTruthy();
  });

  test('should format large numbers with K in count-k variant', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'counter',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        value: 15000,
        variant: VARIANT.CountK,
      },
    });

    const counter = getByTestId(TEST_ID);
    const text = await counter.textContent();
    // Проверяем, что число отформатировано с K
    expect(text).toMatch(/\d+\.?\d*k/i);
  });
});
