import { Page } from '@playwright/test';

import { expect } from '#playwright-tooling/fixtures';

export async function assertSemiboldFont(page: Page, testId: string) {
  const session = await page.context().newCDPSession(page);
  try {
    await session.send('DOM.enable');
    await session.send('CSS.enable');
    const { root } = await session.send('DOM.getDocument');
    const { nodeId } = await session.send('DOM.querySelector', {
      nodeId: root.nodeId,
      selector: `[data-test-id="${testId}"]`,
    });
    const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId });
    expect(fonts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ postScriptName: 'SBSansInterface-Semibold', isCustomFont: true }),
      ]),
    );
  } finally {
    await session.detach();
  }
}
