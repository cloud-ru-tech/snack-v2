export type ValueOf<T> = T[keyof T];

export function extractCommonButtonProps({
  disabled,
  href,
  icon,
  label,
  loading,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
}: {
  disabled?: boolean;
  href?: string;
  icon?: React.ReactElement;
  label?: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
}) {
  return { disabled, href, icon, label, loading, onClick, onKeyDown, onFocus, onBlur };
}













