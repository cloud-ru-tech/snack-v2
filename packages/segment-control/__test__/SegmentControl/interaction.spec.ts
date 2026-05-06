import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, segmentTestId } from './helpers';

const ITEMS = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
];

test.describe('SegmentControl — interaction', () => {
  test('click on segment selects it (aria-checked + data-active)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    const second = getByTestId(segmentTestId('two'));
    await second.click();

    await expect(second).toHaveAttribute('aria-checked', 'true');
    await expect(second).toHaveAttribute('data-active', 'true');
    await expect(getByTestId(segmentTestId('one'))).toHaveAttribute('aria-checked', 'false');
  });

  test('click on already selected segment keeps it selected', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    const first = getByTestId(segmentTestId('one'));
    await first.click();

    await expect(first).toHaveAttribute('aria-checked', 'true');
  });

  test('all segments disabled → click does not change selection', async ({ gotoStory, getByTestId }) => {
    const disabledItems = ITEMS.map(item => ({ ...item, disabled: true }));
    await gotoStory(buildStoryOptions({ items: disabledItems, defaultValue: 'one' }));

    const second = getByTestId(segmentTestId('two'));
    await second.click({ force: true });

    await expect(getByTestId(segmentTestId('one'))).toHaveAttribute('aria-checked', 'true');
    await expect(second).toHaveAttribute('aria-checked', 'false');
  });

  test('per-segment disabled → click does not select it', async ({ gotoStory, getByTestId }) => {
    const items = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two', disabled: true },
      { value: 'three', label: 'Three' },
    ];
    await gotoStory(buildStoryOptions({ items, defaultValue: 'one' }));

    const disabled = getByTestId(segmentTestId('two'));
    await disabled.click({ force: true });

    await expect(getByTestId(segmentTestId('one'))).toHaveAttribute('aria-checked', 'true');
    await expect(disabled).toHaveAttribute('aria-checked', 'false');
  });
});
