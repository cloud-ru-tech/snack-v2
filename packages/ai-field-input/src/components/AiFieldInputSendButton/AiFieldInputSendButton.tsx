import { APPEARANCE, Button, SIZE, VIEW } from '@ds/button';
import { ArrowUpSVG, StopSVG } from '@ds/icons/interface/system';
import { withInnerRefSupport } from '@ds/utils';

import { SEND_STATE, TEST_IDS } from '../../constants';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputSendButtonProps } from '../../types';

export function AiFieldInputSendButton({
  state,
  onClick,
  innerRef,
  className,
  'data-test-id': dataTestId = TEST_IDS.send,
  ...rest
}: AiFieldInputSendButtonProps) {
  const { t } = aiFieldInputLocale.useTranslations();
  const isSendView = state === SEND_STATE.Active || state === SEND_STATE.Disabled;

  return (
    <Button
      {...rest}
      view={isSendView ? VIEW.Filled : VIEW.Tonal}
      appearance={isSendView ? APPEARANCE.Primary : APPEARANCE.Neutral}
      size={SIZE.M}
      icon={state === SEND_STATE.Stop ? <StopSVG /> : <ArrowUpSVG />}
      loading={state === SEND_STATE.Loading}
      disabled={state === SEND_STATE.Disabled}
      className={className}
      innerRef={innerRef}
      data-state={state}
      data-test-id={dataTestId}
      aria-label={state === SEND_STATE.Stop ? t('stop') : t('send')}
      onClick={onClick}
    />
  );
}

withInnerRefSupport(AiFieldInputSendButton);
