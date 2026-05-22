import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import { Theme } from '#storybook/components';

import darkMedia from './dark.png';
import lightMedia from './light.png';
import styles from './styles.module.scss';

export type ThemedDrawerMediaProps = Omit<ComponentPropsWithoutRef<'div'>, 'src'> & {
  /** URL ассета (результат `import … from '*.png'`), обычно из `resolveDrawerStoryMediaSrc(theme)`. */
  src: string;
};

// PNG-импорт в storybook (vite) даёт строку, в astro-окружении — ImageMetadata
// с полем `src`. Нормализуем к строке.
function toUrl(asset: string | { src: string }): string {
  return typeof asset === 'string' ? asset : asset.src;
}

export function resolveDrawerStoryMediaSrc(theme: Theme): string {
  return toUrl(theme === 'dark' ? darkMedia : lightMedia);
}

/** Иллюстрация для слота `media` Drawer; URL картинки передаётся через `src` (см. `resolveDrawerStoryMediaSrc` + `usePreviewTheme`). */
export function ThemedDrawerMedia({ className, style, src, ...rest }: ThemedDrawerMediaProps) {
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
