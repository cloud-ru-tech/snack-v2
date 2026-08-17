import { PortalContextProvider } from '@ds/portal-context';
import { BUTTON_TYPE, Widget, WIDGET_STATE } from '@ds/uikit-product-widget';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { fn } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';

const header = { title: 'Cloud servers', href: '#' };
const onDroplistPick = fn();

const meta: Meta = {
  title: 'Uikit Product/Widget/Examples/ActionVariants',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj;

function VariantWidget(props: Omit<ComponentProps<typeof Widget>, 'header' | 'children'>) {
  return (
    <Widget header={header} {...props}>
      Body
    </Widget>
  );
}

export const ActionVariants: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <PortalContextProvider>
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Action variants</DemoTitle>
          <DemoHint>ActionView branches, ButtonDroplist, helpers и группы пунктов в Droplist.</DemoHint>
          <DemoActions block>
            <div className={styles.variantList}>
              <VariantWidget
                data-test-id='widget-outline'
                actions={[{ variant: BUTTON_TYPE.Outline, label: 'Outline', onClick: fn() }]}
              />
              <VariantWidget
                data-test-id='widget-tonal'
                actions={[{ variant: BUTTON_TYPE.Tonal, label: 'Tonal', onClick: fn() }]}
              />
              <VariantWidget
                data-test-id='widget-function'
                actions={[{ variant: BUTTON_TYPE.Function, label: 'Function', onClick: fn() }]}
              />
              <VariantWidget
                data-test-id='widget-simple'
                actions={[{ variant: BUTTON_TYPE.Simple, label: 'Simple', onClick: fn() }]}
              />
              <VariantWidget
                data-test-id='widget-tooltip'
                actions={[
                  {
                    label: 'With tip',
                    tooltip: { tip: 'Action tooltip' },
                    onClick: fn(),
                  },
                ]}
              />
              <VariantWidget
                wide
                data-test-id='widget-wide-primary'
                actions={[
                  { variant: BUTTON_TYPE.Outline, label: 'Primary', onClick: fn() },
                  { variant: BUTTON_TYPE.Function, label: 'Skip kebab', onClick: fn() },
                  {
                    variant: BUTTON_TYPE.Droplist,
                    button: { label: 'More menu' },
                    list: {
                      items: [{ content: { label: 'From droplist' }, onClick: fn() }],
                    },
                  },
                  { label: 'Overflow', onClick: fn() },
                  { hidden: true, label: 'Hidden' },
                ]}
              />
              <VariantWidget
                data-test-id='widget-droplist-filled'
                actions={[
                  {
                    variant: BUTTON_TYPE.Droplist,
                    button: { label: 'Menu filled', buttonType: 'filled' },
                    list: {
                      items: [
                        {
                          type: 'group',
                          label: 'Group',
                          divider: true,
                          items: [
                            { content: { label: 'Pick' }, onClick: onDroplistPick },
                            { content: { label: 'Hidden item' }, hidden: true },
                          ],
                        },
                      ],
                    },
                  },
                ]}
              />
              <VariantWidget
                data-test-id='widget-droplist-function'
                actions={[
                  {
                    variant: BUTTON_TYPE.Droplist,
                    button: { label: 'Menu function' },
                    list: {
                      items: [{ content: { label: 'Secondary' }, onClick: fn() }],
                      closeDroplistOnItemClick: true,
                    },
                  },
                ]}
              />
              <VariantWidget
                data-test-id='widget-loading-content'
                state={WIDGET_STATE.Loading}
                loadingState={{ loadingContent: 'Custom loading body' }}
                actions={[{ label: 'Refresh' }]}
              />
            </div>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    </PortalContextProvider>
  ),
};
