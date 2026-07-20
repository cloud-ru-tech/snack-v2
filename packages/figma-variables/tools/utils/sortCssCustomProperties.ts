type Node = {
  name: string;
  line: string;
  index: number;
  deps: Set<string>;
};

/**
 * Sorts CSS custom property declarations (`--foo: ...;`) so that, whenever possible,
 * a variable is declared before any other variable that depends on it via `var(--foo)`.
 *
 * The algorithm:
 * - treats each line as a node in a dependency graph
 * - detects custom property names and `var(--...)` usages
 * - builds a graph where edges go from dependency to dependant
 * - performs a stable topological sort using original index as a tie‑breaker
 *
 * Lines that do not define custom properties are preserved and participate in the
 * stable ordering but do not introduce dependencies.
 */
export function sortCssCustomProperties(lines: string[]): string[] {
  if (lines.length <= 1) {
    return lines;
  }

  const defRegex = /^\s*(--[A-Za-z0-9_-]+)\s*:/;
  const varRefRegex = /var\(\s*(--[A-Za-z0-9_-]+)/g;

  const nodes: Node[] = [];
  const nameToNode = new Map<string, Node>();

  lines.forEach((line, index) => {
    const match = defRegex.exec(line);

    if (!match) {
      // Not a custom property definition – keep as an isolated node
      const name = `__line_${index}`;
      const node: Node = { name, line, index, deps: new Set() };
      nodes.push(node);
      nameToNode.set(name, node);
      return;
    }

    const name = match[1];
    const deps = new Set<string>();

    let refMatch: RegExpExecArray | null;
    while ((refMatch = varRefRegex.exec(line)) !== null) {
      const depName = refMatch[1];
      if (depName && depName !== name) {
        deps.add(depName);
      }
    }

    const node: Node = { name, line, index, deps };
    nodes.push(node);
    nameToNode.set(name, node);
  });

  // Build adjacency list and indegree map
  const adj = new Map<string, Set<string>>();
  const indegree = new Map<string, number>();

  for (const node of nodes) {
    adj.set(node.name, new Set());
    indegree.set(node.name, 0);
  }

  for (const node of nodes) {
    for (const dep of node.deps) {
      if (!nameToNode.has(dep)) {
        continue;
      }

      const target = node.name;
      const fromNeighbors = adj.get(dep);
      if (fromNeighbors && !fromNeighbors.has(target)) {
        fromNeighbors.add(target);
        indegree.set(target, (indegree.get(target) ?? 0) + 1);
      }
    }
  }

  // Kahn's algorithm with stable ordering by original index
  const queue: Node[] = [];
  const seen = new Set<string>();

  for (const node of nodes) {
    if ((indegree.get(node.name) ?? 0) === 0) {
      queue.push(node);
    }
  }

  queue.sort((a, b) => a.index - b.index);

  const result: Node[] = [];

  while (queue.length > 0) {
    const node = queue.shift() as Node;

    if (seen.has(node.name)) {
      continue;
    }
    seen.add(node.name);
    result.push(node);

    const neighbors = adj.get(node.name);
    if (!neighbors) {
      continue;
    }

    for (const neighborName of neighbors) {
      const current = (indegree.get(neighborName) ?? 0) - 1;
      indegree.set(neighborName, current);
      if (current === 0) {
        const neighbor = nameToNode.get(neighborName);
        if (neighbor && !seen.has(neighbor.name)) {
          queue.push(neighbor);
        }
      }
    }

    // Preserve stability between "ready" nodes
    queue.sort((a, b) => a.index - b.index);
  }

  if (result.length !== nodes.length) {
    // Fallback for cycles or other anomalies: append remaining nodes in original order
    const remaining = nodes.filter(node => !seen.has(node.name));
    remaining.sort((a, b) => a.index - b.index);
    result.push(...remaining);
  }

  return result.map(node => node.line);
}
