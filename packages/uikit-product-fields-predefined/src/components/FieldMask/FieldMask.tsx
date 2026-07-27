import { FieldCombo, FieldComboProps } from '@ds/fields';
import { InputMask } from 'imask';
import mergeRefs from 'merge-refs';
import { forwardRef, useEffect } from 'react';
import { useIMask } from 'react-imask';

import { BASE_MASK_OPTIONS, MASK_OPTIONS } from './constants';
import { Mask } from './types';

export type FieldMaskProps = Omit<FieldComboProps, 'value' | 'onChange' | 'inputMode'> & {
  /** Значение поля (controlled-режим) */
  value?: string;
  /** Колбек смены значения; вторым аргументом — экземпляр маски imask */
  onChange?(value: string, mask: InputMask): void;
  /** Предустановленная маска поля */
  mask: Mask;
};

export const FieldMask = forwardRef<HTMLInputElement, FieldMaskProps>(function FieldMask(
  { value: valueProp, onChange, mask, size = 'm', ...props },
  ref,
) {
  const maskOptions = MASK_OPTIONS[mask];

  const {
    ref: maskedRef,
    value,
    setValue,
  } = useIMask(
    { ...BASE_MASK_OPTIONS, ...maskOptions.options },
    {
      defaultValue: valueProp,
      onAccept: onChange,
    },
  );

  useEffect(() => {
    if (valueProp !== undefined && valueProp !== value) {
      setValue(valueProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  return (
    <FieldCombo
      // @ts-expect-error тип maskedRef из react-imask не совпадает с ref-типом FieldCombo
      ref={mergeRefs(ref, maskedRef)}
      value={value}
      onChange={setValue}
      placeholder={maskOptions.placeholder}
      inputMode={maskOptions.inputMode ?? 'numeric'}
      size={size}
      {...props}
    />
  );
});
