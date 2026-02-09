import React, { Component, type ReactNode } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { addons, types } from 'storybook/manager-api';

import { ADDON_ID, PANEL_ID } from './constants';
import { ReadmePanel } from './ReadmePanel';

class ReadmeErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  override state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  override componentDidCatch(error: Error): void {
    console.error('[readme-panel]', error);
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, color: 'var(--color-fg-muted, #57606a)' }}>
          Ошибка загрузки Readme. Проверьте консоль.
        </div>
      );
    }
    return this.props.children;
  }
}

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Readme',
    paramKey: 'readme',
    render: options => {
      const active = options?.active ?? false;
      return (
        <AddonPanel active={active}>
          <ReadmeErrorBoundary>
            <ReadmePanel />
          </ReadmeErrorBoundary>
        </AddonPanel>
      );
    },
  });
});
