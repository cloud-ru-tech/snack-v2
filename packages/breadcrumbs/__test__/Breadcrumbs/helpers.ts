import { Page } from '@playwright/test';

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/Breadcrumbs/testIds';

export { TEST_IDS };

export const BREADCRUMBS_STORIES = {
  playground: { name: 'breadcrumbs', story: 'playground' },
  visualMatrix: { name: 'breadcrumbs', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export type BreadcrumbsStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: BreadcrumbsStoryProps,
  ref: StoryRef = BREADCRUMBS_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      storyContainerWidth: '900px',
      ...props,
    },
  };
}

export async function getTextView(page: Page): Promise<string> {
  const elements = page.locator(`[data-test-id$="element-${TEST_IDS.root}"]`);
  const count = await elements.count();
  const texts: string[] = [];

  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    const text = await element.textContent();
    const isCrumb = (await element.getAttribute('data-test-id')) === TEST_IDS.crumb;
    if (isCrumb) {
      const renderMode = await element.getAttribute('data-render-mode');
      texts.push(`[${renderMode?.toUpperCase()}: ${text}]`);
    } else {
      texts.push(text || '');
    }
  }

  return texts.join('');
}

export const CRUMB_CLICK_HOLDER = TEST_IDS.clickHolder;
