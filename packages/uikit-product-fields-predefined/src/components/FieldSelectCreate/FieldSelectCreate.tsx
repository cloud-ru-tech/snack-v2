import { APPEARANCE, Button, ICON_POSITION, VIEW } from '@ds/button';
import { Drawer, DrawerProps, POSITION, Position } from '@ds/drawer';
import { FieldSelect } from '@ds/fields';
import { PlusSVG } from '@ds/icons/interface/system';
import { Modal, ModalProps } from '@ds/modal';
import { Tooltip } from '@ds/tooltip';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { forwardRef, ReactElement, useCallback } from 'react';

import { TEST_IDS } from '../../constants';
import { useOpen } from '../../hooks';
import { fieldsPredefinedLocale } from '../../locale';
import { CREATE_LAYOUT_TYPE, PERMISSION } from './constants';
import { SelectFooter } from './helperComponents/SelectFooter';
import styles from './styles.module.scss';
import { FieldSelectCreateProps } from './types';
import { useSelectDataStates } from './useSelectDataStates';

/**
 * Поле выбора с действием «создать»: `FieldSelect` из `@ds/fields` + встроенная форма создания опции
 * в модалке или дровере (`createLayoutType`). Кнопка «Создать <entityName>» — под полем и в футере
 * дроплиста (`SelectFooter`). Пустые состояния и тексты строятся из `entityName`. Доступ рулит `permission`.
 * На mobile дроплист и модалка/дровер — `BottomSheet` (адаптив `@ds`), своего пропа `layoutType` нет.
 */
export const FieldSelectCreate = forwardRef<HTMLInputElement, FieldSelectCreateProps>(function FieldSelectCreate(
  {
    selectProps,
    createLayoutProps,
    createLayoutType = CREATE_LAYOUT_TYPE.Drawer,
    entityName,
    submitHandler,
    onRefetch,
    className,
    afterClose,
    entityIcon,
    permission = PERMISSION.CanCreate,
    ...rest
  },
  ref,
) {
  const { t } = fieldsPredefinedLocale.useTranslations();
  const { isOpen, onOpen, onClose } = useOpen();
  const selectDataStates = useSelectDataStates({ entityName, entityIcon, onRefetch });

  const size = selectProps.size ?? 'm';

  const isNone = permission === PERMISSION.None;
  const canCreate = permission === PERMISSION.CanCreate;

  const handleClose = useCallback(() => {
    onClose();
    afterClose?.();
  }, [afterClose, onClose]);

  const handleCreate = useCallback(async () => {
    const newValue = await submitHandler();
    // Автовыбор новой опции — в single-режиме; в multiple выбор оставляем потребителю.
    if (typeof newValue === 'string' && selectProps.selection !== 'multiple') {
      selectProps.onChange?.(newValue);
    }
    handleClose();
  }, [handleClose, selectProps, submitHandler]);

  const createButtonLabel = `${t('FieldSelectCreate.create')} ${entityName.single.toLocaleLowerCase()}`;
  const noPermissionTip = t('FieldSelectCreate.noPermission');

  // createLayoutType и createLayoutProps дискриминируются союзом, но при деструктуризации корреляция
  // теряется — поэтому приводим тип поверхности к целевому внутри ветки (как в легаси).
  const layoutProps = {
    ...createLayoutProps,
    open: isOpen,
    onClose: handleClose,
    'data-test-id': TEST_IDS.fieldSelectCreateSurface,
    approveButton: { label: t('FieldSelectCreate.create'), onClick: handleCreate },
    cancelButton: { label: t('FieldSelectCreate.cancel'), onClick: handleClose },
  };

  const formLayout =
    createLayoutType === CREATE_LAYOUT_TYPE.Modal ? (
      <Modal {...(layoutProps as ModalProps)} />
    ) : (
      <Drawer
        {...(layoutProps as DrawerProps)}
        position={(createLayoutProps as { position?: Position }).position ?? POSITION.Right}
      />
    );

  const withTip = (node: ReactElement, show: boolean) =>
    show ? <Tooltip tip={noPermissionTip}>{node}</Tooltip> : node;

  return (
    <div
      className={cn(styles.fieldSelectCreate, className)}
      {...extractSupportProps(rest)}
      data-test-id={TEST_IDS.fieldSelectCreate}
    >
      {withTip(
        <FieldSelect
          {...selectProps}
          ref={ref}
          size={size}
          disabled={isNone || selectProps.disabled}
          placeholder={selectProps.placeholder ?? t('FieldSelectCreate.placeholder')}
          {...selectDataStates}
          footer={
            // В состоянии ошибки показываем только «Обновить» из errorDataState — без футера «Создать» (по макету).
            selectProps.dataError ? undefined : (
              <SelectFooter onClick={onOpen} createButtonLabel={createButtonLabel} canCreate={canCreate} />
            )
          }
        />,
        isNone,
      )}
      {withTip(
        <Button
          view={VIEW.Function}
          appearance={APPEARANCE.Neutral}
          label={createButtonLabel}
          icon={<PlusSVG />}
          iconPosition={ICON_POSITION.Before}
          onClick={onOpen}
          size={size}
          disabled={!canCreate}
          className={styles.createButton}
          data-test-id={TEST_IDS.fieldSelectCreateButton}
        />,
        !canCreate,
      )}
      {formLayout}
    </div>
  );
});
