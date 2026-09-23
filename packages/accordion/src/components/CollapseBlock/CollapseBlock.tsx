import {
  BACKGROUND_PREDEFINED_FILL,
  type BackgroundPredefinedFill,
  backgroundPredefinedFillToAcrylic,
} from '@ds/materials';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren, ReactNode, useId } from 'react';

import { ANIMATION_DURATION, CHEVRON_POSITION, TEST_IDS, VIEW } from '../../constants';
import { ChevronButton } from '../../helperComponents';
import { ChevronPosition, View } from '../../types';
import { useCollapseState } from './hooks';
import styles from './styles.module.scss';

type Component = 'accordionPrimary' | 'accordionSecondary' | 'accordionTertiary';

export type CollapseBlockProps = PropsWithChildren<
  WithSupportProps<{
    /** Уникальный идентификатор блока в группе переключателей */
    id: string;
    /** Заголовок блока */
    title?: string;
    /**
     * Контент справа от заголовка. Текст слота входит в доступное имя кнопки-шеврона вместе с `title`,
     * поэтому без `title` в слот можно передать собственный заголовок.
     */
    afterTitle?: ReactNode;
    /** Подзаголовок под строкой заголовка */
    subTitle?: ReactNode;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Визуальный вариант обложки (`simple`, `outline`, `elevated`) */
    view?: View;
    /** Положение шеврона-раскрытия относительно текста (`before` | `after`) */
    chevronPosition?: ChevronPosition;
    /** Показывать ли шеврон-раскрытия рядом с заголовком (по умолчанию `true`) */
    showChevron?: boolean;
    /**
     * Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`).
     * По умолчанию `material/neutralBackground1Level`.
     */
    backgroundPredefined?: BackgroundPredefinedFill;
    /** Уровень аккордеона: размер типографики и отступы */
    component: Component;
    /** Оставлять ли контент в DOM при сворачивании */
    keepMounted?: boolean;
  }>
>;

const MAP_COMPONENT_TO_TILE_SIZE = {
  accordionPrimary: 'l',
  accordionSecondary: 'm',
  accordionTertiary: 's',
} as const;

/**
 * Элемент аккордеона: заголовок, шеврон и раскрываемая область с контентом.
 */
export function CollapseBlock({
  id,
  title,
  afterTitle,
  subTitle,
  children,
  className,
  view = VIEW.Simple,
  chevronPosition = CHEVRON_POSITION.After,
  backgroundPredefined = BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
  keepMounted = false,
  component,
  showChevron = true,
  'data-test-id': dataTestId,
  ...rest
}: CollapseBlockProps) {
  const { isOpen, isMounted, toggleOpen, isCompletelyOpen, isCompletelyClose } = useCollapseState({
    id,
    keepMounted,
  });

  const { appearance, level } = backgroundPredefinedFillToAcrylic(backgroundPredefined);
  const titleId = useId();
  const afterTitleId = useId();
  const contentId = useId();
  const chevronLabelledBy = [title && titleId, afterTitle && afterTitleId].filter(Boolean).join(' ') || undefined;

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(styles.wrapper, className)}
      data-acrylic-appearance={appearance}
      data-acrylic-level={level}
      data-expanded={isOpen}
      data-completely-open={isCompletelyOpen || undefined}
      data-view={view}
      data-component={component}
      data-test-id={dataTestId ?? TEST_IDS.collapseBlock}
      style={{
        '--sn-collapse-block-animation-duration': `${ANIMATION_DURATION}ms`,
      }}
    >
      {component !== 'accordionTertiary' && (
        <>
          <div className={styles.acrylic} />
          {view === VIEW.Outline && <div className={styles.stateLayer} data-state='borderOnBackground' />}
        </>
      )}

      {/* TODO: проработать клик по titleContent */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.titleContent}
        data-expanded={isOpen || undefined}
        data-completely-close={isCompletelyClose || undefined}
        data-chevron-position={chevronPosition}
        onClick={toggleOpen}
      >
        <div className={styles.titleWrapper}>
          <div className={styles.titleLine}>
            {title && (
              <Typography
                size={MAP_COMPONENT_TO_TILE_SIZE[component]}
                variant='title'
                className={styles.title}
                id={titleId}
                data-test-id={TEST_IDS.title}
              >
                <TruncateString text={title} variant='end' />
              </Typography>
            )}
            {afterTitle && (
              <div id={afterTitleId} data-test-id={TEST_IDS.afterTitle} className={styles.afterTitle}>
                {afterTitle}
              </div>
            )}
          </div>
          {subTitle && (
            <div className={styles.subTitle} data-test-id={TEST_IDS.subTitle}>
              {subTitle}
            </div>
          )}
        </div>
        {showChevron && (
          <div className={styles.chevronWrapper}>
            <ChevronButton
              expanded={isOpen}
              contentId={contentId}
              labelledBy={chevronLabelledBy}
              data-test-id={TEST_IDS.chevron}
            />
          </div>
        )}
      </div>

      <div id={contentId} className={styles.collapse} data-expanded={isOpen || undefined} aria-hidden={!isOpen}>
        {/* Контейнер живёт в DOM всегда: его вертикальные отступы анимируются вместе с
            раскрытием, а у только что смонтированного узла transition не с чего стартовать —
            отступ применился бы скачком. Размонтируется только контент. */}
        <div
          className={cn(styles.container, isCompletelyOpen && styles.containerCompletelyOpen)}
          data-completely-close={isCompletelyClose || undefined}
          data-expanded={isOpen || undefined}
        >
          <div></div>
          {/* gap here */}
          {isMounted ? <div data-test-id={TEST_IDS.content}>{children}</div> : null}
        </div>
      </div>
    </div>
  );
}

export type CollapseBlockComponent = CollapseBlockProps['component'];

type CollapseBlockPropsWithoutComponent = Omit<CollapseBlockProps, 'component'>;

function getCollapseBlock<T extends CollapseBlockPropsWithoutComponent>(component: CollapseBlockComponent) {
  return function CollapseBlockWithComponent(props: T) {
    return <CollapseBlock {...props} component={component} />;
  };
}

export type CollapseBlockPrimaryProps = CollapseBlockPropsWithoutComponent;
export const CollapseBlockPrimary = getCollapseBlock<CollapseBlockPrimaryProps>('accordionPrimary');

export type CollapseBlockSecondaryProps = CollapseBlockPropsWithoutComponent;
export const CollapseBlockSecondary = getCollapseBlock<CollapseBlockSecondaryProps>('accordionSecondary');

export type CollapseBlockTertiaryProps = Omit<CollapseBlockPropsWithoutComponent, 'view' | 'backgroundPredefined'>;
export const CollapseBlockTertiary = getCollapseBlock<CollapseBlockTertiaryProps>('accordionTertiary');
