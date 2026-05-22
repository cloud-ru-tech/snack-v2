import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import { Theme } from '#storybook/components';

import darkMedia from './dark.png';
import lightMedia from './light.png';
import styles from './styles.module.scss';

export type ThemedModalMediaProps = Omit<ComponentPropsWithoutRef<'div'>, 'src'> & {
  src: string;
};

// PNG-импорт в storybook (vite) даёт строку, в astro-окружении — ImageMetadata.
function toUrl(asset: string | { src: string }): string {
  return typeof asset === 'string' ? asset : asset.src;
}

export function resolveModalStoryMediaSrc(theme: Theme): string {
  return toUrl(theme === 'dark' ? darkMedia : lightMedia);
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
