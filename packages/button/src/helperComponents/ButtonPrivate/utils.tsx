import { ICON_POSITION, Variant } from '../../constants';
import { ButtonPrivateProps } from './ButtonPrivate';

type GetVariantProps = Pick<ButtonPrivateProps, 'label' | 'icon' | 'iconPosition'>;

export function getVariant({ label, icon, iconPosition }: GetVariantProps) {
  if (label && icon && iconPosition === ICON_POSITION.After) {
    return Variant.IconAfter;
  }

  if (label && icon && iconPosition === ICON_POSITION.Before) {
    return Variant.IconBefore;
  }

  if (label) {
    return Variant.LabelOnly;
  }

  return Variant.IconOnly;
}

type GetWrappedIconProps = Pick<ButtonPrivateProps, 'icon' | 'iconClassName' | 'loading'>;

export function getWrappedIcon({ icon, iconClassName, loading }: GetWrappedIconProps) {
  if (loading) {
    return (
      <span data-test-id={'loading-icon'} className={iconClassName}>
        {/* TODO: Add loader component */}
        <span>⏳</span>
      </span>
    );
  }

  if (icon) {
    return (
      <span data-test-id={'icon'} className={iconClassName}>
        {icon}
      </span>
    );
  }

  return undefined;
}

type GetWrappedLabelProps = Pick<ButtonPrivateProps, 'label' | 'labelClassName'>;

export function getWrappedLabel({ label, labelClassName }: GetWrappedLabelProps) {
  return label ? (
    <span data-test-id={'label'} className={labelClassName}>
      {label}
    </span>
  ) : undefined;
}

type GetChildrenProps = Pick<
  ButtonPrivateProps,
  | 'icon'
  | 'label'
  | 'iconPosition'
  | 'iconClassName'
  | 'labelClassName'
  | 'loading'
  | 'disabled'
  | 'data-test-id'
>;

export function getChildren({
  icon,
  label,
  iconPosition,
  iconClassName,
  labelClassName,
  loading,
  disabled,
  'data-test-id': testId,
}: GetChildrenProps) {
  const wrappedIcon = getWrappedIcon({
    icon,
    iconClassName,
    loading,
  });
  const wrappedLabel = getWrappedLabel({
    label,
    labelClassName,
  });

  const content = (() => {
    switch (iconPosition) {
      case ICON_POSITION.Before: {
        return (
          <>
            {wrappedIcon}
            {wrappedLabel}
          </>
        );
      }
      case ICON_POSITION.After:
      default: {
        return (
          <>
            {wrappedLabel}
            {wrappedIcon}
          </>
        );
      }
    }
  })();

  // Если есть label или icon, оборачиваем в textWrapper
  if (label || icon) {
    return <span className="textWrapper">{content}</span>;
  }

  return content;
}

