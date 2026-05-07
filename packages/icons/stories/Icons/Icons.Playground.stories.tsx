import { ModalCustom } from '@ds/modal';
import { Search } from '@ds/search';
import { Typography } from '@ds/typography';
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
    <>
      {/* TODO: Заменить модалку */}
      <ModalCustom open onClose={onClose}>
        <ModalCustom.Header title={data.baseName} />
        <ModalCustom.Body
          content={
            <div className={styles.modalContent}>
              <div className={styles.modalIconPreviewMinimal}>
                <data.Component size={48} />
              </div>
              <div className={styles.modalCodeBlock}>
                <Typography variant='body' size='s' weight='regular' className={styles.modalCodeLabel}>
                  Standalone
                </Typography>
                <code>{reactImport}</code>
              </div>
              <div className={styles.modalCodeBlock}>
                <Typography variant='body' size='s' weight='regular' className={styles.modalCodeLabel}>
                  Sprite
                </Typography>
                <code>{reactSpriteImport}</code>
              </div>
              <div />
            </div>
          }
        />
      </ModalCustom>
    </>
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
    setSelectedIcon({
      name,
      baseName,
      Component,
    });
  };

  const handleCloseModal = (): void => {
    setSelectedIcon(null);
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
        <Typography variant='body' size='s' weight='regular' className={styles.mutedText}>
          Подготавливаем спрайты...
        </Typography>
      </section>
    );
  } else if (filteredIcons.length === 0) {
    content = (
      <section className={styles.emptyState}>
        <Typography variant='title' size='m' weight='regular'>
          Ничего не найдено
        </Typography>
        <Typography variant='body' size='s' weight='regular' className={styles.mutedText}>
          Проверьте строку поиска.
        </Typography>
      </section>
    );
  } else {
    content = (
      <>
        {orderedSections.map(sectionName => (
          <section key={sectionName} className={styles.sectionMinimal}>
            <div className={styles.sectionHeaderMinimal}>
              <Typography variant='body' size='s' weight='regular' className={styles.sectionTitleMinimal}>
                {sectionName}
              </Typography>
              <Typography variant='body' size='s' weight='regular' className={styles.sectionCountMinimal}>
                {groupedIcons[sectionName].length} иконок
              </Typography>
            </div>

            <div className={styles.iconGridMinimal} data-test-id={`icons-row-${sectionName}`}>
              {groupedIcons[sectionName].map(({ name, baseName, Component }) => (
                // TODO: Заменить кнопку
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
        <Typography variant='title' size='l' weight='regular'>
          Interface Icons
        </Typography>

        {/* TODO: Заменить поиск */}
        <Search
          data-test-id='icons-search-input'
          value={search}
          onChange={setSearch}
          placeholder='Фильтровать по названию'
          size='m'
          outline
        />
      </section>

      {content}

      {selectedIcon && <IconModal data={selectedIcon} onClose={handleCloseModal} />}
    </div>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Icons/Interfaces Visual Matrix',
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

export const InterfacesVisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: args => <IconsCatalog {...args} />,
};
