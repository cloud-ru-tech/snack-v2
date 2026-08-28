import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

export { TEST_IDS } from '../../stories/testIds';

// TODO(FF-8488): rc-drawer отдаёт для маски только `classNames`/`styles`, атрибут навесить нечем —
// отсюда селектор по классу. Литерал дублирует `$prefixCls` из DrawerCustom/styles.module.scss:
// playwright-compile не обрабатывает css-модули.
export const OVERLAY_SELECTOR = '.cloud-ru-ds-drawer-v1-mask';

/** `data-content-wrapper` ставит `DrawerCustom`; пользовательский `data-test-id` оседает на том же узле. */
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
  // stories/Drawer/examples/Drawer.InModal.stories.tsx
  inModal: {
    name: 'drawer-examples-inmodal',
    group: 'drawer',
    story: 'in-modal',
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
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props,
    globals,
  };
}
