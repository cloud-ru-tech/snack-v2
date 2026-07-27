import { ButtonGroup } from '@ds/button';
import { FieldCombo } from '@ds/fields';
import { Modal } from '@ds/modal';
import { usePortalContext } from '@ds/portal-context';
import { useEffect, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { markdownLocale } from '../../locale';
import styles from './styles.module.scss';

export type LinkProps = {
  href?: string;
  title?: string;
};

// Модалка добавления ссылки (вместо window.prompt): поле URL + кнопки Отмена/Добавить.
type LinkModalProps = {
  open: boolean;
  /** Текущий href (для редактирования существующей ссылки). */
  initial?: LinkProps;
  onClose(): void;
  onSubmit(props: LinkProps): void;
};

export function LinkModal({ open, initial, onClose, onSubmit }: LinkModalProps) {
  const { t } = markdownLocale.useTranslations();
  const portalContext = usePortalContext();
  const [linkProps, setLinkProps] = useState<LinkProps | undefined>(initial);

  // Префилл значением при каждом открытии (текущий href либо пусто).
  useEffect(() => {
    if (open) {
      setLinkProps({ href: initial?.href, title: initial?.title });
    }
  }, [open, initial?.href, initial?.title]);

  const trimmedUrl = linkProps?.href?.trim() ?? '';
  const handleAdd = () => onSubmit({ href: trimmedUrl, title: linkProps?.title });

  return (
    // TODO: заменить на адаптив
    <Modal
      open={open}
      onClose={onClose}
      container={portalContext.current ?? undefined}
      title={t('link.title')}
      data-test-id={TEST_IDS.linkModal}
      content={
        <div className={styles.fields} data-column={true}>
          <FieldCombo
            size='m'
            label={t('link.titleField.label')}
            placeholder={t('link.titleField.placeholder')}
            value={linkProps?.title ?? ''}
            onChange={title => setLinkProps(prev => ({ ...prev, title }))}
            autoFocus={!initial?.title}
            data-test-id={TEST_IDS.linkModalTitle}
          />

          <FieldCombo
            size='m'
            label={t('link.urlField.label')}
            placeholder={t('link.urlField.placeholder')}
            value={linkProps?.href ?? ''}
            autoFocus={Boolean(initial?.title)}
            onChange={href => setLinkProps(prev => ({ ...prev, href }))}
            data-test-id={TEST_IDS.linkModalUrl}
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
            'data-test-id': TEST_IDS.linkModalAdd,
          }}
          secondaryAction={{
            appearance: 'neutral',
            view: 'outline',
            label: t('cancel'),
            onClick: onClose,
            'data-test-id': TEST_IDS.linkModalCancel,
          }}
          className={styles.buttons}
        />
      }
    />
  );
}
