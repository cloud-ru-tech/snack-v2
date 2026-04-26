import { DOC_SECTIONS, DOC_SECTION_ORDER } from '../config/docSections.mjs'

/**
 * Remark plugin: reorders top-level H2 sections of an MDX document to match
 * the canonical order defined in `src/config/docSections.mjs`.
 *
 * Matching is done by heading **text** against the `title` column of
 * `DOC_SECTIONS` (we can't use MDX `{#id}` markers — MDX parses `{` as the
 * start of a JSX expression and fails). Aliases cover common synonyms.
 *
 * Non-canonical H2s (custom sub-topics like `## Selection mode`) keep their
 * original position — only recognised sections are reshuffled, and they are
 * reinserted into the slots they originally occupied, so neighbours aren't
 * shifted around.
 */

const TEXT_TO_ID = buildTitleIndex()

function buildTitleIndex() {
  const map = new Map()
  for (const { id, title } of DOC_SECTIONS) {
    map.set(normalize(title), id)
  }
  // Synonyms / historical titles → canonical id.
  const aliases = [
    ['Примеры', 'examples'],
    ['States', 'states'],
  ]
  for (const [title, id] of aliases) map.set(normalize(title), id)
  return map
}

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[‘’‛′]/g, "'") // curly/prime → straight apostrophe
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

export function remarkSectionOrder() {
  return function transformer(tree) {
    const children = tree.children ?? []

    const firstH2Index = children.findIndex(
      (n) => n.type === 'heading' && n.depth === 2,
    )
    if (firstH2Index === -1) return

    const prelude = children.slice(0, firstH2Index)
    const rest = children.slice(firstH2Index)

    const sections = []
    let current = null
    for (const node of rest) {
      if (node.type === 'heading' && node.depth === 2) {
        const id = resolveId(node)
        if (id) {
          const data = (node.data ??= {})
          const hProperties = (data.hProperties ??= {})
          hProperties.id = id
          data.id = id
        }
        current = { heading: node, body: [], canonicalId: id ?? null }
        sections.push(current)
      } else if (current) {
        current.body.push(node)
      }
    }

    const knownSlots = []
    const knownSections = []
    sections.forEach((section, i) => {
      if (section.canonicalId && section.canonicalId in DOC_SECTION_ORDER) {
        knownSlots.push(i)
        knownSections.push(section)
      }
    })

    if (knownSections.length < 2) return

    knownSections.sort(
      (a, b) => DOC_SECTION_ORDER[a.canonicalId] - DOC_SECTION_ORDER[b.canonicalId],
    )

    knownSlots.forEach((slot, i) => {
      sections[slot] = knownSections[i]
    })

    tree.children = [
      ...prelude,
      ...sections.flatMap((s) => [s.heading, ...s.body]),
    ]
  }
}

function resolveId(headingNode) {
  const text = stringifyHeading(headingNode)
  if (!text) return null
  return TEXT_TO_ID.get(normalize(text)) ?? null
}

function stringifyHeading(node) {
  let out = ''
  for (const child of node.children ?? []) {
    if (typeof child.value === 'string') out += child.value
    else if (child.children) out += stringifyHeading(child)
  }
  return out
}
