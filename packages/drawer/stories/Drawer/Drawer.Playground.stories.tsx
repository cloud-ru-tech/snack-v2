import { Button, ButtonGroup } from '@design-system/button';
import { usePortalContext } from '@design-system/portal-context';
import { QuestionTooltip } from '@design-system/tooltip';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';
import { useArgs } from 'storybook/preview-api';

import { usePreviewTheme } from '#storybook/components';

import drawerReadme from '../../README.md?raw';
import { Drawer, DrawerProps } from '../../src';
import { POSITION, TEST_IDS, WIDTH } from '../../src/constants';
import { BODY_TEXT, HEADLINE_TEXT, LONG_BODY_TEXT, SHORT_BODY_TEXT, SUBTITLE_TEXT, TOOLTIP_TEXT } from './constants';
import darkMedia from './dark.png';
import lightMedia from './light.png';
import styles from './styles.module.scss';

const meta: Meta<DrawerProps> = {
  title: 'Components/Drawer/Playground',
  component: Drawer,
  parameters: {
    readme: { content: drawerReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2395-6538&m=dev',
    },
  },

  argTypes: {
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;

type StoryProps = DrawerProps & {
  showMedia: boolean;

  showHeader: boolean;
  showHeadline: boolean;
  showAfterHeadline: boolean;
  showSubHeadline: boolean;
  showBackButton: boolean;

  showFooter: boolean;

  customTooltipText: string;
  longBodyContent: boolean;
  imageSource: string;
};

type Story = StoryObj<StoryProps>;

/** Storybook из URL может отдать строку; для e2e важно не потерять `false`. */
function coerceStoryBooleanArg(value: unknown, defaultValue: boolean): boolean {
  if (value === false || value === 0) {
    return false;
  }
  if (typeof value === 'string' && value.trim().toLowerCase() === 'false') {
    return false;
  }
  if (value === true || value === 1) {
    return true;
  }
  if (typeof value === 'string' && value.trim().toLowerCase() === 'true') {
    return true;
  }
  return defaultValue;
}

const onBackButtonClick = () => alert('clicked');

const Template: StoryFn<StoryProps> = props => {
  const {
    showMedia,
    showHeader,
    showHeadline,
    showSubHeadline,
    showAfterHeadline,
    showFooter,
    showBackButton,
    customTooltipText,
    position,
    longBodyContent,
    open,
    content,
    showBlackout,
    title,
    subtitle,
    ...args
  } = props;

  /**
   * open/content берём из props (в т.ч. из URL в e2e), а не из первого тика useArgs —
   * иначе `open={open}` перетирает `...args` и диплинк `open: true` не открывает drawer.
   */
  const [, updateArgs] = useArgs<StoryProps>();
  const portalRoot = usePortalContext();
  const prevLongBodyContent = useRef<boolean | null>(null);
  const previewTheme = usePreviewTheme();
  const mediaSrc = previewTheme === 'dark' ? darkMedia : lightMedia;
  const longBody = coerceStoryBooleanArg(longBodyContent, false);

  useEffect(() => {
    if (longBody) {
      updateArgs({ content: LONG_BODY_TEXT });
    } else if (prevLongBodyContent.current === true) {
      updateArgs({ content: BODY_TEXT });
    }
    prevLongBodyContent.current = longBody;
  }, [longBody, updateArgs]);

  useEffect(() => {
    if (showHeader) {
      return;
    }

    updateArgs({
      showBackButton: false,
      showHeadline: false,
      showAfterHeadline: false,
      showSubHeadline: false,
    });
  }, [showHeader, updateArgs]);

  useEffect(() => {
    switch (position) {
      case 'bottom':
      case 'top':
        updateArgs({
          width: undefined,
          heightAuto: true,
        });
        break;
      case 'left':
      case 'right':
        updateArgs({
          heightAuto: undefined,
          width: 's',
        });
        break;
      default:
        break;
    }
  }, [position, updateArgs]);

  return (
    <>
      <Button label='Toggle drawer' onClick={() => updateArgs({ open: true })} appearance='primary' view='filled' />
      <Drawer
        {...args}
        open={open ?? false}
        onClose={() => updateArgs({ open: false })}
        position={position}
        content={content}
        container={portalRoot.current || undefined}
        showBlackout={coerceStoryBooleanArg(showBlackout, true)}
        onBackButtonClick={showBackButton ? onBackButtonClick : undefined}
        title={showHeadline ? title : undefined}
        subtitle={showSubHeadline ? subtitle : undefined}
        slotAfterHeadline={
          showAfterHeadline ? (
            <QuestionTooltip tip={customTooltipText} data-test-id={TEST_IDS.tooltip} size='s' />
          ) : undefined
        }
        media={
          showMedia ? (
            <div
              className={styles.image}
              data-test-id={TEST_IDS.image}
              style={{ background: `url(${mediaSrc}) lightgray 50% / cover no-repeat` }}
            />
          ) : undefined
        }
        footer={
          showFooter ? (
            <ButtonGroup
              className={styles.footerButtonGroup}
              primaryAction={{ label: 'Label text', view: 'filled' }}
              secondaryAction={{ label: 'Label text', view: 'outline', appearance: 'neutral' }}
            />
          ) : undefined
        }
      />
    </>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    open: false,
    position: 'right',
    width: WIDTH.S,
    heightAuto: undefined,
    showBlackout: true,
    showMedia: true,

    /** <Header> */
    showHeader: true,

    showHeadline: true,
    title: HEADLINE_TEXT,

    showAfterHeadline: true,
    customTooltipText: TOOLTIP_TEXT,

    showSubHeadline: true,
    subtitle: SUBTITLE_TEXT,

    showBackButton: true,
    /** </Header> */

    showFooter: true,

    longBodyContent: false,
    content: SHORT_BODY_TEXT,
  },
  argTypes: {
    showBlackout: {
      control: 'boolean',
      description: 'Тёмная подложка; для e2e явно в argTypes, чтобы значение из URL стабильно доходило до Drawer.',
    },
    position: {
      control: 'radio',
      options: Object.values(POSITION),
    },
    width: {
      control: 'radio',
      options: Object.values(WIDTH),
    },
    heightAuto: {
      control: 'boolean',
      description: 'Только для position top/bottom; при left/right игнорируется',
    },
    showMedia: {
      name: '[Stories]: Show media',
      control: 'boolean',
    },

    /** <Header> */
    showHeader: {
      name: '[Stories]: showHeader',
      control: 'boolean',
    },
    showHeadline: {
      name: '[Stories]: showHeadline',
      control: 'boolean',
      if: { arg: 'showHeader', eq: true },
    },
    title: {
      name: 'headlineText',
      if: { arg: 'showHeadline', eq: true },
    },
    showAfterHeadline: {
      control: 'boolean',
      name: '[Stories]: showAfterHeadline',
      if: { arg: 'showHeader', eq: true },
    },
    showSubHeadline: {
      name: '[Stories]: showSubHeadline',
      control: 'boolean',
      if: { arg: 'showHeader', eq: true },
    },
    subtitle: {
      if: { arg: 'showSubHeadline', eq: true },
    },
    showBackButton: {
      name: '[Stories]: showBackButton',
      control: 'boolean',
      if: { arg: 'showHeader', eq: true },
    },
    /** </Header> */

    showFooter: { control: 'boolean' },
    longBodyContent: {
      name: '[Stories]: Huge body content',
      description:
        'Без привязки к слоту подсказки: иначе Storybook не применяет arg из URL при showAfterHeadline: false (e2e).',
    },
    customTooltipText: {
      name: '[Stories]: Custom tooltip text',
      if: { arg: 'showAfterHeadline', eq: true },
    },
  },
};
