import cn from 'classnames';
import { HTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';

type DivProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: ReactNode;
};

/** Полноэкранная подложка story: grid, центрирует единственного ребёнка. */
export function DemoPage({ className, children, stack = false, ...rest }: DivProps & { stack?: boolean }) {
  return (
    <div {...rest} className={cn(stack ? styles.pageStack : styles.page, className)}>
      {children}
    </div>
  );
}

/** Пунктирная панель с типографикой; внутри — title/hint/warning/actions/поверхность. */
export function DemoPanel({
  className,
  children,
  width = 'default',
  ...rest
}: Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  className?: string;
  children?: ReactNode;
  width?: 'default' | 'narrow' | 'wide' | 'fluid';
}) {
  return (
    <section
      {...rest}
      className={cn(
        styles.panel,
        width === 'narrow' && styles.panelNarrow,
        width === 'wide' && styles.panelWide,
        width === 'fluid' && styles.panelFluid,
        className,
      )}
    >
      {children}
    </section>
  );
}

export function DemoTitle({
  className,
  children,
  ...rest
}: Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> & { className?: string; children?: ReactNode }) {
  return (
    <h3 {...rest} className={cn(styles.title, className)}>
      {children}
    </h3>
  );
}

export function DemoHint({
  className,
  children,
  ...rest
}: Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & { className?: string; children?: ReactNode }) {
  return (
    <p {...rest} className={cn(styles.hint, className)}>
      {children}
    </p>
  );
}

export function DemoSectionLabel({
  className,
  children,
  ...rest
}: Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> & { className?: string; children?: ReactNode }) {
  return (
    <h4 {...rest} className={cn(styles.sectionLabel, className)}>
      {children}
    </h4>
  );
}

/**
 * Плашка о невалидной / рантайм-резолвленной комбинации args.
 * accent='warning' (по умолчанию) — оранжевый фон, info — primary-фон.
 */
export function DemoWarning({
  className,
  children,
  accent = 'warning',
  ...rest
}: Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
  className?: string;
  children?: ReactNode;
  accent?: 'warning' | 'info';
}) {
  return (
    <p {...rest} className={cn(styles.warning, accent === 'info' && styles.warningInfo, className)}>
      {children}
    </p>
  );
}

/**
 * Обёртка с ручкой изменения размера (`resize`).
 * Оборачивает демонстрируемый компонент, чтобы в Playground можно было потянуть
 * за угол и увидеть поведение при разной ширине (truncate, wrap, reflow).
 *
 * - `axis='horizontal' | 'both'` — по какой оси тянется ручка (по умолчанию `horizontal`).
 * - `width` — стартовая ширина: пресет (`'default'` 320px · `'narrow'` 256px ·
 *   `'fit'` по контенту · `'full'` 100%) либо число пикселей.
 */
export function DemoResizable({
  className,
  children,
  axis = 'horizontal',
  width = 'default',
  style,
  ...rest
}: DivProps & { axis?: 'horizontal' | 'both'; width?: 'narrow' | 'default' | 'fit' | 'full' | number }) {
  const numericWidth = typeof width === 'number';

  return (
    <div
      {...rest}
      style={numericWidth ? { ...style, width } : style}
      className={cn(
        styles.resizable,
        axis === 'both' && styles.resizableBoth,
        width === 'narrow' && styles.resizableNarrow,
        width === 'fit' && styles.resizableFit,
        width === 'full' && styles.resizableFull,
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Ряд элементов в demo-панели.
 * - `align='start' | 'center'` — flex justify; уместно для группы триггеров.
 * - `block` — column-flex со stretch: дочерний элемент растягивается на 100%
 *   ширины. Применяется к full-width компонентам (Alert, ProgressBar, CodeEditor).
 */
export function DemoActions({
  className,
  children,
  align = 'start',
  block = false,
  ...rest
}: DivProps & { align?: 'start' | 'center'; block?: boolean }) {
  return (
    <div
      {...rest}
      className={cn(
        styles.actions,
        align === 'center' && styles.actionsCenter,
        block && styles.actionsBlock,
        className,
      )}
    >
      {children}
    </div>
  );
}
