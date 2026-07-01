// Публичная точка входа — адаптивный `Stepper` (раскладку берёт из AdaptiveProvider).
// `DesktopStepper` / `MobileStepper` — internal-поверхности, наружу не реэкспортятся.
// `StepperProps` — публичный тип, живёт в `src/types.ts` (реэкспорт через корневой `src/index.ts`).
export * from './Stepper';
