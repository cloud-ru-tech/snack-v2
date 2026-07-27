import { FieldCombo } from '@ds/fields';
import { runAfterRerender } from '@ds/input-private';
import mergeRefs from 'merge-refs';
import { FocusEventHandler, forwardRef, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { string } from 'yup';

import { useCustomFieldValidation } from '../../hooks';
import { fieldsPredefinedLocale } from '../../locale';
import { DEFAULT_MAX_NAME_LENGTH } from './constants';
import { FieldNameRHFProps } from './types';

/**
 * Поле «Имя» с обёрткой для react-hook-form.
 */
export const FieldNameRHF = forwardRef<HTMLInputElement, FieldNameRHFProps>(function FieldNameRHF(props, ref) {
  const { t } = fieldsPredefinedLocale.useTranslations();

  const {
    controllerProps,
    maxLength = DEFAULT_MAX_NAME_LENGTH,
    required = true,
    customSchema,
    showLabel = true,
    size = 'm',
    allowMoreThanMaxLength = true,
    error: propError,
    ...inputProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const { trigger } = useFormContext();

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

  const { validateRHF } = useCustomFieldValidation({ schema: validationSchema });

  const handleFocus: FocusEventHandler<HTMLInputElement> = value => {
    setIsFocused(true);
    inputProps.onFocus?.(value);
  };

  return (
    <Controller
      {...controllerProps}
      rules={{ validate: validateRHF }}
      render={({ field: { value, ref: localRef, onBlur, onChange }, fieldState: { error } }) => {
        const isRequiredError = Boolean(error && error.message?.match(t('FieldName.required')));
        const shouldShowCounter =
          error && (error.message?.match(t('FieldName.maxSymbols', { max: maxLength })) || isRequiredError);

        // Показываем ошибку, если: required-ошибка и поле не в фокусе; либо любая другая ошибка;
        // либо ошибка передана принудительно через проп `error`.
        const showError = error && ((isRequiredError && !isFocused) || !isRequiredError);

        const errorMes = propError ?? error?.message;

        const handleClearButtonClick = () => {
          trigger(controllerProps.name);
        };

        const handleChange = (newValue: string) => {
          inputProps.onChange?.(newValue);
          onChange(newValue);
        };

        const handleBlur: FocusEventHandler<HTMLInputElement> = value => {
          runAfterRerender(() => setIsFocused(false));

          inputProps.onBlur?.(value);
          onBlur();
        };

        return (
          <FieldCombo
            {...inputProps}
            inputMode='text'
            onClearButtonClick={handleClearButtonClick}
            allowMoreThanMaxLength={allowMoreThanMaxLength}
            ref={mergeRefs(ref, localRef)}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            validationState={showError ? 'error' : inputProps.validationState}
            hint={showError ? errorMes : undefined}
            maxLength={shouldShowCounter && showError ? maxLength : undefined}
            size={size}
            label={showLabel ? t('FieldName.label') : undefined}
            placeholder={t('FieldName.placeholder')}
            caption={!required ? t('FieldDescription.optional') : undefined}
          />
        );
      }}
    />
  );
});
