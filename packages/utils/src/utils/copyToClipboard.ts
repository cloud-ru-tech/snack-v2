import { isBrowser } from './isBrowser';

/**
 * Копирует текст в буфер обмена. Сначала пробует Async Clipboard API, при отказе
 * (нет разрешения, insecure-context) падает на `execCommand('copy')` со скрытым textarea.
 *
 * Возвращает `true`, если запись удалась — по этому признаку поля и кнопки показывают
 * индикатор «скопировано».
 *
 * Проверки `isBrowser()` продублированы внутри веток намеренно: правило
 * `@cloud-ru/ssr-safe-react/domApi` требует, чтобы доступ к `navigator`/`document` стоял
 * непосредственно внутри такого условия, а ранний выход оно не учитывает.
 */
export async function copyToClipboard(value: string): Promise<boolean> {
  if (!isBrowser()) return false;

  if (isBrowser() && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);

      return true;
    } catch {
      // fall through to execCommand fallback
    }
  }

  if (isBrowser()) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }

  return false;
}
