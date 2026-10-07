import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

for (const orientation of ['horizontal', 'vertical']) {
  for (const tabVariant of ['primary', 'secondary']) {
    test(`${orientation} ${tabVariant}: action, divider, label and selected hover`, async ({
      gotoStory,
      page,
      getByTestId,
    }) => {
      await gotoStory(buildStoryOptions({ orientation, tabVariant, showAction: true, longLabel: true }));
      const bar = getByTestId(TEST_IDS.tabBar.root);
      const selected = bar.getByRole('tab', { selected: true });
      const action = getByTestId('tabs__bar__after');
      const divider = bar.locator(':scope > [data-position]');
      await expect(action).toBeVisible();
      await expect(bar).toHaveAttribute('data-variant', tabVariant);
      const barBox = await bar.boundingBox();
      const dividerBox = await divider.boundingBox();
      expect(barBox).not.toBeNull();
      expect(dividerBox).not.toBeNull();
      if (!barBox || !dividerBox) throw new Error('Панель или разделитель не отображаются');
      const axis = orientation === 'horizontal' ? 'width' : 'height';
      expect(dividerBox[axis]).toBeCloseTo(barBox[axis], 0);
      const actionBox = await action.boundingBox();
      const buttonBox = await action.getByRole('button').boundingBox();
      if (!actionBox || !buttonBox) throw new Error('Действие не отображается');
      expect(actionBox.height).toBeGreaterThanOrEqual(buttonBox.height);
      const wrapper = selected.locator(':scope > div');
      const textStyle = await wrapper.evaluate(element => ({
        whiteSpace: getComputedStyle(element).whiteSpace,
        textOverflow: getComputedStyle(element).textOverflow,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }));
      expect(textStyle.whiteSpace).toBe('nowrap');
      expect(textStyle.textOverflow).not.toBe('ellipsis');
      expect(textStyle.scrollWidth).toBeLessThanOrEqual(textStyle.clientWidth + 1);
      await selected.evaluate(element => element.focus({ focusVisible: true } as FocusOptions));
      await expect(wrapper).toHaveCSS('outline-style', 'solid');
      const layer = selected.locator('[data-state-layer]');
      await page.mouse.move(0, 0);
      const background = await layer.evaluate(element => getComputedStyle(element).backgroundColor);
      // Наведение на текст не пересекается с кнопкой прокрутки у края списка.
      await wrapper.hover({ position: { x: 100, y: 10 } });
      await expect(layer).toHaveCSS('background-color', background);
    });
  }
}

test('action and divider can be absent', async ({ gotoStory, getByTestId }) => {
  await gotoStory(buildStoryOptions({ showAction: false, divider: false }));
  const bar = getByTestId(TEST_IDS.tabBar.root);
  await expect(getByTestId('tabs__bar__after')).toHaveCount(0);
  await expect(bar.locator(':scope > [data-position]')).toHaveCount(0);
});

for (const tabVariant of ['primary', 'secondary']) {
  for (const showAction of [false, true]) {
    test(`vertical ${tabVariant}, action ${showAction}: scroll controls follow overflow`, async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(buildStoryOptions({ orientation: 'vertical', tabVariant, showAction }));
      const bar = getByTestId(TEST_IDS.tabBar.root);
      const scrollArea = bar.locator('.indiana-scroll-container');
      const top = getByTestId('tabs__scroll-button-top');
      const bottom = getByTestId('tabs__scroll-button-bottom');
      await expect(top).toHaveCount(0);
      await expect(bottom).toBeVisible();
      await expect(getByTestId('tabs__scroll-button-left')).toHaveCount(0);
      await expect(getByTestId('tabs__scroll-button-right')).toHaveCount(0);

      const selectedTab = bar.getByRole('tab', { name: 'Overview', exact: true });
      await bottom.getByRole('button').click();
      await expect(top).toBeVisible();
      await expect.poll(() => scrollArea.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
      await expect(selectedTab).toHaveAttribute('aria-selected', 'true');

      await scrollArea.evaluate(element => element.scrollTo({ top: element.scrollHeight, behavior: 'instant' }));
      await expect(bottom).toHaveCount(0);
      await top.getByRole('button').click();
      await expect(bottom).toBeVisible();
      await scrollArea.evaluate(element => element.scrollTo({ top: 0, behavior: 'instant' }));
      await expect(top).toHaveCount(0);

      await bar
        .locator('..')
        .locator('..')
        .evaluate(element => {
          element.style.height = '600px';
        });
      await expect(bottom).toHaveCount(0);
      await expect(top).toHaveCount(0);
    });
  }
}

test('marker and overflow follow a variant change', async ({ gotoStory, getByTestId, setStoryArgs }) => {
  await gotoStory(buildStoryOptions({ defaultValue: 'settings', tabVariant: 'primary' }));
  const bar = getByTestId(TEST_IDS.tabBar.root);
  const selected = bar.getByRole('tab', { selected: true });
  const marker = bar.locator('[role="presentation"] > [data-position]');
  await expect(bar).toHaveAttribute('data-variant', 'primary');
  await setStoryArgs({ tabVariant: 'secondary' });
  await expect(bar).toHaveAttribute('data-variant', 'secondary');
  await expect
    .poll(async () => {
      const tabBox = await selected.boundingBox();
      const markerBox = await marker.boundingBox();
      if (!tabBox || !markerBox) return Infinity;
      return Math.abs(tabBox.width - markerBox.width) + Math.abs(tabBox.x - markerBox.x);
    })
    .toBeLessThan(1);
  await expect(getByTestId('tabs__scroll-button-right')).toBeVisible();
  await getByTestId('tabs__scroll-button-right').getByRole('button').click();
  await expect(getByTestId('tabs__scroll-button-left')).toBeVisible();
});

for (const layoutType of ['desktop', 'mobile']) {
  for (const density of ['compact', 'comfort', 'spacious'] as const) {
    for (const orientation of ['horizontal', 'vertical']) {
      for (const tabVariant of ['primary', 'secondary']) {
        test(`${layoutType} ${density} ${orientation} ${tabVariant}: action fits`, async ({
          gotoStory,
          getByTestId,
        }) => {
          await gotoStory({
            ...buildStoryOptions({ showAction: true, orientation, tabVariant }),
            globals: { layoutType, density },
          });
          const wrapper = getByTestId('tabs__bar__after');
          const actionBox = await wrapper.boundingBox();
          const buttonBox = await wrapper.getByRole('button').boundingBox();
          expect(actionBox).not.toBeNull();
          expect(buttonBox).not.toBeNull();
        });
      }
    }
  }
}
