import { Button } from '@ds/button';
import { Fragment, PropsWithChildren, useCallback, useRef, useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

export function ScrollPreview({ children }: PropsWithChildren) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [iteration, setIteration] = useState(0);

  const handleReplay = useCallback(() => {
    viewportRef.current?.scrollTo(0, 0);
    setIteration(value => value + 1);
  }, []);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Появление секций при прокрутке</DemoTitle>
        <DemoHint>
          Прокрутите область ниже. После изменения Controls нажмите «Повторить», чтобы запустить анимацию заново.
        </DemoHint>
        <DemoActions>
          <Button label='Повторить' onClick={handleReplay} data-test-id={TEST_IDS.replay} />
        </DemoActions>
        <div ref={viewportRef} className={styles.viewport} data-test-id={TEST_IDS.viewport}>
          <Fragment key={iteration}>{children}</Fragment>
        </div>
      </DemoPanel>
    </DemoPage>
  );
}

export function SampleSection({ title = 'Секция сайта', children }: PropsWithChildren<{ title?: string }>) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>
        {children ?? 'Содержимое появляется один раз при входе в область просмотра.'}
      </p>
    </section>
  );
}
