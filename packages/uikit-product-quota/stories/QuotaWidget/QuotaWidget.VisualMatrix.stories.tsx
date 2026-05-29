import { QuotaWidget } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { DemoPage, DemoPanel, StoryTable } from '#storybook/components';

import { BASE_QUOTA_WIDGET_PROPS } from '../mockData';
import { QUOTA_WIDGET_MATRIX } from '../testIds';
import styles from './styles.module.scss';

const alignTriggerEnd = (node: ReactNode) => <div className={styles.storyWrapper}>{node}</div>;

const meta: Meta<typeof QuotaWidget> = {
  title: 'Uikit Product/Quota/QuotaWidget',
  component: QuotaWidget,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof QuotaWidget>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <StoryTable
          sectionTitle='content'
          firstColumnHeader='state'
          columnHeaders={['QuotaWidget']}
          rows={QUOTA_WIDGET_MATRIX.map(({ state, cellTestId }) => ({
            variantLabel: state,
            cells: [
              alignTriggerEnd(
                <QuotaWidget
                  key={state}
                  data-test-id={cellTestId}
                  {...BASE_QUOTA_WIDGET_PROPS}
                  {...(state === 'loading' ? { isLoading: true } : {})}
                  {...(state === 'error' ? { isError: true } : {})}
                />,
              ),
            ],
          }))}
        />
      </DemoPanel>
    </DemoPage>
  ),
};
