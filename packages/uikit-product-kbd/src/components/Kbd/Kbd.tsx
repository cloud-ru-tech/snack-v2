import { extractSupportProps, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';

import { useKbdPlatform } from '../../hooks';
import { kbdLocale } from '../../locale';
import sharedStyles from '../../shared/styles.module.scss';
import { KbdProps } from '../../types';
import { resolveKbdLabelKey, resolveKbdSymbol } from '../../utils';
import styles from './styles.module.scss';

export function Kbd({ children, keyName, platform, 'aria-label': ariaLabel, className, innerRef, ...rest }: KbdProps) {
  const { t } = kbdLocale.useTranslations();
  const detectedPlatform = useKbdPlatform();
  const resolvedPlatform = platform ?? detectedPlatform;

  const content = keyName ? resolveKbdSymbol(keyName, resolvedPlatform) : children;
  const screenReaderLabel = ariaLabel ?? (keyName ? t(resolveKbdLabelKey(keyName, resolvedPlatform)) : undefined);

  return (
    <kbd
      ref={innerRef}
      className={cn(styles.kbd, className)}
      {...extractSupportProps(rest)}
      data-key-name={keyName}
      data-platform={keyName ? resolvedPlatform : undefined}
    >
      {screenReaderLabel ? (
        <>
          <span aria-hidden>{content}</span>
          <span className={sharedStyles.srOnly}>{screenReaderLabel}</span>
        </>
      ) : (
        content
      )}
    </kbd>
  );
}

withInnerRefSupport(Kbd);
