import { Button, VIEW } from '@ds/button';
import { KebabSVG, MoreSVG } from '@ds/icons';

import { TEST_IDS } from '../../../../constants';
import { useTableContext } from '../../../../contexts';

type RowActionsButtonProps = {
  /** `cell` — интерактивная кнопка; `placeholder` — невидимый якорь ширины колонки (header, loading). */
  variant?: 'cell' | 'placeholder';
};

export function RowActionsButton({ variant = 'cell' }: RowActionsButtonProps) {
  const { isCardsView } = useTableContext();

  return (
    <Button
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
