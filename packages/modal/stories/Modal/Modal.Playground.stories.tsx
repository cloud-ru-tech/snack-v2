import { Button, ButtonGroup } from '@ds/button';
import { Modal, ModalProps, MODE, WIDTH } from '@ds/modal';
import { QuestionTooltip } from '@ds/tooltip';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { usePreviewTheme } from '#storybook/components';

import { SAMPLE_CONTENT, STORY_TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { MODAL_TEST_ID } from './testIds';
import { resolveModalStoryMediaSrc, ThemedModalMedia } from './ThemedModalMedia';

type PlaygroundStoryProps = ModalProps & {
  showMedia: boolean;

  showHeader: boolean;
  showHeadline: boolean;
  showAfterHeadline: boolean;
  showSubHeadline: boolean;
  showBackButton: boolean;

  showFooter: boolean;

  customTooltipText: string;
  longBodyContent: boolean;
};

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

const onBackButtonClick = () => {
  alert('clicked');
};

function PlaygroundRender(args: PlaygroundStoryProps) {
  const {
    showMedia,
    showHeader,
    showHeadline,
    showSubHeadline,
    showAfterHeadline,
    showFooter,
    showBackButton,
    customTooltipText,
    longBodyContent,
    content,
    loading,
    loadingState,
    title,
    subtitle,
    open,
    ...restModal
  } = args;

  const [, updateArgs] = useArgs<PlaygroundStoryProps>();
  const previewTheme = usePreviewTheme();
  const storyMediaSrc = resolveModalStoryMediaSrc(previewTheme);

  const longBody = coerceStoryBooleanArg(longBodyContent, false);
  const showMediaFlag = coerceStoryBooleanArg(showMedia, true);
  const showFooterFlag = coerceStoryBooleanArg(showFooter, true);
  const modalContent = longBody ? SAMPLE_CONTENT : content;

  const close = () => updateArgs({ open: false });
  const openModal = () => updateArgs({ open: true });

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

  return (
    <>
      <Button
        data-test-id={STORY_TEST_IDS.buttonControlled}
        label='Toggle modal'
        appearance='primary'
        view='filled'
        onClick={openModal}
      />
      <Modal
        {...restModal}
        open={open ?? false}
        onClose={close}
        title={showHeader && showHeadline ? title : undefined}
        subtitle={showHeader && showSubHeadline ? subtitle : undefined}
        slotAfterHeadline={
          showHeader && showAfterHeadline ? (
            <QuestionTooltip tip={customTooltipText} data-test-id={STORY_TEST_IDS.tooltip} size='s' />
          ) : undefined
        }
        onBackButtonClick={showHeader && showBackButton ? onBackButtonClick : undefined}
        content={modalContent}
        loading={loading}
        loadingState={loadingState}
        media={showMediaFlag ? <ThemedModalMedia src={storyMediaSrc} data-test-id={STORY_TEST_IDS.image} /> : undefined}
        footer={
          showFooterFlag && !loading ? (
            <ButtonGroup
              className={styles.footerGroup}
              primaryAction={{
                label: 'Label text',
                view: 'filled',
                'data-test-id': STORY_TEST_IDS.firstButton,
                onClick: close,
              }}
              secondaryAction={{
                label: 'Label text',
                view: 'outline',
                appearance: 'neutral',
                'data-test-id': STORY_TEST_IDS.secondButton,
                onClick: close,
              }}
            />
          ) : undefined
        }
      />
    </>
  );
}

const meta: Meta<PlaygroundStoryProps> = {
  title: 'Components/Modal/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  args: {
    open: false,
    mode: MODE.Regular,
    width: WIDTH.S,
    heightAuto: true,
    loading: false,
    showMedia: true,

    showHeader: true,

    showHeadline: true,
    title: 'Headline text',

    showAfterHeadline: true,
    customTooltipText: 'Tooltip text',

    showSubHeadline: true,
    subtitle: 'Subtitle text',

    showBackButton: true,

    showFooter: true,

    longBodyContent: false,
    content: 'Body text',

    loadingState: '',
    className: '',
    rootClassName: '',
    closeOnPopstate: true,
    'data-test-id': MODAL_TEST_ID,
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Открыта ли модалка',
    },
    content: {
      control: 'text',
      description: 'Контент модалки',
      if: { arg: 'longBodyContent', eq: false },
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки (футер скрыт, в теле спиннер)',
    },
    loadingState: {
      control: 'text',
      description: 'Кастомный контент тела при loading',
    },
    width: {
      control: 'radio',
      options: Object.values(WIDTH),
      description: 'Размер окна',
    },
    heightAuto: {
      control: 'boolean',
      description: 'Растягивать ли модалку по высоте',
    },
    mode: {
      control: 'radio',
      options: Object.values(MODE),
      description:
        'Regular: overlay + Esc + кнопка, затемнение без blur. Aggressive/Forced: blur подложки (макет Figma); Aggressive — только кнопка закрытия; Forced — без кнопки.',
    },
    footer: { table: { disable: true } },
    media: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onBackButtonClick: { table: { disable: true } },
    container: { table: { disable: true } },
    rootClassName: {
      control: 'text',
      description: 'CSS-класс корневого слоя',
    },
    className: {
      control: 'text',
      description: 'CSS-класс окна',
    },
    closeOnPopstate: {
      control: 'boolean',
      description: 'Закрывать ли модалку при навигации по истории',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },

    showMedia: {
      name: '[Stories]: Show media',
      control: 'boolean',
    },

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
    slotAfterHeadline: { table: { disable: true } },
    truncate: { table: { disable: true } },
  },
  render: PlaygroundRender,
};

export default meta;
type Story = StoryObj<PlaygroundStoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STORY_TEST_IDS.buttonControlled)).toBeVisible();
  },
};
