import { ItemId } from '../types';

/**
 * Sortable-контейнер верхнего уровня reorder-режима. Строки без группы и сами группы лежат в одном
 * контейнере (переставляются как «братья»), строки внутри группы — в контейнере со `id` группы.
 * Кастомный `collisionDetection` в `ListPrivate` пускает drop только в пределах одного контейнера.
 */
export const REORDER_TOP_LEVEL: ItemId = '__reorder-top-level__';
