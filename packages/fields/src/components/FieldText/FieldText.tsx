import { forwardRef } from 'react';

import { TEST_IDS } from '../../constants';
import { FieldCombo, FieldComboProps } from '../FieldCombo';

/**
 * Пропсы простого текстового поля. От `FieldCombo` отличается отсутствием слотов:
 * префикса, постфикса, иконок и кнопок-сегментов. Нужен слот — берите `FieldCombo`.
 */
export type FieldTextProps = Omit<
  FieldComboProps,
  'prefix' | 'postfix' | 'iconBefore' | 'iconAfter' | 'prefixIcon' | 'elementBefore' | 'elementAfter' | 'innerTestIds'
>;

/**
 * Текстовое поле: заголовок, подсказка, плейсхолдер, значение и кнопки очистки и копирования.
 * Слоты вокруг строки ввода не поддерживает — для них есть `FieldCombo`.
 */
export const FieldText = forwardRef<HTMLInputElement, FieldTextProps>(function FieldText(props, ref) {
  return (
    <FieldCombo
      {...props}
      ref={ref}
      innerTestIds={{ shell: TEST_IDS.fieldTextShell, input: TEST_IDS.fieldTextInput }}
    />
  );
});
