import { type ComponentType, useCallback, useMemo, useState } from 'react'

import styles from './Canvas.module.scss'

// ─── Control types ────────────────────────────────────────────────────────────

export type SelectControl = { type: 'select'; options: string[] }
export type BooleanControl = { type: 'boolean' }
export type TextControl = { type: 'text' }
export type NumberControl = { type: 'number' }
export type ControlDef = SelectControl | BooleanControl | TextControl | NumberControl
export type Controls = Record<string, ControlDef>

// ─── Docgen types (matches docs/props.json schema) ───────────────────────────

export type PropDef = {
  type: string
  values?: string[]
  defaultValue?: string
  description?: string
  required: boolean
}

export type ComponentDoc = {
  displayName: string
  description?: string
  props: Record<string, PropDef>
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function deriveControl(prop: PropDef): ControlDef | null {
  if (prop.values?.length) return { type: 'select', options: prop.values }
  const t = prop.type.toLowerCase()
  if (t === 'boolean') return { type: 'boolean' }
  if (t === 'number') return { type: 'number' }
  if (t === 'string' || t.includes('reactnode') || t === 'react.reactnode') {
    return { type: 'text' }
  }
  return null
}

function deriveDefaults(doc: ComponentDoc): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [name, prop] of Object.entries(doc.props)) {
    if (prop.defaultValue === undefined) continue
    const ctl = deriveControl(prop)
    if (ctl?.type === 'boolean') out[name] = prop.defaultValue === 'true'
    else if (ctl?.type === 'number') out[name] = Number(prop.defaultValue)
    else out[name] = prop.defaultValue
  }
  return out
}

// ─── Props ────────────────────────────────────────────────────────────────────

export type CanvasProps<P extends Record<string, unknown> = Record<string, unknown>> = {
  component: ComponentType<P>
  /** Display name used in the generated JSX snippet. Defaults to component.displayName or component.name. */
  componentName?: string
  defaultProps?: Partial<P>
  /**
   * Auto-derive controls from a docs/props.json ComponentDoc entry.
   * Use `controls` to override or add individual controls on top of this.
   */
  componentDoc?: ComponentDoc
  /**
   * Manual control definitions. When `componentDoc` is also provided,
   * these are merged on top of the auto-derived controls (last-write-wins).
   */
  controls?: Controls
  /** Props to hide from the controls panel (e.g. complex event handlers). */
  excludeProps?: string[]
}

type BgTheme = 'light' | 'surface' | 'dark'

const BG_LABELS: Record<BgTheme, string> = { light: 'W', surface: 'G', dark: 'D' }

function generateJSX(componentName: string, props: Record<string, unknown>): string {
  const entries = Object.entries(props).filter(([, v]) => v !== undefined && v !== '')
  if (!entries.length) return `<${componentName} />`

  const attrs = entries
    .map(([k, v]) => {
      if (typeof v === 'boolean') return v ? k : `${k}={false}`
      if (typeof v === 'number') return `${k}={${v}}`
      if (typeof v === 'string' && v === k) return k
      return `${k}=${JSON.stringify(v)}`
    })
    .join(' ')

  return `<${componentName} ${attrs} />`
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
    if (!componentDoc) return controls

    const derived: Controls = {}
    for (const [name, prop] of Object.entries(componentDoc.props)) {
      if (excludeProps.includes(name)) continue
      const ctl = deriveControl(prop)
      if (ctl) derived[name] = ctl
    }

    return { ...derived, ...controls }
  }, [componentDoc, controls, excludeProps])

  const autoDefaults = useMemo<Record<string, unknown>>(() => componentDoc ? deriveDefaults(componentDoc) : {}, [componentDoc])

  const initialProps = { ...autoDefaults, ...defaultProps }

  const [props, setProps] = useState<Record<string, unknown>>(initialProps)
  const [bg, setBg] = useState<BgTheme>('light')
  const [copied, setCopied] = useState(false)

  const update = (key: string, value: unknown) =>
    setProps((prev) => ({ ...prev, [key]: value }))

  const reset = () => setProps(initialProps)

  const hasControls = Object.keys(mergedControls).length > 0

  const resolvedName = componentName ?? (Component as { displayName?: string; name?: string }).displayName ?? (Component as { name?: string }).name ?? 'Component'
  const codeSnippet = generateJSX(resolvedName, props)

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [codeSnippet])

  return (
    <div className={styles.root}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>Preview</span>
        <div className={styles.toolbarActions}>
          {(['light', 'surface', 'dark'] as BgTheme[]).map((t) => (
            <button
              key={t}
              className={`${styles.bgBtn} ${bg === t ? styles.bgBtnActive : ''}`}
              onClick={() => setBg(t)}
              aria-label={`${t} background`}
              aria-pressed={bg === t}
              title={t}
            >
              {BG_LABELS[t]}
            </button>
          ))}
          <div className={styles.divider} />
          <button
            className={styles.actionBtn}
            onClick={reset}
            aria-label="Reset to defaults"
            title="Reset"
          >
            ↺
          </button>
        </div>
      </div>

      {/* Preview — forced-dark variant piggybacks on figma-variables .sn-dark scoping */}
      <div className={`${styles.preview} ${styles[`preview_${bg}`]} ${bg === 'dark' ? 'sn-dark' : ''}`}>
        <Component {...(props as P)} />
      </div>

      {/* Controls */}
      {hasControls && (
        <div className={styles.controls}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(mergedControls).map(([key, def]) => (
                <tr key={key}>
                  <td>
                    <code className={styles.propName}>{key}</code>
                  </td>
                  <td className={styles.typeCell}>
                    {def.type === 'select' ? def.options.join(' | ') : def.type}
                  </td>
                  <td className={styles.valueCell}>
                    {def.type === 'select' && (
                      <select
                        className={styles.select}
                        value={String(props[key] ?? def.options[0])}
                        onChange={(e) => update(key, e.target.value)}
                      >
                        {def.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    {def.type === 'boolean' && (
                      <label className={styles.toggle} aria-label={key}>
                        <input
                          type="checkbox"
                          className={styles.toggleInput}
                          checked={Boolean(props[key])}
                          onChange={(e) => update(key, e.target.checked)}
                        />
                        <span className={styles.toggleTrack}>
                          <span className={styles.toggleThumb} />
                        </span>
                      </label>
                    )}

                    {def.type === 'text' && (
                      <input
                        type="text"
                        className={styles.input}
                        value={String(props[key] ?? '')}
                        onChange={(e) => update(key, e.target.value)}
                      />
                    )}

                    {def.type === 'number' && (
                      <input
                        type="number"
                        className={styles.input}
                        value={Number(props[key] ?? 0)}
                        onChange={(e) => update(key, Number(e.target.value))}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Code panel */}
      <div className={styles.codePanel}>
        <div className={styles.codePanelHeader}>
          <span className={styles.codePanelLabel}>Code</span>
          <button
            className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
            onClick={copyCode}
            aria-label="Copy code"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <pre className={`${styles.codePre} sn-dark`}><code>{codeSnippet}</code></pre>
      </div>
    </div>
  )
}
