import { Button } from '@ds/button';
import { Popover } from '@ds/popover';
import { PortalContextProvider } from '@ds/portal-context';
import { COLOR_SCHEME, ColorScheme, useThemeClassnames } from '@ds/theme';
import { Tooltip } from '@ds/tooltip';
import { useRef } from 'react';

import styles from './CascadingThemes.module.scss';

// Тематический блок: useThemeClassnames форсит colorScheme и эмитит полный набор sn-* на свой div.
// Этот же div — корень порталов блока (PortalContextProvider root={paneRef}), поэтому тултип и
// поповер монтируются ВНУТРЬ него и наследуют тему блока через CSS-каскад токенов.
function ThemedPane({ scheme, title }: { scheme: ColorScheme; title: string }) {
  const themeClassName = useThemeClassnames({ colorScheme: scheme });
  const paneRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={paneRef} className={`${styles.pane} ${themeClassName}`}>
      <PortalContextProvider root={paneRef}>
        <p className={styles.paneTitle}>{title}</p>
        <Tooltip tip='Тултип рендерится в теме своего блока' placement='top'>
          <Button label='Навести — тултип' appearance='primary' view='filled' />
        </Tooltip>
        <Popover content='Поповер — тоже в теме блока' placement='bottom' trigger='click'>
          <Button label='Кликнуть — поповер' appearance='neutral' view='outline' />
        </Popover>
      </PortalContextProvider>
    </div>
  );
}

export function CascadingThemes() {
  return (
    <div className={styles.grid}>
      <ThemedPane scheme={COLOR_SCHEME.Dark} title='Тёмный блок' />
      <ThemedPane scheme={COLOR_SCHEME.Light} title='Светлый блок' />
    </div>
  );
}
