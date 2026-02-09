import '@sbercloud/figma-variables/build/css/base/base.css';
import '@sbercloud/figma-variables/build/css/brand/brandB.css';
import '@sbercloud/figma-variables/build/css/theme/light.css';
import '@sbercloud/figma-variables/build/css/theme/dark.css';
import 'highlight.js/styles/github.css';

import './theme/style.css';

import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { marked } from 'marked';
import React, { useEffect, useRef } from 'react';
import { useParameter } from 'storybook/manager-api';
import { useTheme } from 'storybook/theming';

export type ReadmeParameters = {
  /** Markdown chunks (joined by newline). Same as legacy readme addon. */
  sidebar?: string[];
  /** Single markdown string. Alternative to sidebar. */
  content?: string;
};

function getMarkdownSource(params: ReadmeParameters | undefined): string {
  if (!params) return '';
  if (params.content) return params.content;
  if (params.sidebar?.length) return params.sidebar.join('\n');
  return '';
}

const README_BODY_CLASS = {
  light: 'readme-panel-body sn-base-styles sn-brandB sn-light',
  dark: 'readme-panel-body sn-base-styles sn-brandB sn-dark',
} as const;

marked.setOptions({ gfm: true });

function markdownToHtml(markdown: string): string {
  const raw = marked.parse(markdown, { async: false }) as string;
  return DOMPurify.sanitize(raw ?? '', {
    ADD_ATTR: ['target', 'rel'],
    ADD_TAGS: ['section'],
  });
}

export function ReadmePanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme() as { base?: 'light' | 'dark' } | undefined;
  const base = theme?.base ?? 'light';
  const parameters = useParameter<ReadmeParameters>('readme');
  const markdown = getMarkdownSource(parameters);
  const bodyClass = README_BODY_CLASS[base];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>('pre code').forEach(block => {
      hljs.highlightElement(block);
    });
  }, [markdown]);

  if (!markdown.trim()) {
    return (
      <div className={bodyClass}>
        <p className='readme-panel-empty'>
          Добавьте параметр <code>readme</code> в meta стори (sidebar или content с markdown).
        </p>
      </div>
    );
  }

  const html = markdownToHtml(markdown);

  return <div ref={containerRef} className={bodyClass} dangerouslySetInnerHTML={{ __html: html }} />;
}
