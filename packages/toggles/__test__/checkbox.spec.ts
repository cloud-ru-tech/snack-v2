import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'checkbox-test';
const NATIVE_INPUT_TEST_ID = `${TEST_ID}-native-input`;

const story = {
  name: 'checkbox' as const,
  group: 'toggles' as const,
  story: 'playground' as const,
};

test.describe('Checkbox', () => {
  test('should switch to checked on click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).not.toBeChecked();
    await getByTestId(TEST_ID).click();
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeChecked();
  });

  test('should not switch to checked on click when disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        disabled: true,
      },
    });
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).not.toBeChecked();
    await getByTestId(TEST_ID).click({ force: true });
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).not.toBeChecked();
  });

  test('should switch by keyboard (Space)', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeVisible();
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).not.toBeChecked();
    await getByTestId(NATIVE_INPUT_TEST_ID).focus();
    await page.keyboard.press('Space');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeChecked();
  });

  test('should not switch by keyboard when disabled', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        disabled: true,
      },
    });
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).not.toBeChecked();
    await getByTestId(NATIVE_INPUT_TEST_ID).focus();
    await page.keyboard.press('Space');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).not.toBeChecked();
  });

  test('should forward id and name to native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        id: 'test-id',
        name: 'test-name',
      },
    });
    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await expect(input).toHaveAttribute('id', 'test-id');
    await expect(input).toHaveAttribute('name', 'test-name');
  });

  test('should render native input with type checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toHaveAttribute('type', 'checkbox');
  });

  test('should switch indeterminate to checked on click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        indeterminateDefault: true,
      },
    });
    const root = getByTestId(TEST_ID);
    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await expect(root).toHaveAttribute('data-indeterminate', 'true');
    await expect(input).not.toBeChecked();
    await root.click();
    await expect(root).not.toHaveAttribute('data-indeterminate', 'true');
    await expect(input).toBeChecked();
  });

  test('should switch from checked to unchecked on click (after indeterminate)', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        indeterminateDefault: true,
      },
    });
    const root = getByTestId(TEST_ID);
    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await root.click();
    await expect(input).toBeChecked();
    await root.click();
    await expect(input).not.toBeChecked();
  });

  test('should switch from checked to unchecked on click (defaultChecked, not indeterminate)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        defaultChecked: true,
      },
    });
    const root = getByTestId(TEST_ID);
    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await expect(input).toBeChecked();
    await root.click();
    await expect(input).not.toBeChecked();
  });

  test('should hide native input when loading is true', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        loading: true,
      },
    });
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toHaveCount(0);
  });
});
