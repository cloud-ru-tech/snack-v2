import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button, ButtonProps } from '@ds/button';
import { ChipToggle } from '@ds/chips';
import { Drawer, DrawerProps, POSITION, WIDTH } from '@ds/drawer';
import { DecorCheckedSVG } from '@ds/icons/interface/product';
import { SegmentControl, SegmentControlProps } from '@ds/segment-control';
import { SkeletonContextProvider, WithSkeleton } from '@ds/skeleton';
import { TooltipProps, WithTooltip } from '@ds/tooltip';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, RefObject, useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import { NotificationCardSkeleton } from '../NotificationCard/NotificationCardSkeleton';
import {
  NotificationCardStack,
  NotificationCardStackProps,
  NotificationPanelBlank,
  NotificationPanelBlankProps,
  NotificationPanelGroup,
  NotificationPanelGroupProps,
  NotificationPanelSettings,
  NotificationPanelSettingsProps,
} from './components';
import styles from './styles.module.scss';

type SharedOverlayProps = Pick<
  DrawerProps,
  'open' | 'onClose' | 'className' | 'rootClassName' | 'showBlackout' | 'container' | 'closeOnPopstate'
>;

/**
 * Только desktop: `position` и `width` применяются лишь к Drawer-поверхности
 * (desktop). На mobile (BottomSheet) молча игнорируются.
 */
export type NotificationPanelProps = WithSupportProps<
  {
    /** Заголовок панели */
    title: string;
    /** Кнопка настроек и выпадающий список */
    settings?: NotificationPanelSettingsProps;
    /** Сегменты для фильтрации */
    segments?: Omit<SegmentControlProps, 'size' | 'data-test-id'>;
    /** Переключатель для фильтрации. Только desktop: в мастере bottomSheet его нет. */
    chipToggle?: {
      label: string;
      checked: boolean;
      onChange(checked: boolean): void;
    };
    /** Кнопка в "шапке" панели */
    readAllButton?: Omit<ButtonProps, 'data-test-id' | 'size'> & {
      tooltip?: TooltipProps;
    };
    /** Состояние загрузки */
    loading?: boolean;
    /** Контент для отрисовки (e.g NotificationCard | NotificationPanel.Blank) */
    content?: ReactNode;
    /** Количество скелетонов карточек для отображения при загрузке */
    skeletonsAmount?: number;
    /** Ссылка на элемент, обозначающий самый конец прокручиваемого списка */
    scrollEndRef?: RefObject<HTMLDivElement>;
    /** Ссылка на контейнер, который скроллится */
    scrollContainerRef?: RefObject<HTMLElement>;
  } & SharedOverlayProps &
    Partial<Pick<DrawerProps, 'position' | 'width'>>
>;

const DEFAULT_SKELETONS_AMOUNT = 2;

/**
 * Адаптивная панель уведомлений. Собрана на `Drawer`, который сам свапает поверхность по
 * `AdaptiveProvider`: на desktop — панель (мастер `window`), на mobile — bottom-sheet. Шапка,
 * фильтры и скроллируемое тело раскладываются слотами дровера, поэтому отступы и типографика
 * приходят из токенов поверхности. `position` / `width` — desktop-only.
 */
export function NotificationPanel({
  title,
  settings,
  segments,
  chipToggle,
  readAllButton,
  content,
  loading,
  skeletonsAmount = DEFAULT_SKELETONS_AMOUNT,
  scrollEndRef,
  scrollContainerRef,
  position = POSITION.Right,
  width = WIDTH.S,
  className,
  ...rest
}: NotificationPanelProps) {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  const skeletons = useMemo(() => Array.from({ length: skeletonsAmount }, (_, i) => i), [skeletonsAmount]);

  const { tooltip: readAllTooltip, ...readAllButtonProps } = readAllButton ?? {};

  const buttonSize = isMobile ? 's' : 'm';

  // Figma: `slotAfterHeadline` (window) / `slotAfterTitle` (bottomSheet) — кнопки прижаты вправо.
  const actions = (readAllButton || settings) && (
    <span className={styles.headerActions}>
      {readAllButton && (
        <WithTooltip tooltip={readAllTooltip}>
          <Button
            {...readAllButtonProps}
            icon={readAllButtonProps.icon || <DecorCheckedSVG />}
            view='function'
            appearance='neutral'
            size={buttonSize}
            disabled={readAllButtonProps.disabled || loading}
            data-test-id={TEST_IDS.panel.readAll}
          />
        </WithTooltip>
      )}

      {settings && <NotificationPanelSettings {...settings} size={buttonSize} />}
    </span>
  );

  // Figma: `slotSubHeadline` (window) / `slotSecondTitle` (bottomSheet). ChipToggle есть только в
  // desktop-мастере.
  const filters = (segments || (!isMobile && chipToggle)) && (
    <div className={styles.filtersRow} data-mobile={isMobile || undefined}>
      {segments && (
        <SegmentControl
          {...segments}
          size='s'
          // В мобильном мастере сегменты делят всю ширину sheet'а.
          width={isMobile ? 'full' : segments.width}
          items={segments.items.map(item => ({
            ...item,
            disabled: item.disabled || loading,
          }))}
          data-test-id={TEST_IDS.panel.segments}
        />
      )}

      {!isMobile && chipToggle && (
        <ChipToggle
          size='s'
          disabled={loading}
          label={chipToggle.label}
          onChange={chipToggle.onChange}
          checked={chipToggle.checked}
          data-test-id={TEST_IDS.panel.chipToggle}
        />
      )}
    </div>
  );

  return (
    <Drawer
      position={position}
      width={width}
      className={cn(styles.panel, className)}
      showButtonClosed={false}
      title={<span data-test-id={TEST_IDS.panel.title}>{title}</span>}
      slotAfterTitle={actions}
      slotSecondTitle={filters}
      withDividers={isMobile}
      // Только mobile: в мастере bottomSheet панель открывается на всю высоту экрана.
      snapPoints={[1]}
      contentRef={scrollContainerRef}
      content={
        <div className={styles.body} aria-busy={loading || undefined}>
          {content}

          {loading && (
            <SkeletonContextProvider loading={Boolean(loading)}>
              {skeletons.map(skeleton => (
                <WithSkeleton key={skeleton} skeleton={<NotificationCardSkeleton />} />
              ))}
            </SkeletonContextProvider>
          )}

          <div className={styles.scrollStub} ref={scrollEndRef} />
        </div>
      }
      {...rest}
    />
  );
}

export namespace NotificationPanel {
  export const Blank: typeof NotificationPanelBlank = NotificationPanelBlank;
  export type BlankProps = NotificationPanelBlankProps;
  export const Stack: typeof NotificationCardStack = NotificationCardStack;
  export type StackProps = NotificationCardStackProps;
  export const Group: typeof NotificationPanelGroup = NotificationPanelGroup;
  export type GroupProps = NotificationPanelGroupProps;
}
