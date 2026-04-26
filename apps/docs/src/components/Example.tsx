import { Button } from '@ds/button';
import { CheckSVG, CopySVG } from '@ds/icons';
import { type ReactNode, useCallback, useState } from 'react';

import styles from './Example.module.scss';

type ExampleProps = {
  title?: string;
  description?: string;
  /** Заполняется автоматически remark-плагином `remarkExampleCode` из исходников MDX. */
  code?: string;
  language?: string;
  children: ReactNode;
};

export function Example({ title, description, code = '', language = 'tsx', children }: ExampleProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [code]);

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
        <pre className={`${styles.code} sn-dark`}>
          <code>{code.trim()}</code>
        </pre>
      </div>
    </figure>
  );
}
