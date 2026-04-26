import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentType, type ReactElement, useEffect, useMemo, useState } from 'react';

import componentPackage from '../../package.json';
import readme from '../../README.md?raw';
import { Sprite, SpriteProductIconsSVG, SpriteSnackIconsSVG, SpriteWebIconsSVG } from '../../src';
import { ICON_VARIANTS } from './constants';
import styles from './styles.module.scss';
import { ALL_SECTION_KEYS_ORDER, getAllIcons, groupAllIconsBySection, toSearchToken } from './utils';

type StoryProps = {
  variant: (typeof ICON_VARIANTS)[number];
  size: number;
};

type IconModalData = {
  name: string;
  baseName: string;
  Component: ComponentType<{ size?: number }>;
};

function IconModal({ data, onClose }: { data: IconModalData; onClose: () => void }): ReactElement {
  const reactImport = `import { ${data.baseName}SVG } from '@ds/icons';`;
  const reactSpriteImport = `import { ${data.baseName}SpriteSVG } from '@ds/icons';`;

  return (
    <div className={styles.modalOverlay}>
      <button type='button' aria-label='Закрыть' className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalPanel} role='dialog' aria-modal aria-labelledby='icons-modal-title'>
        <div className={styles.modalHeader}>
          <h2 id='icons-modal-title' className={styles.modalTitle}>
            {data.baseName}
          </h2>
          <button type='button' className={styles.closeButton} onClick={onClose} aria-label='Закрыть'>
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalIconPreviewMinimal}>
            <data.Component size={48} />
          </div>
          <div className={styles.modalCodeBlock}>
            <p className={styles.modalCodeLabel}>Standalone</p>
            <code>{reactImport}</code>
          </div>
          <div className={styles.modalCodeBlock}>
            <p className={styles.modalCodeLabel}>Sprite</p>
            <code>{reactSpriteImport}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconsCatalog({ variant, size }: StoryProps): ReactElement {
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconModalData | null>(null);
  const [isSpriteReady, setIsSpriteReady] = useState(variant !== 'sprite');
  const icons = useMemo(() => getAllIcons(variant), [variant]);
  const searchToken = toSearchToken(search);

  const filteredIcons = useMemo(
    () =>
      icons.filter(icon => {
        if (!searchToken) return true;
        const token = toSearchToken([icon.baseName].join(' '));
        return token.includes(searchToken);
      }),
    [icons, searchToken],
  );

  const groupedIcons = useMemo(() => groupAllIconsBySection(filteredIcons), [filteredIcons]);
  const orderedSections = [
    ...ALL_SECTION_KEYS_ORDER.filter(key => (groupedIcons[key]?.length ?? 0) > 0),
    ...Object.keys(groupedIcons).filter(
      key => !ALL_SECTION_KEYS_ORDER.includes(key) && (groupedIcons[key]?.length ?? 0) > 0,
    ),
  ];

  const handleIconClick = (name: string, baseName: string, Component: ComponentType<{ size?: number }>): void => {
    setSelectedIcon({ name, baseName, Component });
  };

  useEffect(() => {
    if (variant !== 'sprite') {
      setIsSpriteReady(true);
      return;
    }
    setIsSpriteReady(false);
    const timerId = window.setTimeout(() => {
      setIsSpriteReady(true);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
    };
  }, [variant]);

  let content: ReactElement;

  if (variant === 'sprite' && !isSpriteReady) {
    content = (
      <section className={styles.emptyState}>
        <p className={styles.mutedText}>Подготавливаем спрайты...</p>
      </section>
    );
  } else if (filteredIcons.length === 0) {
    content = (
      <section className={styles.emptyState}>
        <p className={styles.emptyTitle}>Ничего не найдено</p>
        <p className={styles.mutedText}>Проверьте строку поиска.</p>
      </section>
    );
  } else {
    content = (
      <>
        {orderedSections.map(sectionName => (
          <section key={sectionName} className={styles.sectionMinimal}>
            <div className={styles.sectionHeaderMinimal}>
              <p className={styles.sectionTitleMinimal}>{sectionName}</p>
              <p className={styles.sectionCountMinimal}>{groupedIcons[sectionName].length} иконок</p>
            </div>

            <div className={styles.iconGridMinimal} data-test-id={`icons-row-${sectionName}`}>
              {groupedIcons[sectionName].map(({ name, baseName, Component }) => (
                <button
                  key={name}
                  type='button'
                  className={styles.iconButtonMinimal}
                  data-test-id={`icon-card-${name}`}
                  onClick={() => handleIconClick(name, baseName, Component)}
                  aria-label={baseName}
                  title={baseName}
                >
                  <Component size={size} />
                </button>
              ))}
            </div>
          </section>
        ))}
      </>
    );
  }

  return (
    <div className={styles.catalogMinimal} data-test-id='icons-catalog'>
      {variant === 'sprite' ? (
        <>
          <Sprite content={SpriteWebIconsSVG} />
          <Sprite content={SpriteSnackIconsSVG} />
          <Sprite content={SpriteProductIconsSVG} />
        </>
      ) : null}

      <section className={styles.minimalHeader}>
        <h2 className={styles.title}>Interface Icons</h2>
        <label className={styles.mutedText} htmlFor='icons-search-input'>
          Фильтр по названию
        </label>
        <input
          id='icons-search-input'
          type='search'
          className={styles.searchInput}
          data-test-id='icons-search-input'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Например Search'
          autoComplete='off'
        />
      </section>

      {content}

      {selectedIcon ? <IconModal data={selectedIcon} onClose={() => setSelectedIcon(null)} /> : null}
    </div>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/Icons',
  parameters: {
    readme: { content: readme },
    packageName: componentPackage.name,
  },
  args: {
    variant: 'sprite',
    size: 24,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ICON_VARIANTS,
      description: 'Режим рендера иконок: sprite или standalone',
    },
    size: {
      control: 'radio',
      options: [16, 24, 32, 40],
      description: 'Размер иконки в пикселях',
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Catalog: Story = {
  tags: ['dev', 'test'],
  render: args => <IconsCatalog {...args} />,
};
