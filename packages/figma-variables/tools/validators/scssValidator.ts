import { promises as fs } from 'fs';

import { dirname, join, resolve } from 'node:path';

/**
 * Extracts line number and column from a Sass error message.
 * Format: "filepath line:column"
 */
function extractErrorLocation(message: string): { line: number; column: number } | null {
  const locationMatch = message.match(/(\d+):(\d+)\s+root stylesheet/);
  if (locationMatch) {
    return {
      line: parseInt(locationMatch[1], 10),
      column: parseInt(locationMatch[2], 10),
    };
  }
  return null;
}

/**
 * Validates SCSS file by compiling it multiple times, commenting out
 * problematic lines to collect all errors, not just the first one.
 * Uses temporary files to allow sass.compile() to resolve imports correctly.
 * Returns full error messages with code snippets.
 */
async function validateSCSSWithMultiplePasses(
  filePath: string,
  sass: typeof import('sass'),
  fileDir: string,
  parentDir: string,
  loadPaths: string[],
): Promise<string[]> {
  const allErrors: string[] = [];
  const maxPasses = 50; // Prevent infinite loops
  let pass = 0;
  let fileContent = await fs.readFile(filePath, 'utf-8');
  const commentedLines = new Set<number>();
  // Write temp file alongside the original so relative `@use '../styles/...'` resolves correctly.
  const tempFileBase = join(fileDir, `.scss-validation-${Date.now()}-${Math.random().toString(36).substring(7)}`);

  try {
    while (pass < maxPasses) {
      // Create a temporary file with the current content
      const tempFilePath = `${tempFileBase}-${pass}.scss`;
      await fs.writeFile(tempFilePath, fileContent, 'utf-8');

      try {
        // Try to compile the temporary file
        sass.compile(tempFilePath, {
          loadPaths,
        });
        // If compilation succeeds, we're done
        break;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const location = extractErrorLocation(message);

        if (location && !commentedLines.has(location.line)) {
          // Save the full error message with code snippet (everything from the error)
          // Replace temporary file path with original file path in the error message
          // Replace all occurrences of the temp file path with the original file path
          let normalizedMessage = message;
          // Replace the full path
          normalizedMessage = normalizedMessage.replace(
            new RegExp(tempFilePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            filePath,
          );
          // Also replace just the filename in case it appears separately
          const tempFileName = tempFilePath.split('/').pop() || tempFilePath;
          const originalFileName = filePath.split('/').pop() || filePath;
          normalizedMessage = normalizedMessage.replace(
            new RegExp(tempFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            originalFileName,
          );
          allErrors.push(normalizedMessage);

          // Comment out the problematic line to continue validation
          const lines = fileContent.split('\n');
          if (location.line > 0 && location.line <= lines.length) {
            const lineIndex = location.line - 1;
            const line = lines[lineIndex];
            // Only comment if the line isn't already a comment
            if (!line.trim().startsWith('//') && !line.trim().startsWith('/*')) {
              lines[lineIndex] = `// VALIDATION_SKIP: ${line}`;
              fileContent = lines.join('\n');
              commentedLines.add(location.line);
            }
          }
          pass++;
        } else {
          // Can't extract location or line already commented, use the full error message
          // Replace temporary file path with original file path
          let normalizedMessage = message;
          // Replace the full path
          normalizedMessage = normalizedMessage.replace(
            new RegExp(tempFilePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            filePath,
          );
          // Also replace just the filename in case it appears separately
          const tempFileName = tempFilePath.split('/').pop() || tempFilePath;
          const originalFileName = filePath.split('/').pop() || filePath;
          normalizedMessage = normalizedMessage.replace(
            new RegExp(tempFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            originalFileName,
          );
          if (normalizedMessage && !allErrors.some(e => e === normalizedMessage)) {
            allErrors.push(normalizedMessage);
          }
          break; // Can't continue
        }
      } finally {
        // Clean up temporary file
        try {
          await fs.unlink(tempFilePath);
        } catch {
          // Ignore cleanup errors
        }
      }
    }
  } catch (error) {
    // If something goes wrong, add the full error message
    const message = error instanceof Error ? error.message : String(error);
    if (message && !allErrors.some(e => e === message)) {
      allErrors.push(message);
    }
  }

  return allErrors;
}

/**
 * Basic SCSS validation using sass compiler
 *
 * Uses multiple compilation passes to collect all errors in a file, not just the first one.
 * This provides better developer experience by showing all issues at once.
 */
export async function validateSCSS(
  filePath: string,
  mode: 'strict' | 'warning' | 'off',
): Promise<{ errors: string[]; warnings: string[] }> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (mode === 'off') {
    return { errors, warnings };
  }

  try {
    const sass = await import('sass');
    const fileDir = dirname(filePath);
    const parentDir = resolve(fileDir, '..');
    const grandParentDir = resolve(parentDir, '..');

    // Build comprehensive loadPaths to support nested imports
    // For example, build/scss/components/field.module.scss imports ../styles/styles.module
    // We need to include: fileDir, parentDir, and all sibling directories (components, styles, etc.)
    const loadPaths = [
      fileDir, // build/scss/components
      parentDir, // build/scss
      grandParentDir, // build
      join(parentDir, 'styles'), // build/scss/styles (explicit path to styles directory)
      join(parentDir, 'components'), // build/scss/components
    ];

    // First, try a simple compilation to see if there are any errors
    try {
      sass.compile(filePath, {
        loadPaths,
      });
      // If compilation succeeds, no errors
      return { errors, warnings };
    } catch (_firstError) {
      // If there's an error, use multiple passes to collect all errors
      const allErrors = await validateSCSSWithMultiplePasses(filePath, sass, fileDir, parentDir, loadPaths);

      for (const errorMessage of allErrors) {
        if (mode === 'strict') {
          errors.push(`SCSS compilation error: ${errorMessage}`);
        } else {
          warnings.push(`SCSS compilation warning: ${errorMessage}`);
        }
      }
    }
  } catch (error) {
    // Fallback to the original error message if something goes wrong
    const message = error instanceof Error ? error.message : String(error);
    if (mode === 'strict') {
      errors.push(`SCSS compilation error: ${message}`);
    } else {
      warnings.push(`SCSS compilation warning: ${message}`);
    }
  }

  return { errors, warnings };
}
