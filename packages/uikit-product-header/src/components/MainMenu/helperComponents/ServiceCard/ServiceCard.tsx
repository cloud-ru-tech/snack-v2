import { useDraggable } from '@dnd-kit/core';
import { DRAG_MODE, DragGhost, DragPreview } from '@ds/drag-and-drop';
import { CardServiceInfo, CardServiceLight, CardServiceLightProps } from '@ds/uikit-product-card-predefined';
import cn from 'classnames';
import { MouseEvent } from 'react';

import { FavoriteProps, InnerLink } from '../../types';
import { getLinkEmblem, getServiceSourceDragId } from '../../utils';
import styles from './styles.module.scss';

export type ServiceCardProps = {
  service: InnerLink;
  favorite?: FavoriteProps;
  isMobile?: boolean;
  onServiceClick?(service: InnerLink, event: MouseEvent<HTMLElement>): void;
  showDescription: boolean;
  className?: string;
  tabIndex?: number;
  dragPreview?: boolean;
} & Pick<CardServiceLightProps, 'expandable'>;

export function ServiceCard({
  service,
  favorite,
  isMobile,
  onServiceClick,
  showDescription,
  className,
  tabIndex,
  dragPreview,
  expandable,
}: ServiceCardProps) {
  const isInFavorites = favorite?.value.includes(service.id) ?? false;

  const favoriteProps: CardServiceLightProps['favorite'] =
    !dragPreview && favorite
      ? {
          checked: isInFavorites,
          onChange: favorite.onChange(service.id),
          enabled: !service.disabled,
        }
      : undefined;

  const commonProps: CardServiceLightProps<'a'> = {
    as: 'a',
    title: service.label,
    icon: getLinkEmblem(service),
    'data-test-id': `header__drawer-menu__link-${service.id}`,
    href: service.href,
    onClick: (event: MouseEvent<HTMLElement>) => onServiceClick?.(service, event),
    favorite: favoriteProps,
    actionsVisibility: isMobile ? 'always' : 'hover',
    promoTag: service.badge,
    className: cn(styles.card, className),
    tabIndex,
    expandable,
  };

  const card = showDescription ? (
    <CardServiceInfo {...commonProps} description={service.description ?? ''} actionsSize={isMobile ? 's' : 'm'} />
  ) : (
    <CardServiceLight
      {...commonProps}
      tooltip={
        !dragPreview && service.description
          ? {
              tip: service.description,
            }
          : undefined
      }
    />
  );

  return dragPreview ? <DragPreview className={styles.dragCardPreview}>{card}</DragPreview> : card;
}

export type DraggableServiceCardProps = ServiceCardProps & { groupId: string; dragDisabled?: boolean };

export function DraggableServiceCard({
  groupId,
  service,
  favorite,
  dragDisabled,
  ...props
}: DraggableServiceCardProps) {
  const disabled = dragDisabled || service.disabled || favorite?.value.includes(service.id);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: getServiceSourceDragId(groupId, service.id),
    disabled,
  });

  const { tabIndex, ...restAttributes } = attributes ?? {};

  if (disabled) {
    return <ServiceCard service={service} favorite={favorite} {...props} tabIndex={tabIndex} />;
  }

  return (
    <DragGhost
      innerRef={setNodeRef}
      className={styles.draggableCard}
      dragging={isDragging}
      mode={DRAG_MODE.Static}
      {...listeners}
      {...restAttributes}
    >
      <ServiceCard service={service} favorite={favorite} {...props} tabIndex={tabIndex} />
    </DragGhost>
  );
}
