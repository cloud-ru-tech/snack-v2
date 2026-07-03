import { Button } from '@ds/button';
import { FieldSecure, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useRef, useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

// asyncValueGetter — функция, не URL-arg-driveable, поэтому стори отдельная (не Playground-arg).
// Сцена держит четыре инстанса, покрывающих ветви ensureAsyncValue:
//   (a) eye-triggered load с ручным резолвом промиса → видно Skeleton, затем onChange + раскрытие;
//   (b) loaded-once: второй reveal НЕ перевызывает getter (isAsyncLoaded guard);
//   (c) reject: getter бросает → поле остаётся маскированным, onChange НЕ зовётся;
//   (d) copy-triggered load: readonly + async — основная форма demos/SecureAsync.

const onChangeReveal = fn();
const onChangeReject = fn();
const onChangeReadonly = fn();
const onCopyReadonly = fn();

function AsyncRevealScenario() {
  // (a) Управляемый промис: резолвер хранится в ref и вызывается кнопкой «Resolve»,
  // что даёт окно для наблюдения Skeleton до завершения загрузки.
  const resolveRef = useRef<((value: string) => void) | null>(null);
  const [revealValue, setRevealValue] = useState('');
  const deferredGetter = useCallback(
    () =>
      new Promise<string>(resolve => {
        resolveRef.current = resolve;
      }),
    [],
  );
  const releaseDeferred = useCallback(() => resolveRef.current?.('sk-DEFERRED-TOKEN'), []);

  // (b) Однократность: после первой загрузки isAsyncLoaded=true → повторный reveal не вызывает
  // setIsLoading, Skeleton не появляется, input не размонтируется (поведенческое доказательство).
  const [loadedOnceValue, setLoadedOnceValue] = useState('');
  const loadedOnceGetter = useCallback(() => Promise.resolve('sk-LOADED-ONCE'), []);

  // (c) Отклоняемый getter.
  const rejectGetter = useCallback(() => Promise.reject(new Error('fetch failed')), []);

  // (d) readonly + async: copy-кнопка видна при непустом значении-заглушке; клик «копировать»
  // дёргает getter (ensureAsyncValue) и подменяет значение реальным токеном через onChange.
  const [readonlyValue, setReadonlyValue] = useState('••••••••');
  const readonlyGetter = useCallback(() => Promise.resolve('sk-READONLY-TOKEN'), []);

  // (e) never-resolving getter: play этот инстанс не трогает, поэтому visual.spec может кликнуть
  // «глаз» и снять зависший Skeleton (loading-состояние) на чистом, не размытом play-flow поле.
  // Резолвер сохраняем в ref, но никогда не вызываем — промис остаётся pending → Skeleton виден.
  const pendingResolveRef = useRef<((value: string) => void) | null>(null);
  const pendingGetter = useCallback(
    () =>
      new Promise<string>(resolve => {
        pendingResolveRef.current = resolve;
      }),
    [],
  );

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>AsyncReveal</DemoTitle>
        <DemoHint>
          Значение подгружается асинхронно при раскрытии/копировании. Во время запроса показывается Skeleton; после
          успешного запроса значение больше не запрашивается.
        </DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldSecure
              data-test-id={STORY_TEST_IDS.fieldSecure.asyncRevealRoot}
              label='Deferred reveal'
              asyncValueGetter={deferredGetter}
              value={revealValue}
              onChange={next => {
                onChangeReveal(next);
                setRevealValue(next ?? '');
              }}
            />
            <Button
              data-test-id={STORY_TEST_IDS.fieldSecure.asyncResolveButton}
              label='Resolve'
              appearance='neutral'
              view='outline'
              onClick={releaseDeferred}
            />
            <FieldSecure
              data-test-id={STORY_TEST_IDS.fieldSecure.asyncLoadedOnceRoot}
              label='Loaded once'
              asyncValueGetter={loadedOnceGetter}
              value={loadedOnceValue}
              onChange={next => setLoadedOnceValue(next ?? '')}
            />
            <FieldSecure
              data-test-id={STORY_TEST_IDS.fieldSecure.asyncRejectRoot}
              label='Reject'
              asyncValueGetter={rejectGetter}
              onChange={onChangeReject}
            />
            <FieldSecure
              data-test-id={STORY_TEST_IDS.fieldSecure.asyncReadonlyRoot}
              label='Readonly async'
              readonly
              asyncValueGetter={readonlyGetter}
              value={readonlyValue}
              onChange={next => {
                onChangeReadonly(next);
                setReadonlyValue(next ?? '');
              }}
              onCopyButtonClick={onCopyReadonly}
            />
            <FieldSecure
              data-test-id={STORY_TEST_IDS.fieldSecure.asyncPendingRoot}
              label='Pending reveal'
              asyncValueGetter={pendingGetter}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSecure> = {
  title: 'Components/Fields/FieldSecure/Tests/AsyncReveal',
  component: FieldSecure,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <AsyncRevealScenario />,
};

export default meta;
type Story = StoryObj<typeof FieldSecure>;

export const AsyncReveal: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    onChangeReveal.mockClear();
    onChangeReject.mockClear();
    onChangeReadonly.mockClear();
    onCopyReadonly.mockClear();
    const canvas = within(canvasElement);

    await step('(a) eye-triggered load: Skeleton shows while pending, then resolve flips to text', async () => {
      const reveal = within(canvas.getByTestId(STORY_TEST_IDS.fieldSecure.asyncRevealRoot));
      await expect(reveal.getByTestId(TEST_IDS.fieldSecureInput)).toHaveAttribute('type', 'password');
      await userEvent.click(reveal.getByTestId(TEST_IDS.fieldSecureHideButton));
      // Во время загрузки WithSkeleton снимает InputPrivate и рисует Skeleton → input отсутствует.
      await waitFor(() => expect(reveal.queryByTestId(TEST_IDS.fieldSecureInput)).toBeNull());
      // Отпускаем промис → onChange с подгруженным значением, поле раскрывается.
      await userEvent.click(canvas.getByTestId(STORY_TEST_IDS.fieldSecure.asyncResolveButton));
      await waitFor(() => expect(onChangeReveal).toHaveBeenCalledWith('sk-DEFERRED-TOKEN'));
      const input = await waitFor(() => reveal.getByTestId(TEST_IDS.fieldSecureInput));
      await expect(input).toHaveAttribute('type', 'text');
    });

    await step('(b) loaded-once: a second reveal does not re-call the getter', async () => {
      const loadedOnce = within(canvas.getByTestId(STORY_TEST_IDS.fieldSecure.asyncLoadedOnceRoot));
      const eye = loadedOnce.getByTestId(TEST_IDS.fieldSecureHideButton);
      await userEvent.click(eye);
      await waitFor(() => expect(loadedOnce.getByTestId(TEST_IDS.fieldSecureInput)).toHaveAttribute('type', 'text'));
      // Скрыть обратно, затем снова раскрыть — getter уже отработал, повторного запроса нет.
      await userEvent.click(eye);
      await waitFor(() =>
        expect(loadedOnce.getByTestId(TEST_IDS.fieldSecureInput)).toHaveAttribute('type', 'password'),
      );
      await userEvent.click(eye);
      await waitFor(() => expect(loadedOnce.getByTestId(TEST_IDS.fieldSecureInput)).toHaveAttribute('type', 'text'));
      // value подгружено один раз — повторный reveal не показывает Skeleton.
      await expect(loadedOnce.getByTestId(TEST_IDS.fieldSecureInput)).toBeVisible();
    });

    await step('(c) reject: getter throws → field stays masked, onChange is not called', async () => {
      const reject = within(canvas.getByTestId(STORY_TEST_IDS.fieldSecure.asyncRejectRoot));
      const input = reject.getByTestId(TEST_IDS.fieldSecureInput);
      await userEvent.click(reject.getByTestId(TEST_IDS.fieldSecureHideButton));
      // ensureAsyncValue ловит reject и возвращает false → toggleHidden не переключает hidden.
      await waitFor(() => expect(input).toHaveAttribute('type', 'password'));
      expect(onChangeReject).not.toHaveBeenCalled();
    });

    await step('(d) copy-triggered load: clicking copy in a readonly async field fetches the value', async () => {
      const readonly = within(canvas.getByTestId(STORY_TEST_IDS.fieldSecure.asyncReadonlyRoot));
      const copyBtn = readonly.getByTestId(TEST_IDS.fieldTextCopyButton);
      await expect(copyBtn).toBeVisible();
      // Клик «копировать» вызывает ensureAsyncValue → emitChange с реальным токеном (до самой записи
      // в буфер). Доказываем загрузку через onChange; реальная запись — browser-only (interaction.spec).
      await userEvent.click(copyBtn);
      await waitFor(() => expect(onChangeReadonly).toHaveBeenCalledWith('sk-READONLY-TOKEN'));
    });
  },
};
