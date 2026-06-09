import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const CARD_VACANCY_CATEGORY = 'site';
export const CARD_VACANCY_STORY_NAME = 'cardvacancy';

export const CARD_VACANCY_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type CardVacancyStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CardVacancyStoryProps,
  story: string = CARD_VACANCY_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: CARD_VACANCY_CATEGORY,
    name: CARD_VACANCY_STORY_NAME,
    story,
    props: {
      title: 'Frontend Developer',
      description: 'Remote · Full-time',
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
