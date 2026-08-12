import { InfoBlock } from '@ds/info-block';
import { CardServiceLight, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import cn from 'classnames';
import { MouseEvent, ReactElement, ReactNode, useCallback, useMemo } from 'react';

import { headerLegacyLocale } from '../../../../locale';
import { shouldBeOpenedInNewTab } from '../../../../utils/shouldBeOpenedInNewTab';
import { TEST_IDS } from '../../constants';
import { LinksGroup, MainMenuProps } from '../../types';
import { getLinkEmblem } from '../../utils';
import { ServicesCategory } from '../ServicesCategory';
import { NO_DATA_ICON_PREDEFINED_PROPS } from './constants';
import styles from './styles.module.scss';

export type ContentProps = {
  searchValue?: string;
  serviceGroups?: LinksGroup[];
  banners?: ReactNode;
  favorite?: MainMenuProps['favorite'];
  isMobile?: boolean;
  className?: string;
  onLinkChange?(value: string): void;
  onClose?(): void;
};

export function Content({
  searchValue,
  banners,
  serviceGroups,
  className,
  favorite,
  isMobile,
  onClose,
  onLinkChange,
}: ContentProps): ReactElement {
  const { t } = headerLegacyLocale.useTranslations();

  const wrappedClick = useCallback(
    ({ disabled, onClick }: { disabled?: boolean; onClick?(e?: MouseEvent<HTMLElement>): void }, cb?: () => void) =>
      (e?: MouseEvent<HTMLElement>) => {
        if (disabled) {
          e?.preventDefault();
          return;
        }

        if (!shouldBeOpenedInNewTab(e)) {
          e?.preventDefault();
          onClose?.();
        }

        onClick?.(e);

        cb?.();
      },
    [onClose],
  );

  const cards = useMemo(
    () =>
      serviceGroups?.map(({ id, label, items, favoritesEnabled = true, highlight }) => (
        <div key={String(id)} id={id} data-test-id={TEST_IDS.groupCard(String(id))}>
          <ServicesCategory title={label.text} onTitleClick={label.onClick} highlight={highlight}>
            {items.map(service => (
              <CardServiceLight
                {...(service.href ? { href: service.href, as: 'a' } : { as: 'button', type: 'button' })}
                key={String(id) + service.id}
                title={service.label}
                disabled={service.disabled}
                icon={getLinkEmblem(service)}
                data-test-id={TEST_IDS.link(service.id)}
                onClick={wrappedClick(service, () => onLinkChange?.(service.id))}
                favorite={
                  favorite && favoritesEnabled
                    ? {
                        enabled: !service.disabled,
                        checked: favorite.value.includes(service.id),
                        onChange: favorite.onChange(service.id),
                      }
                    : undefined
                }
                actionsVisibility={isMobile ? VISIBILITY_STRATEGY.always : VISIBILITY_STRATEGY.hover}
                promoTag={service.badge}
                className={styles.card}
              />
            ))}
          </ServicesCategory>
        </div>
      )),
    [favorite, isMobile, onLinkChange, serviceGroups, wrappedClick],
  );

  const hasGroups = Boolean(serviceGroups?.length);

  return (
    <div className={cn(styles.root, className)}>
      {!searchValue && banners ? (
        <div className={styles.banners} data-mobile={isMobile || undefined} data-test-id={TEST_IDS.banners}>
          {banners}
        </div>
      ) : null}

      <div className={styles.services} data-test-id={TEST_IDS.services}>
        {cards}
      </div>

      {!hasGroups && !searchValue && (
        <div className={styles.noData} data-test-id={TEST_IDS.noData}>
          <InfoBlock content={t('mainMenu.noData')} icon={NO_DATA_ICON_PREDEFINED_PROPS} />
        </div>
      )}

      {!hasGroups && searchValue && (
        <div className={styles.noData} data-test-id={TEST_IDS.noDataFound}>
          <InfoBlock content={t('mainMenu.noDataFound')} icon={NO_DATA_ICON_PREDEFINED_PROPS} />
        </div>
      )}
    </div>
  );
}
