import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Drawer, DrawerProps } from '@ds/drawer';
import { usePortalContext } from '@ds/portal-context';
import { QuestionTooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import {
  DemoActions,
  DemoHint,
  DemoPage,
  DemoPanel,
  DemoTitle,
  DemoWarning,
  usePreviewTheme,
} from '#storybook/components';

import { POSITION, TEST_IDS as PUBLIC_TEST_IDS, WIDTH } from '../../src/constants';
import { TEST_IDS } from '../testIds';
import {
  LONG_BODY_TEXT,
  NESTED_DRAWER_BODY,
  NESTED_DRAWER_CLOSE_LABEL,
  NESTED_DRAWER_OPEN_LABEL,
  NESTED_DRAWER_TITLE,
  SHORT_BODY_TEXT,
} from './constants';
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

/**
 * Резолв оси `position` × `width`/`heightAuto`:
 * - left/right: ширина (`width`) активна, высота автоматическая не имеет смысла.
 * - top/bottom: высота автоматическая (`heightAuto`) активна, фиксированная ширина игнорируется.
 *
 * Передаём в Drawer только валидные значения, остальные подавляем; если args
 * пользователя содержат «лишний» проп — показываем DemoWarning.
 */
function resolveDrawerAxes(args: Pick<StoryProps, 'position' | 'width' | 'heightAuto'>) {
  const isHorizontal = args.position === POSITION.Bottom || args.position === POSITION.Top;
  const widthClamped = isHorizontal && args.width !== undefined;
  const heightAutoClamped = !isHorizontal && args.heightAuto !== undefined;
  return {
    effectiveWidth: isHorizontal ? undefined : args.width,
    effectiveHeightAuto: isHorizontal ? (args.heightAuto ?? true) : undefined,
    widthClamped,
    heightAutoClamped,
  };
}

function PlaygroundRender(args: StoryProps) {
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
    // open/onClose спрятаны из argTypes; локальный state управляет открытием.
    open: _open, // eslint-disable-line @typescript-eslint/no-unused-vars
    onClose: _onClose, // eslint-disable-line @typescript-eslint/no-unused-vars
    content,
    showBlackout,
    title,
    subtitle,
    width,
    heightAuto,
    ...rest
  } = args;

  const portalRoot = usePortalContext();
  const previewTheme = usePreviewTheme();
  const storyMediaSrc = resolveDrawerStoryMediaSrc(previewTheme);

  const [open, setOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);

  const { effectiveWidth, effectiveHeightAuto, widthClamped, heightAutoClamped } = resolveDrawerAxes({
    position,
    width,
    heightAuto,
  });

  // Header контролируется одним флагом showHeader — без мутации соседних args.
  // При showHeader=false подавляем headline/back-button/etc. локально.
  const renderHeadline = showHeader && showHeadline;
  const renderAfterHeadline = showHeader && showAfterHeadline;
  const renderSubHeadline = showHeader && showSubHeadline;
  const renderBackButton = showHeader && showBackButton;

  const body = longBodyContent ? LONG_BODY_TEXT : (content ?? SHORT_BODY_TEXT);

  const handleMainClose = () => {
    setNestedOpen(false);
    setOpen(false);
  };

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Открыть Drawer триггером ниже. Положение, ширина, слоты — из Controls. На desktop — боковая панель, на mobile
          (layoutType) — `BottomSheet` снизу.
        </DemoHint>
        {widthClamped && (
          <DemoWarning>
            <code>width={String(width)}</code> не применяется при <code>position={position}</code> (horizontal).
            Игнорирую.
          </DemoWarning>
        )}
        {heightAutoClamped && (
          <DemoWarning>
            <code>heightAuto</code> не применяется при <code>position={position}</code> (vertical). Игнорирую.
          </DemoWarning>
        )}
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.drawer.triggerOpen}
            label='Открыть Drawer'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <Drawer
        {...rest}
        open={open}
        onClose={handleMainClose}
        position={position}
        width={effectiveWidth}
        heightAuto={effectiveHeightAuto}
        content={body}
        container={portalRoot.current || undefined}
        showBlackout={showBlackout}
        onBackButtonClick={renderBackButton ? onBackButtonClick : undefined}
        title={renderHeadline ? title : undefined}
        subtitle={renderSubHeadline ? subtitle : undefined}
        slotAfterTitle={
          renderAfterHeadline ? (
            // Оборачиваем в span с stable data-test-id: QuestionTooltip пробрасывает
            // `data-test-id` на floating-portal (рендерится только на hover), а слот
            // нужен в DOM сразу при открытии drawer'а для e2e-проверки.
            <span data-test-id={PUBLIC_TEST_IDS.tooltip}>
              <QuestionTooltip tip={customTooltipText} size='s' />
            </span>
          ) : undefined
        }
        media={showMedia ? <ThemedDrawerMedia src={storyMediaSrc} data-test-id={PUBLIC_TEST_IDS.image} /> : undefined}
        approveButton={showFooter ? { label: 'Label text' } : undefined}
        cancelButton={showFooter ? { label: 'Label text' } : undefined}
        additionalButton={
          showFooter ? { label: NESTED_DRAWER_OPEN_LABEL, onClick: () => setNestedOpen(true) } : undefined
        }
        nestedDrawer={
          showFooter ? (
            <Drawer
              open={nestedOpen}
              onClose={() => setNestedOpen(false)}
              position={position}
              width={effectiveWidth}
              heightAuto={effectiveHeightAuto}
              container={portalRoot.current || undefined}
              showBlackout={showBlackout}
              title={NESTED_DRAWER_TITLE}
              content={NESTED_DRAWER_BODY}
              data-test-id={PUBLIC_TEST_IDS.nestedDrawer}
              approveButton={{ label: NESTED_DRAWER_CLOSE_LABEL, onClick: () => setNestedOpen(false) }}
            />
          ) : undefined
        }
      />
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/Drawer/Drawer',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  args: {
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
    // open/onClose отсутствуют в args — open живёт в local useState внутри render.
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    showBlackout: {
      control: 'boolean',
      description: 'Тёмная подложка',
    },
    position: {
      control: 'radio',
      options: Object.values(POSITION),
      description: 'Сторона выезда панели (только desktop)',
      if: { global: 'layoutType', neq: 'mobile' },
    },
    width: {
      control: 'radio',
      options: Object.values(WIDTH),
      description:
        'Активна при position=left/right; для top/bottom — игнорируется (runtime + DemoWarning). Только desktop',
      if: { global: 'layoutType', neq: 'mobile' },
    },
    heightAuto: {
      control: 'boolean',
      description:
        'Активна при position=top/bottom; для left/right — игнорируется (runtime + DemoWarning). Только desktop',
      if: { global: 'layoutType', neq: 'mobile' },
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
      control: 'boolean',
    },
    customTooltipText: {
      name: '[Stories]: Custom tooltip text',
      if: { arg: 'showAfterHeadline', eq: true },
    },
    footer: { table: { disable: true } },
    media: { table: { disable: true } },
    nestedDrawer: { table: { disable: true } },
    onBackButtonClick: { table: { disable: true } },
    slotAfterTitle: { table: { disable: true } },
    container: { table: { disable: true } },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.drawer.triggerOpen)).toBeVisible();
  },
};
