import type { Transition } from 'framer-motion';

/**
 * Animation contract — двухслойный chip + FLIP-spring layout (1:1 из ai-components).
 *
 * Per-property timing:
 *   width / marginRight / scale  → sync, одна duration, один easing.
 *   opacity                      → со stagger (visual ripple).
 *   layout (FLIP)                → spring (110, 22, 1).
 *
 * Длительности:
 *   enter width/scale  → 650ms     opacity → 450ms, stagger 60ms
 *   exit  width/scale  → 550ms     opacity → 280ms, stagger 80ms
 */

/** easings:
 *   enter — easeOutQuart
 *   exit  — easeInQuart
 *   bubble — easeOutBack overshoot ~5% для inner scale
 */
export const ENTER_EASE: Transition['ease'] = [0.22, 1, 0.36, 1];
export const EXIT_EASE: Transition['ease'] = [0.64, 0, 0.78, 0];
export const BUBBLE_ENTER_EASE: Transition['ease'] = [0.34, 1.5, 0.64, 1];

export const ENTER_WIDTH_S = 0.65;
export const ENTER_OPACITY_S = 0.45;

export const EXIT_OPACITY_S = 0.28;
export const EXIT_WIDTH_S = 0.55;

export const STAGGER_FORWARD_OPACITY_S = 0.06;
export const STAGGER_BACKWARD_OPACITY_S = 0.08;
export const MAX_STAGGER_WINDOW_S = 0.5;

export const GAP_PX = 8;

export const layoutSpring: Transition = {
  type: 'spring',
  stiffness: 110,
  damping: 22,
  mass: 1,
};

export const cappedStagger = (idealPerChip: number, total: number, index: number): number => {
  if (total <= 1) {
    return 0;
  }

  const perChip = Math.min(idealPerChip, MAX_STAGGER_WINDOW_S / (total - 1));

  return index * perChip;
};

const sizeTransition = (activated: boolean): Transition => ({
  duration: activated ? ENTER_WIDTH_S : EXIT_WIDTH_S,
  ease: activated ? ENTER_EASE : EXIT_EASE,
});

export const outerChipTransition = (activated: boolean): Transition => ({
  width: sizeTransition(activated),
  marginRight: sizeTransition(activated),
  layout: layoutSpring,
});

export const innerChipTransition = (index: number, total: number, activated: boolean): Transition => ({
  scale: {
    duration: activated ? ENTER_WIDTH_S : EXIT_WIDTH_S,
    ease: activated ? BUBBLE_ENTER_EASE : EXIT_EASE,
  },
  opacity: {
    duration: activated ? ENTER_OPACITY_S : EXIT_OPACITY_S,
    ease: activated ? ENTER_EASE : EXIT_EASE,
    delay: activated
      ? cappedStagger(STAGGER_FORWARD_OPACITY_S, total, index)
      : cappedStagger(STAGGER_BACKWARD_OPACITY_S, total, total - 1 - index),
  },
});
