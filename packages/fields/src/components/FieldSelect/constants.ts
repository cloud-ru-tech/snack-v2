export const SELECTION_MODE = {
  Single: 'single',
  Multiple: 'multiple',
} as const;

/** События, по которым произвольный ввод фиксируется как выбранная опция. */
export const ADD_CUSTOM_OPTION_TRIGGER = {
  Enter: 'enter',
  Blur: 'blur',
  Space: 'space',
  Comma: 'comma',
} as const;

/** Разрешенные триггеры для `selection='single'` при `allowCustomOption`. */
export const ADD_CUSTOM_OPTION_TRIGGERS_SINGLE_ALLOWED = [
  ADD_CUSTOM_OPTION_TRIGGER.Enter,
  ADD_CUSTOM_OPTION_TRIGGER.Blur,
] as const;

/** Триггеры по умолчанию для `selection='single'` при `allowCustomOption`. */
export const ADD_CUSTOM_OPTION_TRIGGERS_SINGLE_DEFAULT = [
  ADD_CUSTOM_OPTION_TRIGGER.Enter,
  ADD_CUSTOM_OPTION_TRIGGER.Blur,
] as const;

/** Разрешенные триггеры для `selection='multiple'` при `allowCustomOption`. */
export const ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_ALLOWED = [
  ADD_CUSTOM_OPTION_TRIGGER.Enter,
  ADD_CUSTOM_OPTION_TRIGGER.Blur,
  ADD_CUSTOM_OPTION_TRIGGER.Space,
  ADD_CUSTOM_OPTION_TRIGGER.Comma,
] as const;

/** Триггеры по умолчанию для `selection='multiple'` при `allowCustomOption`. */
export const ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_DEFAULT = [
  ADD_CUSTOM_OPTION_TRIGGER.Enter,
  ADD_CUSTOM_OPTION_TRIGGER.Blur,
  ADD_CUSTOM_OPTION_TRIGGER.Space,
  ADD_CUSTOM_OPTION_TRIGGER.Comma,
] as const;
