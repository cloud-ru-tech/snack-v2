import { Attachment, AttachmentProps, SIZE } from '@ds/attachment';
import { FileSVG, FolderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, MouseEvent, useEffect, useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SAMPLE_TEXT_FILE, useSampleImageFile } from '../sampleFiles';
import { TEST_IDS } from '../testIds';

const FILE_PRESETS = { none: undefined, text: SAMPLE_TEXT_FILE, image: 'image' } as const;

type FilePreset = keyof typeof FILE_PRESETS;

type PlaygroundArgs = Omit<AttachmentProps, 'file'> & {
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
        <DemoHint>Карточка прикреплённого файла: emblem (image/icon), title/description, действия.</DemoHint>
        <DemoActions align='center'>
          <Attachment
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
  title: 'Components/Attachment/Attachment',
  component: Attachment as unknown as ComponentType<PlaygroundArgs>,
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
    'data-test-id': TEST_IDS.attachment.root,
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
    showClick: {
      name: '[Stories]: showClick',
      description: '[Stories]: передавать ли `onClick` компоненту.',
    },
    showDownload: {
      name: '[Stories]: showDownload',
      description: '[Stories]: передавать ли `onDownload`.',
    },
    showDelete: {
      name: '[Stories]: showDelete',
      description: '[Stories]: передавать ли `onDelete`.',
    },
    showRetry: {
      name: '[Stories]: showRetry',
      description: '[Stories]: передавать ли `onRetry`. Виден только в `error`.',
      if: { arg: 'error', truthy: true },
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
    await expect(within(canvasElement).getByTestId(TEST_IDS.attachment.root)).toBeVisible();
  },
};
