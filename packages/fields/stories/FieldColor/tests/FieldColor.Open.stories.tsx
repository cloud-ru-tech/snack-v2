import { FieldColor, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

// `open` форсится статически без триггера — story нужна только для снимка открытого ColorPicker
// (портальная поверхность @ds/dropdown, в VisualMatrix не собирается из-за overlay'я).
// withAlpha + autoApply=false + filled value собирают палитру детерминированно:
// checkerboard-swatch, переключатель моделей, alpha-row, кнопки Cancel/Apply.
const meta: Meta<typeof FieldColor> = {
  title: 'Components/Fields/FieldColor/Tests/Open',
  component: FieldColor,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldColor>;

export const Open: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoActions align='start'>
          <FieldColor
            data-test-id={TEST_IDS.fieldColor}
            label='Color'
            defaultValue='rgba(255, 87, 34, 0.6)'
            withAlpha
            autoApply={false}
            open
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
