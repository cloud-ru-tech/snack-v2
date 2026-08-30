import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  Modifier,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { usePortalContext } from '@ds/portal-context';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { ServiceCard } from '../helperComponents/ServiceCard';
import { FavoriteProps, LinksGroup } from '../types';
import {
  favoriteListCollisionDetection,
  flatLinksGroups,
  getDragReferenceY,
  isServiceDragId,
  isServiceSourceDragId,
  parseServiceDragId,
  resolveFavoriteOrderOnDragEnd,
} from '../utils';

const restrictGroupDragToVerticalAxis: Modifier = args => {
  if (args.active?.id != null && isServiceSourceDragId(args.active.id)) {
    return args.transform;
  }

  return restrictToVerticalAxis(args);
};

type MainMenuDndOverlayContextValue = {
  setGroupDragOverlay(overlay: ReactNode): void;
};

const MainMenuDndOverlayContext = createContext<MainMenuDndOverlayContextValue | null>(null);

export function useMainMenuDndOverlay() {
  const context = useContext(MainMenuDndOverlayContext);

  return (
    context ?? {
      setGroupDragOverlay: () => {},
    }
  );
}

type UseMainMenuDndProps = {
  favorite?: FavoriteProps;

  /** Все группы карточек из сегментов (для резолва сервисов при DnD в избранное). */
  groups: LinksGroup[];

  showDescription: boolean;
};

export function useMainMenuDnd({ favorite, groups, showDescription }: UseMainMenuDndProps) {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [groupDragOverlay, setGroupDragOverlay] = useState<ReactNode>(null);

  const servicesById = useMemo(() => new Map(flatLinksGroups(groups).map(service => [service.id, service])), [groups]);

  const activeService = activeServiceId ? servicesById.get(activeServiceId) : undefined;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    if (isServiceSourceDragId(active.id)) {
      setActiveServiceId(parseServiceDragId(active.id));
    }
  }, []);

  const { value: favoriteIds, onChange: onFavoriteChange, onOrderChange: onFavoriteOrderChange } = favorite ?? {};

  const handleDragEnd = useCallback(
    ({ active, over, delta, activatorEvent }: DragEndEvent) => {
      if (isServiceDragId(active.id) && favoriteIds) {
        const nextOrderIds = resolveFavoriteOrderOnDragEnd({
          activeId: active.id,
          overId: over?.id,
          favoriteIds,
          referenceY: getDragReferenceY({
            activatorEvent,
            deltaY: delta.y,
            activeRect: active.rect.current.translated,
          }),
          overRect: over?.rect,
        });

        if (nextOrderIds) {
          const activeServiceId = parseServiceDragId(active.id);

          if (favoriteIds.includes(activeServiceId)) {
            onFavoriteOrderChange?.(nextOrderIds);
          } else {
            onFavoriteChange?.(activeServiceId)(true, nextOrderIds.indexOf(activeServiceId));
          }
        }
      }

      if (isServiceSourceDragId(active.id)) {
        setActiveServiceId(null);
      }
    },
    [favoriteIds, onFavoriteChange, onFavoriteOrderChange],
  );

  const handleDragCancel = useCallback(({ active }: DragCancelEvent) => {
    if (active && isServiceSourceDragId(active.id)) {
      setActiveServiceId(null);
    }
  }, []);

  const serviceDragOverlay = activeService ? (
    <ServiceCard service={activeService} showDescription={showDescription} dragPreview />
  ) : null;

  const dragOverlay = serviceDragOverlay ?? groupDragOverlay;

  const overlayContextValue = useMemo(
    () => ({
      setGroupDragOverlay,
    }),
    [],
  );

  return {
    sensors,
    modifiers: [restrictGroupDragToVerticalAxis],
    collisionDetection: favoriteListCollisionDetection,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
    dragOverlay,
    overlayContextValue,
  };
}

export type MainMenuDndContextProps = ReturnType<typeof useMainMenuDnd> & {
  children: ReactNode;
};

export function MainMenuDndContext({
  children,
  sensors,
  modifiers,
  collisionDetection,
  onDragStart,
  onDragEnd,
  onDragCancel,
  dragOverlay,
  overlayContextValue,
}: Partial<MainMenuDndContextProps>) {
  const portalContextRef = usePortalContext();

  // `DragOverlay` рендерит `position: fixed` без собственного портала. Drawer-обёртка
  // (`.snack-rc-drawer-content-wrapper`) держит `will-change: transform`, а это, как и
  // настоящий transform, создаёт containing block для fixed-потомков — оверлей резолвится
  // относительно бокса дровера, а не viewport. Если дровер открыт со смещением сверху
  // (панель начинается не с 0), оверлей визуально уезжает ровно на эту величину. Портал
  // в тот же корень, что использует сам Drawer, выносит оверлей из-под этого предка.
  const dragOverlayNode = <DragOverlay dropAnimation={null}>{dragOverlay}</DragOverlay>;

  return (
    <MainMenuDndOverlayContext.Provider value={overlayContextValue ?? null}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
        modifiers={modifiers}
        measuring={{
          droppable: { strategy: MeasuringStrategy.Always },
        }}
      >
        {children}

        {portalContextRef.current ? createPortal(dragOverlayNode, portalContextRef.current) : dragOverlayNode}
      </DndContext>
    </MainMenuDndOverlayContext.Provider>
  );
}
