import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('FileUpload — interaction (browser-specific)', () => {
  // Реальный native <input type="file"> через page.setInputFiles(...) — недоступен
  // в Storybook play (jsdom-like environment). Здесь — единственная точка проверки
  // реального file picker pipeline.
  test('native file upload via setInputFiles populates input.files', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'multiple' }));
    const input = getByTestId(TEST_IDS.fileUpload.root);
    await input.setInputFiles([
      { name: 'a.txt', mimeType: 'text/plain', buffer: Buffer.from('a') },
      { name: 'b.txt', mimeType: 'text/plain', buffer: Buffer.from('b') },
    ]);
    const filesCount = await input.evaluate(el => (el as HTMLInputElement).files?.length ?? 0);
    expect(filesCount).toBe(2);
  });

  test('single mode: setInputFiles with one file populates input.files', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'single' }));
    const input = getByTestId(TEST_IDS.fileUpload.root);
    await input.setInputFiles({ name: 'only.txt', mimeType: 'text/plain', buffer: Buffer.from('x') });
    const filesCount = await input.evaluate(el => (el as HTMLInputElement).files?.length ?? 0);
    expect(filesCount).toBe(1);
  });
});
