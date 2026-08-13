import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import { Theme } from '#storybook/components';

import darkMedia from './dark.png?url';
import lightMedia from './light.png?url';
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
