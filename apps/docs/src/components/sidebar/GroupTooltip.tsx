import { QuestionSpriteSVG } from '@ds/icons';
import { useLayoutEffect } from '@ds/utils';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './GroupTooltip.module.scss';

export type GroupTooltipProps = {
  tip: string;
  label: string;
};

type Coords = { top: number; left: number };

const OFFSET = 8;
// Совпадает с $docs-header-height в apps/docs/src/styles/_layout.scss.
// Тултип фиксируется по top-краю — клампим, чтобы он не уезжал под sticky-хедер.
const HEADER_HEIGHT = 52;
const HEADER_GAP = 8;
const VIEWPORT_GAP = 8;

// TODO: вернуть @ds/tooltip QuestionTooltip, когда решим, как пробрасывать портал
// сквозь Astro-островки на главной (тултип клипается стэкинг-контекстом родителя).
// Сейчас — самодельный hover-тултип через React.createPortal в document.body, чтобы
// уйти из-под overflow:auto сайдбара. Визуально близок к Tooltip из @ds/tooltip.
export function GroupTooltip({ tip, label }: GroupTooltipProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }
    if (!triggerRef.current || !tooltipRef.current) return;
    const trigger = triggerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    // Клампим: верх не под хедером, низ не за нижним краем viewport'а.
    const minTop = HEADER_HEIGHT + HEADER_GAP;
    const maxTop = window.innerHeight - tooltip.height - VIEWPORT_GAP;
    const top = Math.min(Math.max(trigger.top, minTop), Math.max(maxTop, minTop));
    setCoords({ top, left: trigger.right + OFFSET });
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type='button'
        aria-label={label}
        tabIndex={0}
        className={styles.button}
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <QuestionSpriteSVG size={16} />
      </button>
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={tooltipRef}
            role='tooltip'
            className={styles.tooltip}
            // На первый рендер coords ещё нет — прячем за viewport, пока useLayoutEffect не измерит.
            style={coords ? { top: coords.top, left: coords.left } : { top: -9999, left: -9999, visibility: 'hidden' }}
          >
            {tip}
          </div>,
          document.body,
        )}
    </>
  );
}
