import { FunctionSettingsSVG } from '@ds/icons/interface/system';
import { withInnerRefSupport } from '@ds/utils';

import { TEST_IDS } from '../../constants';
import { FooterIconButton } from '../../helperComponents';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputSettingsButtonProps } from '../../types';

export function AiFieldInputSettingsButton({
  'data-test-id': dataTestId = TEST_IDS.settings,
  ...rest
}: AiFieldInputSettingsButtonProps) {
  const { t } = aiFieldInputLocale.useTranslations();

  return (
    <FooterIconButton {...rest} icon={<FunctionSettingsSVG />} aria-label={t('settings')} data-test-id={dataTestId} />
  );
}

withInnerRefSupport(AiFieldInputSettingsButton);
