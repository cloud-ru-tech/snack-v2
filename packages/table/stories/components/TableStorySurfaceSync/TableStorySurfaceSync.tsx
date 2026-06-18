import { isMobileLayout, LayoutType, useAdaptiveLayout } from '@ds/adaptive';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { TableStickyControlsBackgroundPredefined } from '@ds/table';
import { ReactNode, useLayoutEffect, useRef } from 'react';

import { getControlsAcrylicAttrs } from '../../../src/helperComponents/ControlsChrome/ControlsChrome';
import styles from './styles.module.scss';

const STORY_WRAPPER_SELECTOR = '.sb-story-wrapper';
const ACRYLIC_MARKER = 'data-table-story-acrylic';

type TableStorySurfaceSyncProps = {
  /** Явный `stickyControls.enabled` из args story; `undefined` — mobile-дефолт DS (`true`). */
  stickyControlsEnabled?: boolean;
  stickyControlsBackgroundPredefined?: TableStickyControlsBackgroundPredefined;
  children: ReactNode;
};

function shouldSyncStorySurface(stickyControlsEnabled: boolean | undefined, layoutType: LayoutType | undefined) {
  return stickyControlsEnabled || isMobileLayout(layoutType);
}

/** Синхронизирует acrylic-подложку `sb-story-wrapper` с подложкой sticky chrome при включённом sticky. */
export function TableStorySurfaceSync({
  stickyControlsEnabled,
  stickyControlsBackgroundPredefined = BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
  children,
}: TableStorySurfaceSyncProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const { layoutType } = useAdaptiveLayout();
  const syncSurface = shouldSyncStorySurface(stickyControlsEnabled, layoutType);

  useLayoutEffect(() => {
    const wrapper = anchorRef.current?.closest<HTMLElement>(STORY_WRAPPER_SELECTOR);
    if (!wrapper) {
      return;
    }

    const content = wrapper.firstElementChild as HTMLElement | null;

    const reset = () => {
      wrapper.classList.remove(styles.surface);
      wrapper.removeAttribute('data-acrylic-appearance');
      wrapper.removeAttribute('data-acrylic-level');
      wrapper.querySelector(`[${ACRYLIC_MARKER}]`)?.remove();
      content?.style.removeProperty('background-color');
    };

    if (!syncSurface) {
      reset();
      return reset;
    }

    const acrylic = getControlsAcrylicAttrs(stickyControlsBackgroundPredefined);

    wrapper.classList.add(styles.surface);
    wrapper.setAttribute('data-acrylic-appearance', acrylic['data-acrylic-appearance']);
    wrapper.setAttribute('data-acrylic-level', acrylic['data-acrylic-level']);

    if (!wrapper.querySelector(`[${ACRYLIC_MARKER}]`)) {
      const background = document.createElement('span');
      background.setAttribute(ACRYLIC_MARKER, '');
      background.setAttribute('data-acrylic-background', '');
      background.setAttribute('aria-hidden', 'true');
      background.className = styles.acrylic;
      wrapper.insertBefore(background, wrapper.firstChild);
    }

    if (content) {
      content.style.backgroundColor = 'transparent';
    }

    return reset;
  }, [syncSurface, stickyControlsBackgroundPredefined]);

  return (
    <>
      <span ref={anchorRef} hidden aria-hidden />
      {children}
    </>
  );
}
