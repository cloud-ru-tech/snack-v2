export type CollapsedContentMetrics = {
  maxHeightPx: number;
  maxLines: number;
};

export function resolveCollapsedContentMetrics(element: HTMLElement, maxHeight: number): CollapsedContentMetrics {
  const styles = getComputedStyle(element);
  const lineHeight = parseFloat(styles.lineHeight);

  if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
    return { maxHeightPx: maxHeight, maxLines: 1 };
  }

  const paddingTop = parseFloat(styles.paddingTop) || 0;
  const paddingBottom = parseFloat(styles.paddingBottom) || 0;
  const innerHeight = maxHeight - paddingTop - paddingBottom;

  if (innerHeight <= 0) {
    return { maxHeightPx: maxHeight, maxLines: 1 };
  }

  const maxLines = Math.max(1, Math.floor(innerHeight / lineHeight));

  return {
    maxHeightPx: paddingTop + paddingBottom + maxLines * lineHeight,
    maxLines,
  };
}
