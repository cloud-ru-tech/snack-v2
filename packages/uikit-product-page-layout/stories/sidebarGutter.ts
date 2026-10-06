// В isolation-mode и e2e родителя нет; чужой origin выбрасывает исключение.
function isInStorybookManager(): boolean {
  try {
    return window.parent !== window && Boolean(window.parent.document.getElementById('storybook-preview-iframe'));
  } catch {
    return false;
  }
}

/** Превью открыто внутри интерфейса Storybook. */
export const withSidebarGutter = isInStorybookManager();
