import { LAYOUT_TYPE } from '@ds/adaptive';
import {
  ACTION_LIST_ITEM_TYPE,
  AiFieldInput,
  AiFieldInputActionList,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputProps,
  AiFieldInputSendButton,
  AiFieldInputSettingsButton,
  AiFieldInputValue,
  AiFieldInputVoiceButton,
  CONTEXT_PROGRESS,
  SEND_STATE,
} from '@ds/ai-field-input';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { fn } from 'storybook/test';

import { LayoutScope, StoryTable } from '#storybook/components';

import { Attachments, DemoBanner, FooterLeftActions, FooterRightActions, useStoryTexts } from '../fixtures';
import styles from '../styles.module.scss';

const handleBannerClose = fn();

const meta: Meta<typeof AiFieldInput> = {
  title: 'AI/AiFieldInput',
  component: AiFieldInput,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiFieldInput>;

const layouts = [LAYOUT_TYPE.Desktop, LAYOUT_TYPE.Mobile] as const;

const contextRows = [
  { label: 'green', value: 15 },
  { label: 'orange', value: 80 },
  { label: 'red', value: 95 },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: function Render() {
    const texts = useStoryTexts();

    const fieldRows: Array<{ label: string; value: AiFieldInputValue; props?: Partial<AiFieldInputProps> }> = [
      { label: 'placeholder', value: [] },
      { label: 'text', value: texts.valueText, props: { attachments: <Attachments /> } },
      { label: 'text + skill', value: texts.valueTextAndSkill },
      { label: 'skill', value: texts.valueSkill },
      { label: 'disabled', value: [], props: { disabled: true, placeholder: texts.disabledPlaceholder } },
    ];

    const actionListRows = [...texts.skills, { id: 'back', label: texts.back, type: ACTION_LIST_ITEM_TYPE.Back }];
    const actionListOverflow = Array.from({ length: 14 }, (_, index) => ({
      id: `row-${index}`,
      label: texts.command(index + 1),
    }));

    const footerButtons: Array<{ label: string; render(disabled: boolean): ReactNode }> = [
      { label: 'plus', render: disabled => <AiFieldInputPlusButton disabled={disabled} /> },
      { label: 'settings', render: disabled => <AiFieldInputSettingsButton disabled={disabled} /> },
      { label: 'voice', render: disabled => <AiFieldInputVoiceButton disabled={disabled} /> },
      { label: 'model', render: disabled => <AiFieldInputModelButton label={texts.modelName} disabled={disabled} /> },
      {
        label: 'model (truncate)',
        render: disabled => <AiFieldInputModelButton label={texts.modelNameLong} disabled={disabled} />,
      },
      {
        label: 'effort',
        render: disabled => <AiFieldInputEffortButton label={texts.effortLevel} disabled={disabled} />,
      },
    ];

    return (
      <div className={styles.grid}>
        <StoryTable
          sectionTitle='Content × Layout'
          firstColumnHeader='Content'
          columnHeaders={layouts.map(layout => layout.toUpperCase())}
          rows={fieldRows.map(({ label, value, props }) => ({
            variantLabel: label,
            cells: layouts.map(layout => (
              <LayoutScope key={layout} layoutType={layout}>
                <div className={styles.cell}>
                  <AiFieldInput
                    placeholder={texts.placeholder}
                    defaultValue={value}
                    banner={<DemoBanner onClose={handleBannerClose} />}
                    footerLeftActions={<FooterLeftActions />}
                    footerRightActions={<FooterRightActions />}
                    scrollButton={{ indicator: true }}
                    {...props}
                  />
                </div>
              </LayoutScope>
            )),
          }))}
        />
        <StoryTable
          sectionTitle='Action List: Padding × Content'
          firstColumnHeader='Padding'
          columnHeaders={['ROW TYPES', 'OVERFLOW (SCROLL)']}
          rows={[false, true].map(padding => ({
            variantLabel: padding ? 'padding' : 'no padding',
            cells: [
              <div key='types' className={styles.cell}>
                <AiFieldInputActionList padding={padding} items={actionListRows} />
              </div>,
              <div key='overflow' className={styles.cell}>
                <AiFieldInputActionList padding={padding} items={actionListOverflow} />
              </div>,
            ],
          }))}
        />
        <StoryTable
          sectionTitle='Footer buttons × Disabled'
          firstColumnHeader='Button'
          columnHeaders={['DEFAULT', 'DISABLED']}
          rows={footerButtons.map(({ label, render }) => ({
            variantLabel: label,
            cells: [false, true].map(disabled => <span key={String(disabled)}>{render(disabled)}</span>),
          }))}
        />
        <StoryTable
          sectionTitle='Context × Progress'
          firstColumnHeader='Progress'
          columnHeaders={['AUTO', 'FORCED RED']}
          rows={contextRows.map(({ label, value }) => ({
            variantLabel: `${label} (${value}%)`,
            cells: [
              <AiFieldInputContextButton key='auto' value={value} />,
              <AiFieldInputContextButton key='forced' value={value} progress={CONTEXT_PROGRESS.Red} />,
            ],
          }))}
        />
        <StoryTable
          sectionTitle='Send × State'
          firstColumnHeader='State'
          columnHeaders={['SEND']}
          rows={Object.values(SEND_STATE).map(state => ({
            variantLabel: state,
            cells: [<AiFieldInputSendButton key={state} state={state} />],
          }))}
        />
      </div>
    );
  },
};
