import type { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';

const TEST_ID = 'search-test';

const PRIVATE_INPUT_TEST_ID = 'search__field-input';
const PRIVATE_ICON_SEARCH = 'search__icon-search';
const PRIVATE_ICON_SUN = 'search__icon-sun';
const CLEAR_VALUE_TEST_ID = 'button-clear-value';

const story = {
  name: 'search-playground' as const,
  story: 'playground' as const,
};

/** Родитель SearchPrivate — `fieldContainer`, выше — корневой `div` Search. */
const getSearchRoot = (getByTestId: (testId: string) => Locator) => getByTestId(TEST_ID).locator('..').locator('..');

test.describe('Search', () => {
  test('should render with default story props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        showPostfix: false,
      },
    });

    const root = getSearchRoot(getByTestId);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('data-size', SIZE.S);
    await expect(root).toHaveAttribute('data-withbackground');
    await expect(root).not.toHaveAttribute('data-disabled', 'true');
    await expect(root).not.toHaveAttribute('data-loading', 'true');

    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(PRIVATE_INPUT_TEST_ID)).toBeVisible();
    await expect(getByTestId(PRIVATE_ICON_SEARCH)).toBeVisible();
  });

  test(`should render with size ${SIZE.M}`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        showPostfix: false,
        size: SIZE.M,
      },
    });

    await expect(getSearchRoot(getByTestId)).toHaveAttribute('data-size', SIZE.M);
    await expect(getByTestId(TEST_ID)).toHaveAttribute('data-size', SIZE.M);
  });

  test('should not set data-withbackground when background is false', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        showPostfix: false,
        background: false,
      },
    });

    await expect(getSearchRoot(getByTestId)).not.toHaveAttribute('data-withbackground');
  });

  test('should reflect disabled state on root and input', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        showPostfix: false,
        disabled: true,
      },
    });

    const root = getSearchRoot(getByTestId);
    await expect(root).toHaveAttribute('data-disabled', 'true');
    await expect(getByTestId(TEST_ID)).toHaveAttribute('data-disabled', 'true');
    await expect(getByTestId(PRIVATE_INPUT_TEST_ID)).toBeDisabled();
  });

  test('should show loading icon and data-loading on root', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        showPostfix: false,
        loading: true,
      },
    });

    const root = getSearchRoot(getByTestId);
    await expect(root).toHaveAttribute('data-loading', 'true');
    await expect(getByTestId(PRIVATE_ICON_SEARCH)).toHaveCount(0);
    await expect(getByTestId(PRIVATE_ICON_SUN)).toBeVisible();
  });

  test('should update input value when typing', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        showPostfix: false,
        value: '',
      },
    });

    const input = getByTestId(PRIVATE_INPUT_TEST_ID);
    await input.fill('query');
    await expect(input).toHaveValue('query');
  });

  test('should show clear control and clear value on click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        showPostfix: false,
        value: 'to-clear',
      },
    });

    const input = getByTestId(PRIVATE_INPUT_TEST_ID);
    await expect(input).toHaveValue('to-clear');

    await getByTestId(CLEAR_VALUE_TEST_ID).click();
    await expect(input).toHaveValue('');
  });

  test('should render postfix button when showPostfix is true', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        showPostfix: true,
      },
    });

    const postfixButton = getSearchRoot(getByTestId).locator('button[data-variant="after"]');
    await expect(postfixButton).toBeVisible();
  });

  test('should disable postfix button when Search is disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: {
        'data-test-id': TEST_ID,
        showPostfix: true,
        disabled: true,
      },
    });

    const postfixButton = getSearchRoot(getByTestId).locator('button[data-variant="after"]');
    await expect(postfixButton).toHaveAttribute('data-disabled', 'true');
  });
});
