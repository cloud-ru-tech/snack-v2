import { ModalCustom } from '@ds/modal';
import { Search } from '@ds/search';
import { Typography } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, ReactElement, useEffect, useMemo, useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import componentPackage from '../../package.json';
import readme from '../../README.md?raw';
import { Sprite, SpriteProductSVG, SpriteSystemSVG, SpriteWebSVG } from '../../src/sprite';
import { IconGroup } from './constants';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';
import { ALL_SECTION_KEYS_ORDER, getAllIcons, groupAllIconsBySection, toSearchToken } from './utils';

type StoryProps = {
  size: number;
};

type IconModalData = {
  name: string;
  baseName: string;
  Component: ComponentType<{ size?: number }>;
  group: IconGroup;
};

function IconModal({ data, onClose }: { data: IconModalData; onClose: () => void }): ReactElement {
  const subpath = `interface/${data.group}`;
  const reactImport = `import { ${data.baseName}SVG } from '@ds/icons/${subpath}';`;

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
                <code>{reactImport}</code>
              </div>
            </div>
          }
        />
      </ModalCustom>
    </>
  );
}

function IconsCatalog({ size }: StoryProps): ReactElement {
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconModalData | null>(null);
  const [isSpriteReady, setIsSpriteReady] = useState(false);
  const icons = useMemo(() => getAllIcons(), []);
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

  const handleIconClick = (
    name: string,
    baseName: string,
    Component: ComponentType<{ size?: number }>,
    group: IconGroup,
  ): void => {
    setSelectedIcon({
      name,
      baseName,
      Component,
      group,
    });
  };

  const handleCloseModal = (): void => {
    setSelectedIcon(null);
  };

  useEffect(() => {
    setIsSpriteReady(false);
    const timerId = window.setTimeout(() => {
      setIsSpriteReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  let content: ReactElement;

  if (!isSpriteReady) {
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

            <div className={styles.iconGridMinimal} data-test-id={TEST_IDS.row(sectionName)}>
              {groupedIcons[sectionName].map(({ name, baseName, Component, group }) => (
                // TODO: Заменить кнопку
                <button
                  key={name}
                  type='button'
                  className={styles.iconButtonMinimal}
                  data-test-id={TEST_IDS.card(name)}
                  onClick={() => handleIconClick(name, baseName, Component, group)}
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
    <div className={styles.catalogMinimal} data-test-id={TEST_IDS.catalog}>
      <Sprite content={SpriteWebSVG} />
      <Sprite content={SpriteSystemSVG} />
      <Sprite content={SpriteProductSVG} />

      <section className={styles.minimalHeader}>
        <Typography variant='title' size='l' weight='regular'>
          Interface Icons
        </Typography>

        {/* TODO: Заменить поиск */}
        <Search
          data-test-id={TEST_IDS.searchInput}
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
  title: 'Components/Icons/Interfaces Visual Matrix',
  parameters: {
    layout: 'fullscreen',
    readme: { content: readme },
    packageName: componentPackage.name,
  },
  args: {
    size: 24,
  },
  argTypes: {
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
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Каталог иконок интерфейса с поиском. Каждая иконка — sprite-компонент с инлайн-fallback.</DemoHint>
        <DemoActions align='center'>
          <IconsCatalog {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
