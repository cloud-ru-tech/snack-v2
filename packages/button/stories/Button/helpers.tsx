import { PlaceholderSVG } from '@design-system/icons';
import type { ReactElement, ReactNode } from 'react';

import { Button, type ButtonProps } from '../../src/Button';

export type IconOption = 'none' | 'placeholder';

export type PlaygroundArgs = Omit<ButtonProps, 'counter' | 'as'> & {
  as?: 'button' | 'a';
  iconKey: IconOption;
  /** Показать счётчик (counter) */
  counterEnabled: boolean;
  /** Значение счётчика (используется при counterEnabled) */
  counterValue: number;
  /** URL для as="a" (используется при as === 'a') */
  hrefLink: string;
};

export const iconOptionToNode = (key: IconOption): ReactNode =>
  key === 'placeholder' ? <PlaceholderSVG /> : undefined;

export function renderButtonPlayground(args: PlaygroundArgs, extraLinkProps?: { target?: string }): ReactElement {
  const { iconKey, counterEnabled, counterValue, hrefLink, ...rest } = args;
  const counter = counterEnabled ? { value: counterValue } : undefined;
  const isLink = rest.as === 'a';
  const linkProps = isLink ? { href: hrefLink, ...extraLinkProps } : {};
  return <Button {...rest} {...linkProps} counter={counter} icon={iconOptionToNode(iconKey)} />;
}
