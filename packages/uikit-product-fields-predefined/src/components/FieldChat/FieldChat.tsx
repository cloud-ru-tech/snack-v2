import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { AttachmentSquareProps } from '@ds/attachment';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { FileUpload, UPLOAD_MODE } from '@ds/dropzone';
import { FieldTextArea } from '@ds/fields';
import { AttachmentSVG } from '@ds/icons/interface/product';
import { Tooltip } from '@ds/tooltip';
import { KeyboardEvent, useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import { fieldsPredefinedLocale } from '../../locale';
import { Attachments } from './components/Attachments';
import { FieldSubmitButton } from './components/FieldSubmitButton';
import { TextAreaActionsFooter } from './components/TextAreaActionsFooter';
import styles from './styles.module.scss';
import { FieldChatProps } from './types';

/**
 * Поле чата: многострочный ввод с прикреплением файлов и кнопкой отправки.
 * Enter — отправка, Shift+Enter — перенос строки. Прикреплённые файлы на mobile
 * показываются над полем, на desktop — под полем.
 */
export function FieldChat({ handleSubmit: handleSubmitProp, value, attachment, autoFocus, ...props }: FieldChatProps) {
  const { t } = fieldsPredefinedLocale.useTranslations();

  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  // disabled/readonly уходят в FieldTextArea через ...props, но футер-действия (скрепка, отправка)
  // их не наследуют — гасим их явно, иначе прикрепление/отправка остаются кликабельны в disabled-поле.
  const isInactive = Boolean(props.disabled || props.readonly);

  const files = useMemo<AttachmentSquareProps[]>(
    () =>
      attachment?.files?.map(file => ({
        file,
        onDelete: attachment?.onFileDelete,
      })) ?? [],
    [attachment?.files, attachment?.onFileDelete],
  );

  const isValueValid = (typeof value === 'string' && value.trim().length > 0) || files.length > 0;

  const handleSubmit = () => {
    if (isValueValid) {
      handleSubmitProp(value ?? '');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.fieldChat} data-layout-type={layoutType}>
      {isMobile && <Attachments files={files} isMobile={isMobile} />}

      <FieldTextArea
        {...props}
        autoFocus={autoFocus}
        value={value}
        size='m'
        minRows={1}
        maxRows={4}
        showCopyButton={false}
        placeholder={t('FieldChat.placeholder')}
        onKeyDown={handleKeyDown}
        footer={
          <TextAreaActionsFooter
            right={
              <>
                {attachment && (
                  <Tooltip
                    tip={t('FieldChat.attachFileTooltip')}
                    hoverDelayOpen={600}
                    open={isInactive ? false : undefined}
                    triggerClassName={styles.uploadTooltip}
                  >
                    <FileUpload
                      mode={UPLOAD_MODE.Multiple}
                      onFilesUpload={attachment.onFilesUpload}
                      accept={attachment.accept}
                    >
                      <Button
                        view={VIEW.Function}
                        appearance={APPEARANCE.Neutral}
                        size='s'
                        icon={<AttachmentSVG />}
                        disabled={isInactive}
                        data-test-id={TEST_IDS.fieldChatUpload}
                      />
                    </FileUpload>
                  </Tooltip>
                )}

                <FieldSubmitButton
                  active={isValueValid && !isInactive}
                  handleClick={handleSubmit}
                  data-test-id={TEST_IDS.fieldChatSubmit}
                />
              </>
            }
          />
        }
      />

      {!isMobile && <Attachments files={files} />}
    </div>
  );
}
