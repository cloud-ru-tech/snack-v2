/**
 * Utility to generate README.md from MDX documentation
 * Creates a simplified version without interactive components
 */

/**
 * Generates README.md content from MDX source
 * @param {string} mdxContent - Original MDX content
 * @param {string} packageName - Package name
 * @param {string} version - Package version
 * @returns {string} - README.md content
 */
export function generateReadmeFromMdx(mdxContent, packageName, version) {
  let content = mdxContent;

  // Extract frontmatter
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const frontmatterMatch = content.match(frontmatterRegex);
  let title = packageName;
  let description = '';

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
    const descMatch = frontmatter.match(/^description:\s*(.+)$/m);

    if (titleMatch) {
      title = titleMatch[1].trim().replace(/^["']|["']$/g, '');
    }
    if (descMatch) {
      description = descMatch[1].trim().replace(/^["']|["']$/g, '');
    }

    // Remove frontmatter
    content = content.replace(frontmatterRegex, '');
  }

  // Remove all import statements (including multi-line)
  content = content.replace(/^import\s+[\s\S]*?from\s+['"].*?['"];?\s*$/gm, '');

  // Remove JSX comments (both single-line and multi-line)
  content = content.replace(/<>\s*\{\s*\/\*[\s\S]*?\*\/\s*\}\s*<\/>/g, '');
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove interactive components (ExampleContainer, ExampleRow, ExampleGrid, ExampleItem)
  // Match opening and closing tags with content (handles nested components)
  const componentPatterns = [
    // ExampleContainer with all content inside (non-greedy to handle nested)
    /<ExampleContainer[^>]*>[\s\S]*?<\/ExampleContainer>/g,
    // ExampleRow with all content inside
    /<ExampleRow[^>]*>[\s\S]*?<\/ExampleRow>/g,
    // ExampleGrid with all content inside
    /<ExampleGrid[^>]*>[\s\S]*?<\/ExampleGrid>/g,
    // ExampleItem with all content inside
    /<ExampleItem[^>]*>[\s\S]*?<\/ExampleItem>/g,
    // StorybookIframe (self-closing or with content)
    /<StorybookIframe[^>]*\/?>/g,
    // Changelog component (self-closing or with content)
    /<Changelog[^>]*\/?>/g,
    // Avatar and other component usages in examples (keep code blocks, remove live examples)
    // But only if they're not in code blocks - we'll handle this more carefully
  ];

  for (const pattern of componentPatterns) {
    content = content.replace(pattern, '');
  }

  // Remove standalone JSX expressions that might contain components
  // But preserve code blocks
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check for code block start/end
    if (line.match(/^```/)) {
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock) {
        codeBlockLanguage = line.replace(/^```/, '').trim();
      }
      processedLines.push(line);
      continue;
    }

    // If we're in a code block, keep the line as-is
    if (inCodeBlock) {
      processedLines.push(line);
      continue;
    }

    // Process JSX expressions outside code blocks
    if (line.includes('{') && line.includes('}')) {
      // Skip lines that are just JSX expressions with components
      if (line.match(/^\s*\{[^}]*<[^>]+>[^}]*\}\s*$/)) {
        continue;
      }
      // Replace JSX expressions like {frontmatter.version} with actual values
      // This is a simple replacement - in real MDX these would be evaluated
      line = line.replace(/\{frontmatter\.version\}/g, version);
      // Remove other frontmatter references
      line = line.replace(/\{[^}]*frontmatter[^}]*\}/g, '');
      // Remove empty lines after removing expressions
      if (line.trim() === '') {
        continue;
      }
    }

    processedLines.push(line);
  }

  content = processedLines.join('\n');

  // Clean up multiple empty lines
  content = content.replace(/\n{3,}/g, '\n\n');

  // Remove leading/trailing whitespace
  content = content.trim();

  // Build README header
  let readme = `# ${title}\n\n`;

  if (description) {
    readme += `${description}\n\n`;
  }

  readme += `**Version:** \`${version}\`\n\n`;
  readme += `**Package:** \`@design-system/${packageName}\`\n\n`;
  readme += `---\n\n`;

  // Add the cleaned content
  readme += content;

  // Add footer with links
  readme += `\n\n---\n\n`;
  readme += `## Additional Resources\n\n`;
  readme += `- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history\n`;
  readme += `- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions\n`;

  return readme;
}

















