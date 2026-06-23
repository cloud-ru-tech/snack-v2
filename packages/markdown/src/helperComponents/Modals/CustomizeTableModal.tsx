import { ButtonGroup } from '@ds/button';
import { FieldStepper } from '@ds/fields';
import { Modal } from '@ds/modal';
import { usePortalContext } from '@ds/portal-context';
import { useEffect, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { markdownLocale } from '../../locale';
import styles from './styles.module.scss';

type CustomizeTableModalProps = {
  open: boolean;
  onClose(): void;
  /** Вставить таблицу заданного размера. */
  onSubmit(rows: number, cols: number): void;
};

const DEFAULT_SIZE = 1;

export function CustomizeTableModal({ open, onClose, onSubmit }: CustomizeTableModalProps) {
  const { t } = markdownLocale.useTranslations();
  const portalContext = usePortalContext();
  const [columns, setColumns] = useState(DEFAULT_SIZE);
  const [rows, setRows] = useState(DEFAULT_SIZE);

  // Сбрасываем значения при каждом открытии, чтобы модалка не помнила прошлый ввод.
  useEffect(() => {
    if (open) {
      setColumns(DEFAULT_SIZE);
      setRows(DEFAULT_SIZE);
    }
  }, [open]);

  const handleAdd = () => onSubmit(rows, columns);

  return (
    // TODO: заменить на адаптив
    <Modal
      open={open}
      onClose={onClose}
      container={portalContext.current ?? undefined}
      title={t('table.customize')}
      data-test-id={TEST_IDS.customizeModal}
      content={
        <div className={styles.fields}>
          <FieldStepper
            size='m'
            className={styles.field}
            label={t('table.columns')}
            min={DEFAULT_SIZE}
            value={columns}
            onChange={setColumns}
            data-test-id={TEST_IDS.customizeColumns}
          />
          <FieldStepper
            size='m'
            className={styles.field}
            label={t('table.rows')}
            min={DEFAULT_SIZE}
            value={rows}
            onChange={setRows}
            data-test-id={TEST_IDS.customizeRows}
          />
        </div>
      }
      footer={
        <ButtonGroup
          size='m'
          primaryAction={{ label: t('add'), onClick: handleAdd, 'data-test-id': TEST_IDS.customizeAdd }}
          secondaryAction={{
            appearance: 'neutral',
            view: 'outline',
            label: t('cancel'),
            onClick: onClose,
            'data-test-id': TEST_IDS.customizeCancel,
          }}
          className={styles.buttons}
        />
      }
    />
  );
}
