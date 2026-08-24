import { HomeFilledSVG } from '@ds/icons/interface/product';
import { CloudLogo } from '@ds/icons/logos';
import { PromoTag } from '@ds/promo-tag';
import { useThemeClassnames } from '@ds/theme';
import { TooltipProps } from '@ds/tooltip';
import { extractDataTestProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';

import { HeaderButton } from '../HeaderButton';
import { HEADER_LOGO_MODE, HeaderLogoMode, MAP_LOGO_MODE_TO_APPEARANCE } from './constants';
import styles from './styles.module.scss';

export type LogoProps = WithSupportProps<{
  loading?: boolean;
  path?: string;
  mode?: HeaderLogoMode;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  tooltip?: TooltipProps;
}>;

export function Logo({ path, loading, mode, href, onClick, className, tooltip, ...rest }: LogoProps) {
  const [error, setError] = useState<boolean>(false);
  const brandCThemeClassName = useThemeClassnames({ brand: 'brandC' });

  useEffect(() => {
    setError(false);
  }, [path, loading]);

  const logo = useMemo(() => {
    if (path && !error) {
      return (
        <img
          src={path}
          alt='logo'
          className={styles.logoImg}
          onLoad={() => {
            setError(false);
          }}
          onError={() => {
            setError(true);
          }}
        />
      );
    }

    return (
      <span className={styles.logoWrap}>
        <span className={styles.iconStack}>
          <CloudLogo size={24} className={cn(styles.icon, brandCThemeClassName, styles.iconDefault)} />
          <HomeFilledSVG size={24} className={cn(styles.icon, brandCThemeClassName, styles.iconHover)} />
        </span>

        {mode && mode !== HEADER_LOGO_MODE.Prod && (
          <PromoTag as='span' label={mode} size='xs' appearance={MAP_LOGO_MODE_TO_APPEARANCE[mode]} />
        )}
      </span>
    );
  }, [error, mode, path, brandCThemeClassName]);

  return (
    <HeaderButton
      as='a'
      tooltip={tooltip}
      className={cn(styles.logo, className)}
      href={href}
      tabIndex={0}
      onClick={onClick}
      loading={loading}
      icon={logo}
      {...extractDataTestProps(rest)}
    />
  );
}
