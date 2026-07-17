import { ModalCustom } from '@ds/modal';
import { Search } from '@ds/search';
import { Typography } from '@ds/typography';
import { ComponentType, ReactElement, useMemo, useState } from 'react';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';
import { toSearchToken } from './utils';

export type IconMap = Record<string, unknown>;

type SelectedIcon = {
  exportName: string;
  label: string;
  Component: ComponentType<{ size?: number }>;
};

type IconEntry = {
  exportName: string;
  label: string;
  Component: ComponentType<{ size?: number }>;
};

export type SubpathIconsCatalogProps = {
  /** Заголовок каталога, например "Flags". */
  title: string;
  /** Публичный подпуть для примера импорта в модалке, например '@ds/icons/flags'. */
  subpath: string;
  /** Namespace-импорт из подпути (import * as X from '../../src/<subpath>'). */
  icons: IconMap;
  size: number;
  /** Суффикс, который срезается только для отображаемого лейбла (например 'SVG'); у Logos его нет. */
  stripSuffix?: string;
  /**
   * Ключ секции для иконки — как в Figma-мастере (буква алфавита для Flags, папка/раздел
   * для Services). Без неё каталог рендерится одной секцией с заголовком `title`.
   */
  sectionOf?: (entry: { exportName: string; label: string }) => string;
  /**
   * false — ячейка не квадратная: фиксированная высота, ширина по контенту, рамка-чип
   * вместо aspect-ratio: 1/1. Нужно для Logos — там есть wordmark-логотипы (`cloud.ru`,
   * `BootcampLabs`) шире своей высоты, квадратная ячейка их обрежет или растянет.
   */
  squareIcons?: boolean;
};

function isIconComponent(value: unknown): value is ComponentType<{ size?: number }> {
  return typeof value === 'function' || (typeof value === 'object' && value !== null);
}

function toLabel(name: string, stripSuffix?: string): string {
  return stripSuffix && name.endsWith(stripSuffix) ? name.slice(0, -stripSuffix.length) : name;
}

export function SubpathIconsCatalog({
  title,
  subpath,
  icons,
  size,
  stripSuffix,
  sectionOf,
  squareIcons = true,
}: SubpathIconsCatalogProps): ReactElement {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<SelectedIcon | null>(null);
  const searchToken = toSearchToken(search);

  const entries = useMemo(
    () =>
      Object.entries(icons)
        .filter(([, value]) => isIconComponent(value))
        .map(([exportName, Component]) => ({
          exportName,
          label: toLabel(exportName, stripSuffix),
          Component: Component as ComponentType<{ size?: number }>,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [icons, stripSuffix],
  );

  const filteredIcons = useMemo(
    () => entries.filter(({ label }) => !searchToken || toSearchToken(label).includes(searchToken)),
    [entries, searchToken],
  );

  const sections = useMemo(() => {
    const grouped = new Map<string, IconEntry[]>();
    for (const entry of filteredIcons) {
      const key = sectionOf ? sectionOf(entry) : title;
      const bucket = grouped.get(key);
      if (bucket) bucket.push(entry);
      else grouped.set(key, [entry]);
    }
    return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filteredIcons, sectionOf, title]);

  return (
    <div className={styles.catalogMinimal} data-test-id={TEST_IDS.catalog}>
      <section className={styles.minimalHeader}>
        <Typography variant='title' size='l' weight='regular'>
          {title}
        </Typography>

        <Search
          data-test-id={TEST_IDS.searchInput}
          value={search}
          onChange={setSearch}
          placeholder='Фильтровать по названию'
          size='m'
          outline
        />
      </section>

      {filteredIcons.length === 0 ? (
        <section className={styles.emptyState}>
          <Typography variant='title' size='m' weight='regular'>
            Ничего не найдено
          </Typography>
          <Typography variant='body' size='s' weight='regular' className={styles.mutedText}>
            Проверьте строку поиска.
          </Typography>
        </section>
      ) : (
        sections.map(([sectionTitle, sectionIcons]) => (
          <section key={sectionTitle} className={styles.sectionMinimal}>
            <div className={styles.sectionHeaderMinimal}>
              <Typography variant='body' size='s' weight='regular' className={styles.sectionTitleMinimal}>
                {sectionTitle}
              </Typography>
              <Typography variant='body' size='s' weight='regular' className={styles.sectionCountMinimal}>
                {sectionIcons.length} иконок
              </Typography>
            </div>

            <div className={styles.iconGridMinimal} data-test-id={TEST_IDS.row(sectionTitle)}>
              {sectionIcons.map(({ exportName, label, Component }) => (
                // TODO: Заменить кнопку
                <button
                  key={exportName}
                  type='button'
                  className={squareIcons ? styles.iconButtonMinimal : styles.iconButtonAuto}
                  data-test-id={TEST_IDS.card(exportName)}
                  onClick={() => setSelected({ exportName, label, Component })}
                  aria-label={label}
                  title={label}
                >
                  <Component size={size} />
                </button>
              ))}
            </div>
          </section>
        ))
      )}

      {selected && (
        // TODO: Заменить модалку
        <ModalCustom open onClose={() => setSelected(null)}>
          <ModalCustom.Header title={selected.label} />
          <ModalCustom.Body
            content={
              <div className={styles.modalContent}>
                <div className={styles.modalIconPreviewMinimal}>
                  <selected.Component size={48} />
                </div>
                <div className={styles.modalCodeBlock}>
                  <Typography variant='body' size='s' weight='regular' className={styles.modalCodeLabel}>
                    Import
                  </Typography>
                  <code>{`import { ${selected.exportName} } from '${subpath}';`}</code>
                </div>
              </div>
            }
          />
        </ModalCustom>
      )}
    </div>
  );
}
