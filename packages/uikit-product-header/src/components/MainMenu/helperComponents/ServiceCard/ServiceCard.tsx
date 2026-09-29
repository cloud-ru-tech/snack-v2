import { useDraggable } from '@dnd-kit/core';
import { DRAG_MODE, DragGhost, DragPreview } from '@ds/drag-and-drop';
import { CardNavigation, CardNavigationProps } from '@ds/uikit-product-card-predefined';
import cn from 'classnames';
import { memo, MouseEvent, useCallback, useMemo } from 'react';

import { FavoriteProps, InnerLink } from '../../types';
import { getLinkEmblem, getServiceSourceDragId } from '../../utils';
import styles from './styles.module.scss';

export type ServiceCardProps = {
  /** Карточка сервиса. */
  service: InnerLink;

  /** В избранном ли сервис. Учитывается только вместе с `onFavoriteChange`. */
  favoriteChecked?: boolean;

  /**
   * Переключение избранного (стабильная по ссылке функция). Не передано — кнопка избранного
   * не показывается.
   */
  onFavoriteChange?: FavoriteProps['onChange'];

  /** Мобильная раскладка. */
  isMobile?: boolean;
  /** Колбэк клика по карточке. */
  onServiceClick?(service: InnerLink, event: MouseEvent<HTMLElement>): void;
  /** Показывать описание сервиса вместо тултипа. */
  showDescription: boolean;
  /** CSS-класс корневого элемента. */
  className?: string;
  /** `tabIndex` корневого элемента. */
  tabIndex?: number;
  /** Карточка рендерится как превью в `DragOverlay` (без тултипа и описания). */
  dragPreview?: boolean;
} & Pick<CardNavigationProps, 'expandable'>;

function ServiceCardBase({
  service,
  favoriteChecked = false,
  onFavoriteChange,
  isMobile,
  onServiceClick,
  showDescription,
  className,
  tabIndex,
  dragPreview,
  expandable,
}: ServiceCardProps) {
  const { id, disabled, favoritesEnabled = true, description, icon } = service;

  const handleFavoriteChange = useCallback(
    (checked: boolean) => onFavoriteChange?.(id)(checked),
    [id, onFavoriteChange],
  );

  const favoriteProps: CardNavigationProps['favorite'] = useMemo(
    () =>
      !dragPreview && onFavoriteChange
        ? {
            checked: favoriteChecked,
            onChange: handleFavoriteChange,
            enabled: !disabled && favoritesEnabled,
          }
        : undefined,
    [dragPreview, onFavoriteChange, favoriteChecked, handleFavoriteChange, disabled, favoritesEnabled],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => onServiceClick?.(service, event),
    [onServiceClick, service],
  );

  const emblem = useMemo(() => getLinkEmblem({ icon }), [icon]);

  const tooltip = useMemo(
    () => (!dragPreview && description ? { tip: description } : undefined),
    [dragPreview, description],
  );

  const commonProps: CardNavigationProps<'a'> = {
    as: 'a',
    title: service.label,
    icon: emblem,
    'data-test-id': `header__drawer-menu__link-${id}`,
    href: service.href,
    onClick: handleClick,
    favorite: favoriteProps,
    actionsVisibility: isMobile ? 'always' : 'hover',
    promoTag: service.badge,
    className: cn(styles.card, className),
    tabIndex,
    expandable,
  };

  // Один компонент на оба вида: переключение описания обновляет проп, а не пересоздаёт карточку.
  const card = (
    <CardNavigation
      {...commonProps}
      description={showDescription ? (description ?? '') : undefined}
      tooltip={showDescription ? undefined : tooltip}
    />
  );

  return dragPreview ? <DragPreview className={styles.dragCardPreview}>{card}</DragPreview> : card;
}

export const ServiceCard = memo(ServiceCardBase);

export type DraggableServiceCardProps = ServiceCardProps & { groupId: string };

function DraggableServiceCardBase({ groupId, service, favoriteChecked, ...props }: DraggableServiceCardProps) {
  const isFavoriteEnabled = service.favoritesEnabled ?? true;
  const disabled = service.disabled || favoriteChecked || !isFavoriteEnabled;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: getServiceSourceDragId(groupId, service.id),
    disabled,
  });

  const { tabIndex, ...restAttributes } = attributes ?? {};

  return (
    <DragGhost
      innerRef={setNodeRef}
      className={styles.draggableCard}
      dragging={isDragging}
      mode={DRAG_MODE.Static}
      {...listeners}
      {...restAttributes}
    >
      <ServiceCard service={service} favoriteChecked={favoriteChecked} {...props} tabIndex={tabIndex} />
    </DragGhost>
  );
}

export const DraggableServiceCard = memo(DraggableServiceCardBase);

export type GridServiceCardProps = DraggableServiceCardProps & {
  /**
   * Карточку можно перетаскивать. Иначе рендерится без `useDraggable`: на mobile, при поиске и
   * без избранного сотни карточек не регистрируются в `DndContext` впустую.
   */
  dragEnabled?: boolean;
};

function GridServiceCardBase({ dragEnabled, groupId, ...props }: GridServiceCardProps) {
  if (dragEnabled) {
    return <DraggableServiceCard groupId={groupId} {...props} />;
  }

  return (
    <div className={styles.staticCard}>
      <ServiceCard {...props} />
    </div>
  );
}

export const GridServiceCard = memo(GridServiceCardBase);
