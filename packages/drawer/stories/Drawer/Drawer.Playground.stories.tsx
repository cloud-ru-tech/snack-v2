import { Button, ButtonGroup } from '@ds/button';
import { Drawer, DrawerProps } from '@ds/drawer';
import { usePortalContext } from '@ds/portal-context';
import { QuestionTooltip } from '@ds/tooltip';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { type RefObject, useEffect, useRef, useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { usePreviewTheme } from '#storybook/components';

import { POSITION, TEST_IDS, WIDTH } from '../../src/constants';
import {
  LONG_BODY_TEXT,
  NESTED_DRAWER_BODY,
  NESTED_DRAWER_CLOSE_LABEL,
  NESTED_DRAWER_OPEN_LABEL,
  NESTED_DRAWER_TITLE,
  SHORT_BODY_TEXT,
} from './constants';
import styles from './styles.module.scss';
import { DRAWER_TRIGGER_TEST_ID } from './testIds';
import { resolveDrawerStoryMediaSrc, ThemedDrawerMedia } from './ThemedDrawerMedia';

const onBackButtonClick = () => {
  alert('clicked');
};

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

type UpdateStoryArgs = (nextPartial: Partial<StoryProps>) => void;

type DrawerPlaygroundCanvasProps = StoryProps & {
  updateArgsRef: RefObject<UpdateStoryArgs>;
};

/**
 * Логика стори без `useArgs` на смене `open`: при смене `open` родитель задаёт `key`, экземпляр размонтируется
 * и `nestedOpen` сбрасывается без `useEffect([open])`.
 */
function DrawerPlaygroundCanvas(props: DrawerPlaygroundCanvasProps) {
  const { updateArgsRef, ...propsRest } = props;
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
  } = propsRest;

  const portalRoot = usePortalContext();
  const previewTheme = usePreviewTheme();
  const storyMediaSrc = resolveDrawerStoryMediaSrc(previewTheme);
  const prevLongBodyContent = useRef<boolean | null>(null);
  const [nestedOpen, setNestedOpen] = useState(false);

  const longBody = coerceStoryBooleanArg(longBodyContent, false);
  const blackout = coerceStoryBooleanArg(showBlackout, true);

  useEffect(() => {
    if (longBody) {
      updateArgsRef.current({ content: LONG_BODY_TEXT });
    } else if (prevLongBodyContent.current === true) {
      updateArgsRef.current({ content: SHORT_BODY_TEXT });
    }
    prevLongBodyContent.current = longBody;
  }, [longBody, updateArgsRef]);

  useEffect(() => {
    if (showHeader) {
      return;
    }

    updateArgsRef.current({
      showBackButton: false,
      showHeadline: false,
      showAfterHeadline: false,
      showSubHeadline: false,
    });
  }, [showHeader, updateArgsRef]);

  useEffect(() => {
    switch (position) {
      case POSITION.Bottom:
      case POSITION.Top:
        updateArgsRef.current({
          width: undefined,
          heightAuto: true,
        });
        break;
      case POSITION.Left:
      case POSITION.Right:
        updateArgsRef.current({
          heightAuto: undefined,
          width: WIDTH.S,
        });
        break;
      default:
        break;
    }
  }, [position, updateArgsRef]);

  const handleMainClose = () => {
    setNestedOpen(false);
    updateArgsRef.current({ open: false });
  };

  return (
    <>
      <Button
        data-test-id={DRAWER_TRIGGER_TEST_ID}
        label='Toggle drawer'
        appearance='primary'
        view='filled'
        onClick={() => updateArgsRef.current({ open: true })}
      />
      <Drawer
        {...args}
        open={open ?? false}
        onClose={handleMainClose}
        position={position}
        content={content}
        container={portalRoot.current || undefined}
        showBlackout={blackout}
        onBackButtonClick={showBackButton ? onBackButtonClick : undefined}
        title={showHeadline ? title : undefined}
        subtitle={showSubHeadline ? subtitle : undefined}
        slotAfterHeadline={
          showAfterHeadline ? (
            <QuestionTooltip tip={customTooltipText} data-test-id={TEST_IDS.tooltip} size='s' />
          ) : undefined
        }
        media={showMedia ? <ThemedDrawerMedia src={storyMediaSrc} data-test-id={TEST_IDS.image} /> : undefined}
        footer={
          showFooter ? (
            <ButtonGroup
              className={styles.footerGroup}
              tertiaryAction={{
                label: NESTED_DRAWER_OPEN_LABEL,
                view: 'simple',
                appearance: 'neutral',
                onClick: () => setNestedOpen(true),
              }}
              primaryAction={{ label: 'Label text', view: 'filled' }}
              secondaryAction={{ label: 'Label text', view: 'outline', appearance: 'neutral' }}
            />
          ) : undefined
        }
        nestedDrawer={
          showFooter ? (
            <Drawer
              open={nestedOpen}
              onClose={() => setNestedOpen(false)}
              position={position}
              width={args.width}
              heightAuto={args.heightAuto}
              container={portalRoot.current || undefined}
              showBlackout={blackout}
              title={NESTED_DRAWER_TITLE}
              content={NESTED_DRAWER_BODY}
              data-test-id={TEST_IDS.nestedDrawer}
              footer={
                <ButtonGroup
                  className={styles.footerGroup}
                  primaryAction={{
                    label: NESTED_DRAWER_CLOSE_LABEL,
                    view: 'filled',
                    onClick: () => setNestedOpen(false),
                  }}
                />
              }
            />
          ) : undefined
        }
      />
    </>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/Drawer/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};

export default meta;

const Template: StoryFn<StoryProps> = props => {
  const [, updateArgs] = useArgs<StoryProps>();
  const updateArgsRef = useRef(updateArgs);
  updateArgsRef.current = updateArgs;

  const canvasKey = String(coerceStoryBooleanArg(props.open, false));

  return <DrawerPlaygroundCanvas key={canvasKey} {...props} updateArgsRef={updateArgsRef} />;
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    open: false,
    position: POSITION.Right,
    width: WIDTH.S,
    heightAuto: undefined,
    showBlackout: true,
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
    showMedia: { control: 'boolean' },

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
    footer: { table: { disable: true } },
    media: { table: { disable: true } },
    nestedDrawer: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onBackButtonClick: { table: { disable: true } },
    slotAfterHeadline: { table: { disable: true } },
    container: { table: { disable: true } },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DRAWER_TRIGGER_TEST_ID)).toBeVisible();
  },
};
