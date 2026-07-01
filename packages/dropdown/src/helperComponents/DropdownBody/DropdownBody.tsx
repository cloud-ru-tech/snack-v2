import { ButtonGroup } from '@ds/button';
import { UpdateSVG } from '@ds/icons';
import { InfoBlock } from '@ds/info-block';
import { Spinner } from '@ds/loader';

import { STATE } from '../../constants';
import { dropdownLocale } from '../../locale';
import styles from '../../styles.module.scss';
import { DropdownProps } from '../../types';

/**
 * Тело Dropdown'а (body) — общее для desktop-popover и mobile-bottom-sheet поверхностей:
 * рендерит контент либо одно из состояний (loading / notFound / noData / dataError).
 */
export function DropdownBody({
  state,
  children,
  bodyPadding = true,
}: Pick<DropdownProps, 'children' | 'state' | 'bodyPadding'>) {
  const { t } = dropdownLocale.useTranslations();

  switch (state?.type) {
    case STATE.Loading:
      return (
        <div className={styles.loaderWrapper}>
          <Spinner size='m' />
        </div>
      );
    case STATE.NotFound:
      return (
        <InfoBlock
          className={styles.infoBlock}
          description={state.description || t('states.notFound.title')}
          footer={
            state.onActionClick ? (
              <ButtonGroup
                size='s'
                tertiaryAction={{
                  label: state.actionLabel || t('states.notFound.action'),
                  view: 'simple',
                  appearance: 'neutral',
                  icon: <UpdateSVG />,
                  iconPosition: 'after',
                  onClick: state.onActionClick,
                }}
              />
            ) : null
          }
        />
      );

    case STATE.NoData:
      return (
        <InfoBlock
          className={styles.infoBlock}
          description={state.description || t('states.noData.title')}
          icon={state.icon}
          footer={
            state.onActionClick ? (
              <ButtonGroup
                size='s'
                tertiaryAction={{
                  label: state.actionLabel || t('states.noData.action'),
                  view: 'simple',
                  appearance: 'neutral',
                  icon: <UpdateSVG />,
                  iconPosition: 'after',
                  onClick: state.onActionClick,
                }}
              />
            ) : null
          }
        />
      );

    case STATE.DataError:
      return (
        <InfoBlock
          className={styles.infoBlock}
          description={state.description || t('states.dataError.title')}
          icon={state.icon}
          footer={
            state.onActionClick ? (
              <ButtonGroup
                size='s'
                tertiaryAction={{
                  label: state.actionLabel || t('states.dataError.action'),
                  view: 'simple',
                  appearance: 'neutral',
                  icon: <UpdateSVG />,
                  iconPosition: 'after',
                  onClick: state.onActionClick,
                }}
              />
            ) : null
          }
        />
      );

    default:
      return (
        <div className={styles.bodyWrapper} data-no-padding={bodyPadding === false || undefined}>
          {children}
        </div>
      );
  }
}
