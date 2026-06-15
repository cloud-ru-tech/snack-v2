// Story-level data-test-id, повторяющиеся в 2+ файлах stories FieldSecure (InteractionTest,
// AsyncReveal) и/или в specs (keyboard / interaction / visual). Component-level id'ы слотов
// (root/input/hideButton/shell/copy) живут в `@ds/fields::TEST_IDS` (src/constants.ts) —
// здесь только то, что ставит сама story.
export const TEST_IDS = {
  fieldSecure: {
    // InteractionTest / keyboard-сцена: отдельные корни, чтобы скоупить запросы к нужному полю.
    editableRoot: 'field-secure-editable',
    readonlyRoot: 'field-secure-readonly',
    controlledHiddenRoot: 'field-secure-controlled-hidden',
    // AsyncReveal: корни инстансов + кнопки управления промисом стаба.
    asyncRevealRoot: 'field-secure-async-reveal',
    asyncLoadedOnceRoot: 'field-secure-async-loaded-once',
    asyncRejectRoot: 'field-secure-async-reject',
    asyncReadonlyRoot: 'field-secure-async-readonly',
    // Инстанс с never-resolving getter — play его не трогает; spec кликает «глаз» и снимает
    // зависший Skeleton (визуальная регрессия loading-состояния).
    asyncPendingRoot: 'field-secure-async-pending',
    asyncResolveButton: 'field-secure-async-resolve',
  },
} as const;
