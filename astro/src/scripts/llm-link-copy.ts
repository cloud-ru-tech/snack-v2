/**
 * LLM Link Copy Script
 * Обработка копирования URL в буфер обмена
 */
import { consola } from 'consola';

export function initLlmLinkCopy(): void {
  const copyButtons = document.querySelectorAll('.copy-button');

  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const url = button.getAttribute('data-url');

      if (!url) {
        return;
      }

      try {
        await navigator.clipboard.writeText(url);

        // Visual feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = `
          <svg
            class="copy-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        button.classList.add('copied');

        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        consola.error('Failed to copy:', err);
      }
    });
  });
}

// Auto-init
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLlmLinkCopy);
  } else {
    initLlmLinkCopy();
  }

  document.addEventListener('astro:page-load', initLlmLinkCopy);
}
