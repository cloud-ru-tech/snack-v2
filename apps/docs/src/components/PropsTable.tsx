import { ComponentDoc, PropDef, RelatedType } from './Canvas';
import styles from './PropsTable.module.scss';

type PropsTableProps = {
  data: ComponentDoc;
  /** Only show props with these names (default: show all) */
  include?: string[];
};

function slug(typeName: string, scope: string): string {
  return `related-${scope}-${typeName}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function renderTypeWithRefs(type: string, refs: string[] | undefined, scope: string) {
  if (!refs?.length) return <>{type}</>;

  const escaped = refs.map(r => r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`\\b(${escaped.join('|')})\\b`, 'g');

  const parts: Array<string | { ref: string }> = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(type)) !== null) {
    if (m.index > lastIndex) parts.push(type.slice(lastIndex, m.index));
    parts.push({ ref: m[1] });
    lastIndex = m.index + m[1].length;
  }
  if (lastIndex < type.length) parts.push(type.slice(lastIndex));

  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <span key={i}>{part}</span>
        ) : (
          <a key={i} href={`#${slug(part.ref, scope)}`} className={styles.typeRef}>
            {part.ref}
          </a>
        ),
      )}
    </>
  );
}

function formatType(prop: PropDef): string {
  if (prop.values?.length) return prop.values.map(v => `"${v}"`).join(' | ');
  return prop.type;
}

function PropRow({ name, prop, scope }: { name: string; prop: PropDef; scope: string }) {
  const displayType = formatType(prop);
  const isEnum = Boolean(prop.values?.length);
  return (
    <tr>
      <td>
        <code className={styles.name}>{name}</code>
      </td>
      <td>
        <code className={styles.type}>
          {isEnum ? displayType : renderTypeWithRefs(displayType, prop.typeRefs, scope)}
        </code>
      </td>
      <td>
        {prop.defaultValue !== undefined ? (
          <code className={styles.default}>{prop.defaultValue}</code>
        ) : (
          <span className={styles.empty}>—</span>
        )}
      </td>
      <td>
        <span className={prop.required ? styles.required : styles.optional}>{prop.required ? 'yes' : 'no'}</span>
      </td>
      <td className={styles.desc}>{prop.description ?? ''}</td>
    </tr>
  );
}

function PropsRows({ entries, scope }: { entries: Array<[string, PropDef]>; scope: string }) {
  return (
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
          <PropRow key={name} name={name} prop={prop} scope={scope} />
        ))}
      </tbody>
    </table>
  );
}

function RelatedBody({ related, scope }: { related: RelatedType; scope: string }) {
  if (related.kind === 'union') {
    const values = related.values ?? [];
    return (
      <p className={styles.unionLine}>
        <code className={styles.type}>{values.map(v => `"${v}"`).join(' | ')}</code>
      </p>
    );
  }
  if (related.kind === 'alias') {
    return (
      <p className={styles.unionLine}>
        <code className={styles.type}>{related.type ?? ''}</code>
      </p>
    );
  }
  const entries = Object.entries(related.props ?? {});
  return (
    <div className={styles.wrap}>
      <PropsRows entries={entries} scope={scope} />
    </div>
  );
}

function kindLabel(kind: string): string {
  if (kind === 'union') return 'union';
  if (kind === 'alias') return 'type';
  return 'interface';
}

function RelatedGroup({
  id,
  title,
  entries,
  scope,
}: {
  id: string;
  title: string;
  entries: Array<[string, RelatedType]>;
  scope: string;
}) {
  if (entries.length === 0) return null;
  return (
    <div className={styles.externalGroup} id={id}>
      <h3 className={styles.externalHeading}>{title}</h3>
      <div className={styles.relatedGroup}>
        {entries.map(([name, r]) => {
          const anchorId = slug(name, scope);
          return (
            <section key={name} id={anchorId} className={styles.related}>
              <h4 className={styles.relatedHeading}>
                <code>{name}</code>
                <span className={styles.relatedKind}>{kindLabel(r.kind)}</span>
              </h4>
              <RelatedBody related={r} scope={scope} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function PropsTable({ data, include }: PropsTableProps) {
  const entries = Object.entries(data.props).filter(([name]) => !include || include.includes(name));

  if (entries.length === 0) return null;

  const scope = data.displayName || data.propsTypeName || 'props';
  const relatedTypes = data.relatedTypes ?? {};

  const referenced = new Set<string>();
  for (const [, prop] of entries) {
    for (const ref of prop.typeRefs ?? []) referenced.add(ref);
  }
  const relatedEntries = Object.entries(relatedTypes)
    .filter(([name]) => referenced.has(name))
    .sort(([an], [bn]) => an.localeCompare(bn));
  const typesEntries = relatedEntries.filter(([, r]) => r.own && r.kind !== 'union');
  const unionEntries = relatedEntries.filter(([, r]) => r.own && r.kind === 'union');
  const externalEntries = relatedEntries.filter(([, r]) => !r.own);
  const groupId = (suffix: string) => `${scope}-${suffix}`.replace(/[^a-zA-Z0-9_-]/g, '-');

  const typeLabel = data.propsTypeName ?? (data.displayName ? `${data.displayName}Props` : null);

  const selfId = groupId('self');

  return (
    <div className={styles.root}>
      <div className={styles.externalGroup} id={groupId('types')}>
        <h3 className={styles.externalHeading}>Types</h3>
        {typeLabel ? (
          <div className={styles.header} id={selfId}>
            <span className={styles.headerLabel}>Props</span>
            <code className={styles.headerType}>{typeLabel}</code>
          </div>
        ) : null}
        <div className={styles.wrap}>
          <PropsRows entries={entries} scope={scope} />
        </div>
        {typesEntries.length > 0 ? (
          <div className={styles.relatedGroup}>
            {typesEntries.map(([name, r]) => {
              const anchorId = slug(name, scope);
              return (
                <section key={name} id={anchorId} className={styles.related}>
                  <h4 className={styles.relatedHeading}>
                    <code>{name}</code>
                    <span className={styles.relatedKind}>{kindLabel(r.kind)}</span>
                  </h4>
                  <RelatedBody related={r} scope={scope} />
                </section>
              );
            })}
          </div>
        ) : null}
      </div>

      <RelatedGroup id={groupId('unions')} title='Unions' entries={unionEntries} scope={scope} />
      <RelatedGroup id={groupId('related-props')} title='Related props' entries={externalEntries} scope={scope} />
    </div>
  );
}
