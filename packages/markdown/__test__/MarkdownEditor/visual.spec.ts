import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  SCREENSHOT_DEFAULT_OPTS,
  STORYBOOK_ROOT_SELECTOR,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { screenshotRegion } from '#playwright-tooling/utils';

import { buildStoryOptions, MARKDOWN_EDITOR_STORIES, TEST_IDS } from './helpers';

test.describe('MarkdownEditor — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, MARKDOWN_EDITOR_STORIES.visualMatrix));
    await waitForFonts();
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  // Heading-дропдаун — портальный overlay, его нельзя собрать в VM-ячейке (перекрывает соседей).
  test('heading dropdown open', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    // preview=true — активный тулбар (в raw-режиме heading-кнопка disabled).
    await gotoStory(buildStoryOptions({ preview: true }));
    await waitForFonts();

    // Каретку ставим явно, в начало документа (первый блок — заголовок): активный пункт
    // дропдауна считается как `editor.isActive('heading')`, то есть по блоку под кареткой.
    // Без этого снимок зависел бы от того, куда tiptap помещает selection при
    // инициализации, — в 3.29 это поведение поменялось.
    await getByTestId(TEST_IDS.editorContent).click();
    await page.keyboard.press('ControlOrMeta+Home');

    const trigger = getByTestId(TEST_IDS.toolbarHeading);
    await trigger.click();
    const dropdown = getByTestId(TEST_IDS.headingDropdown);
    await dropdown.waitFor();
    const png = await screenshotRegion(page, [trigger, dropdown], 16);
    expect(png).toMatchSnapshot('open-heading.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
