import { ValueOf } from '@ds/utils';
import { createContext, ReactNode, useContext } from 'react';

/** Поверхность overlay'я, в которой рендерятся общие слоты (`Header` / `Body` / `Footer` / `Media`). */
export const OVERLAY_SURFACE = {
  Modal: 'modal',
  Drawer: 'drawer',
  Sheet: 'sheet',
} as const;

export type OverlaySurface = ValueOf<typeof OVERLAY_SURFACE>;

/**
 * Сегмент коллекции `popupPrivate.anatomy.*`, из которого слоты берут токены раскладки.
 * Modal и Drawer(desktop) рисуются мастером `window`; Sheet — `bottomSheet`.
 */
export const SURFACE_TOKEN_SEGMENT = {
  [OVERLAY_SURFACE.Modal]: 'window',
  [OVERLAY_SURFACE.Drawer]: 'window',
  [OVERLAY_SURFACE.Sheet]: 'bottomSheet',
} as const;

export type SurfaceTokenSegment = ValueOf<typeof SURFACE_TOKEN_SEGMENT>;

type OverlaySurfaceContextValue = {
  surface: OverlaySurface;
  /** Только drawer: высота панели по контенту (`position: top|bottom`) — прокидывается во `Body`. */
  bodyHeightAuto: boolean;
};

// Дефолт `'sheet'`: слоты без провайдера ведут себя как bottom-sheet.
const OverlaySurfaceContext = createContext<OverlaySurfaceContextValue>({
  surface: OVERLAY_SURFACE.Sheet,
  bodyHeightAuto: false,
});

type OverlaySurfaceProviderProps = {
  /** Поверхность, в которой рендерятся дочерние слоты. */
  surface: OverlaySurface;
  /** Только drawer: высота панели по контенту → `Body` (drawer-ветка) добавляет соответствующий класс. */
  bodyHeightAuto?: boolean;
  children: ReactNode;
};

/** Провайдер поверхности overlay'я. Frame (sheet / modal / drawer) оборачивает в него свои слоты. */
export function OverlaySurfaceProvider({ surface, bodyHeightAuto = false, children }: OverlaySurfaceProviderProps) {
  return (
    <OverlaySurfaceContext.Provider value={{ surface, bodyHeightAuto }}>{children}</OverlaySurfaceContext.Provider>
  );
}

/** Текущая поверхность overlay'я. Без провайдера возвращает `'sheet'`. */
export function useOverlaySurface(): OverlaySurface {
  return useContext(OverlaySurfaceContext).surface;
}

/** Только drawer-ветка `Body`: высота панели по контенту (из `DrawerFrame`). */
export function useOverlayBodyHeightAuto(): boolean {
  return useContext(OverlaySurfaceContext).bodyHeightAuto;
}

/** Токен-сегмент текущей поверхности (`window` / `bottomSheet`). Без провайдера — `bottomSheet`. */
export function useSurfaceTokenSegment(): SurfaceTokenSegment {
  return SURFACE_TOKEN_SEGMENT[useOverlaySurface()];
}
