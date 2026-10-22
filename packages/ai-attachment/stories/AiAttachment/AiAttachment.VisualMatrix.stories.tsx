import { LAYOUT_TYPE } from '@ds/adaptive';
import { AiAttachment, ATTACHMENT_STATE, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { Meta, StoryObj } from '@storybook/react';

import { LayoutScope, placeholderImage, StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof AiAttachment> = {
  title: 'AI/AiAttachment',
  component: AiAttachment,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiAttachment>;

const states = Object.values(ATTACHMENT_STATE);
const types = Object.values(ATTACHMENT_TYPE);
const layouts = [LAYOUT_TYPE.Desktop, LAYOUT_TYPE.Mobile] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      {layouts.map(layout => (
        <LayoutScope key={layout} layoutType={layout}>
          <StoryTable
            sectionTitle={`Type × State (${layout})`}
            firstColumnHeader='Type'
            columnHeaders={states.map(state => state.toUpperCase())}
            rows={types.map(type => ({
              variantLabel: type,
              cells: states.map(state => (
                <AiAttachment
                  key={state}
                  type={type}
                  state={state}
                  src={placeholderImage(88, 88, 'image')}
                  fileName='quarterly-report-final.pdf'
                />
              )),
            }))}
          />
        </LayoutScope>
      ))}
    </div>
  ),
};
