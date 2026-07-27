import { Scroll, ScrollProps } from '@ds/scroll';
import cn from 'classnames';
import { CSSProperties, ReactNode, Ref, RefObject } from 'react';

import { View } from '../../../../constants';
import styles from '../../styles.module.scss';

type TableScrollHostProps = {
  view: View;
  isMobile: boolean;
  isCardsView: boolean;
  usePageStickyHeader: boolean;
  scrollOverflow?: ScrollProps['overflow'];
  scrollPaddingAbsolute?: boolean;
  internalScrollRef: RefObject<HTMLElement | null>;
  scrollRef?: Ref<HTMLDivElement>;
  scrollContainerRef?: RefObject<HTMLDivElement>;
  handleScrollInitialized: () => void;
  syncHeaderHorizontalScroll?: () => void;
  tableHeaderElement?: ReactNode;
  columnSizeVars: CSSProperties;
  children: ReactNode;
};

export function TableScrollHost({
  view,
  isMobile,
  isCardsView,
  usePageStickyHeader,
  scrollOverflow,
  scrollPaddingAbsolute,
  internalScrollRef,
  scrollRef,
  scrollContainerRef,
  handleScrollInitialized,
  syncHeaderHorizontalScroll,
  tableHeaderElement,
  columnSizeVars,
  children,
}: TableScrollHostProps) {
  if (isMobile && isCardsView) {
    return (
      <div className={styles.mobileTable} ref={scrollContainerRef}>
        {children}
        <div className={styles.scrollStub} ref={scrollRef} />
      </div>
    );
  }

  if (usePageStickyHeader) {
    return (
      <div className={styles.tablePlate}>
        {tableHeaderElement ? (
          <div className={styles.stickyTableHeader}>
            <div className={styles.tableHeaderClip}>
              <div className={styles.body} style={columnSizeVars}>
                {tableHeaderElement}
              </div>
            </div>
          </div>
        ) : null}
        <Scroll
          size='m'
          className={cn(styles.table, styles.tableBodyScrollHost)}
          ref={internalScrollRef as RefObject<HTMLElement>}
          onInitialized={handleScrollInitialized}
          onScroll={syncHeaderHorizontalScroll}
          data-view={view}
          overflow={scrollOverflow}
          paddingAbsolute={scrollPaddingAbsolute || undefined}
        >
          {children}
        </Scroll>
        <div className={styles.scrollStub} ref={scrollRef} />
      </div>
    );
  }

  return (
    <Scroll
      size='m'
      className={styles.table}
      ref={internalScrollRef as RefObject<HTMLElement>}
      onInitialized={handleScrollInitialized}
      data-view={view}
      overflow={scrollOverflow}
    >
      {children}
      <div className={styles.scrollStub} ref={scrollRef} />
    </Scroll>
  );
}
