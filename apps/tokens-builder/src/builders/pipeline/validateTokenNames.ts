import type { TokenAdapter } from '../../adapters/types.js';
import {
  ALL_VALID_PROPERTIES,
  PROPERTY_PATTERNS,
  SIMILARITY_CONFIG,
  VALID_PROPERTY_NAMES,
  VALIDATION_CONFIG,
} from '../../constants/index.js';
import type { BaseConfig } from '../../types.js';
import { shouldExcludeFromValidation } from '../../utils/groupUtils.js';
import { logger } from '../../utils/logger.js';

type ValidationIssue = {
  file: string;
  path: string;
  property: string;
  suggestion?: string;
};

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }

  return matrix[str2.length][str1.length];
}

function findSimilarProperty(propertyName: string): string | undefined {
  if (propertyName.length < SIMILARITY_CONFIG.MIN_LENGTH) {
    return undefined;
  }

  const lowerProperty = propertyName.toLowerCase();
  let bestMatch: string | undefined;
  let bestDistance = Infinity;

  for (const validProperty of ALL_VALID_PROPERTIES) {
    const distance = levenshteinDistance(lowerProperty, validProperty.toLowerCase());

    if (distance < bestDistance && distance <= SIMILARITY_CONFIG.MAX_DISTANCE) {
      bestMatch = String(validProperty);
      bestDistance = distance;
    }
  }

  return bestMatch;
}

function validatePropertyName(
  propertyName: string,
  fullPath: string[],
  fileName: string,
  issues: ValidationIssue[],
): void {
  if (ALL_VALID_PROPERTIES.includes(propertyName as never)) {
    return;
  }

  if (!PROPERTY_PATTERNS.LOOKS_LIKE_PROPERTY.test(propertyName)) {
    return;
  }

  const isStrokeTypo = PROPERTY_PATTERNS.STROKE_TYPO.test(propertyName);
  const suggestion = isStrokeTypo ? propertyName.replace(/weigth/gi, 'Weight') : findSimilarProperty(propertyName);

  issues.push({
    file: fileName,
    path: fullPath.join('.'),
    property: propertyName,
    suggestion,
  });
}

function walkTokenTree(
  obj: Record<string, unknown>,
  path: string[],
  fileName: string,
  issues: ValidationIssue[],
): void {
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && '$type' in value && '$value' in value) {
      validatePropertyName(key, [...path, key], fileName, issues);
      continue;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      walkTokenTree(value as Record<string, unknown>, [...path, key], fileName, issues);
    }
  }
}

function groupIssuesByFile(issues: ValidationIssue[]): Map<string, ValidationIssue[]> {
  const grouped = new Map<string, ValidationIssue[]>();

  for (const issue of issues) {
    const fileIssues = grouped.get(issue.file) ?? [];
    fileIssues.push(issue);
    grouped.set(issue.file, fileIssues);
  }

  return grouped;
}

function getExpectedPropertiesHint(propertyName: string): string {
  const lower = propertyName.toLowerCase();

  // if (lower.startsWith('bg') || lower.startsWith('fg') || lower.startsWith('border')) {
  //   return `Valid: ${VALID_PROPERTY_NAMES.color.slice(0, 6).join(', ')}, etc.`;
  // }

  if (lower.startsWith('padding')) {
    return `Valid: ${VALID_PROPERTY_NAMES.padding.join(', ')}`;
  }

  if (lower.startsWith('corner')) {
    return `Valid: ${VALID_PROPERTY_NAMES.borderRadius.slice(0, 5).join(', ')}, etc.`;
  }

  if (lower.startsWith('stroke')) {
    return `Valid: ${VALID_PROPERTY_NAMES.stroke.slice(0, 4).join(', ')}, etc.`;
  }

  if (lower.includes('width') || lower.includes('height')) {
    return `Valid: ${VALID_PROPERTY_NAMES.size.join(', ')}`;
  }

  return 'See documentation for valid property names';
}

export async function validateTokenNamesStep(adapter: TokenAdapter, config: BaseConfig): Promise<void> {
  logger.section('Token Names Validation');
  logger.subsection('Validating token property names against documentation...');

  const tokenSets = await adapter.readTokens();
  const issues: ValidationIssue[] = [];

  for (const tokenSet of tokenSets) {
    if (
      shouldExcludeFromValidation(
        tokenSet.group,
        VALIDATION_CONFIG.EXCLUDE_SYSTEM_LAYERS,
        VALIDATION_CONFIG.EXCLUDE_STYLES_LAYER,
      )
    ) {
      continue;
    }

    if (!tokenSet.content) {
      continue;
    }

    const fileName = `${tokenSet.group}/${tokenSet.name}`;
    walkTokenTree(tokenSet.content, [], fileName, issues);
  }

  if (issues.length === 0) {
    logger.success('✓ All token property names are valid');
    logger.separator();
    return;
  }

  const issuesByFile = groupIssuesByFile(issues);

  logger.error(`✗ Found ${issues.length} invalid property name(s) in ${issuesByFile.size} file(s)`);
  logger.separator();

  for (const [file, fileIssues] of issuesByFile) {
    logger.separator();
    logger.warn(`━━━ 📄 ${file} (${fileIssues.length} issue${fileIssues.length > 1 ? 's' : ''})`);
    logger.separator();

    for (const issue of fileIssues) {
      logger.error(`  ✗ "${issue.property}"`);

      if (issue.suggestion) {
        logger.info(`    ${issue.path} → 💡 "${issue.suggestion}"`);
      } else {
        logger.info(`    ${issue.path}`);
        logger.info(`    💡 ${getExpectedPropertiesHint(issue.property)}`);
      }
    }
  }

  logger.separator();
  logger.subsection('📖 Valid property names (see docs.md):');
  logger.info('  • Color: bg/fg/border + Default/Hovered/Pressed/Load/Activated/Disabled');
  logger.info('  • Size: square, width, height, min/max + Width/Height');
  logger.info('  • Padding: padding, padding + Left/Right/Top/Bottom/Horizontal/Vertical');
  logger.info('  • Gap: gap');
  logger.info('  • Corner: borderRadius, borderRadius + Left/Right/Top/Bottom/TopLeft/TopRight/BottomLeft/BottomRight');
  logger.info('  • Stroke: strokeWeight, strokeWeight + Horizontal/Vertical/Top/Right/Bottom/Left');
  logger.separator();

  if (config.validate === 'strict') {
    throw new Error('Token names validation failed');
  }
}
