import { FieldCombo, SIZE } from '@ds/fields';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

const ITEMS = [
  { id: '1', content: { label: 'Content text 1' }, 'data-test-id': `${STORY_TEST_IDS.fieldCombo.droplistItem}-1` },
  { id: '2', content: { label: 'Content text 2' }, 'data-test-id': `${STORY_TEST_IDS.fieldCombo.droplistItem}-2` },
];

/**
 * Сцена с одновременно видимой кнопкой очистки (непустое редактируемое значение) и слот-кнопкой
 * `elementAfter` со встроенным `Droplist`. Нужна для roving-навигации input → clear → elementAfter
 * и для ArrowDown-раскрытия списка — это keyboard.spec, не InteractionTest.
 */
function RovingScene() {
  const [value, setValue] = useState('Value');
  const [selected, setSelected] = useState<string | number | undefined>();

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>RovingNavScene</DemoTitle>
        <DemoHint>Очистка + слот-кнопка справа в одной сцене для проверки roving-навигации.</DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldCombo
              data-test-id={STORY_TEST_IDS.fieldCombo.rovingSceneRoot}
              size={SIZE.M}
              label='Label'
              value={value}
              onChange={setValue}
              showClearButton
              showCopyButton={false}
              elementAfter={{
                action: <PlaceholderSVG />,
                'data-test-id': STORY_TEST_IDS.fieldCombo.droplistAfterButton,
                droplist: {
                  items: ITEMS,
                  closeDroplistOnItemClick: true,
                  selection: {
                    mode: 'single',
                    value: selected,
                    onChange: setSelected,
                  },
                },
              }}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldCombo> = {
  title: 'Components/Fields/FieldCombo/Tests/RovingNavScene',
  component: FieldCombo,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <RovingScene />,
};

export default meta;
type Story = StoryObj<typeof FieldCombo>;

export const RovingNavScene: Story = {
  tags: ['test', 'dev'],
};
