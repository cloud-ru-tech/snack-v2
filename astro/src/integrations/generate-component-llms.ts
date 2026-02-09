import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

import type { AstroIntegration } from 'astro';
import { consola } from 'consola';
import { fileURLToPath } from 'node:url';

import { listMdxRecursive, replaceLiveExamplesWithCodeBlocks, stripMdxForPlainText } from '../utils/docContentUtils';

type ComponentLlmsOptions = {
  contentDir?: string;
  outputDir?: string;
};

/**
 * Generate individual llm.txt file for each component
 * Creates llm-{component-name}.txt in the output directory
 */
// eslint-disable-next-line import/no-default-export
export default function generateComponentLlms(options: ComponentLlmsOptions = {}): AstroIntegration {
  const { contentDir = 'src/content/docs', outputDir = '_llms-txt/components' } = options;

  return {
    name: 'generate-component-llms',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const distPath = typeof dir === 'string' ? dir : fileURLToPath(dir);
        const projectRoot = process.cwd();
        const componentsPath = join(projectRoot, contentDir, 'components');

        if (!existsSync(componentsPath)) {
          consola.info('[generate-component-llms] Components directory not found:', componentsPath);
          return;
        }

        // Create output directory
        const outputPath = join(distPath, outputDir);
        mkdirSync(outputPath, { recursive: true });

        consola.info('[generate-component-llms] Generating component-specific llm.txt files...');

        // Get all component directories
        const componentDirs = readdirSync(componentsPath).filter(item => {
          const itemPath = join(componentsPath, item);
          return statSync(itemPath).isDirectory();
        });

        // Base URL for links
        const base = process.env.PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'http://localhost:4321';

        for (const componentName of componentDirs) {
          const componentPath = join(componentsPath, componentName);
          const files = listMdxRecursive(componentPath);

          if (files.length === 0) {
            continue;
          }

          // Generate content for this component (все страницы, в т.ч. вложенные components/Spinner.mdx)
          const lines: string[] = [];
          lines.push(`# ${componentName} Component Documentation`);
          lines.push('');
          lines.push(`Generated: ${new Date().toISOString()}`);
          lines.push('');
          lines.push('---');
          lines.push('');

          // Add URLs for all pages related to this component
          const componentPages = pages.filter(p => p.pathname.includes(`/components/${componentName}/`));

          if (componentPages.length > 0) {
            lines.push('## Pages:');
            componentPages.forEach(page => {
              lines.push(`- ${base}${page.pathname}`);
            });
            lines.push('');
          }

          for (const relativeFile of files) {
            const filePath = join(componentPath, relativeFile);
            let content = readFileSync(filePath, 'utf-8');

            const sectionTitle = relativeFile.replace(/\.mdx$/, '').replace(/\//g, ' / ');
            lines.push(`## ${sectionTitle}`);
            lines.push('');

            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
            if (frontmatterMatch) {
              const frontmatter = frontmatterMatch[1];
              const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
              const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
              if (titleMatch) lines.push(`**Title:** ${titleMatch[1].trim()}`);
              if (descMatch) lines.push(`**Description:** ${descMatch[1].trim()}`);
              lines.push('');
            }

            // Live examples — те же tsx-сниппеты, что и в README (вместо пустых заголовков)
            content = replaceLiveExamplesWithCodeBlocks(content, componentName);
            const cleanContent = stripMdxForPlainText(content);
            lines.push(cleanContent);
            lines.push('');
            lines.push('---');
            lines.push('');
          }

          // Write component-specific llm.txt file
          const outputFileName = `llm-${componentName}.txt`;
          const outputFilePath = join(outputPath, outputFileName);

          const finalContent = lines.join('\n');
          // Add BOM for UTF-8
          const contentWithBom = '\uFEFF' + finalContent;
          writeFileSync(outputFilePath, contentWithBom, { encoding: 'utf8' });

          consola.success(`Generated ${outputFileName}`);
        }

        // Create index file listing all component llm.txt files
        const indexLines: string[] = [];
        indexLines.push('# Component-specific LLM.txt Files');
        indexLines.push('');
        indexLines.push('Each component has its own dedicated LLM.txt file:');
        indexLines.push('');

        componentDirs.forEach(componentName => {
          const fileName = `llm-${componentName}.txt`;
          const filePath = join(outputPath, fileName);
          if (existsSync(filePath)) {
            indexLines.push(`- [${componentName}](${base}/${outputDir}/${fileName})`);
          }
        });

        const indexFilePath = join(outputPath, 'index.txt');
        const indexContent = '\uFEFF' + indexLines.join('\n');
        writeFileSync(indexFilePath, indexContent, { encoding: 'utf8' });

        consola.success('[generate-component-llms] Component LLM.txt files generated successfully');
      },
    },
  };
}
