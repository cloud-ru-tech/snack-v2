import { AdaptiveProvider } from '@ds/adaptive';
import { FieldChat } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const layoutTypes = ['desktop', 'mobile'] as const;

const noop = () => undefined;

const meta: Meta<typeof FieldChat> = {
  title: 'Uikit Product/FieldsPredefined/FieldChat',
  component: FieldChat,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldChat>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => {
    const files = [new File(['report'], 'report.pdf', { type: 'application/pdf' })];

    return (
      <div className={styles.grid}>
        <StoryTable
          sectionTitle='layoutType × value'
          firstColumnHeader='layoutType'
          columnHeaders={['empty', 'filled', 'with files', 'disabled']}
          rows={layoutTypes.map(layoutType => ({
            variantLabel: layoutType,
            cells: [
              <AdaptiveProvider key={`${layoutType}-empty`} layoutType={layoutType}>
                <div className={styles.cell}>
                  <FieldChat handleSubmit={noop} attachment={{ onFilesUpload: noop, onFileDelete: noop }} />
                </div>
              </AdaptiveProvider>,
              <AdaptiveProvider key={`${layoutType}-filled`} layoutType={layoutType}>
                <div className={styles.cell}>
                  <FieldChat value='Привет, как продвигается задача?' handleSubmit={noop} />
                </div>
              </AdaptiveProvider>,
              <AdaptiveProvider key={`${layoutType}-files`} layoutType={layoutType}>
                <div className={styles.cell}>
                  <FieldChat
                    value='Прикладываю отчёт'
                    handleSubmit={noop}
                    attachment={{ files, onFilesUpload: noop, onFileDelete: noop }}
                  />
                </div>
              </AdaptiveProvider>,
              <AdaptiveProvider key={`${layoutType}-disabled`} layoutType={layoutType}>
                <div className={styles.cell}>
                  <FieldChat value='Недоступно' disabled handleSubmit={noop} />
                </div>
              </AdaptiveProvider>,
            ],
          }))}
        />
      </div>
    );
  },
};
