import { APPEARANCE, Button, ButtonProps, ICON_POSITION, VIEW } from '@ds/button';
import { UpdateSVG } from '@ds/icons';

import { TEST_IDS } from '../../../../constants';
import { fieldsPredefinedLocale } from '../../../../locale';
import { formatSecondsAsMmSs } from './utils';

export type ResendCodeProps = {
  /** Колбек отправки нового кода */
  onResend(): void;
  /** Количество секунд до следующей отправки кода */
  secondsToNextResend: number;
} & Pick<ButtonProps, 'size' | 'disabled'>;

export function ResendCode(props: ResendCodeProps) {
  const { onResend, secondsToNextResend, disabled, ...buttonProps } = props;
  const { t } = fieldsPredefinedLocale.useTranslations();

  const isResendCodeWithVia = secondsToNextResend > 0;

  return (
    <Button
      view={VIEW.Function}
      appearance={APPEARANCE.Neutral}
      label={
        isResendCodeWithVia
          ? t('FieldCode.resendCodeButtons.resendCodeWithVia', {
              timer: formatSecondsAsMmSs(secondsToNextResend),
            })
          : t('FieldCode.resendCodeButtons.resendCode')
      }
      onClick={onResend}
      icon={<UpdateSVG />}
      iconPosition={ICON_POSITION.Before}
      disabled={isResendCodeWithVia || disabled}
      data-test-id={TEST_IDS.fieldCodeResend}
      {...buttonProps}
    />
  );
}
