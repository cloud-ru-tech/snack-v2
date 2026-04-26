import { BasicFlow } from './examples/BasicFlow';

/**
 * Живое демо для страницы docs.
 * Stepper — render-prop компонент и не поддаётся playground-драйверу Canvas,
 * поэтому показываем реальный сценарий (BasicFlow).
 */
export function StepperDemo() {
  return <BasicFlow />;
}
