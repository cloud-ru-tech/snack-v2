import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ArrowUpSVG } from '@ds/icons/interface/system';
import { Tooltip } from '@ds/tooltip';

import { fieldsPredefinedLocale } from '../../../../locale';
import styles from './styles.module.scss';

export type FieldSubmitButtonProps = {
  /** Активна ли отправка (есть валидное значение или прикреплённые файлы) */
  active: boolean;
  /** Колбек клика по кнопке отправки */
  handleClick(): void;
  /** Дополнительный класс */
  className?: string;
  /** Растянуть на всю ширину */
  fullWidth?: boolean;
  /** Показывать тултип над активной кнопкой */
  showTooltip?: boolean;
  /** Идентификатор для тестов */
  'data-test-id'?: string;
};

/**
 * Кнопка отправки сообщения. В активном состоянии — `submit` с тултипом, иначе — disabled.
 */
export function FieldSubmitButton({
  active,
  handleClick,
  className,
  fullWidth,
  showTooltip = true,
  'data-test-id': dataTestId,
}: FieldSubmitButtonProps) {
  const { t } = fieldsPredefinedLocale.useTranslations();

  if (active) {
    return (
      <Tooltip
        tip={t('FieldAi.submit.tooltip')}
        hoverDelayOpen={600}
        open={showTooltip ? undefined : false}
        triggerClassName={styles.tooltipTrigger}
      >
        <Button
          fullWidth={fullWidth}
          icon={<ArrowUpSVG />}
          size='s'
          view={VIEW.Filled}
          appearance={APPEARANCE.Primary}
          type='submit'
          onClick={handleClick}
          className={className}
          data-test-id={dataTestId}
        />
      </Tooltip>
    );
  }

  return (
    <Button
      icon={<ArrowUpSVG />}
      size='s'
      view={VIEW.Filled}
      appearance={APPEARANCE.Primary}
      disabled
      className={className}
      fullWidth={fullWidth}
      data-test-id={dataTestId}
    />
  );
}
