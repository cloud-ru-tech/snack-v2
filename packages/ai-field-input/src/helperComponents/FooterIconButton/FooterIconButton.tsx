import { APPEARANCE, Button, SIZE, VIEW } from '@ds/button';
import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { useAiFieldInputContext } from '../../context';
import { AiFieldInputFooterButtonBaseProps, AiFieldInputFooterMenuProps } from '../../types';
import { FooterMenu } from '../FooterMenu';

export type FooterIconButtonProps = WithSupportProps<
  AiFieldInputFooterButtonBaseProps &
    AiFieldInputFooterMenuProps & {
      icon: ReactNode;
      'aria-label': string;
    }
>;

export function FooterIconButton({
  icon,
  disabled: disabledProp = false,
  tooltip,
  onClick,
  innerRef,
  className,
  items,
  onSelect,
  ...rest
}: FooterIconButtonProps) {
  const { disabled: fieldDisabled } = useAiFieldInputContext();
  const disabled = disabledProp || fieldDisabled;

  return (
    <FooterMenu items={items} onSelect={onSelect} tooltip={tooltip} triggerRef={innerRef} disabled={disabled}>
      {({ pressed, ref, onKeyDown }) => (
        <Button
          {...rest}
          view={VIEW.Simple}
          appearance={APPEARANCE.Neutral}
          size={SIZE.M}
          icon={icon}
          disabled={disabled}
          className={className}
          innerRef={ref}
          data-pressed={pressed || undefined}
          onClick={onClick}
          onKeyDown={onKeyDown}
        />
      )}
    </FooterMenu>
  );
}

withInnerRefSupport(FooterIconButton);
