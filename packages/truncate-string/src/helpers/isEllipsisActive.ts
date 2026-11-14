export const isEllipsisActive = (element: HTMLElement | null) => {
  if (!element) {
    return false;
  }

  if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
    return true;
  }

  const style = getComputedStyle(element);
  const range = element.ownerDocument.createRange();
  range.selectNodeContents(element);
  const textWidth = range.getBoundingClientRect().width;

  // Range и DOMRect сохраняют доли пикселя, которые теряются в clientWidth и scrollWidth.
  const contentWidth =
    element.getBoundingClientRect().width -
    parseFloat(style.paddingLeft) -
    parseFloat(style.paddingRight) -
    parseFloat(style.borderLeftWidth) -
    parseFloat(style.borderRightWidth);

  return textWidth > contentWidth + 1 / 64;
};
