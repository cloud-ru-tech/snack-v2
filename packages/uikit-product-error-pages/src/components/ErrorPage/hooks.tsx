import { HomeSVG, UpdateSVG } from '@ds/icons/interface/system';
import { CloudFullLogo } from '@ds/icons/logos';
import { isBrowser } from '@ds/utils';
import { ReactNode, useMemo } from 'react';

import { ERROR_TYPE, LOGO_VARIANT } from '../../constants';
import { errorPageLocale } from '../../locale';
import { ErrorPageContent, ErrorTypeConfig, LogoVariant, MainButtonConfig } from '../../types';
import styles from './styles.module.scss';

export function useGetContentByErrorType({ errorType, custom }: ErrorTypeConfig): ErrorPageContent {
  const { t } = errorPageLocale.useTranslations();

  return useMemo(() => {
    switch (errorType) {
      case ERROR_TYPE.PageUnavailable:
        return { title: t('pageUnavailableTitle'), text: t('actionRedirectTitle'), statusCode: 403 };
      case ERROR_TYPE.PageNotFound:
        return { title: t('pageNotFoundTitle'), text: t('actionRedirectTitle'), statusCode: 404 };
      case ERROR_TYPE.Offline:
        return { title: t('offlineTitle'), text: t('offlineText') };
      case ERROR_TYPE.Redirect:
        return { title: t('redirectTitle'), text: t('redirectText') };
      case ERROR_TYPE.Custom:
        return {
          title: custom?.title ?? t('frontendErrorTitle'),
          text: custom?.text ?? t('actionRedirectTitle'),
          statusCode: custom?.statusCode,
        };
      case ERROR_TYPE.FrontendError:
      default:
        return { title: t('frontendErrorTitle'), text: t('actionRedirectTitle') };
    }
  }, [custom?.statusCode, custom?.text, custom?.title, errorType, t]);
}

export type UseGetButtonPropsByErrorTypeParams = ErrorTypeConfig & {
  mainPageUrl?: string;
};

export function useGetButtonPropsByErrorType({
  errorType,
  mainPageUrl,
  custom,
}: UseGetButtonPropsByErrorTypeParams): MainButtonConfig {
  const { t } = errorPageLocale.useTranslations();

  return useMemo((): MainButtonConfig => {
    switch (true) {
      case errorType === ERROR_TYPE.PageNotFound:
      case errorType === ERROR_TYPE.PageUnavailable:
        return { label: t('mainPageLink'), icon: <HomeSVG />, href: mainPageUrl };
      case errorType === ERROR_TYPE.Redirect:
        return { label: t('redirectButton'), href: mainPageUrl };
      case Boolean(errorType === ERROR_TYPE.Custom && custom?.mainButton):
        return {
          label: custom?.mainButton?.label,
          icon: custom?.mainButton?.icon,
          href: custom?.mainButton?.href,
          onClick: custom?.mainButton?.onClick,
        };
      default:
        return {
          label: t('refreshButton'),
          icon: <UpdateSVG />,
          onClick: () => isBrowser() && window.location.reload(),
        };
    }
  }, [custom, errorType, mainPageUrl, t]);
}

export function useLogoNode(logoVariant: LogoVariant, logo: ReactNode, dataTestId: string): ReactNode {
  return useMemo(() => {
    const wrap = (node: ReactNode) => (
      <div className={styles.logo} data-test-id={dataTestId}>
        {node}
      </div>
    );

    switch (true) {
      case logoVariant === LOGO_VARIANT.Cloud:
        return wrap(<CloudFullLogo />);
      case Boolean(logoVariant === LOGO_VARIANT.Custom && logo):
        return wrap(logo);
      case logoVariant === LOGO_VARIANT.None:
      default:
        return null;
    }
  }, [logo, logoVariant, dataTestId]);
}
