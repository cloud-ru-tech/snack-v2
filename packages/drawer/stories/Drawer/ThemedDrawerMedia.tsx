import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import { Theme } from '#storybook/components';

import darkMedia from './dark.png?url';
import lightMedia from './light.png?url';
import styles from './styles.module.scss';

export type ThemedDrawerMediaProps = Omit<ComponentPropsWithoutRef<'div'>, 'src'> & {
  /** URL ассета (результат `import … from '*.png'`), обычно из `resolveDrawerStoryMediaSrc(theme)`. */
  src: string;
};

export function resolveDrawerStoryMediaSrc(theme: Theme): string {
  return theme === 'dark' ? darkMedia : lightMedia;
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
