import { Button, ButtonProps } from '@ds/button';
import { ChipToggle } from '@ds/chips';
import { Divider } from '@ds/divider';
import { DecorCheckedSpriteSVG } from '@ds/icons';
import { Scroll } from '@ds/scroll';
import { SegmentControl, SegmentControlProps } from '@ds/segment-control';
import { SkeletonContextProvider, WithSkeleton } from '@ds/skeleton';
import { TooltipProps, WithTooltip } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@ds/utils';
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

export type NotificationPanelProps = WithLayoutType<
  WithSupportProps<{
    /** Заголовок панели */
    title: string;
    /** Кнопка настроек и выпадающий список */
    settings?: NotificationPanelSettingsProps;
    /** Сегменты для фильтрации */
    segments?: Omit<SegmentControlProps, 'size' | 'data-test-id'>;
    /** Переключатель для фильтрации */
    chipToggle?: {
      label: string;
      checked: boolean;
      onChange(checked: boolean): void;
    };
    /** Кнопка в "шапке" панели */
    readAllButton?: Omit<ButtonProps, 'data-test-id' | 'size'> & {
      tooltip?: TooltipProps;
    };
    className?: string;
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
  }>
>;

const DEFAULT_SKELETONS_AMOUNT = 2;

/** Контент панели уведомлений (header + scrollable body + footer). Помещается в обёртку `NotificationPanelPopover`. */
export function NotificationPanel({
  title,
  settings,
  segments,
  readAllButton,
  content,
  loading,
  skeletonsAmount = DEFAULT_SKELETONS_AMOUNT,
  scrollEndRef,
  scrollContainerRef,
  className,
  chipToggle,
  layoutType,
  ...rest
}: NotificationPanelProps) {
  const skeletons = useMemo(() => Array.from({ length: skeletonsAmount }, (_, i) => i), [skeletonsAmount]);

  const { tooltip: readAllTooltip, ...readAllButtonProps } = readAllButton ?? {};

  const isMobile = layoutType === 'mobile';

  const buttonSize = isMobile ? 's' : 'm';

  return (
    <div data-layout-type={layoutType} className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      <div className={styles.notificationPanelHeader}>
        <div className={styles.notificationPanelHeadline}>
          <Typography variant='headline' size='s' as='h2' className={styles.notificationPanelTitle}>
            <TruncateString text={title} data-test-id={TEST_IDS.panel.title} />
          </Typography>

          <div className={styles.notificationPanelHeaderActions}>
            {readAllButton && (
              <WithTooltip tooltip={readAllTooltip}>
                <Button
                  {...readAllButtonProps}
                  icon={readAllButtonProps.icon || <DecorCheckedSpriteSVG />}
                  view='function'
                  appearance='neutral'
                  size={buttonSize}
                  disabled={readAllButtonProps.disabled || loading}
                  data-test-id={TEST_IDS.panel.readAll}
                />
              </WithTooltip>
            )}

            {settings && <NotificationPanelSettings {...settings} size={buttonSize} />}
          </div>
        </div>

        <div className={styles.actionsRow}>
          {segments && (
            <SegmentControl
              {...segments}
              size='s'
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
      </div>

      {isMobile && <Divider />}

      <Scroll size='m' className={styles.scrollArea} ref={scrollContainerRef}>
        <div className={styles.notificationPanelBody} aria-busy={loading || undefined}>
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
      </Scroll>
    </div>
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
