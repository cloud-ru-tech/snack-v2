import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button } from '@ds/button';
import { ChipToggle } from '@ds/chips';
import { Divider } from '@ds/divider';
import { ConfigurationSVG } from '@ds/icons/interface/product';
import { SearchSVG } from '@ds/icons/interface/system';
import { Droplist, ItemId } from '@ds/list';
import { SearchPrivate, SIZE as SEARCH_SIZE } from '@ds/search-private';
import { Typography } from '@ds/typography';
import { extractSupportProps, useValueControl, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { FocusEventHandler, forwardRef, useEffect, useRef } from 'react';

import { headerLegacyLocale } from '../../../../locale';
import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

const NAVIGATION_SEARCH_TEST_IDS = TEST_IDS.navigationSearch;

export type NavigationSearchOption = {
  /** Уникальный идентификатор режима поиска. */
  id: string;
  /** Подпись чипа (например «С синонимами», «Точный»). */
  label: string;
};

export type NavigationSearchProps = WithSupportProps<{
  /** Значение строки поиска. */
  value: string;
  /** Колбек изменения значения. */
  onChange(value: string): void;
  /** Плейсхолдер поля поиска. */
  placeholder?: string;
  /** Колбек потери фокуса полем поиска. */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /** Колбек фокуса полем поиска. */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Опции режима поиска — чипы в раскрываемой панели настроек. */
  options: NavigationSearchOption[];
  /** Выбранная опция (id из `options`). */
  selectedOption: string;
  /** Колбек смены режима поиска. */
  onSelectedOptionChange(id: string): void;
  /** Показывать панель настроек (Figma `showSettings`, controlled). Без пропа — uncontrolled. */
  showSettings?: boolean;
  /** Колбек смены видимости панели настроек. */
  onShowSettingsChange?(show: boolean): void;
  /** Только mobile: заголовок рядом с кнопкой открытия поиска. */
  title?: string;
  /** Только mobile: раскрыто ли поле поиска (controlled). Без пропа — uncontrolled. */
  openSearch?: boolean;
  /** Только mobile: колбек смены раскрытого состояния поля поиска. */
  onOpenSearchChange?(open: boolean): void;
  /** CSS-класс корневого контейнера. */
  className?: string;
}>;

/**
 * Поиск MainMenu (Figma: `navigationOldSearch` / `navigationOldSearchMobile`).
 *
 * - Desktop: https://www.figma.com/design/te3bVXwakjuUc3QTOfu9Mm/FF-8692--navigation-?node-id=11755-133944
 * - Mobile: https://www.figma.com/design/te3bVXwakjuUc3QTOfu9Mm/FF-8692--navigation-?node-id=11778-40950
 *
 * Поле — `@ds/search-private`; фон — на корневом слое компонента, не на SearchPrivate.
 * На desktop кнопка настроек раскрывает чипы режима поиска (`ChipToggle`, size s).
 * На mobile поиск сначала свёрнут в кнопку, а настройки открываются в `BottomSheet`
 * через адаптивный `Droplist`.
 *
 * ## Граница SearchPrivate и слоёв Figma
 *
 * В макете экземпляр поля выглядит как слой `search`, и из‑за отсутствия отдельных
 * макетов SearchPrivate его легко принять за корень примитива. По факту SearchPrivate
 * начинается со слоя `contentWrapper`: родительский `fieldContainer` задаёт padding и
 * min-height, специфичные для места вызова, поэтому его нельзя включать внутрь
 * SearchPrivate — он остаётся здесь (`styles.fieldContainer`).
 *
 * Корневой класс SearchPrivate совпадает с Figma: `styles.contentWrapper`
 * (`packages/search-private/src/SearchPrivate.tsx`).
 *
 * При добавлении или сверке SearchPrivate с макетом идти от `contentWrapper` наружу
 * по дереву слоёв и проверять padding и свойства каждого уровня у вызывающего кода.
 */
export const NavigationSearch = forwardRef<HTMLDivElement, NavigationSearchProps>(function NavigationSearch(
  {
    value,
    onChange,
    placeholder: placeholderProp,
    onBlur,
    onFocus,
    options,
    selectedOption,
    onSelectedOptionChange,
    showSettings: showSettingsProp,
    onShowSettingsChange,
    title: titleProp,
    openSearch: openSearchProp,
    onOpenSearchChange,
    className,
    ...rest
  },
  ref,
) {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const { t } = headerLegacyLocale.useTranslations();
  const placeholder = placeholderProp ?? t('navigationSearch.placeholder');
  const title = titleProp ?? t('navigationSearch.mobileTitle');
  const settingsTitle = t('navigationSearch.settingsTitle');
  const searchRef = useRef<HTMLInputElement>(null);
  const [showSettings = false, setShowSettings] = useValueControl<boolean>({
    value: showSettingsProp,
    defaultValue: false,
    onChange: onShowSettingsChange,
  });
  const [openSearch = false, setOpenSearch] = useValueControl<boolean>({
    value: openSearchProp,
    defaultValue: Boolean(value),
    onChange: onOpenSearchChange,
  });

  useEffect(() => {
    if (isMobile && openSearch) {
      searchRef.current?.focus();
    }
  }, [isMobile, openSearch]);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  const handleMobileOptionChange = (id: ItemId) => {
    onSelectedOptionChange(String(id));
  };

  const settingsButton = (
    <Button
      view='function'
      appearance='neutral'
      size='m'
      icon={<ConfigurationSVG size={24} />}
      onClick={isMobile ? undefined : handleSettingsClick}
      aria-expanded={showSettings}
      aria-label={settingsTitle}
      data-test-id={NAVIGATION_SEARCH_TEST_IDS.settingsButton}
    />
  );

  // SearchPrivate = Figma `contentWrapper` (не слой `search` / `fieldContainer`). См. JSDoc.
  const search = (
    <SearchPrivate
      ref={searchRef}
      className={styles.search}
      size={SEARCH_SIZE.M}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      data-test-id={NAVIGATION_SEARCH_TEST_IDS.search}
      afterContent={
        isMobile ? (
          <Droplist
            open={showSettings}
            onOpenChange={setShowSettings}
            items={options.map(option => ({ id: option.id, content: option.label }))}
            selection={{ mode: 'single', value: selectedOption, onChange: handleMobileOptionChange }}
            closeDroplistOnItemClick
            closeOnPopstate
            label={settingsTitle}
          >
            {settingsButton}
          </Droplist>
        ) : (
          settingsButton
        )
      }
    />
  );

  return (
    <div
      ref={ref}
      className={cn(styles.root, className)}
      data-mobile={isMobile || undefined}
      data-open-search={isMobile && openSearch ? true : undefined}
      data-test-id={NAVIGATION_SEARCH_TEST_IDS.root}
      {...extractSupportProps(rest)}
    >
      {isMobile && !openSearch ? (
        <>
          <Typography
            className={styles.title}
            variant='title'
            size='s'
            weight='regular'
            data-test-id={NAVIGATION_SEARCH_TEST_IDS.title}
          >
            {title}
          </Typography>
          <Button
            className={styles.mobileSearchButton}
            view='function'
            appearance='neutral'
            size='m'
            icon={<SearchSVG size={24} />}
            onClick={handleOpenSearch}
            aria-label={placeholder}
            data-test-id={NAVIGATION_SEARCH_TEST_IDS.openSearchButton}
          />
        </>
      ) : (
        <div className={styles.searchWrapper}>
          {/* Figma `fieldContainer`: padding места вызова — снаружи SearchPrivate. */}
          <div className={styles.fieldContainer}>{search}</div>
        </div>
      )}

      {!isMobile && showSettings && (
        <>
          <Divider variant='regular' className={styles.settingsSectionDivider} />
          <div className={styles.settings} data-test-id={NAVIGATION_SEARCH_TEST_IDS.settings}>
            {options.map(option => (
              <ChipToggle
                key={option.id}
                size='s'
                label={option.label}
                checked={selectedOption === option.id}
                onChange={() => onSelectedOptionChange(option.id)}
                data-test-id={NAVIGATION_SEARCH_TEST_IDS.option(option.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});
