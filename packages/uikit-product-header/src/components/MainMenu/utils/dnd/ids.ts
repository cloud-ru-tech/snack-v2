const SERVICE_DRAG_SOURCE_PREFIX = 'service-drag:source:';

const SERVICE_DRAG_FAVORITE_PREFIX = 'service-drag:favorite:';

// Символьный сепаратор для исключения пересечения с символами, которые могут быть в groupId или serviceId
const SERVICE_DRAG_SOURCE_GROUP_SEPARATOR = '\u0000';

export const FAVORITES_DROP_ID = 'favorites-drop-zone';

export function getServiceSourceDragId(groupId: string, serviceId: string): string {
  return `${SERVICE_DRAG_SOURCE_PREFIX}${groupId}${SERVICE_DRAG_SOURCE_GROUP_SEPARATOR}${serviceId}`;
}

export function getServiceFavoriteDragId(serviceId: string): string {
  return `${SERVICE_DRAG_FAVORITE_PREFIX}${serviceId}`;
}

export function isServiceSourceDragId(id: string | number | symbol): boolean {
  return String(id).startsWith(SERVICE_DRAG_SOURCE_PREFIX);
}

export function isServiceFavoriteDragId(id: string | number | symbol): boolean {
  return String(id).startsWith(SERVICE_DRAG_FAVORITE_PREFIX);
}

export function isServiceDragId(id: string | number | symbol): boolean {
  return isServiceSourceDragId(id) || isServiceFavoriteDragId(id);
}

export function isFavoritesDroppableId(id: string | number | symbol) {
  return id === FAVORITES_DROP_ID || isServiceFavoriteDragId(id);
}

export function parseServiceDragId(id: string | number | symbol): string {
  const value = String(id);

  if (value.startsWith(SERVICE_DRAG_SOURCE_PREFIX)) {
    const rest = value.slice(SERVICE_DRAG_SOURCE_PREFIX.length);
    const separatorIndex = rest.lastIndexOf(SERVICE_DRAG_SOURCE_GROUP_SEPARATOR);

    if (separatorIndex >= 0) {
      return rest.slice(separatorIndex + 1);
    }

    return rest;
  }

  if (value.startsWith(SERVICE_DRAG_FAVORITE_PREFIX)) {
    return value.slice(SERVICE_DRAG_FAVORITE_PREFIX.length);
  }

  return value;
}
