/**
 * Card не имеет публичного onClick в API — это известное ограничение текущей реализации.
 * Корневой `<div>` получает `tabIndex={0}` (a11y issue из аудита: фокусуемый, но не интерактивный),
 * однако никакой колбек на корне не вызывается.
 *
 * Этот файл покрывает единственный осмысленный callback-сценарий: вложенная кнопка внутри Card.
 * Клик по кнопке внутри карточки должен срабатывать на самой кнопке; «onClick карточки» не существует,
 * поэтому проверять stopPropagation/cross-talk не на чем — фиксируем поведение явно.
 */
import { Button } from '@ds/button';
import { Card, CardProps } from '@ds/card';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const NESTED_BUTTON_TEST_ID = 'card-nested-button';

type InteractionStoryArgs = CardProps & {
  onButtonClick: () => void;
  'data-test-id'?: string;
};

const meta: Meta<InteractionStoryArgs> = {
  title: 'Components/Card/Tests/Interaction',
  component: Card,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<InteractionStoryArgs>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    onButtonClick: fn(),
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по вложенной кнопке внутри Card вызывает её собственный onClick.</DemoHint>
        <DemoActions align='center'>
          <Card data-test-id={TEST_IDS.root}>
            <Button label='Action' onClick={args.onButtonClick} data-test-id={NESTED_BUTTON_TEST_ID} />
          </Card>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId(NESTED_BUTTON_TEST_ID);

    await step('nested button: click fires button onClick', async () => {
      await userEvent.click(button);
      expect(args.onButtonClick).toHaveBeenCalledTimes(1);
    });
  },
};
