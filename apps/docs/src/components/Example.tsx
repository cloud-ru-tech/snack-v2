import { Button } from '@ds/button';
import { CheckSVG, CopySVG } from '@ds/icons';
import { type ReactNode, useCallback, useEffect, useState } from 'react';

import styles from './Example.module.scss';

type ExampleProps = {
  title?: string;
  description?: string;
  /** Заполняется автоматически remark-плагином `remarkExampleCode` из исходников MDX. */
  code?: string;
  /** Pre-rendered Shiki HTML injected by the remark plugin at build time. */
  codeHtml?: string;
  language?: string;
  children: ReactNode;
};

export function Example({ title, description, code = '', codeHtml, language = 'tsx', children }: ExampleProps) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.trim();

  const copy = useCallback(() => {
    navigator.clipboard.writeText(trimmed).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [trimmed]);

  // If the remark plugin already produced HTML at build time — use it directly.
  // Otherwise, fall back to runtime Shiki (only fires if the Example island hydrates).
  const [runtimeHtml, setRuntimeHtml] = useState<string | null>(null);
  useEffect(() => {
    if (codeHtml || !trimmed) return;
    let cancelled = false;
    import('shiki').then(({ codeToHtml }) =>
      codeToHtml(trimmed, { lang: language, theme: 'github-dark' }).then(html => {
        if (!cancelled) setRuntimeHtml(html);
      }),
    );
    return () => {
      cancelled = true;
    };
  }, [trimmed, language, codeHtml]);

  const highlighted = codeHtml ?? runtimeHtml;

  return (
    <figure className={styles.root}>
      {(title || description) && (
        <figcaption className={styles.caption}>
          {title && <span className={styles.title}>{title}</span>}
          {description && <span className={styles.desc}>{description}</span>}
        </figcaption>
      )}
      <div className={styles.preview}>{children}</div>
      <div className={styles.codeWrap}>
        <div className={styles.codeHeader}>
          <span className={styles.codeLang}>{language}</span>
          <Button
            size='s'
            view='simple'
            appearance={copied ? 'primary' : 'neutral'}
            icon={copied ? <CheckSVG /> : <CopySVG />}
            label={copied ? 'Copied' : 'Copy'}
            onClick={copy}
            aria-label='Copy code'
          />
        </div>
        {highlighted ? (
          <div
            className={`${styles.code} ${styles.codeShiki} sn-dark`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <pre className={`${styles.code} sn-dark`}>
            <code>{trimmed}</code>
          </pre>
        )}
      </div>
    </figure>
  );
}
