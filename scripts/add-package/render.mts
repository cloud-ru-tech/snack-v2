export type TokenMap = Record<string, string>

export function render(content: string, vars: TokenMap): string {
  let result = content
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{{${key}}}`, value)
  }

  const unresolved = result.match(/\{\{[A-Z_]+\}\}/g)
  if (unresolved) {
    throw new Error(`Unresolved template tokens: ${[...new Set(unresolved)].join(', ')}`)
  }

  return result
}
