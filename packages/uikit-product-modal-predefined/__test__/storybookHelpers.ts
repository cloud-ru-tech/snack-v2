import type { StorybookUrlOptions } from '#playwright-tooling/utils';

type StorybookBaseConfig = {
  category: string;
  group: string;
  storyName: string;
  testId: string;
};

export function createBuildStoryOptions({ category, group, storyName, testId }: StorybookBaseConfig) {
  return function buildStoryOptions(
    props: Record<string, unknown> = {},
    story: string,
    globals?: Record<string, unknown>,
  ): StorybookUrlOptions {
    return {
      category,
      group,
      name: storyName,
      story,
      props: {
        'data-test-id': testId,
        ...props,
      },
      ...(globals ? { globals } : {}),
    };
  };
}
