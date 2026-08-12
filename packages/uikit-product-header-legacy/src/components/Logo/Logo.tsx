import { Button } from '@ds/button';
import { CloudLogo, CloudLogoDev, CloudLogoHybrid, CloudLogoStage } from '@ds/icons/logos';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { MouseEventHandler, ReactElement, useEffect, useMemo, useState } from 'react';

import { HEADER_LOGO_MODE, LOGO_SIZE, TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { HeaderLogoMode } from './types';

export type LogoProps = WithSupportProps<{
  /** URL кастомной картинки логотипа. При ошибке загрузки — fallback на mode/prod. */
  path?: string;
  /** Окружение: влияет на вариант брендового логотипа (legacy-extension). */
  mode?: HeaderLogoMode;
  /** Состояние загрузки (spinner Button). */
  loading?: boolean;
  /** Ссылка логотипа. */
  href: string;
  /** Обработчик клика. */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** CSS-класс корневой кнопки. */
  className?: string;
}>;

function resolveModeIcon(mode: HeaderLogoMode | undefined): ReactElement {
  switch (mode) {
    case HEADER_LOGO_MODE.Develop:
      return <CloudLogoDev size={LOGO_SIZE} />;
    case HEADER_LOGO_MODE.Stage:
      return <CloudLogoStage size={LOGO_SIZE} />;
    case HEADER_LOGO_MODE.Hybrid:
      return <CloudLogoHybrid size={LOGO_SIZE} />;
    case HEADER_LOGO_MODE.Prod:
    default:
      return <CloudLogo size={LOGO_SIZE} />;
  }
}

/**
 * Логотип legacy Header (Figma: `buttonSimpleNeutral` + CloudLogo).
 *
 * Визуальная оболочка — `@ds/button` (neutral / simple / m, icon-only).
 * `path` / `mode` / `loading` — функциональный слой из migration/header.
 * data-mode используется в e2e тестах
 */
export function Logo({ path, loading = false, mode, href, onClick, className, ...rest }: LogoProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [path, loading]);

  const icon = useMemo(() => {
    if (path && !error) {
      return (
        <img
          src={path}
          alt=''
          className={styles.logoImg}
          data-test-id={TEST_IDS.image}
          onLoad={() => setError(false)}
          onError={() => setError(true)}
        />
      );
    }

    return (
      <span className={styles.icon} data-test-id={TEST_IDS.icon}>
        {resolveModeIcon(mode)}
      </span>
    );
  }, [error, mode, path]);

  return (
    <Button
      as='a'
      appearance='neutral'
      view='simple'
      size='m'
      href={href}
      onClick={onClick}
      loading={loading}
      icon={icon}
      className={className}
      data-mode={mode}
      data-test-id={TEST_IDS.root}
      {...extractSupportProps(rest)}
    />
  );
}
