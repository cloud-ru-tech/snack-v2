import DOMPurify from 'isomorphic-dompurify';

// Профиль `html` отбрасывает SVG и MathML. Сверх стандартной очистки DOMPurify (скрипты, обработчики on*,
// `javascript:` в ссылках) запрещены теги и атрибуты `style` и элементы форм: разметка не должна
// перекрашивать страницу и собирать ввод. Атрибут `class` разрешён — на него опираются оформление
// из CMS и подсветка в результатах поиска. `target` разрешён для ссылок в новой вкладке.
const SANITIZE_CONFIG = {
  USE_PROFILES: { html: true },
  ADD_ATTR: ['target'],
  FORBID_TAGS: ['style', 'form', 'input', 'button', 'textarea', 'select', 'option'],
  FORBID_ATTR: ['style'],
};

// Неявный `noopener` браузеры ставят только для `target="_blank"`, поэтому `rel` задаётся при любом `target`:
// открытая страница не получает доступ к `window.opener`.
function protectTargetLinks(node: Node) {
  // `instanceof Element` не подходит: на сервере узлы принадлежат окну jsdom, а не глобальному `Element`.
  if (node.nodeName === 'A' && (node as Element).hasAttribute('target')) {
    (node as Element).setAttribute('rel', 'noopener noreferrer');
  }
}

/** Очищает HTML-строку от XSS: работает и на сервере (SSR), и в браузере. */
export function sanitizeRichText(html: string): string {
  // Хук глобальный для экземпляра DOMPurify, поэтому ставится только на время синхронного вызова
  // и не влияет на другой код приложения, который использует DOMPurify.
  DOMPurify.addHook('afterSanitizeAttributes', protectTargetLinks);

  try {
    return DOMPurify.sanitize(html, SANITIZE_CONFIG);
  } finally {
    DOMPurify.removeHook('afterSanitizeAttributes');
  }
}
