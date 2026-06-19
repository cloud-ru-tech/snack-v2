import { ComponentPropsWithoutRef, ElementType, MouseEventHandler } from 'react';

const TARGET_BLANK = '_blank';

export function getSpreadProps({
  Component,
  rest,
  onClick,
}: {
  Component: ElementType;
  rest: Record<string, unknown>;
  onClick?: MouseEventHandler<HTMLElement>;
}): Record<string, unknown> {
  if (Component === 'button') {
    const { type = 'button', ...buttonRest } = rest as ComponentPropsWithoutRef<'button'>;

    return {
      type,
      ...buttonRest,
      onClick,
    };
  }

  if (Component === 'a') {
    const { href, target, ...anchorRest } = rest as ComponentPropsWithoutRef<'a'>;

    return {
      ...anchorRest,
      href: href ?? '#',
      target,
      rel: target === TARGET_BLANK ? 'noopener noreferrer' : undefined,
      onClick,
    };
  }

  return {
    ...rest,
    onClick,
  };
}
