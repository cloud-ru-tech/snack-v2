/**
 * Статус, с которым завершился тур, — приходит в `onOpenChange` вторым аргументом.
 *
 * Промежуточные статусы движка (`idle` / `running` / …) сюда не попадают: тур сообщает
 * о себе только в терминальной точке, а до неё состояние описывает сам `open`.
 */
export const TOUR_STATUS = {
  /** Пользователь закрыл тур крестиком или клавишей Esc. */
  Skipped: 'skipped',
  /** Тур пройден до конца. */
  Finished: 'finished',
} as const;

/** Положение подсказки относительно целевого элемента. */
export const TOUR_PLACEMENT = {
  Top: 'top',
  TopStart: 'top-start',
  TopEnd: 'top-end',
  Bottom: 'bottom',
  BottomStart: 'bottom-start',
  BottomEnd: 'bottom-end',
  Left: 'left',
  LeftStart: 'left-start',
  LeftEnd: 'left-end',
  Right: 'right',
  RightStart: 'right-start',
  RightEnd: 'right-end',
  Auto: 'auto',
  Center: 'center',
} as const;

/** Кнопки подсказки. */
export const TOUR_BUTTON = {
  /** «Назад» — на первом шаге не показывается. */
  Back: 'back',
  /** «Далее» / «Завершить» на последнем шаге. */
  Primary: 'primary',
  /** Крестик в шапке подсказки. */
  Skip: 'skip',
} as const;

/**
 * Канонические `data-test-id` слотов, которые компонент ставит на свои внутренние
 * элементы (не получаются от потребителя через `...rest`). Реэкспортируются из
 * `src/index.ts`, чтобы потребитель и e2e helpers брали строки из одного источника.
 */
export const TEST_IDS = {
  hint: 'welcome-tour-hint',
  title: 'welcome-tour-hint__title',
  subtitle: 'welcome-tour-hint__subtitle',
  content: 'welcome-tour-hint__content',
  steps: 'welcome-tour-hint__steps',
  closeIcon: 'welcome-tour-hint__icon-close',
  backButton: 'welcome-tour-hint__button-back',
  nextButton: 'welcome-tour-hint__button-next',
  finishButton: 'welcome-tour-hint__button-close',
} as const;
