import {
  TOAST_UPLOAD_ITEM_STATUS,
  TOAST_UPLOAD_STATUS,
  ToastUpload,
  ToastUploadFileLine,
  ToastUploadItemStatus,
  ToastUploadProgress,
  ToastUploadProgressAppearance,
  ToastUploadProps,
  UploadItem,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { fileError, fileLoading, filePause, fileUploaded } from '../uploadFixtures';
import styles from './styles.module.scss';

const meta: Meta<typeof ToastUpload> = {
  title: 'Components/Toaster/ToastUpload',
  component: ToastUpload,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ToastUpload>;

const keyStatuses = Object.values(TOAST_UPLOAD_STATUS);
const itemStatuses = Object.values(TOAST_UPLOAD_ITEM_STATUS);

const baseProps: Pick<ToastUploadProps, 'title' | 'progress' | 'generalActions'> = {
  title: 'Загрузка файлов',
  progress: { current: 2, total: 4 },
  generalActions: {},
};

const statusToFile: Record<string, UploadItem> = {
  loading: fileLoading,
  pause: filePause,
  error: fileError,
  uploaded: fileUploaded,
  errorUploaded: fileError,
};

const itemStatusToFile: Record<ToastUploadItemStatus, UploadItem> = {
  loading: fileLoading,
  pause: filePause,
  error: fileError,
  uploaded: fileUploaded,
};

const progressAppearances: ToastUploadProgressAppearance[] = ['neutral', 'green', 'red'];
const progressPercents = [0, 25, 50, 75, 100] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Status × Collapsed'
        firstColumnHeader='Status'
        columnHeaders={['expanded', 'collapsed']}
        rows={keyStatuses.map(status => ({
          variantLabel: status,
          cells: [false, true].map(collapsed => (
            <div key={`${status}-${String(collapsed)}`} className={styles.fileLineCell}>
              <ToastUpload
                {...baseProps}
                status={status}
                description={`Состояние: ${status}`}
                files={[statusToFile[status]]}
                collapsed={collapsed}
                closable
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='onCancelAll slot'
        firstColumnHeader='onCancelAll'
        columnHeaders={['expanded', 'collapsed']}
        rows={[
          { variantLabel: 'present', value: () => undefined },
          { variantLabel: 'absent', value: undefined },
        ].map(({ variantLabel, value }) => ({
          variantLabel,
          cells: [false, true].map(collapsed => (
            <div key={`${variantLabel}-${String(collapsed)}`} className={styles.fileLineCell}>
              <ToastUpload
                {...baseProps}
                status={TOAST_UPLOAD_STATUS.Loading}
                description='Состояние: loading'
                files={[fileLoading]}
                collapsed={collapsed}
                closable
                onCancelAll={value}
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='File-line item status'
        firstColumnHeader='Item status'
        columnHeaders={['ToastUploadFileLine']}
        rows={itemStatuses.map(status => ({
          variantLabel: status,
          cells: [
            <div key={status} className={`${styles.fileLineCell} ${styles.fileLineDarkBg}`}>
              <ToastUploadFileLine item={itemStatusToFile[status]} />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Progress appearance × percent'
        firstColumnHeader='Appearance'
        columnHeaders={progressPercents.map(p => `${p}%`)}
        rows={progressAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: progressPercents.map(percent => (
            <div key={`${appearance}-${percent}`} className={`${styles.progressCell} ${styles.fileLineDarkBg}`}>
              <ToastUploadProgress appearance={appearance} progress={percent} />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
