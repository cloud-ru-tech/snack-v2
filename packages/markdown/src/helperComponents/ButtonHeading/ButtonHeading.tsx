import {
  Heading1SVG,
  Heading2SVG,
  Heading3SVG,
  Heading4SVG,
  Heading5SVG,
  HeadingSVG,
} from '@ds/icons/interface/system';
import { BaseItemProps, Droplist } from '@ds/list';
import { usePortalContext } from '@ds/portal-context';
import { ComponentType, useState } from 'react';

import { headingOptionTestId, TEST_IDS, TOOLBAR_ITEM } from '../../constants';
import { markdownLocale } from '../../locale';
import { ToolbarApi } from '../../toolbarApi';
import { HeadingLevel } from '../../types';
import { PrivateButton } from '../PrivateButton';
import styles from './styles.module.scss';

// Кнопка-триггер выбора уровня заголовка: иконка текущего уровня. Открывает Droplist со списком уровней.

const HEADING_LEVELS: HeadingLevel[] = [1, 2, 3, 4, 5];

const ICON_FOR: Record<HeadingLevel, ComponentType> = {
  1: Heading1SVG,
  2: Heading2SVG,
  3: Heading3SVG,
  4: Heading4SVG,
  5: Heading5SVG,
};

export type ButtonHeadingProps = {
  /** Бэкенд команд тулбара (WYSIWYG либо raw markdown). */
  api: ToolbarApi;
};

export function ButtonHeading({ api }: ButtonHeadingProps) {
  const portalContext = usePortalContext();
  const { t } = markdownLocale.useTranslations();
  const [open, setOpen] = useState(false);
  const activeLevel = HEADING_LEVELS.find(lvl => api.isHeadingActive(lvl));
  const TriggerIcon = activeLevel != null ? ICON_FOR[activeLevel] : HeadingSVG;

  const selectLevel = (lvl: HeadingLevel | null) => {
    if (lvl == null) {
      api.setParagraph();
    } else {
      api.toggleHeading(lvl);
    }

    setOpen(false);
  };

  const items: BaseItemProps[] = [
    {
      id: 'paragraph',
      content: { option: 'Paragraph' },
      checked: activeLevel == null,
      onClick: () => selectLevel(null),
      'data-test-id': headingOptionTestId('paragraph'),
    },
    ...HEADING_LEVELS.map((lvl): BaseItemProps => {
      const Icon = ICON_FOR[lvl];
      return {
        id: `heading-${lvl}`,
        beforeContent: <Icon />,
        content: { option: `Heading ${lvl}` },
        checked: activeLevel === lvl,
        onClick: () => selectLevel(lvl),
        'data-test-id': headingOptionTestId(lvl),
      };
    }),
  ];

  return (
    <Droplist
      size='m'
      selection={{ mode: 'single', value: activeLevel }}
      container={portalContext}
      open={open}
      onOpenChange={setOpen}
      placement='bottom-start'
      items={items}
      triggerClassName={styles.trigger}
      data-test-id={TEST_IDS.headingDropdown}
    >
      <PrivateButton
        icon={<TriggerIcon />}
        tip={{ title: t('toolbar.heading') }}
        withChevron
        checked={activeLevel != null}
        aria-label={t('toolbar.heading')}
        data-toolbar-slot
        data-toolbar-item={TOOLBAR_ITEM.Heading}
        data-test-id={TEST_IDS.toolbarHeading}
        aria-expanded={open}
      />
    </Droplist>
  );
}
