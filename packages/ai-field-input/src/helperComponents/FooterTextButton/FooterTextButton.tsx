import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { useAiFieldInputContext } from '../../context';
import { AiFieldInputFooterButtonBaseProps, AiFieldInputFooterMenuProps } from '../../types';
import { FooterMenu } from '../FooterMenu';
import styles from './styles.module.scss';

export type FooterTextButtonProps = WithSupportProps<
  AiFieldInputFooterButtonBaseProps &
    AiFieldInputFooterMenuProps & {
      label: string;
      width: 'model' | 'effort';
      searchable?: boolean;
    }
>;

export function FooterTextButton({
  label,
  width,
  disabled: disabledProp = false,
  tooltip,
  onClick,
  innerRef,
  className,
  items,
  onSelect,
  searchable,
  ...rest
}: FooterTextButtonProps) {
  const { disabled: fieldDisabled } = useAiFieldInputContext();
  const disabled = disabledProp || fieldDisabled;

  return (
    <FooterMenu
      items={items}
      onSelect={onSelect}
      tooltip={tooltip}
      triggerRef={innerRef}
      disabled={disabled}
      searchable={searchable}
    >
      {({ pressed, ref, onKeyDown }) => (
        <button
          {...rest}
          ref={ref}
          type='button'
          className={cn(styles.root, className)}
          disabled={disabled}
          data-width={width}
          data-disabled={disabled || undefined}
          data-pressed={pressed || undefined}
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          <span className={styles.stateLayer} data-state='emptyNeutralOnBackground' aria-hidden />
          <span className={styles.label}>{label}</span>
        </button>
      )}
    </FooterMenu>
  );
}

withInnerRefSupport(FooterTextButton);
