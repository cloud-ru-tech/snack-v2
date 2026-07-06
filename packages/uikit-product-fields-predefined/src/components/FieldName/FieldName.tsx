import { FieldText } from '@ds/fields';
import { runAfterRerender } from '@ds/input-private';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, useMemo, useRef, useState } from 'react';
import { string, ValidationError } from 'yup';

import { useCustomFieldValidation } from '../../hooks';
import { fieldsPredefinedLocale } from '../../locale';
import { DEFAULT_MAX_NAME_LENGTH } from './constants';
import { FieldNameProps } from './types';

/**
 * Поле «Имя» с локальным стейтом и валидацией (yup).
 */
export const FieldName = forwardRef<HTMLInputElement, FieldNameProps>(function FieldName(props, ref) {
  const { t } = fieldsPredefinedLocale.useTranslations();

  const {
    value: propValue = '',
    onChange: propOnChange,
    onBlur: propOnBlur,
    error: propError,
    maxLength = DEFAULT_MAX_NAME_LENGTH,
    required = true,
    customSchema,
    showLabel = true,
    allowMoreThanMaxLength = true,
    size = 'm',
    ...inputProps
  } = props;

  const [internalValue, setInternalValue] = useState(propValue);
  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const validationSchema = useMemo(() => {
    let baseSchema = string()
      .test('maxLength', t('FieldName.maxSymbols', { max: maxLength }), value => {
        if (!value) return true;
        return value.length <= maxLength;
      })
      .matches(/^[a-zA-Z0-9.\-_]*$/, {
        message: t('FieldName.wrongSymbols'),
        name: 'allowedSymbols',
        excludeEmptyString: true,
      });

    if (customSchema) {
      baseSchema = baseSchema.concat(customSchema);
    }

    return required ? baseSchema.required(t('FieldName.required')) : baseSchema;
  }, [customSchema, maxLength, required, t]);

  const { validate } = useCustomFieldValidation({ schema: validationSchema });

  const currentValue = 'value' in props ? propValue : internalValue;
  const currentError = propError || validationError?.message;
  const isRequiredError = currentError?.match(t('FieldName.required'));

  const handleChange = (newValue: string) => {
    const result = validate(newValue);
    // Если была required-ошибка и пользователь начал ввод — очищаем её.
    if (isRequiredError && !isFocused) {
      setValidationError(null);
    } else if (result.error && result.error.message !== t('FieldName.required')) {
      // Любую НЕ required ошибку показываем сразу.
      setValidationError(result.error);
    } else {
      setValidationError(null);
    }

    setInternalValue(newValue);
    propOnChange?.(newValue);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    runAfterRerender(() => setIsFocused(false));

    const result = validate(currentValue);
    setValidationError(result.error);
    props.onValidationError?.(result.error);
    propOnBlur?.(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClear = () => {
    const result = validate('');
    setValidationError(result.error);
    props.onValidationError?.(result.error);
  };

  // Ошибка обязательного поля появляется после blur.
  const showError = currentError && ((isRequiredError && !isFocused) || !isRequiredError);

  // Счётчик — только при ошибке длины/обязательности (как в FieldNameRHF).
  const shouldShowCounter =
    Boolean(currentError) &&
    (Boolean(currentError?.match(t('FieldName.maxSymbols', { max: maxLength }))) || Boolean(isRequiredError));

  return (
    <FieldText
      {...inputProps}
      inputMode='text'
      onClearButtonClick={handleClear}
      allowMoreThanMaxLength={allowMoreThanMaxLength}
      ref={mergeRefs(ref, inputRef)}
      value={currentValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      validationState={showError ? 'error' : inputProps.validationState}
      hint={showError ? currentError : undefined}
      maxLength={shouldShowCounter && showError ? maxLength : undefined}
      size={size}
      label={showLabel ? t('FieldName.label') : undefined}
      placeholder={t('FieldName.placeholder')}
      caption={!required ? t('FieldDescription.optional') : undefined}
    />
  );
});
