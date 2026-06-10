import { useId } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

export type ToolDisclosureParams = {
  /** Раскрытое состояние (controlled). */
  opened?: boolean;
  /** Начальное раскрытое состояние (uncontrolled). */
  defaultOpened: boolean;
  /** Переключение раскрытия. Получает новое значение `opened`. */
  onToggle?: (opened: boolean) => void;
  /** Есть ли раскрываемый контент. */
  hasDetails: boolean;
};

export type ToolDisclosure = {
  opened: boolean;
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
 * controlled/uncontrolled `opened`, связка chevron ↔ details через `aria-controls`.
 */
export function useToolDisclosure({
  opened: openedProp,
  defaultOpened,
  onToggle,
  hasDetails,
}: ToolDisclosureParams): ToolDisclosure {
  const [opened, setOpened] = useUncontrolledProp(openedProp, defaultOpened, onToggle);
  const detailsId = useId();
  const showDetails = Boolean(opened) && hasDetails;

  return {
    opened: Boolean(opened),
    toggle: () => setOpened(!opened),
    detailsId,
    ariaControls: showDetails ? detailsId : undefined,
    showDetails,
  };
}
