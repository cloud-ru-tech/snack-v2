import { PlusSVG } from '@ds/icons/interface/system';
import { withInnerRefSupport } from '@ds/utils';

import { TEST_IDS } from '../../constants';
import { FooterIconButton } from '../../helperComponents';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputPlusButtonProps } from '../../types';

export function AiFieldInputPlusButton({
  'data-test-id': dataTestId = TEST_IDS.plus,
  ...rest
}: AiFieldInputPlusButtonProps) {
  const { t } = aiFieldInputLocale.useTranslations();

  return <FooterIconButton {...rest} icon={<PlusSVG />} aria-label={t('plus')} data-test-id={dataTestId} />;
}

withInnerRefSupport(AiFieldInputPlusButton);
