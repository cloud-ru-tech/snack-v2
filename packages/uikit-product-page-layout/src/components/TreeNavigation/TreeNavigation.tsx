import { APPEARANCE, Button, SIZE, VIEW } from '@ds/button';
import { ProductIcons } from '@ds/icons';
import { Status } from '@ds/status';
import { SIZE as TYPOGRAPHY_SIZE, Typography, VARIANT } from '@ds/typography';
import cn from 'classnames';
import { useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { TREE_NAVIGATION_MODE } from '../../constants';
import { pageLayoutLocale } from '../../locale';
import { ConditionalPopover, Menu } from './helperComponents';
import styles from './styles.module.scss';
import { TreeNavigationProps } from './types';

export function TreeNavigation({
  header: { title, icon, description, status, actions },
  menu: {
    menuTitle,
    items,
    enableShrinkMenuButton,
    withDefaultOpenedMenuList,
    isMenuOpen,
    defaultMenuOpened,
    onMenuToggle,
    selected,
    onSelect,
  },
  content,
  mode,
  contentClassName,
}: TreeNavigationProps) {
  const [open, setOpen] = useUncontrolledProp(isMenuOpen, defaultMenuOpened, onMenuToggle);
  const { t } = pageLayoutLocale.useTranslations();

  // В режиме `fixed` aside-меню всегда раскрыто, переключатель неактуален.
  const isFixed = mode === TREE_NAVIGATION_MODE.Fixed;
  const isAsideOpen = isFixed || (mode === TREE_NAVIGATION_MODE.Aside && Boolean(open));

  const menu = useMemo(
    () => (
      <Menu
        menuItems={items}
        menuTitle={menuTitle}
        enableShrinkMenuButton={enableShrinkMenuButton}
        withDefaultOpenedMenuList={withDefaultOpenedMenuList}
        selected={selected}
        onSelect={onSelect}
      />
    ),
    [onSelect, selected, items, menuTitle, enableShrinkMenuButton, withDefaultOpenedMenuList],
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleInner}>
            {!isFixed && (
              <ConditionalPopover
                isOpen={Boolean(open)}
                onOpenChange={setOpen}
                tip={menu}
                withPopover={mode === TREE_NAVIGATION_MODE.Popover}
              >
                <div className={styles.innerElement}>
                  <Button
                    view={VIEW.Simple}
                    appearance={APPEARANCE.Neutral}
                    size={SIZE.S}
                    aria-label={open ? t('TreeNavigation.closeMenu') : t('TreeNavigation.openMenu')}
                    icon={open ? <ProductIcons.CloseSVG /> : <ProductIcons.BurgerSVG />}
                    onClick={() => setOpen(!open)}
                  />
                </div>
              </ConditionalPopover>
            )}
            {icon && (
              <div className={styles.innerElement}>
                <div className={styles.icon}>{icon}</div>
              </div>
            )}
            <Typography variant={VARIANT.title} size={TYPOGRAPHY_SIZE.l} className={styles.title}>
              {title}
            </Typography>

            {status && (
              <div className={styles.innerElement}>
                <Status {...status} />
              </div>
            )}
          </div>
          {description && (
            <Typography variant={VARIANT.body} size={TYPOGRAPHY_SIZE.s} className={styles.description}>
              {description}
            </Typography>
          )}
        </div>

        {actions && <div className={styles.headerActions}>{actions}</div>}
      </div>

      <div className={styles.body}>
        {isAsideOpen && <aside className={styles.sidebar}>{menu}</aside>}
        <div className={cn(styles.main, contentClassName)}>{content}</div>
      </div>
    </div>
  );
}
