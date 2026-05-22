/**
 * Stories-level data-test-id для timeline-пакета. Один источник истины для stories
 * (Playground/VisualMatrix/InteractionTest/examples) и для E2E helpers.
 */
export const TEST_IDS = {
  timeline: { root: 'timeline' },
  timelineItem: {
    root: 'timeline-track-item',
    opposite: 'timeline-track-item-opposite',
  },
  track: { root: 'timeline-track', dot: 'timeline-track-dot' },
} as const;
