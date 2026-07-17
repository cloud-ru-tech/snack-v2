import { isBrowser, useLayoutEffect as useIsomorphicLayoutEffect } from '@ds/utils';
import { Dispatch, RefObject, SetStateAction, useCallback, useRef, useState } from 'react';

export const ONE_LINE_TEXT_HEIGHT = 20;

export type UseAlertCollapseParams = {
  collapsible: boolean;
  title?: string;
  content: unknown;
  hasFooterActions: boolean;
};

export type UseAlertCollapseResult = {
  titleRef: RefObject<HTMLDivElement | null>;
  descriptionRef: RefObject<HTMLDivElement | null>;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  isTitleLarge: boolean;
  isDescriptionLarge: boolean;
  canExpand: boolean;
  toggleExpand: () => void;
};

function updateIsLarge(ref: RefObject<HTMLDivElement | null>, setter: (value: boolean) => void) {
  const element = ref.current;
  if (element) {
    const { offsetWidth, scrollWidth, offsetHeight } = element;
    setter(offsetHeight > ONE_LINE_TEXT_HEIGHT || scrollWidth > offsetWidth);
  }
}

export function useAlertCollapse({
  collapsible,
  title,
  content,
  hasFooterActions,
}: UseAlertCollapseParams): UseAlertCollapseResult {
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTitleLarge, setIsTitleLarge] = useState(false);
  const [isDescriptionLarge, setIsDescriptionLarge] = useState(false);

  const updateTitleLarge = useCallback(() => {
    updateIsLarge(titleRef, setIsTitleLarge);
  }, []);

  const updateDescriptionLarge = useCallback(() => {
    updateIsLarge(descriptionRef, setIsDescriptionLarge);
  }, []);

  const observeElement = useCallback((ref: RefObject<HTMLDivElement | null>, setter: (value: boolean) => void) => {
    const refElement = ref.current;
    if (refElement && isBrowser()) {
      const observer = new ResizeObserver(entities => {
        entities.forEach(entity => {
          if (entity.target === refElement) {
            updateIsLarge(ref, setter);
          }
        });
      });
      observer.observe(refElement);
      return () => observer.disconnect();
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!collapsible) {
      return;
    }
    return observeElement(titleRef, setIsTitleLarge);
  }, [collapsible, observeElement]);

  useIsomorphicLayoutEffect(() => {
    if (!collapsible) {
      return;
    }
    updateTitleLarge();
  }, [collapsible, title, updateTitleLarge]);

  useIsomorphicLayoutEffect(() => {
    if (!collapsible) {
      return;
    }
    return observeElement(descriptionRef, setIsDescriptionLarge);
  }, [collapsible, observeElement]);

  useIsomorphicLayoutEffect(() => {
    if (!collapsible) {
      return;
    }
    updateDescriptionLarge();
  }, [collapsible, content, updateDescriptionLarge]);

  const canExpand = collapsible && (isTitleLarge || isDescriptionLarge || hasFooterActions);

  const toggleExpand = useCallback(() => {
    setIsExpanded(v => !v);
  }, []);

  return {
    titleRef,
    descriptionRef,
    isExpanded,
    setIsExpanded,
    isTitleLarge,
    isDescriptionLarge,
    canExpand: Boolean(canExpand),
    toggleExpand,
  };
}
