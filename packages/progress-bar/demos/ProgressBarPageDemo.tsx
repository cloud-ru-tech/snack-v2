import { ProgressBarPage } from '@ds/progress-bar';

/**
 * ProgressBarPage сам ставит себя в `position: fixed; top: 0; left: 0`,
 * поэтому в обычном preview-контейнере он улетает к верхнему краю окна.
 * Создаём собственный containing block через `transform`/`will-change` —
 * элементы с position: fixed позиционируются относительно такого предка,
 * и индикатор ложится на верх «фейкового» браузерного фрейма.
 */
export function ProgressBarPageDemo() {
  return (
    <div
      style={{
        position: 'relative',
        height: 160,
        width: '100%',
        maxWidth: 480,
        border: '1px solid var(--sn-foreground-secondary, #ccc)',
        borderRadius: 8,
        overflow: 'hidden',
        willChange: 'transform',
        background: 'var(--sn-background-secondary, transparent)',
      }}
    >
      <ProgressBarPage inProgress />
      <div style={{ padding: 16 }}>
        <div style={{ height: 12, width: '60%', background: 'var(--sn-foreground-tertiary, #ddd)', borderRadius: 4 }} />
        <div
          style={{
            height: 12,
            width: '40%',
            background: 'var(--sn-foreground-tertiary, #ddd)',
            borderRadius: 4,
            marginTop: 8,
          }}
        />
      </div>
    </div>
  );
}
