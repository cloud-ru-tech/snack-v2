import { FieldTextArea } from '@ds/fields';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, useMemo, useRef, useState } from 'react';
import { string, ValidationError } from 'yup';

import { useCustomFieldValidation } from '../../hooks';
import { fieldsPredefinedLocale } from '../../locale';
import { FieldWithAddButton } from './components';
import { DEFAULT_MAX_LENGTH } from './constants';
import { FieldDescriptionProps } from './types';

/**
 * Поле «Описание» с локальным стейтом и валидацией (yup).
 */
export const FieldDescription = forwardRef<HTMLTextAreaElement, FieldDescriptionProps>(function FieldDescription(
  {
    size = 'm',
    required = false,
    maxLength = DEFAULT_MAX_LENGTH,
    customSchema,
    resizable = true,
    addButton,
    onValidationError,
    value: propValue,
    ...restProps
  },
  ref,
) {
  const { t } = fieldsPredefinedLocale.useTranslations();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const validationSchema = useMemo(() => {
    let baseSchema = string()
      .trim()
      .max(maxLength, t('FieldDescription.maxSymbols', { max: maxLength }));

    if (customSchema) {
      baseSchema = baseSchema.concat(customSchema);
    }

    return required ? baseSchema.required(t('FieldDescription.required')) : baseSchema;
  }, [customSchema, maxLength, required, t]);

  const { validate } = useCustomFieldValidation({ schema: validationSchema });

  const [internalValue, setInternalValue] = useState(propValue ?? '');
  const [error, setError] = useState<ValidationError | null>(null);

  // Как в FieldName: заданный `value` переводит поле в controlled-режим.
  const value = propValue !== undefined ? propValue : internalValue;

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    restProps.onChange?.(newValue);
    const result = validate(newValue);
    setError(result.error);
    onValidationError?.(result.error);
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement, Element>) => {
    restProps.onBlur?.(event);
    const result = validate(value);
    setError(result.error);
    onValidationError?.(result.error);
  };

  const errorMes = restProps.error ?? error?.message;

  const standaloneComponent = (
    <FieldTextArea
      {...restProps}
      resizable={resizable}
      label={t('FieldDescription.label')}
      placeholder={t('FieldDescription.placeholder')}
      inputMode='text'
      ref={mergeRefs(ref, textareaRef)}
      size={size}
      maxLength={maxLength}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      validationState={errorMes ? 'error' : restProps.validationState}
      hint={errorMes}
      caption={!required ? t('FieldDescription.optional') : undefined}
    />
  );

  if (addButton && !required) {
    return (
      <FieldWithAddButton autoFocusRef={textareaRef} size={size}>
        {standaloneComponent}
      </FieldWithAddButton>
    );
  }

  return standaloneComponent;
});
