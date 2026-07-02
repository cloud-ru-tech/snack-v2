import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';

import { ActionView } from './ActionView';
import styles from './styles.module.scss';
import { ActionsProps } from './types';
import { hasVisibleActions } from './utils';

function DesktopActionsBase({ items }: Pick<ActionsProps, 'items'>) {
  if (!hasVisibleActions(items)) {
    return null;
  }

  return (
    <div className={styles.desktopActionsWrapper}>
      {items.map((action, index) => (
        <ActionView
          {...action}
          key={index}
          commonProps={{
            className: styles.button,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Десктопная панель действий. Форсирует `desktop`-раскладку через `withLayoutType`, чтобы вложенные
 * адаптивные `@ds`-примитивы (`ButtonDropdown`/`ButtonKebab`/`ButtonDroplist`) рендерили
 * desktop-popover даже под mobile-провайдером.
 */
export const DesktopActions = withLayoutType(DesktopActionsBase, LAYOUT_TYPE.Desktop);
