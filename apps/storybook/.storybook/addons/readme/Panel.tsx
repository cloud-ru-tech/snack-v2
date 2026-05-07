import './panel.css';

import { Marked, Renderer } from 'marked';
import { useEffect, useState } from 'react';
import { useChannel, useGlobals } from 'storybook/manager-api';

import { EVENT_SET } from './constants';

const marked = new Marked({ gfm: true, breaks: false });

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type Theme = 'light' | 'dark';

async function renderMarkdown(raw: string, theme: Theme): Promise<string> {
  const renderer = new Renderer();
  const blocks: { id: string; code: string; lang: string }[] = [];
  renderer.code = ({ text, lang }) => {
    const id = `__shiki_${blocks.length}__`;
    blocks.push({ id, code: text, lang: (lang || 'text').trim() });
    return `<!--${id}-->`;
  };
  let html = marked.parse(raw, { renderer }) as string;

  if (blocks.length === 0) return html;

  const shikiTheme = theme === 'dark' ? 'github-dark' : 'github-light';
  let codeToHtml: typeof import('shiki').codeToHtml;
  try {
    ({ codeToHtml } = await import('shiki'));
  } catch (err) {
    console.error('[readme-panel] failed to load shiki, falling back to plain code blocks', err);
    for (const b of blocks) {
      html = html.replace(`<!--${b.id}-->`, `<pre><code>${escapeHtml(b.code)}</code></pre>`);
    }
    return html;
  }
  for (const b of blocks) {
    try {
      const highlighted = await codeToHtml(b.code, { lang: b.lang, theme: shikiTheme });
      html = html.replace(`<!--${b.id}-->`, highlighted);
    } catch (err) {
      console.error(`[readme-panel] shiki highlight failed for lang="${b.lang}"`, err);
      html = html.replace(`<!--${b.id}-->`, `<pre><code>${escapeHtml(b.code)}</code></pre>`);
    }
  }
  return html;
}

export function ReadmePanel() {
  const [raw, setRaw] = useState<string | null>(null);
  const [html, setHtml] = useState<string>('');
  const [globals] = useGlobals();
  const theme: Theme = globals.theme === 'dark' ? 'dark' : 'light';

  useChannel({
    [EVENT_SET]: (content: string | null) => setRaw(content),
  });

  useEffect(() => {
    if (!raw) {
      setHtml('');
      return;
    }
    let cancelled = false;
    renderMarkdown(raw, theme).then(out => {
      if (!cancelled) setHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [raw, theme]);

  if (!raw) {
    return <div className='ds-readme-empty'>README для этого пакета не найден.</div>;
  }

  return (
    <div className='ds-readme-root' data-theme={theme}>
      <div className='ds-readme-md' dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
