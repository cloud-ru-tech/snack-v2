/**
 * Задержка размонтирования портала после `open=false` (мс). Должна быть ≥ длительности leave-анимации
 * (slide-down `.contentWrapper` + fade `.backdrop` = 0.2s = 200ms в `styles.module.scss`), чтобы DOM
 * не исчезал до завершения анимации. Держим 200мс — leave симметричен enter (0.2s). При правке этих
 * CSS-длительностей синхронизируй и эту константу (фиксированный таймер, не `transitionend`).
 * Под `prefers-reduced-motion` анимация мгновенна, а портал всё равно живёт по таймеру (≤200мс
 * невидимого scroll-lock/focus-trap — приемлемо).
 */
export const CLOSING_TIMEOUT = 200;

/**
 * Минимальное вертикальное смещение указателя (px), после которого жест трактуется как drag.
 * До порога касание считается тапом — это защищает клики по контенту от ложного захвата drag'ом.
 */
export const DRAG_START_THRESHOLD_PX = 6;

/**
 * Cooldown (ms) после того, как вложенный скролл достиг края: в течение него повторный жест
 * не превращается в drag sheet'а. Без него инерционный скролл, доехавший до верха, мгновенно
 * читается как «потяни вниз → закрой». Аналог `SCROLL_LOCK_TIMEOUT` в vaul.
 */
export const SCROLL_LOCK_COOLDOWN_MS = 100;

/**
 * Доля высоты sheet'а, при превышении которой медленный drag вниз всё равно закрывает
 * single-snap sheet (distance-критерий, когда скорость ниже velocity-порога). Отдельная константа
 * от `CLOSE_THRESHOLD_RATIO_DEFAULT` в `utils/snapPoints.ts` намеренно: это два независимых регулятора
 * (single-snap-закрытие vs multi-snap close-порог), совпадение значения (0.3) — не повод их связывать.
 *
 * Velocity-порог быстрого флика, наоборот, единый — `VELOCITY_THRESHOLD_PX_PER_MS` из
 * `utils/snapPoints.ts` (один источник и для multi-snap-навигации, и для single-snap-закрытия).
 */
export const SINGLE_CLOSE_DISTANCE_RATIO = 0.3;
