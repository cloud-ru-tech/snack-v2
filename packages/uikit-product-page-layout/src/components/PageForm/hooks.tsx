import { Button, ButtonProps, View } from '@ds/button';
import { Tooltip, TooltipProps } from '@ds/tooltip';
import { useEffect, useRef, useState } from 'react';

import { pageLayoutLocale } from '../../locale';
import { ButtonPrimaryVariant, ButtonSecondaryVariant } from '../../types';

/**
 * Возвращает компонент кнопки с заданным `view`. Если передан `tooltip`,
 * кнопка оборачивается в `Tooltip`. Соответствует легаси-`useButtonWithTooltip`,
 * где вместо `view` передавался отдельный компонент кнопки (`ButtonFilled`/`ButtonOutline`/`ButtonSimple`).
 */
export function useButtonWithTooltip({ view, tooltip }: { view: View; tooltip?: TooltipProps }) {
  if (tooltip) {
    return function ButtonWithTooltip(props: ButtonProps) {
      return (
        <Tooltip {...tooltip}>
          <Button view={view} {...props} />
        </Tooltip>
      );
    };
  }

  return function ButtonWithView(props: ButtonProps) {
    return <Button view={view} {...props} />;
  };
}

/**
 * Показывает тень у прилипшего футера, пока под ним есть прокручиваемый контент.
 * Внизу формы стоит sentinel-элемент: когда он попадает в область видимости
 * (прокрутка дошла до конца), тень скрывается.
 */
export function useStickyFooterShadow(enabled?: boolean) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!enabled || !sentinel || typeof IntersectionObserver === 'undefined') {
      setAtBottom(false);

      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => setAtBottom(entry.isIntersecting), { threshold: 1 });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [enabled]);

  return { sentinelRef, atBottom };
}

export function useGetButtonLabel() {
  const { t } = pageLayoutLocale.useTranslations();

  return function getButtonLabel(variant: ButtonPrimaryVariant | ButtonSecondaryVariant): string {
    return t(`PageForm.${variant}`);
  };
}
