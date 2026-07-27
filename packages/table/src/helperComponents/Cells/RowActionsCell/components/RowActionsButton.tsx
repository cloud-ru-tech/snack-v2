import { Button, SIZE, VIEW } from '@ds/button';
import { KebabSVG, MoreSVG } from '@ds/icons/interface/system';
import { ComponentProps } from 'react';

import { TEST_IDS } from '../../../../constants';
import { useTableContext } from '../../../../contexts';

type RowActionsButtonProps = {
  /** `cell` — интерактивная кнопка; `placeholder` — невидимый якорь ширины колонки (header, loading). */
  variant?: 'cell' | 'placeholder';
} & Omit<ComponentProps<typeof Button>, 'appearance' | 'view' | 'icon'>;

export function RowActionsButton({ variant = 'cell', size, ...rest }: RowActionsButtonProps) {
  const { isCardsView } = useTableContext();

  return (
    <Button
      {...rest}
      // В table-строке мастер (actionWrapper 16236:23147) — кнопка size=l (40×40). В карточке
      // размещение действий макетом не задано, оставляем дефолт.
      size={size ?? (isCardsView ? undefined : SIZE.L)}
      appearance='neutral'
      view={VIEW.Function}
      style={
        variant === 'placeholder'
          ? {
              visibility: 'hidden',
              pointerEvents: 'none',
            }
          : undefined
      }
      icon={isCardsView ? <KebabSVG size={24} /> : <MoreSVG size={24} />}
      data-test-id={variant === 'cell' ? TEST_IDS.rowActions.droplistTrigger : undefined}
    />
  );
}
