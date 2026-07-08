import { isBrowser } from './isBrowser';

export async function copyToClipboard(value: string): Promise<void> {
  if (!isBrowser()) return;

  if (isBrowser() && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
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
      document.execCommand('copy');
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
