import { Button, VIEW } from '@ds/button';
import { CrossSVG, UpdateSVG } from '@ds/icons/interface/system';
import { InfoBlock } from '@ds/info-block';
import { Skeleton } from '@ds/skeleton';
import { memo, ReactNode } from 'react';

import { TEST_IDS, WIDGET_STATE } from '../../constants';
import { widgetLocale } from '../../locale';
import { WidgetErrorStateProps, WidgetLoadingStateProps, WidgetState } from '../../types';
import styles from './styles.module.scss';

type ContentProps = {
  children: ReactNode;
  state?: WidgetState;
  wide?: boolean;
  loadingState?: WidgetLoadingStateProps;
  errorState?: WidgetErrorStateProps;
};

function ContentComponent({ children, state, wide, loadingState, errorState }: ContentProps) {
  const { t } = widgetLocale.useTranslations();
  switch (state) {
    case WIDGET_STATE.Loading: {
      if (loadingState?.loadingContent) {
        return loadingState.loadingContent;
      }

      if (loadingState?.showSkeleton) {
        return (
          <div className={styles.skeletonContent}>
            <Skeleton loading width='100%' height='80px' borderRadius='8px' />
          </div>
        );
      }

      return null;
    }

    case WIDGET_STATE.Error: {
      return (
        <div className={styles.errorWrapper} data-wide={wide || undefined}>
          <InfoBlock
            size='m'
            className={styles.infoBlock}
            icon={errorState?.errorIcon ?? { icon: CrossSVG, appearance: 'neutral', background: true }}
            title={errorState?.errorTitle || t('dataErrorTitle')}
            content={errorState?.errorDescription || t('dataErrorDescription')}
            footer={
              errorState?.onClickUpdate && (
                <Button
                  size='m'
                  label={errorState?.updateButtonLabel || t('updateButtonLabel')}
                  appearance='neutral'
                  view={VIEW.Filled}
                  icon={<UpdateSVG />}
                  onClick={errorState?.onClickUpdate}
                  data-test-id={TEST_IDS.errorRetry}
                />
              )
            }
          />
        </div>
      );
    }

    case WIDGET_STATE.Default:
    default:
      return children;
  }
}

export const Content = memo<ContentProps>(ContentComponent);
