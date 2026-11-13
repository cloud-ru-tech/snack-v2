import { Button, ButtonProps } from '@ds/button';
import { Tooltip } from '@ds/tooltip';
import { ReactElement } from 'react';

type ToolbarButtonProps = {
  label: string;
  icon: ReactElement;
  testId: string;
  appearance?: ButtonProps['appearance'];
  showTooltip?: boolean;
  onClick(): void;
};

const TOOLTIP_OPEN_DELAY = 400;

export function ToolbarButton({
  label,
  icon,
  testId,
  onClick,
  appearance = 'neutral',
  showTooltip = false,
}: ToolbarButtonProps) {
  const button = (
    <Button
      view='simple'
      appearance={appearance}
      size='s'
      minWidth={false}
      aria-label={label}
      icon={icon}
      onClick={onClick}
      data-test-id={testId}
    />
  );

  if (showTooltip) {
    return (
      <Tooltip tip={label} hoverDelayOpen={TOOLTIP_OPEN_DELAY}>
        {button}
      </Tooltip>
    );
  }

  return button;
}
