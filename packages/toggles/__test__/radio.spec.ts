import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';
import { RADIO_STORIES_SCENARIO } from '../stories/Radio/constants';

const TEST_ID = 'radio-test';
const NATIVE_INPUT_TEST_ID = `${TEST_ID}-native-input`;

const story = {
  name: 'radio' as const,
  group: 'toggles' as const,
  story: 'playground' as const,
};

function propsForScenario(scenario: (typeof RADIO_STORIES_SCENARIO)[keyof typeof RADIO_STORIES_SCENARIO]) {
  return {
    'data-test-id': TEST_ID,
    storiesScenario: scenario,
  };
}

test.describe('Radio', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.Unchecked),
    });

    const radio = getByTestId(TEST_ID);
    await expect(radio).toBeVisible();
    await expect(radio).toHaveAttribute('role', 'radio');
    await expect(radio).toHaveAttribute('data-size', SIZE.XS);
  });

  test('should render native input with type radio', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.Unchecked),
    });

    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'radio');
  });

  test('should reflect checked state (controlled)', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.Checked),
    });

    const radio = getByTestId(TEST_ID);
    await expect(radio).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeChecked();
  });

  test('should apply defaultChecked', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.DefaultChecked),
    });

    await expect(getByTestId(TEST_ID)).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeChecked();
  });

  test('should become checked on click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.Unchecked),
    });

    const radio = getByTestId(TEST_ID);
    await expect(radio).not.toHaveAttribute('data-checked', 'true');

    await getByTestId(NATIVE_INPUT_TEST_ID).click();

    await expect(radio).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeChecked();
  });

  test('should be disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.Disabled),
    });

    const radio = getByTestId(TEST_ID);
    await expect(radio).toHaveAttribute('data-disabled', 'true');
    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toBeDisabled();
  });

  test('should not toggle when disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.DisabledUnchecked),
    });

    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await input.click({ force: true });

    await expect(getByTestId(TEST_ID)).not.toHaveAttribute('data-checked', 'true');
    await expect(input).not.toBeChecked();
  });

  test('should hide native input and show loader when loading is true', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.Loading),
    });

    await expect(getByTestId(NATIVE_INPUT_TEST_ID)).toHaveCount(0);
    const radio = getByTestId(TEST_ID);
    await expect(radio.locator('[data-loading]')).toBeAttached();
  });

  test(`should render with size ${SIZE.XS}`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.SizeXs),
    });
    await expect(getByTestId(TEST_ID)).toHaveAttribute('data-size', SIZE.XS);
  });

  test(`should render with size ${SIZE.S}`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.SizeS),
    });
    await expect(getByTestId(TEST_ID)).toHaveAttribute('data-size', SIZE.S);
  });

  test('should forward name and value to native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.NameValue),
    });

    const input = getByTestId(NATIVE_INPUT_TEST_ID);
    await expect(input).toHaveAttribute('name', 'radio-group');
    await expect(input).toHaveAttribute('value', 'option-a');
  });

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...story,
      props: propsForScenario(RADIO_STORIES_SCENARIO.CustomClass),
    });

    await expect(getByTestId(TEST_ID)).toHaveClass(/custom-radio-class/);
  });
});
