import { Button } from '@ds/button';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps, getThemeClassnames, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

import { ANIMATION_DURATION, APPEARANCE, CHEVRON, TEST_IDS, VIEW } from '../../constants';
import { Appearance, Chevron, View } from '../../types';
import { useCollapseState } from './hooks';
import styles from './styles.module.scss';

type Component = 'accordionPrimary' | 'accordionSecondary' | 'accordionTertiary';

export type CollapseBlockProps = PropsWithChildren<
  WithSupportProps<{
    /** Уникальный идентификатор блока в группе переключателей */
    id: string;
    /** Начальное состояние раскрытия (uncontrolled) */
    title: string;
    /** Контент справа от заголовка */
    afterTitle?: ReactNode;
    /** Подзаголовок под строкой заголовка */
    subTitle?: ReactNode;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Визуальный вариант обложки (`simple`, `outline`, `elevated`) */
    view?: View;
    /** Расположение шеврона относительно текста (`before` | `after`) */
    chevron?: Chevron;
    /** Цветовая схема акрила */
    appearance?: Appearance;
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
  chevron = CHEVRON.After,
  appearance = APPEARANCE.Neutral,
  keepMounted = false,
  component,
  ...rest
}: CollapseBlockProps) {
  const { isOpen, isMounted, toggleOpen, isCompletelyOpen, isCompletelyClose } = useCollapseState({
    id,
    keepMounted,
  });

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(styles.wrapper, className)}
      data-acrylic-appearance={appearance}
      data-acrylic-level='1Level'
      data-expanded={isOpen}
      data-view={view}
      data-component={component}
      data-test-id={TEST_IDS.collapseBlock}
      style={{
        '--sn-collapse-block-animation-duration': `${ANIMATION_DURATION}ms`,
      }}
    >
      {component !== 'accordionTertiary' && (
        <>
          <div className={styles.acrylic} />
          {view === VIEW.Outline && <div className={styles.stateLayer} data-state='regularBorder' />}
        </>
      )}

      {/* TODO: проработать клик по titleContent */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.titleContent}
        data-expanded={isOpen || undefined}
        data-completely-close={isCompletelyClose || undefined}
        data-chevron={chevron}
        onClick={toggleOpen}
      >
        <div className={styles.titleWrapper}>
          <div className={styles.titleLine}>
            <Typography
              size={MAP_COMPONENT_TO_TILE_SIZE[component]}
              variant='title'
              className={styles.title}
              data-test-id={TEST_IDS.title}
            >
              {title && <TruncateString text={title} variant='end' />}
            </Typography>
            {afterTitle && (
              <div data-test-id={TEST_IDS.afterTitle} className={styles.afterTitle}>
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
        <div className={cn(styles.chevronWrapper, getThemeClassnames({ platform: 'desktop' }))}>
          <Button
            view='function'
            size='m'
            icon={isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
            data-test-id={TEST_IDS.chevron}
            appearance='neutral'
          />
        </div>
      </div>

      <div className={styles.collapse} data-expanded={isOpen || undefined} aria-hidden={!isOpen}>
        {isMounted ? (
          <div
            className={cn(styles.container, isCompletelyOpen && styles.containerCompletelyOpen)}
            data-completely-close={isCompletelyClose || undefined}
            data-expanded={isOpen || undefined}
          >
            <div></div>
            {/* gap here */}
            <div data-test-id={TEST_IDS.content} className={styles.content}>
              {children}
            </div>
          </div>
        ) : null}
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

export type CollapseBlockTertiaryProps = Omit<CollapseBlockPropsWithoutComponent, 'appearance' | 'view'>;
export const CollapseBlockTertiary = getCollapseBlock<CollapseBlockTertiaryProps>('accordionTertiary');
