import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Skeleton } from '@ds/skeleton';
import { TitleClickable } from '@ds/uikit-product-title-clickable';
import { extractSupportProps, useDynamicList } from '@ds/utils';
import cn from 'classnames';
import { memo, useMemo, useRef } from 'react';

import { BUTTON_TYPE, TEST_IDS, WIDGET_STATE } from '../../constants';
import { Actions, ActionView, Content, ControlBlock, isVisibleAction } from '../../helperComponents';
import { WidgetLayoutType, WidgetProps } from '../../types';
import styles from './styles.module.scss';

function WidgetComponent({
  header,
  children,
  actions = [],
  wide: wideProp = false,
  state = WIDGET_STATE.Default,
  loadingState,
  errorState,
  className,
  actionsChildren,
  segmentControl,
  ...rest
}: WidgetProps) {
  const { layoutType: contextLayoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(contextLayoutType);
  const layoutType: WidgetLayoutType = isMobile ? 'mobile' : 'desktop';
  const wide = wideProp && !isMobile;

  const containerRef = useRef<HTMLDivElement>(null);
  const visibleSource = useMemo(() => actions.filter(isVisibleAction), [actions]);
  const { visibleItems, hiddenItems } = useDynamicList({
    parentContainerRef: containerRef,
    items: visibleSource,
    maxVisibleItems: 1,
  });

  const [visibleItemsWithoutKebab, hiddenItemsWithKebab] = useMemo(() => {
    const withoutKebab = visibleItems.filter(item => item.variant !== BUTTON_TYPE.Kebab);
    const withKebab = hiddenItems.concat(visibleItems.filter(item => item.variant === BUTTON_TYPE.Kebab));

    return [withoutKebab, withKebab];
  }, [visibleItems, hiddenItems]);

  return (
    <div
      className={cn(styles.widget, className)}
      data-state={state}
      ref={containerRef}
      data-wide={wide || undefined}
      {...extractSupportProps(rest)}
    >
      <div
        className={styles.widgetHeader}
        data-mobile={!wide || undefined}
        data-loading={state === WIDGET_STATE.Loading || undefined}
        data-test-id={TEST_IDS.header}
      >
        <div className={styles.headerMain}>
          {state === WIDGET_STATE.Loading ? (
            <div className={styles.skeletonHeader}>
              <Skeleton loading width={wide ? '96px' : '100%'} height='32px' borderRadius='4px' />
            </div>
          ) : (
            <TitleClickable {...header} className={cn(styles.titleClickable, header.className)} />
          )}

          {!wide && (
            <Actions
              actions={state === WIDGET_STATE.Error ? actions : hiddenItemsWithKebab}
              actionsChildren={actionsChildren}
              wide={wide}
              state={state}
              layoutType={layoutType}
            />
          )}
        </div>

        <ControlBlock
          actions={actions}
          actionsChildren={actionsChildren}
          segmentControl={segmentControl}
          wide={wide}
          state={state}
          layoutType={layoutType}
        />
      </div>

      <div className={styles.widgetContent} data-test-id={TEST_IDS.content}>
        <Content state={state} wide={wide} loadingState={loadingState} errorState={errorState}>
          {children}
        </Content>
      </div>
      {!wide &&
        state !== WIDGET_STATE.Error &&
        visibleItemsWithoutKebab.map((action, index) =>
          state === WIDGET_STATE.Loading ? (
            <Skeleton key={index} loading height='32px' borderRadius='8px' />
          ) : (
            <ActionView
              {...action}
              key={index}
              layoutType='mobile'
              commonProps={{
                className: styles.button,
                size: 'm',
                fullWidth: true,
              }}
            />
          ),
        )}
    </div>
  );
}

export const Widget = memo<WidgetProps>(WidgetComponent);
