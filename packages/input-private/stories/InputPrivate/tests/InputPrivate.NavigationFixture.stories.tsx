/**
 * Fixture-story для покрытия hook'а useButtonNavigation arrow-навигацией
 * через prefix/postfix кнопки. Реальные потребители (Search, search-private)
 * дёргают хук с одной clearButton — arrow-ветви остаются непокрытыми.
 * См. .claude/rules/coverage-standard.md §«fixture-стори».
 */
import { Button } from '@ds/button';
import { InputPrivate, useButtonNavigation, useClearButton } from '@ds/input-private';
import { Meta, StoryObj } from '@storybook/react';
import { RefObject, useRef, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const FIXTURE_TEST_IDS = {
  root: TEST_IDS.root,
  prefix1: 'fixture-prefix-1',
  prefix2: 'fixture-prefix-2',
  postfix1: 'fixture-postfix-1',
} as const;

function NavigationFixtureBody() {
  const inputRef = useRef<HTMLInputElement>(null);
  const clearRef = useRef<HTMLButtonElement>(null);
  const prefix1Ref = useRef<HTMLButtonElement>(null);
  const prefix2Ref = useRef<HTMLButtonElement>(null);
  const postfix1Ref = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState('');

  const clear = useClearButton({
    clearButtonRef: clearRef,
    showClearButton: value.length > 0,
    onClear: () => setValue(''),
    size: 's',
  });

  const nav = useButtonNavigation({
    inputRef,
    prefixButtons: [
      {
        id: 'p1',
        active: true,
        show: true,
        ref: prefix1Ref,
        render: ({ key, tabIndex, ref, onKeyDown, onClick }) => (
          <Button
            key={key}
            innerRef={ref as RefObject<HTMLButtonElement>}
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            onClick={onClick}
            label='P1'
            view='outline'
            appearance='neutral'
            size='s'
            data-test-id={FIXTURE_TEST_IDS.prefix1}
          />
        ),
      },
      {
        id: 'p2',
        active: true,
        show: true,
        ref: prefix2Ref,
        render: ({ key, tabIndex, ref, onKeyDown, onClick }) => (
          <Button
            key={key}
            innerRef={ref as RefObject<HTMLButtonElement>}
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            onClick={onClick}
            label='P2'
            view='outline'
            appearance='neutral'
            size='s'
            data-test-id={FIXTURE_TEST_IDS.prefix2}
          />
        ),
      },
    ],
    postfixButtons: [
      clear,
      {
        id: 'pf1',
        active: true,
        show: true,
        ref: postfix1Ref,
        render: ({ key, tabIndex, ref, onKeyDown, onClick }) => (
          <Button
            key={key}
            innerRef={ref as RefObject<HTMLButtonElement>}
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            onClick={onClick}
            label='PF1'
            view='outline'
            appearance='neutral'
            size='s'
            data-test-id={FIXTURE_TEST_IDS.postfix1}
          />
        ),
      },
    ],
    readonly: false,
    submitKeys: ['Enter'],
  });

  return (
    <div>
      {nav.prefixButtons}
      <InputPrivate
        ref={inputRef}
        value={value}
        onChange={setValue}
        onKeyDown={nav.onInputKeyDown}
        tabIndex={nav.inputTabIndex}
        data-test-id={FIXTURE_TEST_IDS.root}
        placeholder='nav fixture'
      />
      {nav.postfixButtons}
    </div>
  );
}

const meta: Meta = {
  title: 'Components/InputPrivate/Tests/NavigationFixture',
  parameters: { layout: 'fullscreen', figma: { disable: true }, controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

export const NavigationFixture: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>NavigationFixture</DemoTitle>
        <DemoHint>Fixture-стори для покрытия arrow-навигации useButtonNavigation.</DemoHint>
        <DemoActions align='center'>
          <NavigationFixtureBody />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(FIXTURE_TEST_IDS.root) as HTMLInputElement;
    const p1 = canvas.getByTestId(FIXTURE_TEST_IDS.prefix1);
    const p2 = canvas.getByTestId(FIXTURE_TEST_IDS.prefix2);
    const pf1 = canvas.getByTestId(FIXTURE_TEST_IDS.postfix1);
    const clearButtonTestId = 'button-clear-value';

    await step('ArrowLeft at cursor=0 → focuses prefix2 (rightmost prefix)', async () => {
      input.focus();
      input.setSelectionRange(0, 0);
      await userEvent.keyboard('{ArrowLeft}');
      expect(p2).toBe(document.activeElement);
    });

    await step('ArrowLeft on prefix2 → moves to prefix1', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      expect(p1).toBe(document.activeElement);
    });

    await step('ArrowLeft on prefix1 → stays on prefix1', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      expect(p1).toBe(document.activeElement);
    });

    await step('ArrowRight on prefix1 → moves to prefix2', async () => {
      await userEvent.keyboard('{ArrowRight}');
      expect(p2).toBe(document.activeElement);
    });

    await step('ArrowRight on prefix2 → returns focus to input', async () => {
      await userEvent.keyboard('{ArrowRight}');
      expect(input).toBe(document.activeElement);
    });

    await step('type + ArrowRight at cursor end → focuses clearButton (first visible postfix)', async () => {
      await userEvent.type(input, 'x');
      input.setSelectionRange(input.value.length, input.value.length);
      await userEvent.keyboard('{ArrowRight}');
      const clearButton = canvas.getByTestId(clearButtonTestId);
      expect(clearButton).toBe(document.activeElement);
    });

    await step('click postfix1 → resets tabIndices (input regains tabIndex=0)', async () => {
      await userEvent.click(pf1);
      // onButtonClick → runAfterRerender(setInitialTabIndices) — input tabindex should be 0
      await new Promise(r => setTimeout(r, 10));
      expect(input.getAttribute('tabindex')).toBe('0');
    });

    await step('Enter on postfix: submitKeys branch resets input tabIndex', async () => {
      // Navigate input → postfix via ArrowRight: state sets inputTabIndex=-1
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(r => setTimeout(r, 10));
      expect(input.getAttribute('tabindex')).toBe('-1');

      // Enter on focused postfix triggers submitKeys → setInitialTabIndices
      await userEvent.keyboard('{Enter}');
      await new Promise(r => setTimeout(r, 10));
      expect(input.getAttribute('tabindex')).toBe('0');
    });
  },
};
