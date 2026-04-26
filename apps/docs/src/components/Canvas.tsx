import { Button } from '@ds/button';
import { CheckSVG, CopySVG, DaySVG, EyeClosedSVG, EyeSVG, NightSVG, ThemeContrastSVG, UpdateSVG } from '@ds/icons';
import { Switch } from '@ds/toggles';
import { type ComponentType, type ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import styles from './Canvas.module.scss';

// ─── Control types ────────────────────────────────────────────────────────────

export type SelectControl = { type: 'select' | 'radio'; options: string[] };
export type BooleanControl = { type: 'boolean' };
export type TextControl = { type: 'text' };
export type NumberControl = { type: 'number' };
export type ControlDef = SelectControl | BooleanControl | TextControl | NumberControl;
export type Controls = Record<string, ControlDef>;

// ─── Docgen types (matches docs/props.json schema) ───────────────────────────

export type PropDef = {
  type: string;
  values?: string[];
  defaultValue?: string;
  description?: string;
  required: boolean;
};

export type ComponentDoc = {
  displayName: string;
  description?: string;
  props: Record<string, PropDef>;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function deriveControl(prop: PropDef): ControlDef | null {
  if (prop.values?.length) return { type: 'select', options: prop.values };
  const t = prop.type.toLowerCase();
  if (t === 'boolean') return { type: 'boolean' };
  if (t === 'number') return { type: 'number' };
  if (t === 'string' || t.includes('reactnode') || t === 'react.reactnode') {
    return { type: 'text' };
  }
  return null;
}

function stripQuotes(value: string): string {
  const first = value[0];
  const last = value[value.length - 1];
  if (value.length >= 2 && (first === '"' || first === "'") && last === first) {
    return value.slice(1, -1);
  }
  return value;
}

function deriveDefaults(doc: ComponentDoc): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [name, prop] of Object.entries(doc.props)) {
    if (prop.defaultValue === undefined) continue;
    const ctl = deriveControl(prop);
    if (ctl?.type === 'boolean') out[name] = prop.defaultValue === 'true';
    else if (ctl?.type === 'number') out[name] = Number(prop.defaultValue);
    else out[name] = stripQuotes(prop.defaultValue);
  }
  return out;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export type CanvasProps<P extends Record<string, unknown> = Record<string, unknown>> = {
  // Docs-level shim: accept any component shape. Real prop-shape is described by componentDoc/controls at runtime.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  /** Display name used in the generated JSX snippet. Defaults to component.displayName or component.name. */
  componentName?: string;
  defaultProps?: Partial<P>;
  /**
   * Auto-derive controls from a docs/props.json ComponentDoc entry.
   * Use `controls` to override or add individual controls on top of this.
   */
  componentDoc?: ComponentDoc;
  /**
   * Manual control definitions. When `componentDoc` is also provided,
   * these are merged on top of the auto-derived controls (last-write-wins).
   */
  controls?: Controls;
  /** Props to hide from the controls panel (e.g. complex event handlers). */
  excludeProps?: string[];
};

type BgTheme = 'light' | 'surface' | 'dark';

const BG_ICONS: Record<BgTheme, ReactElement> = {
  light: <DaySVG />,
  surface: <ThemeContrastSVG />,
  dark: <NightSVG />,
};

function generateJSX(componentName: string, props: Record<string, unknown>): string {
  const entries = Object.entries(props).filter(([, v]) => v !== undefined && v !== '');
  if (!entries.length) return `<${componentName} />`;

  const attrs = entries
    .map(([k, v]) => {
      if (typeof v === 'boolean') return v ? k : `${k}={false}`;
      if (typeof v === 'number') return `${k}={${v}}`;
      if (typeof v === 'string' && v === k) return k;
      return `${k}=${JSON.stringify(v)}`;
    })
    .join(' ');

  return `<${componentName} ${attrs} />`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Canvas<P extends Record<string, unknown>>({
  component: Component,
  componentName,
  defaultProps = {},
  componentDoc,
  controls = {},
  excludeProps = [],
}: CanvasProps<P>) {
  const mergedControls = useMemo<Controls>(() => {
    if (!componentDoc) return controls;

    const derived: Controls = {};
    for (const [name, prop] of Object.entries(componentDoc.props)) {
      if (excludeProps.includes(name)) continue;
      const ctl = deriveControl(prop);
      if (ctl) derived[name] = ctl;
    }

    return { ...derived, ...controls };
  }, [componentDoc, controls, excludeProps]);

  const autoDefaults = useMemo<Record<string, unknown>>(
    () => (componentDoc ? deriveDefaults(componentDoc) : {}),
    [componentDoc],
  );

  const initialProps = { ...autoDefaults, ...defaultProps };

  const [props, setProps] = useState<Record<string, unknown>>(initialProps);
  const [bg, setBg] = useState<BgTheme>('light');
  const [copied, setCopied] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const update = (key: string, value: unknown) => setProps(prev => ({ ...prev, [key]: value }));

  const reset = () => setProps(initialProps);

  const hasControls = Object.keys(mergedControls).length > 0;

  const resolvedName =
    componentName ??
    (Component as { displayName?: string; name?: string }).displayName ??
    (Component as { name?: string }).name ??
    'Component';
  const codeSnippet = generateJSX(resolvedName, props);

  const [highlighted, setHighlighted] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    import('shiki').then(({ codeToHtml }) =>
      codeToHtml(codeSnippet, { lang: 'tsx', theme: 'github-dark' }).then(html => {
        if (!cancelled) setHighlighted(html);
      }),
    );
    return () => {
      cancelled = true;
    };
  }, [codeSnippet]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [codeSnippet]);

  return (
    <div className={styles.root}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>Preview</span>
        <div className={styles.toolbarActions}>
          {(['light', 'surface', 'dark'] as BgTheme[]).map(t => (
            <Button
              key={t}
              size='s'
              view={bg === t ? 'filled' : 'simple'}
              appearance={bg === t ? 'primary' : 'neutral'}
              icon={BG_ICONS[t]}
              onClick={() => setBg(t)}
              aria-label={`${t} background`}
              aria-pressed={bg === t}
              title={t}
            />
          ))}
          <div className={styles.divider} />
          <Button
            size='s'
            view='simple'
            appearance='neutral'
            icon={<UpdateSVG />}
            onClick={reset}
            aria-label='Reset to defaults'
            title='Reset'
          />
        </div>
      </div>

      {/* Preview — forced-dark variant piggybacks on figma-variables .sn-dark scoping */}
      <div className={`${styles.preview} ${styles[`preview_${bg}`]} ${bg === 'dark' ? 'sn-dark' : ''}`}>
        <Component {...(props as P)} />
        {hasControls && (
          <Button
            size='s'
            view='outline'
            appearance='neutral'
            label={controlsVisible ? 'Hide props' : 'Show props'}
            icon={controlsVisible ? <EyeClosedSVG /> : <EyeSVG />}
            onClick={() => setControlsVisible(v => !v)}
            aria-label={controlsVisible ? 'Hide props controls' : 'Show props controls'}
            aria-pressed={controlsVisible}
            className={styles.previewToggleBtn}
          />
        )}
      </div>

      {/* Controls */}
      {hasControls && controlsVisible && (
        <div className={styles.controls}>
          <div className={styles.tableGrid} role='table'>
            <div className={styles.headCell} role='columnheader'>
              Prop
            </div>
            <div className={styles.headCell} role='columnheader'>
              Type
            </div>
            <div className={`${styles.headCell} ${styles.valueCell}`} role='columnheader'>
              Value
            </div>
            {Object.entries(mergedControls).map(([key, def]) => (
              <div key={key} className={styles.row} role='row'>
                <div className={styles.cell} role='cell'>
                  <code className={styles.propName}>{key}</code>
                </div>
                <div className={`${styles.cell} ${styles.typeCell}`} role='cell'>
                  {def.type === 'select' || def.type === 'radio' ? def.options.join(' | ') : def.type}
                </div>
                <div className={`${styles.cell} ${styles.valueCell}`} role='cell'>
                  {(def.type === 'select' || def.type === 'radio') && (
                    <select
                      className={styles.select}
                      value={String(props[key] ?? def.options[0])}
                      onChange={e => update(key, e.target.value)}
                    >
                      {def.options.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {def.type === 'boolean' && (
                    <>
                      <Switch
                        aria-label={key}
                        size='xs'
                        checked={Boolean(props[key])}
                        onChange={value => update(key, Boolean(value))}
                      />
                      {/* <label className={styles.toggle} aria-label={key}>
                      <input
                        type='checkbox'
                        className={styles.toggleInput}
                        checked={Boolean(props[key])}
                        onChange={e => update(key, e.target.checked)}
                      />
                      <span className={styles.toggleTrack}>
                        <span className={styles.toggleThumb} />
                      </span>
                    </label> */}
                    </>
                  )}

                  {def.type === 'text' && (
                    <input
                      type='text'
                      className={styles.input}
                      value={String(props[key] ?? '')}
                      onChange={e => update(key, e.target.value)}
                    />
                  )}

                  {def.type === 'number' && (
                    <input
                      type='number'
                      className={styles.input}
                      value={Number(props[key] ?? 0)}
                      onChange={e => update(key, Number(e.target.value))}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code panel */}
      <div className={styles.codePanel}>
        <div className={styles.codePanelHeader}>
          <span className={styles.codePanelLabel}>Code</span>
          <Button
            size='s'
            view='elevated'
            appearance={copied ? 'primary' : 'neutral'}
            icon={copied ? <CheckSVG /> : <CopySVG />}
            label={copied ? 'Copied' : 'Copy'}
            onClick={copyCode}
            aria-label='Copy code'
          />
        </div>

        {highlighted ? (
          <div
            className={`${styles.codePre} ${styles.codeShiki} sn-dark`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <pre className={`${styles.codePre} sn-dark`}>
            <code>{codeSnippet}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
