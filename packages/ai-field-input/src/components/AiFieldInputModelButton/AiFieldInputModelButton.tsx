import { withInnerRefSupport } from '@ds/utils';

import { TEST_IDS } from '../../constants';
import { FooterTextButton } from '../../helperComponents';
import { AiFieldInputModelButtonProps } from '../../types';

export function AiFieldInputModelButton({
  searchable = false,
  'data-test-id': dataTestId = TEST_IDS.model,
  ...rest
}: AiFieldInputModelButtonProps) {
  return <FooterTextButton {...rest} width='model' searchable={searchable} data-test-id={dataTestId} />;
}

withInnerRefSupport(AiFieldInputModelButton);
