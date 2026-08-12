import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// Leaf constants — не `stories/MainMenu/constants` (тянут demoData → CSS modules).
import { TEST_IDS } from '../../src/components/MainMenu/constants';
import { TEST_IDS as NEW_NAVIGATION_BANNER_TEST_IDS } from '../../stories/MainMenu/helperComponents/NewNavigationBanner/constants';
import { TEST_IDS as PLATFORM_SELECTOR_TEST_IDS } from '../../stories/MainMenu/helperComponents/PlatformSelector/constants';

export { TEST_IDS };

export const NAVIGATION_SEARCH_TEST_IDS = TEST_IDS.navigationSearch;

export { NEW_NAVIGATION_BANNER_TEST_IDS, PLATFORM_SELECTOR_TEST_IDS };

/** Story-only test ids (LeftTopSlot в Examples/WithSampleContent). */
export const STORY_TEST_IDS = {
  projectSelector: 'project-selector',
} as const;

const CATEGORY = 'uikit-product';
const GROUP = 'layout-header-legacy';

type MainMenuStoryRef = StoryRef & { category: string };

export const MAIN_MENU_STORIES = {
  playground: { category: CATEGORY, group: GROUP, name: 'main-menu', story: 'playground' },
  withSampleContent: {
    category: CATEGORY,
    group: GROUP,
    name: 'main-menu-examples-withsamplecontent',
    story: 'with-sample-content',
  },
} as const satisfies Record<string, MainMenuStoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: MainMenuStoryRef = MAIN_MENU_STORIES.playground,
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: {
      showLeftTop: true,
      showRightTop: true,
      showServiceGroups: true,
      showSearch: true,
      showFavorite: true,
      showSidebarBottomSlot: true,
      ...props,
    },
    globals,
  };
}
