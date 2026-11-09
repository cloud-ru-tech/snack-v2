import { EyeClosedSVG, EyeSVG } from '@ds/icons/interface/system';

import { TEST_IDS } from '../../constants';
import { aiFieldInputLocale } from '../../locale';
import { FooterIconButton } from '../FooterIconButton';
import { keepFocusOnMouseDown } from './utils';

export type SecureToggleButtonProps = {
  /** Значение показано. */
  revealed: boolean;
  onToggle(): void;
};

/** Кнопка «глаз» режима `secure`. Нажатие мышью не забирает фокус: каретка остаётся в поле. */
export function SecureToggleButton({ revealed, onToggle }: SecureToggleButtonProps) {
  const { t } = aiFieldInputLocale.useTranslations();

  return (
    <FooterIconButton
      icon={revealed ? <EyeClosedSVG /> : <EyeSVG />}
      aria-label={t('secureToggle')}
      aria-pressed={revealed}
      tooltip={{ content: revealed ? t('secureHide') : t('secureShow') }}
      onMouseDown={keepFocusOnMouseDown}
      onClick={onToggle}
      data-test-id={TEST_IDS.secureToggle}
    />
  );
}
