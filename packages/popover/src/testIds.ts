/**
 * Стабильные `data-test-id` для слотов компонента. Корневой попап-портал получает
 * `data-test-id` из пропса (через rest → extractSupportProps в PopoverPrivate), поэтому
 * `root` здесь — это рекомендованное значение для дефолтных args в stories и для
 * e2e-селекторов.
 *
 * Вынесено в отдельный файл от `constants.ts`, чтобы `stories/Popover/testIds.ts`
 * (и через него — playwright-spec'и) мог импортить только эти id, без транзитивного
 * подтягивания re-export'ов из `@ds/popover-private` (которые тянут CSS-модули и
 * ломают playwright-compile).
 */
export const TEST_IDS = {
  root: 'popover',
} as const;
