import { Button } from '@ds/button';
import { EmailSVG } from '@ds/icons';
import { Link } from '@ds/link';
import { Tag } from '@ds/tag';
import { useThemeClassnames } from '@ds/theme';
import { extractSupportProps, isBrowser } from '@ds/utils';
import cn from 'classnames';

import { ERROR_TYPE, LOGO_VARIANT, TEST_IDS } from '../../constants';
import { errorPageLocale } from '../../locale';
import { ErrorPageProps, ErrorTypeConfig } from '../../types';
import {
  useGetButtonPropsByErrorType,
  UseGetButtonPropsByErrorTypeParams,
  useGetContentByErrorType,
  useLogoNode,
} from './hooks';
import { Illustration } from './Illustration';
import styles from './styles.module.scss';

const MAIN_PAGE_URL_DEFAULT = '/';

/**
 * Полноэкранная error-страница: заголовок с кодом статуса, текст, набор действий
 * (главная кнопка, ссылки на главную/назад, кнопка поддержки) и декоративная
 * иллюстрация. Контент определяется `errorType`; для `ERROR_TYPE.Custom` берётся
 * из `custom`. Логотип над заголовком — `logoVariant` (`Cloud` / `Custom` / `None`).
 */
export function ErrorPage({
  className,
  mainPageUrl = MAIN_PAGE_URL_DEFAULT,
  onSupportCenterClick,
  logoVariant = LOGO_VARIANT.None,
  errorType = ERROR_TYPE.FrontendError,
  showMainButton = true,
  logo,
  custom,
  ...rest
}: ErrorPageProps) {
  const { t } = errorPageLocale.useTranslations();

  const compactThemeClassName = useThemeClassnames({ density: 'compact' });

  const content = useGetContentByErrorType({ errorType, custom } as ErrorTypeConfig);
  const button = useGetButtonPropsByErrorType({ errorType, custom, mainPageUrl } as UseGetButtonPropsByErrorTypeParams);
  const logoNode = useLogoNode(logoVariant, logo, TEST_IDS.logo);

  const isCustomErrorType = errorType === ERROR_TYPE.Custom;

  const hasMainPageLinkDefault = errorType === ERROR_TYPE.FrontendError;
  const hasMainPageLink = isCustomErrorType ? custom?.showMainPageLink : hasMainPageLinkDefault;

  const hasBackLinkDefault = errorType === ERROR_TYPE.FrontendError || errorType === ERROR_TYPE.PageUnavailable;
  const hasBackLink = isCustomErrorType ? custom?.showBackLink : hasBackLinkDefault;

  const handleBackLinkClick = () => {
    if (isBrowser()) {
      window.history.back();
    }
  };

  return (
    <div className={cn(styles.page, className)} {...extractSupportProps(rest)}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <div className={styles.textContainer}>
            {logoNode}

            <h1 className={styles.title} data-test-id={TEST_IDS.title} data-user>
              {content.title}

              {content.statusCode && (
                <Tag
                  className={cn(styles.statusCode, compactThemeClassName)}
                  appearance='neutral'
                  size='s'
                  label={String(content.statusCode)}
                  data-test-id={TEST_IDS.statusCode}
                />
              )}
            </h1>

            <div className={cn(styles.actions, isCustomErrorType ? custom?.actionWrapperClassName : undefined)}>
              <span className={styles.actionsTitle}>{content.text}</span>

              <div className={styles.actionsLink}>
                {hasMainPageLink && (
                  <Link
                    href={mainPageUrl}
                    target='_self'
                    text={t('mainPageLink')}
                    data-test-id={TEST_IDS.mainPageLink}
                  />
                )}

                {hasBackLink && (
                  <Link
                    onClick={handleBackLinkClick}
                    target='_self'
                    text={t('backLink')}
                    data-test-id={TEST_IDS.backLink}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            {onSupportCenterClick && (
              <Button
                view='outline'
                appearance='primary'
                size='m'
                className={styles.button}
                label={t('supportCenterButton')}
                onClick={onSupportCenterClick}
                icon={<EmailSVG />}
                data-test-id={TEST_IDS.supportButton}
              />
            )}

            {showMainButton &&
              (button.href ? (
                <Button
                  as='a'
                  href={button.href}
                  target='_self'
                  size='m'
                  className={styles.button}
                  label={button.label}
                  icon={button.icon}
                  data-test-id={TEST_IDS.mainButton}
                />
              ) : (
                <Button
                  size='m'
                  className={styles.button}
                  label={button.label}
                  icon={button.icon}
                  onClick={button.onClick}
                  data-test-id={TEST_IDS.mainButton}
                />
              ))}
          </div>
        </div>

        <div className={styles.rightSide}>
          <Illustration data-test-id={TEST_IDS.illustration} />
        </div>
      </div>
    </div>
  );
}

ErrorPage.errorTypes = ERROR_TYPE;
ErrorPage.logoVariants = LOGO_VARIANT;
