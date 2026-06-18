import { APPEARANCE, Button, VIEW as BUTTON_VIEW } from '@ds/button';
import { TOOLBAR_AFTER_OVERFLOW_ATTR } from '@ds/toolbar';
import { MouseEvent, ReactNode } from 'react';

type RenderToolbarAfterOverflowButtonParams = {
  'aria-label': string;
  icon: ReactNode;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  'data-test-id'?: string;
};

export function renderToolbarAfterOverflowButton({
  'aria-label': ariaLabel,
  icon,
  onClick,
  'data-test-id': dataTestId,
}: RenderToolbarAfterOverflowButtonParams) {
  return (
    <Button
      {...{ [TOOLBAR_AFTER_OVERFLOW_ATTR]: true }}
      size='m'
      view={BUTTON_VIEW.Function}
      appearance={APPEARANCE.Neutral}
      icon={icon}
      aria-label={ariaLabel}
      onClick={onClick}
      data-test-id={dataTestId}
    />
  );
}
