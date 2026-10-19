import { isMobileLayout, LayoutPresets, mergePresets, useAdaptiveLayout, useLayoutDefaults } from '@ds/adaptive';
import { Button } from '@ds/button';
import { CloseSVG } from '@ds/icons/interface/product';
import { extractSupportProps, useLayoutEffect, ValueOf, withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { Fragment, Ref, useCallback, useRef } from 'react';

import { AI_DOCS_URL, SIZE, TEST_IDS } from './constants';
import { LogoButton, LogoCell, MoreSegment, Segment } from './helperComponents';
import { MEASURE_ATTR, useVisibleItems } from './hooks';
import { aiSuggestionPanelLocale } from './locale';
import styles from './styles.module.scss';

export type Size = ValueOf<typeof SIZE>;

/** Вопрос полосы. */
export type AiSuggestionPanelItem = {
  /** Идентификатор вопроса; приходит в `onItemClick`. */
  value: string;
  /** Текст вопроса. Занимает одну строку и не обрезается. */
  label: string;
  /** Неактивный вопрос: нажатие не обрабатывается. */
  disabled?: boolean;
  /**
   * Вопрос отправляется ассистенту: после подписи показывается индикатор загрузки, повторное
   * нажатие не обрабатывается. Состояние выставляет потребитель.
   */
  loading?: boolean;
};

/** Пропсы, дефолт которых зависит от раскладки (см. `AI_SUGGESTION_PANEL_LAYOUT_PRESETS`). */
export type AiSuggestionPanelLayoutDefaults = {
  /** Размер полосы. */
  size: Size;
};

export type AiSuggestionPanelOwnProps = {
  /**
   * Вопросы полосы. Те, что не помещаются по ширине, компонент переносит в сегмент «+N»
   * со списком.
   */
  items: AiSuggestionPanelItem[];
  /**
   * Размер полосы: `s` — высота 32, `m` — высота 40. По умолчанию `s`, на mobile-раскладке — `m`.
   * Явное значение задаёт desktop; mobile переопределяется через `layoutPresets.mobile`.
   */
  size?: Size;
  /** Нажатие на вопрос — в полосе или в списке «+N». */
  onItemClick?(value: string): void;
  /** Нажатие на кнопку закрытия. Без колбэка кнопка не показывается. Полосу компонент не скрывает. */
  onClose?(): void;
  /** Нажатие на кнопку Giga. */
  onLogoClick?(): void;
  /** Ссылка «Документация» в тултипе кнопки Giga. */
  docsUrl?: string;
  /** Переопределение пресетов раскладки (`mobile`, `desktop`, …) для `size`. */
  layoutPresets?: LayoutPresets<AiSuggestionPanelLayoutDefaults>;
  /** Ссылка на корневой элемент. */
  innerRef?: Ref<HTMLDivElement>;
  /** CSS-класс корня. */
  className?: string;
};

export type AiSuggestionPanelProps = WithSupportProps<AiSuggestionPanelOwnProps>;

/**
 * Дефолты по раскладке: на mobile полоса размера `m`. Исключение из правила «`size` в пресеты
 * не кладётся» — макет мобильной раскладки задаёт именно PanelM.
 */
export const AI_SUGGESTION_PANEL_LAYOUT_PRESETS: LayoutPresets<AiSuggestionPanelLayoutDefaults> = {
  mobile: { size: SIZE.M },
};

const LAYOUT_BASE: AiSuggestionPanelLayoutDefaults = { size: SIZE.S };

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as { current: T | null }).current = value;
  }
}

/**
 * Полоса вопросов-подсказок к ассистенту: кнопка Giga, вопросы, «+N» со скрытыми вопросами и кнопка
 * закрытия. Вопросы, которые не помещаются по ширине, уходят в список «+N».
 */
export function AiSuggestionPanel({
  items,
  size: sizeProp,
  onItemClick,
  onClose,
  onLogoClick,
  docsUrl = AI_DOCS_URL,
  layoutPresets,
  innerRef,
  className,
  ...rest
}: AiSuggestionPanelProps) {
  const { t } = aiSuggestionPanelLocale.useTranslations();
  const mobile = isMobileLayout(useAdaptiveLayout().layoutType);
  const { size } = useLayoutDefaults<AiSuggestionPanelLayoutDefaults>(
    LAYOUT_BASE,
    mergePresets(AI_SUGGESTION_PANEL_LAYOUT_PRESETS, layoutPresets),
    { size: sizeProp },
  );

  // Платформа webMobile увеличивает кнопки на шаг, а макет мобильной PanelM держит их desktop-размера.
  const controlSize = mobile && size === SIZE.M ? SIZE.S : size;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const { visibleCount = items.length, recalculate } = useVisibleItems(rootRef, measureRef);

  const closable = Boolean(onClose);

  useLayoutEffect(() => recalculate(), [recalculate, items, size, mobile, closable]);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      assignRef(innerRef, node);
    },
    [innerRef],
  );

  const handleItemClick = useCallback(
    (value: string) => {
      const item = items.find(it => it.value === value);

      if (!item || item.disabled || item.loading) return;

      onItemClick?.(value);
    },
    [items, onItemClick],
  );

  const visibleItems = items.slice(0, visibleCount);
  const hiddenItems = items.slice(visibleCount);

  const closeButton = (measure: boolean) => (
    <Button
      view='function'
      appearance='neutral'
      size={controlSize}
      icon={<CloseSVG />}
      className={styles.close}
      aria-label={measure ? undefined : t('close')}
      tabIndex={measure ? -1 : undefined}
      data-test-id={measure ? undefined : TEST_IDS.close}
      onClick={measure ? undefined : onClose}
    />
  );

  return (
    <div
      ref={setRootRef}
      className={cn(styles.root, className)}
      data-size={size}
      data-closable={closable || undefined}
      {...extractSupportProps(rest)}
      data-test-id={rest['data-test-id'] ?? TEST_IDS.root}
    >
      <div className={styles.panel} data-size={size}>
        <LogoButton size={controlSize} docsUrl={docsUrl} onClick={onLogoClick} />

        {visibleItems.map(item => (
          <Fragment key={item.value}>
            <span className={styles.divider} aria-hidden />
            <Segment
              label={item.label}
              value={item.value}
              size={size}
              mobile={mobile}
              disabled={item.disabled}
              loading={item.loading}
              data-test-id={TEST_IDS.item}
              onClick={() => handleItemClick(item.value)}
            />
          </Fragment>
        ))}

        {hiddenItems.length > 0 && (
          <>
            <span className={styles.divider} aria-hidden />
            <MoreSegment items={hiddenItems} size={size} mobile={mobile} onItemClick={handleItemClick} />
          </>
        )}
      </div>

      {closable && closeButton(false)}

      <div className={styles.measure} aria-hidden>
        <div ref={measureRef} className={styles.measureRow}>
          <div className={styles.panel} data-size={size}>
            <LogoCell size={controlSize} />
            {items.map(item => (
              <span key={item.value} className={styles.measureCell} {...{ [MEASURE_ATTR]: 'item' }}>
                <span className={styles.divider} aria-hidden />
                <Segment measure label={item.label} size={size} mobile={mobile} loading={item.loading} />
              </span>
            ))}
            <span className={styles.measureCell} {...{ [MEASURE_ATTR]: 'more' }}>
              <span className={styles.divider} aria-hidden />
              <Segment measure label={`+${items.length}`} size={size} mobile={mobile} />
            </span>
          </div>
          {closable && closeButton(true)}
        </div>
      </div>
    </div>
  );
}

withInnerRefSupport(AiSuggestionPanel);
