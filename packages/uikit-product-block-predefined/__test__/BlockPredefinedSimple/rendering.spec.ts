import { expect, test } from '#playwright-tooling/fixtures';

import { BLOCK_PREDEFINED_SIMPLE_TEST_ID, buildStoryOptions } from './helpers';

test('Блок заполняет контейнер при изменении ширины страницы', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory(buildStoryOptions());
  const block = getByTestId(BLOCK_PREDEFINED_SIMPLE_TEST_ID);
  await expect(block.getByRole('button', { name: 'Экспортировать' })).toBeVisible();
  for (const width of [1248, 800]) {
    await page.setViewportSize({ width, height: 800 });
    await expect.poll(() => block.evaluate(el => el.clientWidth === el.parentElement?.clientWidth)).toBe(true);
  }
});

test('На десктопе Tab следует визуальному порядку действий', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory(buildStoryOptions());
  const block = getByTestId(BLOCK_PREDEFINED_SIMPLE_TEST_ID);
  const secondary = block.getByRole('button', { name: 'Экспортировать' });
  const primary = block.getByRole('button', { name: 'Пригласить' });
  const menu = block.getByRole('button', { name: /Другие действия|More actions/ });
  const positions = await Promise.all(
    [secondary, primary, menu].map(button => button.evaluate(el => el.getBoundingClientRect().left)),
  );
  expect(positions[0]).toBeLessThan(positions[1]);
  expect(positions[1]).toBeLessThan(positions[2]);
  await secondary.focus();
  await page.keyboard.press('Tab');
  await expect(primary).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(menu).toBeFocused();
});

test('На мобильном вторичное действие доступно через меню', async ({ page, gotoStory, getByTestId }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await gotoStory({ ...buildStoryOptions(), globals: { layoutType: 'mobile' } });
  const block = getByTestId(BLOCK_PREDEFINED_SIMPLE_TEST_ID);
  const primary = block.getByRole('button', { name: 'Пригласить' });
  await expect(primary).toBeVisible();
  await expect(block.getByRole('button', { name: 'Экспортировать' })).toHaveCount(0);
  const heading = await block.getByRole('heading').boundingBox();
  const button = await primary.boundingBox();
  if (!button || !heading) throw new Error('Шапка блока не видна');
  expect(button.y).toBeGreaterThanOrEqual(heading.y + heading.height);
  await block.getByRole('button', { name: /Другие действия|More actions/ }).click();
  const sheet = page.getByRole('dialog');
  await expect(sheet.getByText('Экспортировать', { exact: true })).toBeVisible();
  await expect(sheet.getByText('История изменений', { exact: true })).toBeVisible();
  await expect(sheet.getByRole('separator')).toHaveCount(0);
});

test('На мобильном обе текстовые кнопки делят ширину строки', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({ ...buildStoryOptions({ maxVisibleActionsItems: 2 }), globals: { layoutType: 'mobile' } });
  const block = getByTestId(BLOCK_PREDEFINED_SIMPLE_TEST_ID);
  const primary = block.getByRole('button', { name: 'Пригласить' });
  const secondary = block.getByRole('button', { name: 'Экспортировать' });
  const menu = block.getByRole('button', { name: /Другие действия|More actions/ });
  for (const width of [430, 600]) {
    await page.setViewportSize({ width, height: 800 });
    await expect(secondary).toBeVisible();
    const buttonWidth = await primary.evaluate(el => el.clientWidth);
    expect(Math.abs(buttonWidth - (await secondary.evaluate(el => el.clientWidth)))).toBeLessThanOrEqual(1);
    expect(await menu.evaluate(el => el.clientWidth)).toBeLessThan(buttonWidth);
  }
});

test('Действия сворачиваются по ширине родителя и возвращаются при расширении', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await gotoStory(buildStoryOptions({ title: 'Участники проекта и управление доступом' }));
  const block = getByTestId(BLOCK_PREDEFINED_SIMPLE_TEST_ID);
  const secondary = block.getByRole('button', { name: 'Экспортировать' });
  await expect(secondary).toBeVisible();
  await block.evaluate(el => {
    if (el.parentElement) el.parentElement.style.width = '320px';
  });
  await expect(secondary).toHaveCount(0);
  const heading = block.getByRole('heading');
  await expect.poll(() => heading.evaluate(el => el.clientWidth)).toBeGreaterThan(120);
  await expect.poll(() => block.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await block.getByRole('button', { name: /Другие действия|More actions/ }).click();
  await expect(page.getByText('Экспортировать', { exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await block.evaluate(el => {
    if (el.parentElement) el.parentElement.style.width = '100%';
  });
  await expect(secondary).toBeVisible();
});
