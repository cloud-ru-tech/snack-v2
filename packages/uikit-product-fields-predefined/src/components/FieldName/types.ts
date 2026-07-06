import { FieldTextProps } from '@ds/fields';
import { ControllerProps, FieldValues } from 'react-hook-form';
import { StringSchema, ValidationError } from 'yup';

export type BaseFieldNameProps = Omit<
  FieldTextProps,
  'placeholder' | 'label' | 'footer' | 'type' | 'inputMode' | 'caption' | 'hint'
> & {
  /** Показывать предустановленный лейбл «Имя» */
  showLabel?: boolean;
  /**
   * Дополнительная yup-схема, конкатенируется к встроенной (обязательность, длина, допустимые символы).
   * Через неё подключают data-зависимые проверки, которые компонент не может выполнить сам — например,
   * проверку уникальности имени по данным потребителя. Текст ошибки можно взять из локали пакета:
   * `fieldsPredefinedLocale.useTranslations().t('FieldName.errorDuplicate')`.
   */
  customSchema?: StringSchema;
};

export type FieldNameProps = BaseFieldNameProps & {
  /** Колбэк, вызываемый при изменении ошибки валидации */
  onValidationError?(error: ValidationError | null): void;
};

export type FieldNameRHFProps = BaseFieldNameProps & {
  /** Режим контроллера с использованием react-hook-form */
  controllerProps: Omit<ControllerProps<FieldValues>, 'render' | 'rules' | 'disabled'>;
};
