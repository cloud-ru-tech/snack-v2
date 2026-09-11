import {
  ADD_CUSTOM_OPTION_TRIGGER,
  ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_ALLOWED,
  ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_DEFAULT,
  ADD_CUSTOM_OPTION_TRIGGERS_SINGLE_ALLOWED,
  ADD_CUSTOM_OPTION_TRIGGERS_SINGLE_DEFAULT,
} from '../constants';
import { FieldSelectAddCustomOptionTrigger, FieldSelectMultipleAddCustomOptionTrigger } from '../types';

/**
 * Сопоставляет клавишу с триггером кастомной опции (`enter` / `space` / `comma`).
 * Сначала `KeyboardEvent.code`, затем `key` — если `code` пустой или не из словаря (`','` без `Comma`).
 */
export function getCustomOptionTriggerByKey(key: string): FieldSelectMultipleAddCustomOptionTrigger | undefined {
  switch (key) {
    case 'Enter':
      return ADD_CUSTOM_OPTION_TRIGGER.Enter;
    case ' ':
      return ADD_CUSTOM_OPTION_TRIGGER.Space;
    case ',':
      return ADD_CUSTOM_OPTION_TRIGGER.Comma;
    default:
      return undefined;
  }
}

export function shouldHandleCustomOptionTrigger(
  trigger: FieldSelectAddCustomOptionTrigger | undefined,
  availableTriggers: readonly FieldSelectAddCustomOptionTrigger[],
): trigger is FieldSelectAddCustomOptionTrigger {
  return trigger !== undefined && availableTriggers.includes(trigger);
}

export function resolveAddCustomOptionTriggers(params: {
  allowCustomOption: boolean;
  addCustomOptionTriggers: readonly FieldSelectAddCustomOptionTrigger[] | undefined;
  multiple?: boolean;
}): readonly FieldSelectAddCustomOptionTrigger[] {
  if (params.allowCustomOption) {
    const defaultTriggers = params.multiple
      ? ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_DEFAULT
      : ADD_CUSTOM_OPTION_TRIGGERS_SINGLE_DEFAULT;
    const allowedTriggers: readonly FieldSelectAddCustomOptionTrigger[] = params.multiple
      ? ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_ALLOWED
      : ADD_CUSTOM_OPTION_TRIGGERS_SINGLE_ALLOWED;
    const availableTriggers = params.addCustomOptionTriggers ?? defaultTriggers;

    return availableTriggers.filter(trigger => allowedTriggers.includes(trigger));
  }

  return [];
}

/** Фокус ушёл на дроплист, футер или postfix — кастомную опцию на blur фиксировать не нужно. */
export function isCustomOptionBlurInsideField(
  relatedTarget: EventTarget | null,
  nodes: (Node | null | undefined)[],
): boolean {
  return relatedTarget instanceof Node && nodes.some(node => Boolean(node?.contains(relatedTarget)));
}

/** Клик снаружи закрывает список, не снимая фокус с input — blur не придёт. */
export function shouldCommitCustomOptionOnClose(params: {
  skip: boolean;
  inputElement: Element | null;
  activeElement: Element | null;
}): boolean {
  return !params.skip && params.activeElement !== null && params.activeElement === params.inputElement;
}
