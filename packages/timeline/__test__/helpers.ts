/** Корневой `data-test-id` на внешней обёртке `Timeline` в Playground (через `extractSupportProps`). */
export const E2E_TIMELINE_ROOT_TEST_ID = 'timeline-e2e-root';

export const timelinePlaygroundStory = {
  group: 'timeline' as const,
  name: 'timeline' as const,
  story: 'playground' as const,
};

export const timelineItemPlaygroundStory = {
  group: 'timeline' as const,
  name: 'timeline-item' as const,
  story: 'playground' as const,
};

export const trackPlaygroundStory = {
  group: 'timeline' as const,
  name: 'track' as const,
  story: 'playground' as const,
};

export function timelinePlaygroundGotoOptions(props: Record<string, unknown> = {}) {
  return {
    ...timelinePlaygroundStory,
    props: {
      'data-test-id': E2E_TIMELINE_ROOT_TEST_ID,
      ...props,
    },
  };
}

export function timelineItemPlaygroundGotoOptions(props: Record<string, unknown> = {}) {
  return {
    ...timelineItemPlaygroundStory,
    props: {
      ...props,
    },
  };
}

export function trackPlaygroundGotoOptions(props: Record<string, unknown> = {}) {
  return {
    ...trackPlaygroundStory,
    props: {
      ...props,
    },
  };
}
