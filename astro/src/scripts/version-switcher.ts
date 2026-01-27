/**
 * Version Switcher Script
 * Обработка переключения версий документации
 */

export function getVersionUrl(currentPath: string, selectedVersion: string): string {
  if (selectedVersion === 'latest') {
    // Удаляем версию из пути
    return currentPath.replace(/\/v\d+\.\d+\.\d+\//, '/');
  }

  // Вставляем или обновляем версию в пути
  if (currentPath.match(/\/v\d+\.\d+\.\d+\//)) {
    return currentPath.replace(/\/v\d+\.\d+\.\d+\//, `/v${selectedVersion}/`);
  } else if (currentPath.startsWith('/components/')) {
    return `/v${selectedVersion}${currentPath}`;
  }

  return currentPath;
}

export function initVersionSwitcher(): void {
  const select = document.getElementById('version-select') as HTMLSelectElement | null;

  if (!select) {
    return;
  }

  select.addEventListener('change', (e) => {
    const selectedVersion = (e.target as HTMLSelectElement).value;
    const currentPath = window.location.pathname;
    const newPath = getVersionUrl(currentPath, selectedVersion);

    window.location.href = newPath;
  });
}

// Auto-init
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVersionSwitcher);
  } else {
    initVersionSwitcher();
  }

  document.addEventListener('astro:page-load', initVersionSwitcher);
}
