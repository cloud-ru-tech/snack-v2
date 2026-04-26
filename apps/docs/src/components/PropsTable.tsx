import type { ComponentDoc } from './Canvas'
import styles from './PropsTable.module.scss'

type PropsTableProps = {
  data: ComponentDoc
  /** Only show props with these names (default: show all) */
  include?: string[]
}

function formatType(type: string, values?: string[]): string {
  if (values?.length) return values.map((v) => `"${v}"`).join(' | ')
  return type
}

export function PropsTable({ data, include }: PropsTableProps) {
  const entries = Object.entries(data.props).filter(
    ([name]) => !include || include.includes(name),
  )

  if (entries.length === 0) return null

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([name, prop]) => (
            <tr key={name}>
              <td>
                <code className={styles.name}>{name}</code>
              </td>
              <td>
                <code className={styles.type}>{formatType(prop.type, prop.values)}</code>
              </td>
              <td>
                {prop.defaultValue !== undefined ? (
                  <code className={styles.default}>{prop.defaultValue}</code>
                ) : (
                  <span className={styles.empty}>—</span>
                )}
              </td>
              <td>
                <span className={prop.required ? styles.required : styles.optional}>
                  {prop.required ? 'yes' : 'no'}
                </span>
              </td>
              <td className={styles.desc}>{prop.description ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
