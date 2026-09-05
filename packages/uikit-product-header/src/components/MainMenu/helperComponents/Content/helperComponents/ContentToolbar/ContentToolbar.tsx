import { Button } from '@ds/button';
import { CollapseVerticalSVG, ExpandVerticalSVG, SettingsSVG } from '@ds/icons/interface/system';
import { Modal } from '@ds/modal';
import { SegmentControl } from '@ds/segment-control';
import { Skeleton, WithSkeleton } from '@ds/skeleton';
import { SwitchRow } from '@ds/uikit-product-switch-row';
import { useValueControl } from '@ds/utils';
import { ReactNode, startTransition } from 'react';

import { headerLocale } from '../../../../../../locale';
import { HeaderButton } from '../../../../../HeaderButton';
import { MainMenuPreferencesProps } from '../../../../types';
import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ContentToolbarSegmentItem = {
  value: string;
  label: string;
  icon?: ReactNode;
};

export type ContentToolbarProps = {
  segment: string;

  onSegmentChange(segment: string): void;

  segmentItems?: ContentToolbarSegmentItem[];

  allGroupsExpanded: boolean;

  onToggleAllGroupsExpanded(): void;

  /** Настройки меню (модалка по кнопке). Не передано — кнопка настроек не отображается. */
  preferences?: MainMenuPreferencesProps;

  isMobile?: boolean;

  /** Флаг загрузки данных — сегменты подгружаются с бэка, поэтому SegmentControl тоже уходит в скелетон. */
  loading?: boolean;
};

export function ContentToolbar({
  segment,
  onSegmentChange,
  segmentItems,
  allGroupsExpanded,
  onToggleAllGroupsExpanded,
  preferences,
  isMobile,
  loading,
}: ContentToolbarProps) {
  const { t } = headerLocale.useTranslations();
  const [open = false, setOpen] = useValueControl<boolean>({
    value: preferences?.open,
    onChange: preferences?.onOpenChange,
  });

  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const handleShowDescriptionChange = (value: boolean) => {
    startTransition(() => preferences?.showDescription?.onChange(value));
  };

  const hasSegmentItems = segmentItems && segmentItems?.length > 0;

  return (
    <div className={styles.root} data-test-id={TEST_IDS.toolbar}>
      {hasSegmentItems && (
        <WithSkeleton
          loading={loading}
          skeleton={
            <div
              className={styles.segmentControlSkeleton}
              data-test-id={TEST_IDS.segmentControl}
              data-mobile={isMobile || undefined}
            >
              <Skeleton className={styles.segmentControlSkeletonBlock} />
            </div>
          }
        >
          <SegmentControl
            size='m'
            outline
            value={segment}
            onChange={onSegmentChange}
            className={styles.segmentControl}
            data-test-id={TEST_IDS.segmentControl}
            items={segmentItems}
            width={isMobile ? 'full' : 'auto'}
          />
        </WithSkeleton>
      )}

      {(preferences || !isMobile) && !loading && (
        <div className={styles.actions}>
          {preferences && (
            <>
              <Button
                view='simple'
                size='m'
                appearance='neutral'
                icon={<SettingsSVG />}
                aria-label={t('menuSettingsTitle')}
                data-test-id={TEST_IDS.settingsButton}
                onClick={openModal}
              />

              <Modal
                open={open}
                onClose={closeModal}
                title={t('menuSettingsTitle')}
                data-test-id={TEST_IDS.settingsModal}
                cancelButton={{
                  label: t('close'),
                  onClick: closeModal,
                }}
                content={
                  <div className={styles.settingsContent}>
                    {preferences.showGroupsColors && (
                      <SwitchRow
                        title={t('menuSettingsShowGroupsColors')}
                        checked={preferences.showGroupsColors.value}
                        onChange={preferences.showGroupsColors.onChange}
                        data-test-id={TEST_IDS.settingsShowGroupsColorsSwitch}
                      />
                    )}

                    <SwitchRow
                      title={t('menuSettingsShowDescription')}
                      checked={preferences.showDescription.value}
                      onChange={handleShowDescriptionChange}
                      data-test-id={TEST_IDS.settingsShowDescriptionSwitch}
                    />
                  </div>
                }
              />
            </>
          )}

          {!isMobile && (
            <HeaderButton
              icon={allGroupsExpanded ? <CollapseVerticalSVG /> : <ExpandVerticalSVG />}
              aria-label={allGroupsExpanded ? t('contentCollapseAllGroups') : t('contentExpandAllGroups')}
              data-test-id={TEST_IDS.toggleAllGroups}
              onClick={onToggleAllGroupsExpanded}
              tooltip={{ tip: allGroupsExpanded ? t('contentCollapseAllGroups') : t('contentExpandAllGroups') }}
            />
          )}
        </div>
      )}
    </div>
  );
}
