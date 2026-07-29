import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { WithSupportProps } from '@ds/utils';

import { TEST_IDS } from '../../constants';
import { QuotaCardsGrid } from '../../helperComponents/QuotaCardsGrid';
import { QuotaWidgetPropsBase } from '../../types';
import { ProjectHeader } from './components/ProjectHeader';
import { QuotaIncreaseButton } from './QuotaIncreaseButton';
import { QuotaMobileHeader } from './QuotaMobileHeader';
import styles from './styles.module.scss';

export type QuotaWidgetContentProps = WithSupportProps<
  QuotaWidgetPropsBase & {
    /** Ссылка на страницу квот по проекту */
    quotasUrl: string;
    /** Колбек клика по ссылке на страницу квот по проекту */
    onQuotasUrlClick?: () => void;
    /**
     * Не рендерить мобильную шапку (её выносят в pinned-`title` контейнера, напр. BottomSheet).
     * На desktop не влияет.
     */
    hideMobileHeader?: boolean;
    /**
     * Не рендерить мобильную кнопку расширения (её выносят в pinned-`footer` контейнера).
     * На desktop не влияет.
     */
    hideMobileIncreaseButton?: boolean;
  }
>;

/**
 * Голый контент квота-виджета: шапка проекта + карточки + кнопка расширения — без триггера,
 * дропдауна и аккордеона. Используется внутри `QuotaWidget` (в дропдауне/BottomSheet) и напрямую,
 * когда контейнер-раскрытие даёт кто-то снаружи (напр. `sideBlock` формы уже открывает BottomSheet).
 *
 * На full-height BottomSheet шапка/кнопка уезжают в pinned-слоты `title`/`footer` (см. `QuotaWidget`),
 * а сюда остаются только карточки — тогда `hideMobileHeader`/`hideMobileIncreaseButton` = true.
 */
export function QuotaWidgetContent({
  quotas,
  disableSorting,
  loading,
  error,
  onRefresh,
  projectName,
  quotasUrl,
  canEditQuota,
  hideIncreaseQuotaButton,
  onIncreaseQuotaClick,
  onQuotasUrlClick,
  hideMobileHeader = false,
  hideMobileIncreaseButton = false,
  ...props
}: QuotaWidgetContentProps) {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const contentTestId = props['data-test-id'] ?? TEST_IDS.quotaWidget.content;

  const showMobileIncreaseButton =
    isMobile && !hideMobileIncreaseButton && canEditQuota && !error && !hideIncreaseQuotaButton;

  return (
    <div className={styles.content} data-mobile={isMobile} data-test-id={contentTestId}>
      {isMobile ? (
        // Мобильная шапка (макет): «Квоты» + имя проекта, без пиктограммы/ссылки/подзаголовка «Остаток…».
        !hideMobileHeader && <QuotaMobileHeader projectName={projectName} />
      ) : (
        // Desktop-popover: полная шапка проекта (с пиктограммой, ссылкой и кнопкой расширения).
        <ProjectHeader
          projectName={projectName}
          quotasUrl={quotasUrl}
          canEditQuota={canEditQuota}
          error={error}
          onIncreaseQuotaClick={onIncreaseQuotaClick}
          hideIncreaseQuotaButton={hideIncreaseQuotaButton}
          onQuotasUrlClick={onQuotasUrlClick}
        />
      )}

      <QuotaCardsGrid
        quotas={quotas}
        disableSorting={disableSorting}
        loading={loading}
        error={error}
        onRefresh={onRefresh}
      />

      {showMobileIncreaseButton && <QuotaIncreaseButton onClick={onIncreaseQuotaClick} />}
    </div>
  );
}
