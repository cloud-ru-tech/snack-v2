import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';
import { Actions, ActionsProps } from '@ds/uikit-product-actions';

import { TEST_IDS } from '../../constants';
import { pageLayoutLocale } from '../../locale';

function MobileActionsBase(props: Pick<ActionsProps, 'items' | 'className' | 'maxVisibleItems' | 'groupDividers'>) {
  const { t } = pageLayoutLocale.useTranslations();
  return (
    <Actions
      {...props}
      data-test-id={TEST_IDS.mobileActions.root}
      moreButtonProps={{ 'aria-label': t('Actions.more'), 'data-test-id': TEST_IDS.mobileActions.trigger }}
    />
  );
}

export const MobileActions = withLayoutType(MobileActionsBase, LAYOUT_TYPE.Mobile);
