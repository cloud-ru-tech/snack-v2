import {
  TOAST_UPLOAD_STATUS,
  ToastUpload,
  ToastUploadProps,
  ToastUploadStatus,
  UploadActions,
  UploadItem,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { fileError, fileLoading, filePause, fileUploaded, sampleFiles } from './fixtures';
import styles from './stories.module.scss';
import { UPLOAD_TEST_ID } from './testIds';

// Figma master `toastUpload` (7871:514005) выкатывает 1 variant-ось: expanded.
// В коде она инвертирована — `collapsed`. Остальные оси (общий status, набор
// файлов, общий прогресс, onCancelAll, generalActions, closable) — это
// контентные слоты; в Playground даём ими крутить через mapping-пресеты.
type FilesPreset = 'empty' | 'single-loading' | 'single-pause' | 'single-error' | 'single-uploaded' | 'mixed';
type GeneralActionsPreset = 'none' | 'pauseContinue' | 'retry';
type ProgressPreset = '0%' | '25%' | '50%' | '75%' | '100%';

const FILES_PRESETS: Record<FilesPreset, UploadItem[]> = {
  empty: [],
  'single-loading': [fileLoading],
  'single-pause': [filePause],
  'single-error': [fileError],
  'single-uploaded': [fileUploaded],
  mixed: sampleFiles,
};

const GENERAL_ACTIONS_PRESETS: Record<GeneralActionsPreset, Omit<UploadActions, 'onCancel'>> = {
  none: {},
  pauseContinue: { onPause: fn(), onContinue: fn() },
  retry: { onRetry: fn() },
};

const PROGRESS_PRESETS: Record<ProgressPreset, { current: number; total: number }> = {
  '0%': { current: 0, total: 4 },
  '25%': { current: 1, total: 4 },
  '50%': { current: 2, total: 4 },
  '75%': { current: 3, total: 4 },
  '100%': { current: 4, total: 4 },
};

type PlaygroundArgs = {
  title?: string;
  description: string;
  status: ToastUploadStatus;
  collapsed: boolean;
  closable: boolean;
  files: FilesPreset;
  closeAll: boolean;
  generalActions: GeneralActionsPreset;
  progress: ProgressPreset;
  'data-test-id'?: string;
};

function PlaygroundCard({ files, closeAll, generalActions, progress, collapsed, ...props }: PlaygroundArgs) {
  // Локальный state, чтобы кнопка collapse/expand внутри стори реально работала.
  // Storybook arg остаётся источником начального значения и синхронизирует
  // компонент при тогле из панели Controls.
  const [localCollapsed, setLocalCollapsed] = useState(collapsed);
  useEffect(() => setLocalCollapsed(collapsed), [collapsed]);

  const resolved: ToastUploadProps = {
    ...props,
    collapsed: localCollapsed,
    progress: PROGRESS_PRESETS[progress],
    files: FILES_PRESETS[files],
    onCancelAll: closeAll ? fn() : undefined,
    generalActions: GENERAL_ACTIONS_PRESETS[generalActions],
    onCloseClick: fn(),
    onCollapsed: setLocalCollapsed,
  };

  return (
    <div className={styles.playgroundPage}>
      <section className={styles.playgroundPanel}>
        <h3 className={styles.playgroundTitle}>ToastUpload</h3>
        <p className={styles.playgroundHint}>
          Карточка загрузки с шапкой (title + общий прогресс), списком файлов и слотами общих экшенов (pause / continue
          / retry). Все слоты в панели Controls — через пресеты, потому что значения — объекты (массивы файлов,
          callbacks).
        </p>
        <ToastUpload {...resolved} />
      </section>
    </div>
  );
}

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Toaster/ToastUpload',
  component: PlaygroundCard,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Загрузка файлов',
    description: '2 из 4 файлов',
    status: TOAST_UPLOAD_STATUS.Loading,
    collapsed: false,
    closable: true,
    files: 'mixed',
    closeAll: true,
    generalActions: 'pauseContinue',
    progress: '50%',
    'data-test-id': UPLOAD_TEST_ID,
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    status: { control: 'select', options: Object.values(TOAST_UPLOAD_STATUS) },
    collapsed: {
      control: 'boolean',
      description: 'Figma variant axis `expanded` (инвертировано: collapsed = !expanded).',
    },
    closable: { control: 'boolean' },
    files: {
      control: 'select',
      options: Object.keys(FILES_PRESETS) as FilesPreset[],
      description: 'Пресеты файлов: пустой, одиночные по статусам и смешанный набор.',
    },
    closeAll: {
      control: 'boolean',
      description: 'Передаёт `onCancelAll` колбэк. Кнопка с локализованным лейблом рендерится только при `true`.',
    },
    generalActions: {
      control: 'radio',
      options: Object.keys(GENERAL_ACTIONS_PRESETS) as GeneralActionsPreset[],
      description: 'Экшены общей загрузки (pause/continue/retry).',
    },
    progress: {
      control: 'select',
      options: Object.keys(PROGRESS_PRESETS) as ProgressPreset[],
      description: 'Общий прогресс current/total в виде процентов.',
    },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(UPLOAD_TEST_ID)).toBeVisible();
  },
};
