import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

export { TEST_IDS } from '../../stories/testIds';

// TODO(FF-8488): rc-drawer mask и rc-drawer content wrapper не получают наш
// `data-test-id` от потребителя (внутри библиотеки). Пока используем CSS-классы
// внутренней реализации как фоллбэк. См. TEST_IDS.public.overlay /
// TEST_IDS.public.contentWrapper — публичные значения зарезервированы и
// привяжутся к DOM, когда rc-drawer (или его замена) будет поддерживать
// прокидывание атрибута на mask/wrapper.
export const OVERLAY_SELECTOR = '.rc-drawer-mask';
export const CONTENT_WRAPPER_SELECTOR = '[data-content-wrapper]';

export const DRAWER_STORIES = {
  playground: { name: 'drawer', group: 'drawer', story: 'playground' },
  visualMatrix: { name: 'drawer', group: 'drawer', story: 'visual-matrix' },
  // stories/Drawer/tests/Drawer.PlacementsTriggers.stories.tsx
  placementsTriggers: {
    name: 'drawer-tests-placementstriggers',
    group: 'drawer',
    story: 'placements-triggers',
  },
  // stories/Drawer/examples/Drawer.NestedDrawer.stories.tsx
  nestedDrawer: {
    name: 'drawer-examples-nesteddrawer',
    group: 'drawer',
    story: 'nested-drawer',
  },
} as const satisfies Record<string, StoryRef>;

export type DrawerStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: DrawerStoryProps,
  ref: StoryRef = DRAWER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props,
  };
}
