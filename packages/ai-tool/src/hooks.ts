import { useUncontrolledProp } from '@ds/utils';
import { useId } from 'react';

export type ToolDisclosureParams = {
  /** Раскрытое состояние (controlled). */
  open?: boolean;
  /** Начальное раскрытое состояние (uncontrolled). */
  defaultOpen: boolean;
  /** Переключение раскрытия. Получает новое значение `open`. */
  onOpenChange?(open: boolean): void;
  /** Есть ли раскрываемый контент. */
  hasDetails: boolean;
};

export type ToolDisclosure = {
  open: boolean;
  /** Переключить раскрытие на противоположное. */
  toggle: () => void;
  /** id details-контейнера для связи с chevron-кнопкой. */
  detailsId: string;
  /**
   * `aria-controls` для chevron: details-контейнер монтируется только
   * в раскрытом состоянии — в свёрнутом ссылка вела бы на несуществующий
   * id (axe: aria-valid-attr-value).
   */
  ariaControls: string | undefined;
  /** Рендерить ли details-контейнер. */
  showDetails: boolean;
};

/**
 * Общая механика раскрытия составных инструментов (`AiTool`, `AiToolSimple`):
 * controlled/uncontrolled `open`, связка chevron ↔ details через `aria-controls`.
 */
export function useToolDisclosure({
  open: openProp,
  defaultOpen,
  onOpenChange,
  hasDetails,
}: ToolDisclosureParams): ToolDisclosure {
  const [open, setOpen] = useUncontrolledProp(openProp, defaultOpen, onOpenChange);
  const detailsId = useId();
  const showDetails = Boolean(open) && hasDetails;

  return {
    open: Boolean(open),
    toggle: () => setOpen(!open),
    detailsId,
    ariaControls: showDetails ? detailsId : undefined,
    showDetails,
  };
}
