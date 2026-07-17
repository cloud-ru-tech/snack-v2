import { AttachmentSquare, AttachmentSquareProps, SIZE } from '@ds/attachment';
import { FileSVG, FolderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, MouseEvent, useEffect, useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SAMPLE_TEXT_FILE, useSampleImageFile } from '../sampleFiles';
import { TEST_IDS } from '../testIds';

const FILE_PRESETS = { none: undefined, text: SAMPLE_TEXT_FILE, image: 'image' } as const;

type FilePreset = keyof typeof FILE_PRESETS;

type PlaygroundArgs = Omit<AttachmentSquareProps, 'file'> & {
  file?: File | 'image';
  showClick?: boolean;
  showDownload?: boolean;
  showDelete?: boolean;
  showRetry?: boolean;
};

function Render({
  file,
  showClick,
  showDownload,
  showDelete,
  showRetry,
  checked: checkedArg,
  onClick: onClickArg,
  ...rest
}: PlaygroundArgs) {
  const imageFile = useSampleImageFile();
  const resolvedFile = file === 'image' ? imageFile : file;
  const [checked, setChecked] = useState<boolean>(Boolean(checkedArg));
  useEffect(() => {
    setChecked(Boolean(checkedArg));
  }, [checkedArg]);
  const handleClick = showClick
    ? (e: MouseEvent<HTMLDivElement>) => {
        setChecked(v => !v);
        onClickArg?.(e);
      }
    : undefined;
  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Квадратная карточка прикреплённого файла: full-bleed image либо emblem-иконка + TextBlock; actions
          раскрываются на hover/:focus-visible.
        </DemoHint>
        <DemoActions align='center'>
          <AttachmentSquare
            {...rest}
            file={resolvedFile}
            checked={checked}
            onClick={handleClick}
            onDownload={showDownload ? rest.onDownload : undefined}
            onDelete={showDelete ? rest.onDelete : undefined}
            onRetry={showRetry ? rest.onRetry : undefined}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Attachment/AttachmentSquare',
  component: AttachmentSquare as unknown as ComponentType<PlaygroundArgs>,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.S,
    title: 'Label text',
    description: 'Description text',
    file: 'image',
    showClick: true,
    showDownload: true,
    showDelete: true,
    showRetry: true,
    onClick: fn(),
    onDownload: fn(),
    onDelete: fn(),
    onRetry: fn(),
    'data-test-id': TEST_IDS.attachmentSquare.root,
  },
  argTypes: {
    file: {
      name: '[Stories]: file preset',
      description: '[Stories]: пресет файла — `none` / `text` / `image`. В рантайме мапится в `File | undefined`.',
      control: 'select',
      options: Object.keys(FILE_PRESETS) as FilePreset[],
      mapping: FILE_PRESETS,
    },
    icon: {
      control: 'select',
      options: ['default', 'file', 'folder'],
      mapping: { default: undefined, file: FileSVG, folder: FolderSVG },
      if: { arg: 'file', neq: 'image' },
    },
    // Figma: loading подавляет всё остальное состояние компонента.
    error: { if: { arg: 'loading', truthy: false } },
    disabled: { if: { arg: 'loading', truthy: false } },
    checked: { if: { arg: 'loading', truthy: false } },
    // Figma: error-вариант не имеет selected/checked, download и delete — только retry.
    description: { if: { arg: 'error', truthy: false } },
    // disabled выключает onClick → showClick неактуален.
    showClick: {
      name: '[Stories]: showClick',
      description: '[Stories]: передавать ли `onClick` компоненту. Скрыт при `disabled`.',
      if: { arg: 'disabled', truthy: false },
    },
    // Figma error-anatomy: download заменяется на retry. По условию `if:` storybook
    // одновременно скрывает контрол и **вырезает значение из args** (включая URL-args),
    // поэтому здесь это безопасно: и в Controls-панели, и в default-логике пропа
    // показ/скрытие совпадают.
    showDownload: {
      name: '[Stories]: showDownload',
      description: '[Stories]: передавать ли `onDownload`. Скрыт в `error` (Figma: error заменяет download на retry).',
      if: { arg: 'error', truthy: false },
    },
    showRetry: {
      name: '[Stories]: showRetry',
      description: '[Stories]: передавать ли `onRetry`. Виден только в `error`.',
      if: { arg: 'error', truthy: true },
    },
    // showDelete — НЕ оборачиваем в `if:`. delete живёт и в error, и в обычном
    // состоянии; visual.spec эксплуатирует его для edge-case `error+no-actions`,
    // когда URL-args выключают все три флага сразу. `if:` стрипнул бы значение
    // в любом из режимов, ломая тест.
    showDelete: {
      name: '[Stories]: showDelete',
      description: '[Stories]: передавать ли `onDelete`. Активен и в error, и не-error состояниях.',
    },
    onClick: { table: { disable: true } },
    onDownload: { table: { disable: true } },
    onDelete: { table: { disable: true } },
    onRetry: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <Render {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.attachmentSquare.root)).toBeVisible();
  },
};
