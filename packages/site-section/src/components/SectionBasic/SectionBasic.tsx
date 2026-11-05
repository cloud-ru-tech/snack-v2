import { LAYOUT_TYPE, useAdaptiveLayout } from '@ds/adaptive';
import { FieldSelectProps } from '@ds/fields';
import { PaginationProps } from '@ds/pagination';
import { SectionTitle, SectionTitleProps } from '@ds/site-section-title';
import { SIZE, TabsSegmented, TabsSegmentedItem } from '@ds/site-tabs-segmented';
import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { SECTION_CONTAINER_BACKGROUND_TYPE, TEST_IDS } from '../../constants';
import { SectionFilter, SectionFooter, SectionWrapper } from '../../helperComponents';
import { SectionBackground, SectionContainer, SectionContainerBackground, SectionMoreButton } from '../../types';

export type SectionBasicProps = WithSupportProps<
  Pick<SectionTitleProps, 'title' | 'description' | 'titleTag'> & {
    /**
     * Ширина и отступы секции: `new` — целевой вид, `old` — совместимость со страницами до редизайна.
     * Временная настройка на период редизайна, задаётся явно.
     */
    container: SectionContainer;
    /** Внешний слой фона во всю ширину экрана (Figma `sectionBackground`): тема и заливка. */
    background?: SectionBackground;
    /**
     * Блок по ширине `container` (Figma `contentWrapper` + `bgLocal`): тема блока и всего содержимого и заливка —
     * подложка, картинка или акцентный цвет. Тема не задана — тема внешнего слоя.
     */
    containerBackground?: SectionContainerBackground;
    /** HTML-атрибут `id` секции — якорь для навигации по странице. */
    id?: string;
    /** Содержимое секции между фильтрами и футером. */
    children?: ReactNode;
    /** Вкладки под заголовком. Без `tabBarValue` / `defaultTabBarValue` изначально выбрана первая доступная. */
    tabBarItems?: TabsSegmentedItem[];
    /** Выбранная вкладка (controlled), например из параметра URL `?tab=ai`. */
    tabBarValue?: string;
    /** Изначально выбранная вкладка (uncontrolled). */
    defaultTabBarValue?: string;
    /** Колбэк выбора вкладки: значение `value` выбранного элемента `tabBarItems`. */
    onTabBarChange?(value: string): void;
    /** Поля-фильтры под вкладками. Рендерятся как `FieldSelect` размера `l`. */
    filterItems?: FieldSelectProps[];
    /** Пагинация в футере. */
    pagination?: PaginationProps;
    /** Кнопка «Показать еще» в футере. */
    moreButton?: SectionMoreButton;
    /** CSS-класс корня. */
    className?: string;
  }
>;

const DEFAULT_CONTAINER_BACKGROUND: SectionContainerBackground = { type: SECTION_CONTAINER_BACKGROUND_TYPE.Bg };

export function SectionBasic({
  container,
  background,
  containerBackground = DEFAULT_CONTAINER_BACKGROUND,
  id,
  children,
  title,
  description,
  titleTag,
  tabBarItems,
  tabBarValue,
  defaultTabBarValue,
  onTabBarChange,
  filterItems,
  pagination,
  moreButton,
  className,
  ...rest
}: SectionBasicProps) {
  const { layoutType } = useAdaptiveLayout();
  const hasTitle = Boolean(title || description);
  const hasFooter = Boolean(pagination || moreButton);
  // Figma (container=new): на desktop вкладки size=l, на tablet и mobile — size=m. Для old так же.
  const tabsSize = layoutType === LAYOUT_TYPE.Desktop || layoutType === LAYOUT_TYPE.DesktopSmall ? SIZE.L : SIZE.M;

  return (
    <SectionWrapper
      id={id}
      container={container}
      background={background}
      containerBackground={containerBackground}
      className={className}
      data-test-id={TEST_IDS.root}
      {...rest}
    >
      {hasTitle && (
        <SectionTitle
          title={title}
          description={description}
          titleTag={titleTag}
          data-test-id={TEST_IDS.sectionTitle}
        />
      )}
      {tabBarItems && tabBarItems.length > 0 && (
        <TabsSegmented
          items={tabBarItems}
          value={tabBarValue}
          defaultValue={defaultTabBarValue}
          onChange={onTabBarChange}
          size={tabsSize}
          data-test-id={TEST_IDS.tabs}
        />
      )}
      {filterItems && filterItems.length > 0 && <SectionFilter items={filterItems} />}
      {children}
      {hasFooter && <SectionFooter pagination={pagination} moreButton={moreButton} />}
    </SectionWrapper>
  );
}
