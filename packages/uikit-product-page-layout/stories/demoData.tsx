import { Accordion } from '@ds/accordion';
import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Block, SIZE as BLOCK_SIZE } from '@ds/block';
import { APPEARANCE as BUTTON_APPEARANCE, Button, SIZE as BUTTON_SIZE, VIEW } from '@ds/button';
import { Card } from '@ds/card';
import {
  ApiKeysSVG,
  BoxSVG,
  CloudCheckmarkSVG,
  CloudSVG,
  CpuSVG,
  HomeFilledSVG,
  InfoOutlineSVG,
  KeySVG,
  ListSVG,
  MonitoringSVG,
  NetworkCardSVG,
  SwitcherSettingSVG,
  VerticalMenuOpenSVG,
} from '@ds/icons/interface/product';
import { Status } from '@ds/status';
import { SIZE as TAG_SIZE, Tag } from '@ds/tag';
import { QuestionTooltip } from '@ds/tooltip';
import { TreeNodeProps } from '@ds/tree';
import { Typography, VARIANT } from '@ds/typography';
import { Action, SidebarItem } from '@ds/uikit-product-page-layout';
import { Fragment, ReactNode } from 'react';
import { fn } from 'storybook/test';

import styles from './styles.module.scss';

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

/** Бейдж «Preview» в слоте `afterContent` пункта сайдбара (фича на стадии превью). */
const PREVIEW_BADGE = <Tag label='Preview' size={TAG_SIZE.Xs} appearance='primary' />;

/**
 * Плоский набор пунктов для страницы конкретного инстанса (PageServices detail).
 * Совпадает со спецификацией Figma «Виртуальные машины → vm-…»: разделы инстанса без групп.
 * Часть пунктов несёт `afterContent`-бейдж «Preview» — фичи на стадии превью.
 */
export const SIDEBAR_SERVICE_ITEMS: SidebarItem[] = [
  { id: 'info', label: 'Информация', href: '#info', beforeContent: <InfoOutlineSVG /> },
  { id: 'network', label: 'Сетевые параметры', href: '#network', beforeContent: <NetworkCardSVG /> },
  { id: 'disks', label: 'Диски', href: '#disks', beforeContent: <BoxSVG /> },
  { id: 'backups', label: 'Резервные копии', href: '#backups', beforeContent: <CloudCheckmarkSVG /> },
  { id: 'monitoring', label: 'Мониторинг', href: '#monitoring', beforeContent: <MonitoringSVG /> },
  { id: 'auth', label: 'Настройки авторизации', href: '#auth', beforeContent: <KeySVG /> },
  {
    id: 'console',
    label: 'Виртуальная консоль',
    href: '#console',
    beforeContent: <ListSVG />,
    afterContent: PREVIEW_BADGE,
  },
  {
    id: 'serial',
    label: 'Серийная консоль',
    href: '#serial',
    beforeContent: <SwitcherSettingSVG />,
    afterContent: PREVIEW_BADGE,
  },
];

/** Реалистичный набор пунктов сайдбара: группы, вложенность, иконки, divider и disabledReason. */
export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'overview',
    label: 'Обзор',
    href: '#overview',
    beforeContent: <HomeFilledSVG />,
  },
  {
    id: 'compute',
    label: 'Вычисления',
    type: 'group',
    items: [
      { id: 'instances', label: 'Инстансы', href: '#instances', beforeContent: <CpuSVG /> },
      { id: 'images', label: 'Образы', href: '#images', beforeContent: <BoxSVG /> },
      {
        id: 'gpu',
        label: 'GPU-кластеры',
        disabledReason: 'Недоступно в текущем тарифе',
        disabledReasonPlacement: 'right',
        beforeContent: <CpuSVG />,
      },
    ],
  },
  {
    id: 'network',
    label: 'Сеть',
    type: 'collapse',
    items: [
      {
        id: 'vpc',
        label: 'Виртуальные сети',
        type: 'collapse',
        items: [
          { id: 'subnets', label: 'Подсети', href: '#subnets' },
          { id: 'routes', label: 'Маршруты', href: '#routes' },
        ],
      },
      { id: 'security-groups', label: 'Группы безопасности', href: '#security-groups' },
    ],
  },
  {
    id: 'storage',
    label: 'Хранилище',
    type: 'collapse',
    divider: true,
    items: [
      { id: 'buckets', label: 'Бакеты', href: '#buckets', beforeContent: <CloudSVG /> },
      { id: 'volumes', label: 'Диски', href: '#volumes', beforeContent: <BoxSVG /> },
    ],
  },
];

export const SIDEBAR_FOOTER_ITEMS: SidebarItem[] = [
  { id: 'docs', label: 'Документация', href: '#docs', beforeContent: <ListSVG /> },
  { id: 'support', label: 'Поддержка', href: '#support', beforeContent: <InfoOutlineSVG /> },
];

export const SIDEBAR_HEADER_TITLE = {
  type: 'title',
  label: 'Облачные сервисы',
  icon: VerticalMenuOpenSVG,
} as const;

export const SIDEBAR_HEADER_BACK = {
  type: 'back',
  label: 'Виртуальные машины',
  href: '#vms',
} as const;

// ---------------------------------------------------------------------------
// Tree navigation
// ---------------------------------------------------------------------------

/** Test-id листового узла дерева, используется в TreeNavigation InteractionTest. */
export const TREE_NODE_BILLING_TEST_ID = 'tree-node-billing';

/** Дерево для меню TreeNavigation: три уровня вложенности (раздел → подраздел → пункт). */
export const TREE_MENU_ITEMS: TreeNodeProps[] = [
  {
    id: 'network',
    title: 'Сеть',
    nested: [
      {
        id: 'vpc',
        title: 'Виртуальные сети',
        nested: [
          { id: 'subnets', title: 'Подсети' },
          { id: 'routes', title: 'Таблицы маршрутизации' },
        ],
      },
      { id: 'lb', title: 'Балансировщики' },
    ],
  },
  {
    id: 'security',
    title: 'Безопасность',
    nested: [
      { id: 'groups', title: 'Группы безопасности' },
      { id: 'keys', title: 'Ключи доступа' },
      { id: 'firewall', title: 'Межсетевой экран' },
    ],
  },
  { id: 'billing', title: 'Биллинг', 'data-test-id': TREE_NODE_BILLING_TEST_ID },
];

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/** Базовый набор действий для Page*-компонентов каталога. */
export const PAGE_ACTIONS: Action[] = [
  { variant: 'filled', label: 'Создать инстанс', onClick: fn() },
  { variant: 'outline', label: 'Импортировать', onClick: fn() },
];

// Первым идёт основное действие («Выключить»): на desktop (row-reverse) оно встаёт справа,
// на mobile остаётся видимым и растягивается, остальные уходят в kebab (Figma 3334:63034).
/** Действия детальной страницы сервиса: выключить инстанс + документация. */
export const SERVICE_ACTIONS: Action[] = [
  { variant: 'filled', appearance: BUTTON_APPEARANCE.Primary, label: 'Выключить', onClick: fn() },
  { variant: 'outline', appearance: BUTTON_APPEARANCE.Neutral, label: 'Документация', onClick: fn() },
];

// ---------------------------------------------------------------------------
// Reusable demo content blocks
// ---------------------------------------------------------------------------

/** Статус «Запущена» (зелёный, с фоном) для afterHeadline детальной страницы инстанса. */
export const RUNNING_STATUS = <Status label='Запущена' appearance='green' background size='s' />;

type DefRow = { term: string; value: string };

function DefinitionList({ rows }: { rows: DefRow[] }) {
  return (
    <div className={styles.defList}>
      {rows.map(row => (
        <Fragment key={row.term}>
          <Typography variant={VARIANT.body} size='s'>
            {row.term}
          </Typography>
          <Typography variant={VARIANT.body} size='s'>
            {row.value}
          </Typography>
        </Fragment>
      ))}
    </div>
  );
}

/** Контент info-страницы инстанса: две карточки с definition-list параметров. */
export function ServiceInfoContent() {
  return (
    <div className={styles.cardGrid}>
      <Card interactive={false} className={styles.infoCard}>
        <div className={styles.infoCardBody}>
          <Typography variant={VARIANT.title} size='s'>
            Конфигурация
          </Typography>
          <DefinitionList
            rows={[
              { term: 'Тип', value: 's3.medium.2 (2 vCPU / 4 ГБ)' },
              { term: 'Образ', value: 'Ubuntu 22.04 LTS' },
              { term: 'Зона доступности', value: 'ru-moscow-1a' },
              { term: 'Дата создания', value: '14 июня 2026, 18:42' },
            ]}
          />
        </div>
      </Card>
      <Card interactive={false} className={styles.infoCard}>
        <div className={styles.infoCardBody}>
          <Typography variant={VARIANT.title} size='s'>
            Сеть
          </Typography>
          <DefinitionList
            rows={[
              { term: 'Внутренний IP', value: '10.0.4.18' },
              { term: 'Публичный IP', value: '92.118.40.27' },
              { term: 'Подсеть', value: 'subnet-default (10.0.4.0/24)' },
              { term: 'Группа безопасности', value: 'sg-web (HTTP/HTTPS)' },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const CATALOG_SERVICES: ServiceCard[] = [
  {
    id: 'compute',
    title: 'Виртуальные машины',
    description: 'Масштабируемые инстансы под любые нагрузки',
    icon: <CpuSVG />,
  },
  {
    id: 'storage',
    title: 'Объектное хранилище',
    description: 'S3-совместимое хранилище для файлов и бэкапов',
    icon: <CloudSVG />,
  },
  {
    id: 'network',
    title: 'Виртуальные сети',
    description: 'Изолированные сети, подсети и маршрутизация',
    icon: <NetworkCardSVG />,
  },
  {
    id: 'db',
    title: 'Управляемые базы данных',
    description: 'PostgreSQL, MySQL и Redis с автобэкапами',
    icon: <BoxSVG />,
  },
  {
    id: 'monitoring',
    title: 'Мониторинг',
    description: 'Метрики, дашборды и алерты по ресурсам',
    icon: <MonitoringSVG />,
  },
  {
    id: 'keys',
    title: 'Управление доступом',
    description: 'API-ключи, роли и политики IAM',
    icon: <ApiKeysSVG />,
  },
];

/** Сетка карточек сервисов для каталога. */
export function CatalogCards() {
  return (
    <div className={styles.cardGrid}>
      {CATALOG_SERVICES.map(service => (
        <Card key={service.id} className={styles.serviceCard} as='a' href={`#${service.id}`} target='_self'>
          <div className={styles.serviceCardBody}>
            <div className={styles.serviceCardHead}>
              <span className={styles.serviceCardIcon}>{service.icon}</span>
              <Typography variant={VARIANT.title} size='s'>
                {service.title}
              </Typography>
            </div>
            <Typography variant={VARIANT.body} size='s' className={styles.serviceCardDesc}>
              {service.description}
            </Typography>
          </div>
        </Card>
      ))}
    </div>
  );
}

/** Контентная часть страницы (TreeNavigation): заголовок раздела + карточка параметров. */
export function PageSectionContent() {
  return (
    <div className={styles.pageContent}>
      <Typography variant={VARIANT.title} size='m'>
        Виртуальные сети
      </Typography>
      <Typography variant={VARIANT.body} size='s'>
        Управляйте изолированными сетями проекта, подсетями и таблицами маршрутизации.
      </Typography>
      <Card interactive={false} className={styles.infoCard}>
        <div className={styles.infoCardBody}>
          <DefinitionList
            rows={[
              { term: 'Сетей', value: '3' },
              { term: 'Подсетей', value: '7' },
              { term: 'CIDR по умолчанию', value: '10.0.0.0/16' },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PageForm content
// ---------------------------------------------------------------------------

/** Плейсхолдер-поля формы: подпись + нейтральная строка input'а. */
export function FormFields() {
  const fields = ['Имя инстанса', 'Регион', 'Тип конфигурации', 'Образ ОС'];

  return (
    <div className={styles.formFields}>
      {fields.map(label => (
        <div key={label} className={styles.formField}>
          <Typography variant={VARIANT.body} size='s'>
            {label}
          </Typography>
          <div className={styles.formInput} />
        </div>
      ))}
    </div>
  );
}

/**
 * Подложка бокового виджета PageForm. Сам PageForm её не рисует — контент
 * `sideBlock`/`priceSummary` приносит фон сам (как quota-виджет или price-summary
 * в продуктовом коде). На mobile этот же контент рендерится внутри шторки/модалки,
 * где поверхность уже есть, поэтому карточка ставится только на desktop.
 */
function SideWidget({ children }: { children: ReactNode }) {
  const { layoutType } = useAdaptiveLayout();

  if (isMobileLayout(layoutType)) {
    return <>{children}</>;
  }

  return <Block size={BLOCK_SIZE.L}>{children}</Block>;
}

/** Детализация стоимости для priceSummary.content. */
export function PriceBreakdown() {
  const rows = [
    { label: 'Инстанс s3.medium.2', value: '7 200 ₽' },
    { label: 'Диск 80 ГБ SSD', value: '3 200 ₽' },
    { label: 'Публичный IP', value: '1 600 ₽' },
  ];

  return (
    <SideWidget>
      <div className={styles.summaryList}>
        {rows.map(row => (
          <div key={row.label} className={styles.summaryRow}>
            <Typography variant={VARIANT.body} size='s'>
              {row.label}
            </Typography>
            <Typography variant={VARIANT.body} size='s'>
              {row.value}
            </Typography>
          </div>
        ))}
      </div>
    </SideWidget>
  );
}

/** Боковой блок справки для sideBlock. */
export function FormHelp() {
  return (
    <SideWidget>
      <div className={styles.sideBlock}>
        <Typography variant={VARIANT.body} size='s'>
          Тип конфигурации определяет количество vCPU и объём памяти. Изменить его можно после остановки инстанса.
        </Typography>
        <Button view={VIEW.Simple} size={BUTTON_SIZE.S} label='Подробнее о тарифах' />
      </div>
    </SideWidget>
  );
}

/**
 * Контент главной колонки PageForm — стопка аккордеон-карточек (block/l).
 * Это то, что потребитель кладёт в `children`: в Figma slotContent = карточки,
 * поэтому демо-контент тоже карточный, а не голые поля.
 */
export function FormSections() {
  return (
    <>
      <Accordion expandedDefault='basics'>
        <Accordion.CollapseBlockPrimary
          view='outline'
          id='basics'
          title='Основные параметры'
          subTitle='Имя, регион и конфигурация инстанса'
          afterTitle={<QuestionTooltip tip='Эти параметры можно изменить после остановки инстанса' />}
        >
          <FormFields />
        </Accordion.CollapseBlockPrimary>
      </Accordion>
      <Accordion>
        <Accordion.CollapseBlockPrimary
          view='outline'
          id='network'
          title='Сеть'
          subTitle='Подсеть, публичный IP и группы безопасности'
        >
          <FormFields />
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </>
  );
}
