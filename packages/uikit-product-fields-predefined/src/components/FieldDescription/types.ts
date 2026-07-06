import { FieldTextAreaProps } from '@ds/fields';
import { ControllerProps, FieldValues } from 'react-hook-form';
import { StringSchema, ValidationError } from 'yup';

export type FieldDescriptionPropsBase = Omit<
  FieldTextAreaProps,
  'placeholder' | 'label' | 'footer' | 'searchPlaceholder' | 'hint' | 'inputMode' | 'caption' | 'name'
> & {
  /** Дополнительная yup-схема, которая конкатенируется к встроенной */
  customSchema?: StringSchema;
  /** Поле появляется по кнопке «Добавить описание» (только для опционального поля) */
  addButton?: boolean;
};

export type FieldDescriptionProps = FieldDescriptionPropsBase & {
  /** Колбэк, вызываемый при изменении ошибки валидации (только в standalone-режиме) */
  onValidationError?(error: ValidationError | null): void;
};

export type FieldDescriptionRHFProps = FieldDescriptionPropsBase & {
  /** Режим контроллера с использованием react-hook-form */
  controllerProps: Omit<ControllerProps<FieldValues>, 'render' | 'rules' | 'disabled'>;
};
