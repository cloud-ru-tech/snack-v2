/** Корневой `data-test-id` в Playground story для Playwright */
export const E2E_ALERT_ROOT_TEST_ID = 'alert-e2e-root';

export const alertPlaygroundStory = {
  group: 'alert' as const,
  name: 'alert' as const,
  story: 'playground' as const,
};

export const alertTopPlaygroundStory = {
  group: 'alert' as const,
  name: 'alerttop' as const,
  story: 'playground' as const,
};

export function alertPlaygroundGotoOptions(props: Record<string, unknown> = {}) {
  return {
    ...alertPlaygroundStory,
    props: {
      'data-test-id': E2E_ALERT_ROOT_TEST_ID,
      ...props,
    },
  };
}

export function alertTopPlaygroundGotoOptions(props: Record<string, unknown> = {}) {
  return {
    ...alertTopPlaygroundStory,
    props: {
      'data-test-id': E2E_ALERT_ROOT_TEST_ID,
      ...props,
    },
  };
}
