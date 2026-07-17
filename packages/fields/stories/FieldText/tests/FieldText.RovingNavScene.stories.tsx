import { FieldText, SIZE } from '@ds/fields';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

const ITEMS = [
  { id: '1', content: { option: 'Content text 1' }, 'data-test-id': `${STORY_TEST_IDS.fieldText.droplistItem}-1` },
  { id: '2', content: { option: 'Content text 2' }, 'data-test-id': `${STORY_TEST_IDS.fieldText.droplistItem}-2` },
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
            <FieldText
              data-test-id={STORY_TEST_IDS.fieldText.rovingSceneRoot}
              size={SIZE.M}
              label='Label'
              value={value}
              onChange={setValue}
              showClearButton
              showCopyButton={false}
              elementAfter={{
                action: <PlaceholderSVG />,
                'data-test-id': STORY_TEST_IDS.fieldText.droplistAfterButton,
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

const meta: Meta<typeof FieldText> = {
  title: 'Components/Fields/FieldText/Tests/RovingNavScene',
  component: FieldText,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <RovingScene />,
};

export default meta;
type Story = StoryObj<typeof FieldText>;

export const RovingNavScene: Story = {
  tags: ['test', 'dev'],
};
