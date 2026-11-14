import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PLAYGROUND_DEFAULT_ARGS, TEST_IDS } from './helpers';

test.describe('CollapseBlockPrimary — interaction', () => {
  test('expands when title is clicked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, children: 'Expanded content' }));

    const block = getByTestId(TEST_IDS.collapseBlock);
    await expect(block).not.toHaveAttribute('data-expanded');

    await getByTestId(TEST_IDS.title).click();

    await expect(block).toHaveAttribute('data-expanded', 'true');
    await expect(getByTestId(TEST_IDS.content)).toContainText('Expanded content');
  });

  test('fits wrapped content after the expanded block becomes narrower', async ({ gotoStory, getByTestId }) => {
    const text = 'Accordion content should wrap onto additional lines when the available width decreases. '.repeat(4);
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.title).click();

    const block = getByTestId(TEST_IDS.collapseBlock);
    const content = getByTestId(TEST_IDS.content);
    await expect(block).toHaveAttribute('data-completely-open', 'true');
    await content.evaluate((element, value) => {
      element.textContent = value;
    }, text);
    const originalHeight = (await content.boundingBox())?.height ?? 0;

    await block.evaluate(element => {
      element.style.width = '250px';
    });

    await expect.poll(async () => (await content.boundingBox())?.height).toBeGreaterThan(originalHeight);
    await expect
      .poll(async () => {
        const [blockBox, contentBox] = await Promise.all([block.boundingBox(), content.boundingBox()]);
        return Boolean(blockBox && contentBox && blockBox.y + blockBox.height >= contentBox.y + contentBox.height);
      })
      .toBe(true);
  });

  test('collapses on second title click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    const block = getByTestId(TEST_IDS.collapseBlock);
    const title = getByTestId(TEST_IDS.title);

    await title.click();
    await expect(block).toHaveAttribute('data-expanded', 'true');

    await title.click();
    await expect(block).not.toHaveAttribute('data-expanded');
  });

  test('chevron icon is visible and clickable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    const chevron = getByTestId(TEST_IDS.chevron);
    await expect(chevron).toBeVisible();
    await chevron.click();

    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-expanded', 'true');
  });
});
