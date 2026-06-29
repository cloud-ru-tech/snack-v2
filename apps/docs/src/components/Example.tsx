import { Button } from '@ds/button';
import { CopySVG } from '@ds/icons';
import { type ReactNode } from 'react';

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

/** SSR-безопасный блок примера: без хуков, чтобы @astrojs/react check() не ловил Invalid hook call. */
export function Example({ title, description, code = '', codeHtml, language = 'tsx', children }: ExampleProps) {
  const trimmed = code.trim();
  const highlighted = codeHtml;

  const copy = () => {
    if (trimmed) navigator.clipboard.writeText(trimmed);
  };

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
            appearance='neutral'
            icon={<CopySVG />}
            label='Copy'
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
