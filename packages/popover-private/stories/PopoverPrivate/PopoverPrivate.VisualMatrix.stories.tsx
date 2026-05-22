import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PLACEMENT, PopoverPrivate, PopoverPrivateProps, TRIGGER } from '@ds/popover-private';
import { Meta, StoryObj } from '@storybook/react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle, StoryTable } from '#storybook/components';

import styles from './styles.module.scss';
import { VM_TRIGGER_TEST_ID } from './testIds';

const TRIGGERS = [TRIGGER.Click, TRIGGER.Hover, TRIGGER.Focus] as const;
const PLACEMENTS = [PLACEMENT.Top, PLACEMENT.Bottom, PLACEMENT.Left, PLACEMENT.Right] as const;

const Content = ({ label }: { label: string }) => <div className={styles.popoverContent}>{label}</div>;

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/PopoverPrivate',
  component: PopoverPrivate,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<PopoverPrivateProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Visual matrix</DemoTitle>
        <DemoHint>
          Триггеры PopoverPrivate по осям <code>trigger × placement</code>. Контент открывается рядом со своим
          триггером; visual.spec кликает/наводит по очереди и собирает composite.
        </DemoHint>
        <StoryTable
          firstColumnHeader='trigger \ placement'
          columnHeaders={[...PLACEMENTS]}
          rows={TRIGGERS.map(trigger => ({
            variantLabel: trigger,
            cells: PLACEMENTS.map(placement => {
              const key = `${trigger}-${placement}`;
              const label = `${trigger} · ${placement}`;
              return (
                <PopoverPrivate
                  key={key}
                  trigger={trigger}
                  placement={placement}
                  popoverContent={<Content label={label} />}
                >
                  <Button
                    data-test-id={VM_TRIGGER_TEST_ID(key)}
                    label={label}
                    view={VIEW.Outline}
                    appearance={APPEARANCE.Neutral}
                  />
                </PopoverPrivate>
              );
            }),
          }))}
        />
      </DemoPanel>
    </DemoPage>
  ),
};
