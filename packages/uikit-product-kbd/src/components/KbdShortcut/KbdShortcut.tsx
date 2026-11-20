import { extractSupportProps, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { Fragment } from 'react';

import { KBD_SHORTCUT_SEPARATOR } from '../../constants';
import { useKbdPlatform } from '../../hooks';
import { kbdLocale } from '../../locale';
import sharedStyles from '../../shared/styles.module.scss';
import { KbdShortcutProps } from '../../types';
import { isKbdKeyName, joinKbdShortcut, resolveKbdLabelKey } from '../../utils';
import { Kbd } from '../Kbd';
import styles from './styles.module.scss';

export function KbdShortcut({
  keys,
  platform,
  'aria-label': ariaLabel,
  className,
  innerRef,
  ...rest
}: KbdShortcutProps) {
  const { t } = kbdLocale.useTranslations();
  const detectedPlatform = useKbdPlatform();
  const resolvedPlatform = platform ?? detectedPlatform;

  const screenReaderLabel =
    ariaLabel ?? joinKbdShortcut(keys, keyName => t(resolveKbdLabelKey(keyName, resolvedPlatform)));

  // Вложенные <kbd> — разметка сочетания по HTML-спецификации. Видимая часть скрыта от скринридера,
  // он читает одно название сочетания вместо отдельных клавиш и разделителей.
  return (
    <kbd
      ref={innerRef}
      className={cn(styles.shortcut, className)}
      {...extractSupportProps(rest)}
      data-platform={resolvedPlatform}
    >
      <span className={styles.keys} aria-hidden>
        {keys.map((key, index) => (
          // Сочетание статично, клавиши могут повторяться — стабильный ключ только индекс.

          <Fragment key={index}>
            {index > 0 && KBD_SHORTCUT_SEPARATOR}
            {isKbdKeyName(key) ? <Kbd keyName={key} platform={resolvedPlatform} /> : <Kbd>{key}</Kbd>}
          </Fragment>
        ))}
      </span>
      <span className={sharedStyles.srOnly}>{screenReaderLabel}</span>
    </kbd>
  );
}

withInnerRefSupport(KbdShortcut);
