import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { ChildThemeProvider, COLOR_SCHEME } from '@ds/theme';
import Player from 'video.js/dist/types/player';

import { TEST_IDS } from '../../constants';
import { PlayerState } from '../../hooks/usePlayerState';
import { SpriteFrame } from '../../shared/types';
import { PlaybackControls } from './PlaybackControls';
import styles from './styles.module.scss';
import { Timeline } from './Timeline';

export type ToolbarProps = {
  player: Player;
  state: PlayerState;
  frames: SpriteFrame[];
  visible: boolean;
  fullscreen: boolean;
  onTogglePlay(): void;
  onToggleFullscreen(): void;
  onPlaybackError(error: unknown): void;
};

const DARK_THEME = { colorScheme: COLOR_SCHEME.Dark };

export function Toolbar({ frames, visible, ...controlsProps }: ToolbarProps) {
  const { layoutType } = useAdaptiveLayout();
  const { player, state } = controlsProps;

  return (
    <ChildThemeProvider value={DARK_THEME} className={styles.root}>
      <div
        className={styles.toolbar}
        data-visible={visible}
        data-layout-type={layoutType}
        data-test-id={TEST_IDS.toolbar}
      >
        <Timeline player={player} state={state} frames={frames} />
        <PlaybackControls {...controlsProps} compact={isMobileLayout(layoutType)} />
      </div>
    </ChildThemeProvider>
  );
}
