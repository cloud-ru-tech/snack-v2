import cn from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

import type { Theme } from '#storybook/components';

import darkMedia from './dark.png';
import lightMedia from './light.png';
import styles from './styles.module.scss';

export type ThemedModalMediaProps = Omit<ComponentPropsWithoutRef<'div'>, 'src'> & {
  src: string;
};

export function resolveModalStoryMediaSrc(theme: Theme): string {
  return theme === 'dark' ? darkMedia : lightMedia;
}

export function ThemedModalMedia({ className, style, src, ...rest }: ThemedModalMediaProps) {
  return (
    <div
      {...rest}
      className={cn(styles.themedStoryMedia, className)}
      style={{
        background: `url(${src}) lightgray 50% / cover no-repeat`,
        ...style,
      }}
    />
  );
}
