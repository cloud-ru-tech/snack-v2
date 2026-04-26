import { Search } from '@ds/search';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './HeaderSearch.module.scss';

type PagefindSubResult = {
  title: string;
  url: string;
  excerpt: string;
};

type PagefindResultData = {
  url: string;
  meta: { title?: string };
  excerpt: string;
  sub_results?: PagefindSubResult[];
};

type PagefindResult = {
  id: string;
  data: () => Promise<PagefindResultData>;
};

type PagefindModule = {
  options?: (opts: Record<string, unknown>) => Promise<void>;
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
  debouncedSearch?: (
    query: string,
    options?: Record<string, unknown>,
    debounce?: number,
  ) => Promise<{ results: PagefindResult[] } | null>;
};

const MAX_RESULTS = 8;
const DEBOUNCE_MS = 180;

export function HeaderSearch() {
  const baseUrl = import.meta.env.BASE_URL;
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PagefindResultData[]>([]);
  const pagefindRef = useRef<PagefindModule | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadPagefind = useCallback(async (): Promise<PagefindModule | null> => {
    if (pagefindRef.current) return pagefindRef.current;
    try {
      const url = `${baseUrl}pagefind/pagefind.js`;
      const mod: PagefindModule = await import(/* @vite-ignore */ url);
      await mod.options?.({ baseUrl });
      pagefindRef.current = mod;
      return mod;
    } catch {
      return null;
    }
  }, [baseUrl]);

  useEffect(() => {
    const query = value.trim();
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const handle = window.setTimeout(async () => {
      const pf = await loadPagefind();
      if (!pf || cancelled) {
        setLoading(false);
        return;
      }
      const search = pf.debouncedSearch ? await pf.debouncedSearch(query, undefined, 0) : await pf.search(query);
      if (cancelled || !search) return;
      const data = await Promise.all(search.results.slice(0, MAX_RESULTS).map(r => r.data()));
      if (cancelled) return;
      setResults(data);
      setLoading(false);
    }, DEBOUNCE_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [value, loadPagefind]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const showBadge = !value && !open;
  const hasQuery = value.trim().length > 0;

  const items = useMemo(() => results.map(r => ({ ...r, displayTitle: r.meta.title ?? r.url })), [results]);

  return (
    <div className={styles.root} ref={rootRef}>
      <Search
        ref={inputRef}
        size='m'
        value={value}
        placeholder='Поиск по документации…'
        // loading={loading}
        onChange={setValue}
        onFocus={() => setOpen(true)}
      />
      {showBadge && (
        <kbd className={styles.kbd} aria-hidden='true'>
          ⌘K
        </kbd>
      )}
      {open && hasQuery && (
        <div className={styles.drawer} role='listbox'>
          {items.length === 0 && !loading && <div className={styles.empty}>Ничего не найдено</div>}
          {items.map(r => (
            <a key={r.url} href={r.url} className={styles.result} role='option' aria-selected={false}>
              <span className={styles.resultTitle}>{r.displayTitle}</span>
              {r.excerpt && <span className={styles.resultExcerpt} dangerouslySetInnerHTML={{ __html: r.excerpt }} />}
              {r.sub_results?.slice(0, 3).map(s => (
                <a key={s.url} href={s.url} className={styles.subResult}>
                  <span className={styles.subTitle}>{s.title}</span>
                  {s.excerpt && <span className={styles.subExcerpt} dangerouslySetInnerHTML={{ __html: s.excerpt }} />}
                </a>
              ))}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
