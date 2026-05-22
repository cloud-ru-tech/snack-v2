import { APPEARANCE, Button, ButtonGroup, VIEW } from '@ds/button';
import { Modal, ModalProps, MODE, WIDTH } from '@ds/modal';
import { QuestionTooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, usePreviewTheme } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import { SAMPLE_CONTENT } from './constants';
import styles from './styles.module.scss';
import { resolveModalStoryMediaSrc, ThemedModalMedia } from './ThemedModalMedia';

const STORY_TEST_IDS = {
  triggerOpen: TEST_IDS.modal.triggerOpen,
  firstButton: TEST_IDS.modal.firstButton,
  secondButton: TEST_IDS.modal.secondButton,
  image: TEST_IDS.modal.image,
  tooltip: TEST_IDS.modal.tooltip,
};

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
    ...restModal
  } = args;

  // Trigger-based: open живёт в локальном state, не в args. e2e/spec открывают
  // модалку кликом по триггеру (см. trigger-based-stories.md §1).
  const [open, setOpen] = useState(false);
  const previewTheme = usePreviewTheme();
  const storyMediaSrc = resolveModalStoryMediaSrc(previewTheme);

  const modalContent = longBodyContent ? SAMPLE_CONTENT : content;

  const close = () => setOpen(false);
  const openModal = () => setOpen(true);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Открыть модальное окно триггером ниже. Состав слотов и режим — из Controls.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={STORY_TEST_IDS.triggerOpen}
            label='Открыть модалку'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={openModal}
          />
        </DemoActions>
      </DemoPanel>
      <Modal
        {...restModal}
        open={open}
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
        media={showMedia ? <ThemedModalMedia src={storyMediaSrc} data-test-id={STORY_TEST_IDS.image} /> : undefined}
        footer={
          showFooter && !loading ? (
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
    </DemoPage>
  );
}

const meta: Meta<PlaygroundStoryProps> = {
  title: 'Components/Modal/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
  args: {
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
    'data-test-id': TEST_IDS.modal.root,
  },
  argTypes: {
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
    await expect(within(canvasElement).getByTestId(STORY_TEST_IDS.triggerOpen)).toBeVisible();
  },
};
