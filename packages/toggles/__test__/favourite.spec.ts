import { expect, test } from '../../../playwright/fixtures';
import { FAVOURITE_ICON, SIZE } from '../src/constants';

const TEST_ID = 'favourite-test';
const NATIVE_INPUT_TEST_ID = `${TEST_ID}-native-input`;

const story = {
  name: 'favourite' as const,
  group: 'toggles' as const,
  story: 'playground' as const,
};

test.describe('Favourite', () => {
  test('should render with default story props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const root = getByTestId(TEST_ID);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('role', 'checkbox');
    await expect(root).toHaveAttribute('data-size', SIZE.XS);
    await expect(root).toHaveAttribute('data-icon', FAVOURITE_ICON.Star);
  });

  test('should render native input with type checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'checkbox');
  });

  test(`should render with size ${SIZE.S}`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        size: SIZE.S,
      },
    });

    await expect(getByTestId(TEST_ID)).toHaveAttribute('data-size', SIZE.S);
  });

  test('should reflect checked state (controlled)', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        checked: true,
      },
    });

    const root = getByTestId(TEST_ID);
    await expect(root).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeChecked();
  });

  test('should apply defaultChecked', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        defaultChecked: true,
      },
    });

    await expect(getByTestId(TEST_ID)).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeChecked();
  });

  test('should toggle checked on click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const root = getByTestId(TEST_ID);
    await expect(root).not.toHaveAttribute('data-checked', 'true');

    await getByTestId(NATIVE_INPUT_TEST_ID).click();

    await expect(root).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeChecked();
  });

  test('should be disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        disabled: true,
      },
    });

    await expect(getByTestId(TEST_ID)).toHaveAttribute('data-disabled', 'true');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeDisabled();
  });

  test('should hide native input and show loading on root when loading is true', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        loading: true,
      },
    });

    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toHaveCount(0);
    await expect(getByTestId(TEST_ID)).toHaveAttribute('data-loading', 'true');
  });

  test('should not toggle when disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        disabled: true,
      },
    });

    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await input.click({ force: true });

    await expect(getByTestId(TEST_ID)).not.toHaveAttribute('data-checked', 'true');
    await expect(input).not.toBeChecked();
  });

  test('should toggle by keyboard (Space)', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await expect(input).not.toBeChecked();
    await input.focus();
    await page.keyboard.press('Space');
    await expect(input).toBeChecked();
  });

  test('should not toggle by keyboard when disabled', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        disabled: true,
      },
    });

    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await expect(input).not.toBeChecked();
    await input.focus();
    await page.keyboard.press('Space');
    await expect(input).not.toBeChecked();
  });
});
