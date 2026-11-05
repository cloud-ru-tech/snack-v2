import { useAdaptiveLayout } from '@ds/adaptive';
import { ChildThemeProvider, ThemeAppearance } from '@ds/theme';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { SECTION_BACKGROUND_FILL } from '../../constants';
import { SectionBackground, SectionContainer, SectionContainerBackground } from '../../types';
import { BackgroundLayer } from '../BackgroundLayer';
import { BgLocal } from '../BgLocal';
import styles from './styles.module.scss';

export type SectionWrapperProps = WithSupportProps<{
  /** Ширина и отступы секции. */
  container: SectionContainer;
  /** Внешний слой фона. */
  background?: SectionBackground;
  /** Блок по ширине `container`. */
  containerBackground: SectionContainerBackground;
  /** HTML-атрибут `id` секции — якорь для навигации по странице. */
  id?: string;
  /** CSS-класс корня. */
  className?: string;
  children: ReactNode;
}>;

const EMPTY_THEME: Partial<ThemeAppearance> = {};

/**
 * Каркас секции (Figma `sectionBasic`): внешний фон во всю ширину и блок по ширине `container` со своим фоном.
 * У каждого слоя своя тема, поэтому блок может быть тёмным на светлом фоне и наоборот. Темы ставятся
 * обёртками провайдера (классы `sn-*` в разметке), поэтому они есть и в SSR-HTML.
 */
export function SectionWrapper({
  container,
  background,
  containerBackground,
  id,
  className,
  children,
  ...rest
}: SectionWrapperProps) {
  const { layoutType } = useAdaptiveLayout();

  return (
    <section
      id={id}
      className={cn(styles.sectionWrapper, className)}
      data-layout-type={layoutType}
      data-container={container}
      {...extractSupportProps(rest)}
    >
      <ChildThemeProvider value={background?.theme ?? EMPTY_THEME} className={styles.background}>
        <BackgroundLayer fill={background?.fill ?? SECTION_BACKGROUND_FILL.NeutralBackground} />
        <ChildThemeProvider value={containerBackground.theme ?? EMPTY_THEME} className={styles.contentWrapper}>
          <BgLocal background={containerBackground} />
          <div className={styles.content}>{children}</div>
        </ChildThemeProvider>
      </ChildThemeProvider>
    </section>
  );
}
