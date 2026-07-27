import { ButtonGroup } from '@ds/button';
import { FieldCombo } from '@ds/fields';
import { Modal } from '@ds/modal';
import { usePortalContext } from '@ds/portal-context';
import { useEffect, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { markdownLocale } from '../../locale';
import styles from './styles.module.scss';

// Модалка вставки изображения (вместо window.prompt): поля URL и Alt + кнопки Отмена/Добавить.
type ImageModalProps = {
  open: boolean;
  onClose(): void;
  onSubmit(url: string, alt: string): void;
};

export function ImageModal({ open, onClose, onSubmit }: ImageModalProps) {
  const { t } = markdownLocale.useTranslations();
  const portalContext = usePortalContext();
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  // Сбрасываем поля при каждом открытии.
  useEffect(() => {
    if (open) {
      setUrl('');
      setAlt('');
    }
  }, [open]);

  const trimmedUrl = url.trim();
  const handleAdd = () => onSubmit(trimmedUrl, alt.trim() || 'image');

  return (
    // TODO: заменить на адаптив
    <Modal
      open={open}
      onClose={onClose}
      container={portalContext.current ?? undefined}
      title={t('image.title')}
      data-test-id={TEST_IDS.imageModal}
      content={
        <div className={styles.fields} data-column={true}>
          <FieldCombo
            size='m'
            label={t('image.url')}
            placeholder={t('image.placeholder')}
            value={url}
            onChange={setUrl}
            autoFocus
            data-test-id={TEST_IDS.imageModalUrl}
          />
          <FieldCombo
            size='m'
            label={t('image.alt')}
            value={alt}
            onChange={setAlt}
            data-test-id={TEST_IDS.imageModalAlt}
          />
        </div>
      }
      footer={
        <ButtonGroup
          size='m'
          primaryAction={{
            label: t('add'),
            onClick: handleAdd,
            disabled: trimmedUrl === '',
            'data-test-id': TEST_IDS.imageModalAdd,
          }}
          secondaryAction={{
            appearance: 'neutral',
            view: 'outline',
            label: t('cancel'),
            onClick: onClose,
            'data-test-id': TEST_IDS.imageModalCancel,
          }}
          className={styles.buttons}
        />
      }
    />
  );
}
