import { PortalContextProvider, PortalContextProviderProps, usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

function PortalDemoContent({ message, portalContentClassName }: { message: string; portalContentClassName: string }) {
  const portalRoot = usePortalContext();
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const el = portalRoot?.current ?? null;
      if (el) setTarget(el);
    });
    return () => cancelAnimationFrame(id);
  }, [portalRoot]);

  if (!target) return null;
  return createPortal(<div className={portalContentClassName}>{message}</div>, target);
}

function PlaygroundContent() {
  const customRootRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>1. Портал в document.body</h3>
        <div className={cn(styles.container, styles.containerBody)}>
          <PortalContextProvider>
            <p className={styles.description}>
              Без пропа <code>root</code> порталы монтируются в <code>document.body</code>.
            </p>
            <PortalDemoContent message='Рендерится в document.body' portalContentClassName={styles.portalContent} />
          </PortalContextProvider>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>2. Портал в кастомный контейнер</h3>
        <div ref={customRootRef} className={cn(styles.container, styles.containerCustom)}>
          <PortalContextProvider root={customRootRef}>
            <p className={styles.description}>
              С пропом <code>root</code> порталы монтируются в указанный контейнер.
            </p>
            <PortalDemoContent
              message='Рендерится в кастомный контейнер'
              portalContentClassName={styles.portalContent}
            />
          </PortalContextProvider>
        </div>
      </section>

      <p className={styles.hint}>
        В DevTools → Elements проверьте: первый тёмный блок — в body, второй — внутри пунктирного контейнера.
      </p>
    </div>
  );
}

type StoryArgs = PortalContextProviderProps<RefObject<HTMLDivElement | null>> & { 'data-test-id'?: string };

const meta: Meta<StoryArgs> = {
  title: 'Components/PortalContext',
  component: PortalContextProvider,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: { 'data-test-id': TEST_IDS.root },
  argTypes: {},
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <div data-test-id={args['data-test-id'] ?? TEST_IDS.root}>
      <DemoPage>
        <DemoPanel width='wide'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>PortalContextProvider: монтаж порталов в document.body или в кастомный контейнер.</DemoHint>
          <DemoActions align='center'>
            <PlaygroundContent />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    </div>
  ),
};
