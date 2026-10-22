import { withInnerRefSupport } from '@ds/utils';

import { TEST_IDS } from '../../constants';
import { FooterTextButton } from '../../helperComponents';
import { AiFieldInputEffortButtonProps } from '../../types';

export function AiFieldInputEffortButton({
  'data-test-id': dataTestId = TEST_IDS.effort,
  ...rest
}: AiFieldInputEffortButtonProps) {
  return <FooterTextButton {...rest} width='effort' data-test-id={dataTestId} />;
}

withInnerRefSupport(AiFieldInputEffortButton);
