import type { TokenAdapter } from '../../adapters/types.js';
import type { BaseConfig } from '../../types.js';
import { logger } from '../../utils/logger.js';
import { validateTokenReferencesStep } from './validateTokenReferences.js';

/**
 * Читает токены, валидирует ссылки и логирует ошибки/предупреждения.
 * При config.validate === 'strict' и наличии ошибок выбрасывает исключение.
 */
export async function runTokenReferenceValidation(adapter: TokenAdapter, config: BaseConfig): Promise<void> {
  const allTokenSets = await adapter.readTokens();
  const validationResult = validateTokenReferencesStep({ tokenSets: allTokenSets }, config);

  if (validationResult.errors.length > 0 || validationResult.warnings.length > 0) {
    logger.subsection('Validating token references...');
  }

  if (validationResult.errors.length > 0) {
    logger.error(`Token reference validation errors (${validationResult.errors.length}):`);
    validationResult.errors.forEach(err => logger.error(`  • ${err}`));
    if (config.validate === 'strict') {
      throw new Error('Token reference validation failed');
    }
  }

  if (validationResult.warnings.length > 0) {
    logger.warn(`Token reference validation warnings (${validationResult.warnings.length}):`);
    validationResult.warnings.forEach(warn => logger.warn(`  • ${warn}`));
  }
}
