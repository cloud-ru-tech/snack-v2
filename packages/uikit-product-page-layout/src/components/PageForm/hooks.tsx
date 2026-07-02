import { Button, ButtonProps, View } from '@ds/button';
import { Tooltip, TooltipProps } from '@ds/tooltip';

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

export function useGetButtonLabel() {
  const { t } = pageLayoutLocale.useTranslations();

  return function getButtonLabel(variant: ButtonPrimaryVariant | ButtonSecondaryVariant): string {
    return t(`PageForm.${variant}`);
  };
}
