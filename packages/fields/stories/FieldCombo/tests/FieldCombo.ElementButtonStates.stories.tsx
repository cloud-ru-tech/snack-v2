import { FieldCombo, SIZE, TEST_IDS } from '@ds/fields';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

// Кнопка-слот в `elementBefore` (первый Tab фокусирует её) и без droplist'а, чтобы pressed не открывал портал.
const meta: Meta<typeof FieldCombo> = {
  title: 'Components/Fields/FieldCombo/Tests/ElementButtonStates',
  component: FieldCombo,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>ElementButtonStates</DemoTitle>
        <DemoHint>Состояния кнопки-слота: default / hover / focus / pressed.</DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldCombo
              data-test-id={TEST_IDS.fieldCombo}
              size={SIZE.M}
              label='Label'
              placeholder='Placeholder'
              value=''
              onChange={fn()}
              showClearButton={false}
              showCopyButton={false}
              elementBefore={{
                action: <PlaceholderSVG />,
                onClick: fn(),
                'data-test-id': TEST_IDS.fieldComboElementButton,
              }}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof FieldCombo>;

export const ElementButtonStates: Story = {
  tags: ['test', 'dev'],
};
