import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button, ICON_POSITION, VIEW } from '@ds/button';
import { FieldTextAreaProps } from '@ds/fields';
import { PlusSVG } from '@ds/icons';
import { ReactNode, RefObject, useCallback, useEffect, useState } from 'react';

import { TEST_IDS } from '../../../constants';
import { fieldsPredefinedLocale } from '../../../locale';

export function FieldWithAddButton({
  children,
  size = 'm',
  autoFocusRef,
}: {
  children: ReactNode;
  size?: FieldTextAreaProps['size'];
  autoFocusRef: RefObject<HTMLTextAreaElement | null>;
}) {
  const { t } = fieldsPredefinedLocale.useTranslations();
  const [showField, setShowField] = useState(false);

  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  const handleAddClick = useCallback(() => setShowField(true), []);

  useEffect(() => {
    // На mobile автофокус запрещён — он принудительно открывает экранную клавиатуру.
    if (showField && !isMobile && autoFocusRef.current) {
      autoFocusRef.current.focus();
    }
  }, [showField, isMobile, autoFocusRef]);

  if (showField) {
    return children;
  }

  return (
    <div>
      <Button
        view={VIEW.Function}
        icon={<PlusSVG />}
        iconPosition={ICON_POSITION.Before}
        label={t('FieldDescription.addButton')}
        onClick={handleAddClick}
        size={size}
        data-test-id={TEST_IDS.fieldDescriptionAddButton}
      />
    </div>
  );
}
