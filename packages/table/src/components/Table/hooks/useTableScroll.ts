import { ScrollProps } from '@ds/scroll';
import { useLayoutEffect } from '@ds/utils';
import { Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TABLE_CSS_VARS, View } from '../../../constants';
type UseTableScrollParams = {
  usePageStickyHeader: boolean;
  isStickyControls: boolean;
  stickyControlsOffsetTop: number;
  stickyControlsOffsetBottom: number;
  showToolbar: boolean;
  isCardsView: boolean;
  isMobile: boolean;
  view: View;
  isLoadingState: boolean;
  columnSizeVars: Record<string, string>;
  scrollContainerRef?: Ref<HTMLElement | null>;
};

export function useTableScroll({
  usePageStickyHeader,
  isStickyControls,
  stickyControlsOffsetTop,
  stickyControlsOffsetBottom,
  showToolbar,
  isCardsView,
  isMobile,
  view,
  isLoadingState,
  columnSizeVars,
  scrollContainerRef,
}: UseTableScrollParams) {
  const internalScrollRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyToolbarRef = useRef<HTMLDivElement>(null);

  const [isScrollReady, setIsScrollReady] = useState(false);
  const handleScrollInitialized = useCallback(() => setIsScrollReady(true), []);

  useEffect(() => {
    if (!usePageStickyHeader) {
      setIsScrollReady(false);
    }
  }, [usePageStickyHeader]);

  useEffect(() => {
    if (isScrollReady && scrollContainerRef && internalScrollRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (scrollContainerRef as any).current = internalScrollRef.current;
    }
  }, [isScrollReady, scrollContainerRef]);

  const syncHeaderHorizontalScroll = useCallback(() => {
    const viewport = internalScrollRef.current;
    const wrapper = wrapperRef.current;

    if (!viewport || !wrapper) {
      return;
    }

    wrapper.style.setProperty(TABLE_CSS_VARS.headerScrollLeft, `${viewport.scrollLeft}px`);
    wrapper.style.setProperty(TABLE_CSS_VARS.viewportWidth, `${viewport.clientWidth}px`);
  }, []);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;

    if (!usePageStickyHeader) {
      wrapper?.style.removeProperty(TABLE_CSS_VARS.headerScrollLeft);

      return;
    }

    const viewport = internalScrollRef.current;

    if (!isScrollReady || !viewport) {
      return;
    }

    syncHeaderHorizontalScroll();

    const observer = new ResizeObserver(syncHeaderHorizontalScroll);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [usePageStickyHeader, isScrollReady, columnSizeVars, syncHeaderHorizontalScroll, view, isLoadingState]);

  // Ширина вьюпорта нужна не только sticky-шапке: по ней центрируется пустое состояние.
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const viewport = internalScrollRef.current;

    if (!wrapper || !viewport) {
      return;
    }

    const syncViewportWidth = () => {
      wrapper.style.setProperty(TABLE_CSS_VARS.viewportWidth, `${viewport.clientWidth}px`);
    };

    syncViewportWidth();

    const observer = new ResizeObserver(syncViewportWidth);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [isScrollReady, usePageStickyHeader, view, isCardsView, isLoadingState]);

  useLayoutEffect(() => {
    if (!usePageStickyHeader || !showToolbar) {
      wrapperRef.current?.style.removeProperty(TABLE_CSS_VARS.stickyToolbarOffset);

      return;
    }

    if (!isScrollReady) {
      return;
    }

    const syncToolbarOffset = () => {
      const wrapper = wrapperRef.current;
      const toolbar = stickyToolbarRef.current;

      if (!wrapper || !toolbar) {
        return false;
      }

      wrapper.style.setProperty(TABLE_CSS_VARS.stickyToolbarOffset, `${toolbar.getBoundingClientRect().height}px`);

      return true;
    };

    if (!syncToolbarOffset()) {
      const rafId = requestAnimationFrame(() => {
        syncToolbarOffset();
      });

      return () => cancelAnimationFrame(rafId);
    }

    const toolbar = stickyToolbarRef.current;

    if (!toolbar) {
      return;
    }

    const observer = new ResizeObserver(syncToolbarOffset);
    observer.observe(toolbar);

    return () => observer.disconnect();
  }, [usePageStickyHeader, showToolbar, isScrollReady, view, isCardsView, isLoadingState]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    if (!isStickyControls) {
      wrapper.style.removeProperty(TABLE_CSS_VARS.stickyControlsOffsetTop);
      wrapper.style.removeProperty(TABLE_CSS_VARS.stickyControlsOffsetBottom);

      return;
    }

    wrapper.style.setProperty(TABLE_CSS_VARS.stickyControlsOffsetTop, `${stickyControlsOffsetTop}px`);
    wrapper.style.setProperty(TABLE_CSS_VARS.stickyControlsOffsetBottom, `${stickyControlsOffsetBottom}px`);
  }, [isStickyControls, stickyControlsOffsetBottom, stickyControlsOffsetTop]);

  const scrollOverflow = useMemo((): ScrollProps['overflow'] => {
    if (isCardsView) {
      return { x: 'visible', y: 'visible-scroll' };
    }

    if (isStickyControls) {
      return { x: 'scroll', y: 'hidden' };
    }

    if (isMobile) {
      return { x: 'scroll', y: 'hidden' };
    }

    return undefined;
  }, [isCardsView, isMobile, isStickyControls]);

  return {
    internalScrollRef,
    wrapperRef,
    stickyToolbarRef,
    isScrollReady,
    handleScrollInitialized,
    syncHeaderHorizontalScroll,
    scrollOverflow,
  };
}
