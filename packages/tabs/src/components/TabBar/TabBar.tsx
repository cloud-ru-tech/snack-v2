import { Divider } from '@ds/divider';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import {
  Children,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { MARKER_POSITION, ORIENTATION, SIZE } from '../../constants';
import { TabBarContext, useTabsContext } from '../../context';
import { MarkerPosition, Orientation, Size } from '../../types';
import { ScrollButton } from '../ScrollButton';
import { TabProps } from '../Tab';
import { useFocusControl, useScrollContainer } from './hooks';
import styles from './styles.module.scss';

const SCROLL_CONTAINER_ORIENTATION_MAP: Record<Orientation, string> = {
  [ORIENTATION.Horizontal]: styles.horizontalScrollContainer,
  [ORIENTATION.Vertical]: styles.verticalScrollContainer,
};

export type TabBarProps = WithSupportProps<{
  /** Контент (элементы Tabs.Tab) */
  children: ReactElement<TabProps>[];
  /** Дополнительный слот для кастомного контента справа от табов */
  after?: ReactNode;
  /** Ориентация */
  orientation?: Orientation;
  /**
   * Позиция маркера относительно таб-бара.
   *
   * Значения ориентационно-нейтральны, в Figma та же ось названа сторонами:
   * `before` = Figma `top` (horizontal) / `left` (vertical),
   * `after`  = Figma `bottom` (horizontal) / `right` (vertical).
   */
  markerPosition?: MarkerPosition;
  /** Размер панели табов: L — верхнеуровневый, M — на уровне контента */
  size?: Size;
  /** Скрыть разделитель под/рядом с панелью табов */
  disableDivider?: boolean;
  /** CSS-класс */
  className?: string;
}>;

type MarkerScrollPosition = {
  left?: number;
  width?: number;
  height?: number;
  top?: number;
};

export function TabBar({
  children,
  className,
  size = SIZE.L,
  orientation = ORIENTATION.Horizontal,
  markerPosition = MARKER_POSITION.After,
  after,
  disableDivider = false,
  ...otherProps
}: TabBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { selectedTab, setSelectedTab } = useTabsContext();
  const { hasOverflow, scrollLeft, scrollRight, scrollTop, scrollBottom } = useScrollContainer(scrollContainerRef);
  const selectedRef = useRef<HTMLButtonElement | null>(null);
  const [markerScrollPosition, setMarkerScrollPosition] = useState<MarkerScrollPosition>({});
  const [focusedTab, setFocusedTab] = useState<string | undefined>();

  useEffect(() => {
    if (!selectedTab) {
      const firstEnabled = Children.map(children, child => child.props).find(
        (props: { value: string; disabled?: boolean }) => !props.disabled,
      );
      if (firstEnabled) {
        setSelectedTab(firstEnabled.value);
      }
    }
  }, [children, selectedTab, setSelectedTab]);

  const updateMarkPosition = useCallback(
    (element: HTMLButtonElement) => {
      if (orientation === 'horizontal') {
        setMarkerScrollPosition({
          left: element.offsetLeft,
          width: element.offsetWidth,
        });
      } else {
        setMarkerScrollPosition({
          top: element.offsetTop,
          height: element.offsetHeight,
        });
      }
      selectedRef.current = element;
    },
    [orientation],
  );

  useEffect(() => {
    if (!selectedRef.current) {
      return;
    }

    const updatePosition = () => {
      if (selectedRef.current) {
        updateMarkPosition(selectedRef.current);
      }
    };
    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(selectedRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, size, updateMarkPosition]);

  const scrollContainerToElement = useCallback(
    (element: HTMLElement) => {
      const container = scrollContainerRef.current;

      if (element && container) {
        if (orientation === 'vertical') {
          const overflowTop = element.offsetTop < container.scrollTop;
          const overflowBottom =
            element.offsetTop + element.offsetHeight > container.scrollTop + container.offsetHeight;

          if (overflowTop || overflowBottom) {
            const count = element.offsetTop - container.offsetHeight / 2 + element.offsetHeight / 2;
            container.scroll({ top: count, behavior: 'smooth' });
          }
          return;
        }

        const overflowLeft = element.offsetLeft < container.scrollLeft;
        const overflowRight = element.offsetLeft + element.offsetWidth > container.scrollLeft + container.offsetWidth;

        if (overflowLeft || overflowRight) {
          const count = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
          container.scroll({ left: count, behavior: 'smooth' });
        }
      }
    },
    [orientation],
  );

  const onSelectHandler = useCallback(
    (element: HTMLButtonElement) => {
      updateMarkPosition(element);
      scrollContainerToElement(element);
    },
    [scrollContainerToElement, updateMarkPosition],
  );

  const onFocusHandler = useCallback(
    (element: HTMLButtonElement, value: string) => {
      setFocusedTab(value);
      scrollContainerToElement(element);
    },
    [scrollContainerToElement],
  );

  const [getPrev, getNext] = useFocusControl(children);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      let newFocusTab: string | undefined;
      if (e.key === 'ArrowRight') newFocusTab = getNext(focusedTab || selectedTab);
      if (e.key === 'ArrowLeft') newFocusTab = getPrev(focusedTab || selectedTab);
      if (e.key === 'ArrowUp') newFocusTab = getPrev(focusedTab || selectedTab);
      if (e.key === 'ArrowDown') newFocusTab = getNext(focusedTab || selectedTab);
      if (newFocusTab) {
        e.preventDefault();
        setFocusedTab(newFocusTab);
      }
    },
    [getPrev, getNext, focusedTab, selectedTab],
  );

  return (
    <div
      className={cn(styles.tabBar, className)}
      role='tablist'
      data-orientation={orientation}
      {...extractSupportProps(otherProps)}
    >
      {!disableDivider && (
        <div className={styles.divider} data-position={markerPosition}>
          <Divider variant='regular' orientation={orientation} />
        </div>
      )}
      <div className={styles.tabBarScrollZone} data-orientation={orientation}>
        <div className={styles.tabBarMain} data-testid='tabs__bar-wrap' data-orientation={orientation}>
          <ScrollContainer
            className={cn(SCROLL_CONTAINER_ORIENTATION_MAP[orientation], styles.scrollArea)}
            innerRef={scrollContainerRef as RefObject<HTMLElement>}
          >
            <div
              className={styles.tabsRow}
              data-size={size}
              data-orientation={orientation}
              onKeyDown={handleKeyDown}
              role='presentation'
            >
              <TabBarContext.Provider
                value={{
                  onSelect: onSelectHandler,
                  size,
                  orientation,
                  focusedTab,
                  onFocus: onFocusHandler,
                }}
              >
                {children}
              </TabBarContext.Provider>

              <div
                className={styles.marker}
                style={markerScrollPosition}
                data-position={markerPosition}
                data-orientation={orientation}
              />
            </div>
          </ScrollContainer>
        </div>

        {orientation === ORIENTATION.Horizontal && hasOverflow.left && (
          <ScrollButton direction='left' onClick={scrollLeft} orientation={orientation} size={size} />
        )}
        {orientation === ORIENTATION.Horizontal && hasOverflow.right && (
          <ScrollButton direction='right' onClick={scrollRight} orientation={orientation} size={size} />
        )}
        {orientation === ORIENTATION.Vertical && hasOverflow.top && (
          <ScrollButton direction='top' onClick={scrollTop} orientation={orientation} size={size} />
        )}
        {orientation === ORIENTATION.Vertical && hasOverflow.bottom && (
          <ScrollButton direction='bottom' onClick={scrollBottom} orientation={orientation} size={size} />
        )}
      </div>

      {after && (
        <div
          data-testid='tabs__bar__after'
          data-orientation={orientation}
          data-size={size}
          className={styles.tabBarAfter}
        >
          {after}
        </div>
      )}
    </div>
  );
}
