import { Divider } from '@ds/divider';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';
import { Fragment, ReactNode } from 'react';

import { TEST_IDS } from '../../../../constants';
import { MainMenuSettingsItem } from '../../types';
import { getLinkEmblem } from '../../utils';
import styles from './styles.module.scss';

type MenuBottomProps = {
  settingItems?: MainMenuSettingsItem[];
  leftBottom: ReactNode;
};

export function MenuBottom({ settingItems, leftBottom }: MenuBottomProps) {
  return (
    <div className={styles.bottom} data-test-id={TEST_IDS.mainMenu.leftBottom}>
      {Boolean(settingItems?.length) && (
        <div className={styles.bottomItems} data-test-id={TEST_IDS.mainMenu.leftBottomItems}>
          {settingItems?.map(item => (
            <Fragment key={item.id}>
              {item.divider === 'before' && <Divider orientation='horizontal' className={styles.bottomDivider} />}

              <CardServiceLight
                {...(item.href ? { href: item.href, as: 'a' } : { as: 'button', type: 'button' })}
                title={item.label}
                icon={getLinkEmblem(item)}
                onClick={item.onClick}
                data-test-id={`header__drawer-menu__setting-${item.id}`}
              />

              {item.divider === 'after' && <Divider orientation='horizontal' className={styles.bottomDivider} />}
            </Fragment>
          ))}
        </div>
      )}

      {leftBottom}
    </div>
  );
}
