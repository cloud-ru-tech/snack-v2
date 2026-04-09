import { Button, ButtonGroup } from '@design-system/button';
import { QuestionTooltip } from '@design-system/tooltip';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useArgs } from 'storybook/preview-api';

import { usePreviewTheme } from '#storybook/components';

import modalReadme from '../../README.md?raw';
import { Modal, type ModalProps } from '../../src';
import { MODE, WIDTH } from '../../src/constants';
import { SAMPLE_CONTENT, STORY_TEST_IDS } from './constants';
import darkMedia from './dark.png';
import lightMedia from './light.png';
import styles from './styles.module.scss';

type StoryProps = ModalProps & {
  customTooltipText: string;
  longBodyContent: boolean;
  imageSource: string;

  showMedia: boolean;

  showHeader: boolean;
  showHeadline: boolean;
  showAfterHeadline: boolean;
  showSubHeadline: boolean;
  showBackButton: boolean;

  showFooter: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    readme: { content: modalReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2359-3484&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

const onBackButtonClick = () => alert('clicked');

const Template: StoryFn<StoryProps> = ({
  open,
  showBackButton,
  showAfterHeadline,
  showMedia,
  showHeader,
  showFooter,
  customTooltipText,
  longBodyContent,
  content,
  loading,
  loadingState,
  ...args
}: StoryProps) => {
  const [, updateArgs] = useArgs<StoryProps>();
  const previewTheme = usePreviewTheme();
  const mediaSrc = previewTheme === 'dark' ? darkMedia : lightMedia;
  const modalContent = longBodyContent ? SAMPLE_CONTENT : content;
  const close = () => updateArgs({ open: false });

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
        label='Toggle modal'
        onClick={() => updateArgs({ open: true })}
        appearance='primary'
        view='filled'
        data-test-id={STORY_TEST_IDS.buttonControlled}
      />

      <Modal
        {...args}
        open={open ?? false}
        onClose={close}
        onBackButtonClick={showBackButton ? onBackButtonClick : undefined}
        slotAfterHeadline={
          showAfterHeadline ? (
            <QuestionTooltip tip={customTooltipText} data-test-id={STORY_TEST_IDS.tooltip} size='s' />
          ) : undefined
        }
        media={
          showMedia ? (
            <div
              className={styles.image}
              data-test-id={STORY_TEST_IDS.image}
              style={{ background: `url(${mediaSrc}) lightgray 50% / cover no-repeat` }}
            />
          ) : undefined
        }
        content={modalContent}
        loading={loading}
        loadingState={loadingState}
        footer={
          showFooter ? (
            <ButtonGroup
              className={styles.footerButtonGroup}
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
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    open: false,
    mode: MODE.Regular,
    width: WIDTH.S,
    heightAuto: true,
    loading: false,
    showMedia: true,

    /** <Header> */
    showHeader: true,

    showHeadline: true,
    title: 'Headline text',

    showAfterHeadline: true,
    customTooltipText: 'Tooltip text',

    showSubHeadline: true,
    subtitle: 'Subtitle text',

    showBackButton: true,
    /** </Header> */

    showFooter: true,

    longBodyContent: false,
    content: 'Body text',

    loadingState: '',
    className: '',
    rootClassName: '',
    closeOnPopstate: true,
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
