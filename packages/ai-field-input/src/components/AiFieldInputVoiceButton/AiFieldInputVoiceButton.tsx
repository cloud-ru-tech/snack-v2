import { MicrophoneSVG } from '@ds/icons/interface/web';
import { withInnerRefSupport } from '@ds/utils';

import { TEST_IDS } from '../../constants';
import { FooterIconButton } from '../../helperComponents';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputVoiceButtonProps } from '../../types';

export function AiFieldInputVoiceButton({
  'data-test-id': dataTestId = TEST_IDS.voice,
  ...rest
}: AiFieldInputVoiceButtonProps) {
  const { t } = aiFieldInputLocale.useTranslations();

  return <FooterIconButton {...rest} icon={<MicrophoneSVG />} aria-label={t('voice')} data-test-id={dataTestId} />;
}

withInnerRefSupport(AiFieldInputVoiceButton);
