import { FieldTextArea } from '@ds/fields';
import mergeRefs from 'merge-refs';
import { forwardRef, useMemo, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { string } from 'yup';

import { useCustomFieldValidation } from '../../hooks';
import { fieldsPredefinedLocale } from '../../locale';
import { FieldWithAddButton } from './components/FieldWithAddButton';
import { DEFAULT_MAX_LENGTH } from './constants';
import { FieldDescriptionRHFProps } from './types';

/**
 * Поле «Описание» с обёрткой для react-hook-form.
 */
export const FieldDescriptionRHF = forwardRef<HTMLTextAreaElement, FieldDescriptionRHFProps>(
  function FieldDescriptionRHF(
    {
      controllerProps,
      customSchema,
      size = 'm',
      required = false,
      maxLength = DEFAULT_MAX_LENGTH,
      addButton,
      resizable = true,
      ...props
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

    const { validateRHF } = useCustomFieldValidation({ schema: validationSchema });

    const controllerComponent = (
      <Controller
        {...controllerProps}
        rules={{ validate: validateRHF }}
        render={({ field: { value, ref: localRef, onBlur, onChange }, fieldState: { error } }) => {
          const errorMes = props.error ?? error?.message;

          return (
            <FieldTextArea
              {...props}
              resizable={resizable}
              size={size}
              label={t('FieldDescription.label')}
              placeholder={t('FieldDescription.placeholder')}
              inputMode='text'
              ref={mergeRefs(ref, localRef, textareaRef)}
              maxLength={maxLength}
              value={value}
              onChange={newValue => {
                props.onChange?.(newValue);
                onChange(newValue);
              }}
              onBlur={event => {
                props.onBlur?.(event);
                onBlur();
              }}
              validationState={errorMes ? 'error' : props.validationState}
              hint={errorMes}
              caption={!required ? t('FieldDescription.optional') : undefined}
            />
          );
        }}
      />
    );

    if (addButton && !required) {
      return (
        <FieldWithAddButton autoFocusRef={textareaRef} size={size}>
          {controllerComponent}
        </FieldWithAddButton>
      );
    }

    return controllerComponent;
  },
);
