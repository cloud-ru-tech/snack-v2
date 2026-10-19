type GetVisibleItemsCountArgs = {
  /** Ширина, доступная полосе (ширина корня). */
  containerWidth: number;
  /** Ширина всего, кроме вопросов и «+N»: логотип, рамка, кнопка закрытия с зазором. */
  fixedWidth: number;
  /** Ширины ячеек вопросов (сегмент + разделитель перед ним). */
  itemWidths: number[];
  /** Ширина ячейки «+N» (сегмент + разделитель перед ним). */
  moreWidth: number;
};

/**
 * Сколько вопросов помещается в полосу. Если помещаются не все, под «+N» резервируется место;
 * хотя бы один вопрос остаётся видимым всегда.
 */
export function getVisibleItemsCount({ containerWidth, fixedWidth, itemWidths, moreWidth }: GetVisibleItemsCountArgs) {
  const total = itemWidths.length;

  if (containerWidth <= 0 || total === 0) {
    return total;
  }

  const available = containerWidth - fixedWidth;
  const allItemsWidth = itemWidths.reduce((sum, width) => sum + width, 0);

  if (allItemsWidth <= available) {
    return total;
  }

  let used = moreWidth;
  let visible = 0;

  for (const width of itemWidths) {
    if (used + width > available) {
      break;
    }

    used += width;
    visible++;
  }

  return Math.max(1, visible);
}
